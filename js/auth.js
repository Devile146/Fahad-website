let currentUser = null;
let currentUserData = null;

auth.onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
        loadUserData(user);
    } else {
        currentUser = null;
        currentUserData = null;
        showGuestState();
    }
});

function loadUserData(user) {
    db.collection('users').doc(user.uid).get().then((doc) => {
        if (doc.exists) {
            currentUserData = doc.data();
            updateUserUI(user, currentUserData);
        } else {
            createUserDocument(user);
        }
    }).catch(() => {});
}

function createUserDocument(user) {
    const userData = {
        uid: user.uid,
        displayName: user.displayName || 'User',
        email: user.email,
        credits: 0,
        accountStatus: 'active',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    db.collection('users').doc(user.uid).set(userData).then(() => {
        currentUserData = userData;
        updateUserUI(user, userData);
    }).catch(() => {});
}

function updateUserUI(user, userData) {
    const guestButtons = document.getElementById('guestButtons');
    const userLoggedIn = document.getElementById('userLoggedIn');
    const navUserName = document.getElementById('navUserName');
    const navCredits = document.getElementById('navCredits');
    
    if (guestButtons) guestButtons.style.display = 'none';
    if (userLoggedIn) userLoggedIn.style.display = 'flex';
    if (navUserName) navUserName.textContent = userData.displayName || 'Account';
    if (navCredits) navCredits.textContent = userData.credits || 0;
}

function showGuestState() {
    const guestButtons = document.getElementById('guestButtons');
    const userLoggedIn = document.getElementById('userLoggedIn');
    if (guestButtons) guestButtons.style.display = 'flex';
    if (userLoggedIn) userLoggedIn.style.display = 'none';
}

function openAuthModal(mode) {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    modal.style.display = 'flex';
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    if (mode === 'login') {
        if (loginForm) loginForm.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
    } else {
        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'block';
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.style.display = 'none';
}

function switchAuthMode(mode) { openAuthModal(mode); }

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const loginBtn = document.getElementById('loginBtn');
    
    if (!email || !password) { showToast('Fill all fields', 'error'); return; }
    
    loginBtn.disabled = true;
    auth.signInWithEmailAndPassword(email, password).then(() => {
        showToast('Login successful!', 'success');
        closeAuthModal();
        loginBtn.disabled = false;
    }).catch((error) => {
        showToast(error.message, 'error');
        loginBtn.disabled = false;
    });
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const registerBtn = document.getElementById('registerBtn');
    
    if (password !== confirmPassword) { showToast('Passwords do not match', 'error'); return; }
    if (password.length < 6) { showToast('Password min 6 chars', 'error'); return; }
    
    registerBtn.disabled = true;
    auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
        const user = userCredential.user;
        return user.updateProfile({ displayName: name }).then(() => {
            return db.collection('users').doc(user.uid).set({
                uid: user.uid, displayName: name, email: email, credits: 0,
                accountStatus: 'active',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        });
    }).then(() => {
        showToast('Account created!', 'success');
        closeAuthModal();
        registerBtn.disabled = false;
    }).catch((error) => {
        showToast(error.message, 'error');
        registerBtn.disabled = false;
    });
}

function logoutUser() {
    auth.signOut().then(() => { window.location.href = 'index.html'; });
}

function goToAccount() { window.location.href = 'account.html'; }
function updateCreditsDisplay(credits) { const el = document.getElementById('navCredits'); if (el) el.textContent = credits; }

function showToast(message, type) {
    let container = document.getElementById('toastContainer');
    if (!container) { container = document.createElement('div'); container.className = 'toast-container'; container.id = 'toastContainer'; document.body.appendChild(container); }
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + (type || 'info');
    toast.innerHTML = '<span>' + message + '</span>';
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
        }

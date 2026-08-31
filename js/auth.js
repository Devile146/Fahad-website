// =========================
// FAHAD TECH - AUTHENTICATION (ULTIMATE FIX)
// =========================

let currentUser = null;
let currentUserData = null;

auth.onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
        
        // NAVBAR TURANT UPDATE
        const guestButtons = document.getElementById('guestButtons');
        const userLoggedIn = document.getElementById('userLoggedIn');
        if (guestButtons) guestButtons.style.display = 'none';
        if (userLoggedIn) userLoggedIn.style.display = 'flex';
        
        // USER DATA LOAD
        db.collection('users').doc(user.uid).get().then((doc) => {
            if (doc.exists) {
                currentUserData = doc.data();
                updateUI(user, currentUserData);
            } else {
                const userData = {
                    uid: user.uid,
                    displayName: user.displayName || 'User',
                    email: user.email,
                    credits: 0,
                    accountStatus: 'active',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                };
                db.collection('users').doc(user.uid).set(userData).then(() => {
                    currentUserData = userData;
                    updateUI(user, userData);
                }).catch(() => {});
            }
        }).catch(() => {});
    } else {
        currentUser = null;
        currentUserData = null;
        
        const guestButtons = document.getElementById('guestButtons');
        const userLoggedIn = document.getElementById('userLoggedIn');
        if (guestButtons) guestButtons.style.display = 'flex';
        if (userLoggedIn) userLoggedIn.style.display = 'none';
    }
});

function updateUI(user, userData) {
    // Navbar
    const navUserName = document.getElementById('navUserName');
    const navCredits = document.getElementById('navCredits');
    if (navUserName) navUserName.textContent = userData.displayName || 'Account';
    if (navCredits) navCredits.textContent = userData.credits || 0;
    
    // Account page
    if (window.location.pathname.includes('account.html')) {
        const contentEl = document.getElementById('accountContent');
        const loginRequiredEl = document.getElementById('loginRequired');
        
        if (contentEl) contentEl.style.display = 'block';
        if (loginRequiredEl) loginRequiredEl.style.display = 'none';
        
        const nameEl = document.getElementById('accountName');
        const emailEl = document.getElementById('accountEmail');
        const creditsEl = document.getElementById('accountCredits');
        const statusEl = document.getElementById('accountStatus');
        const memberSinceEl = document.getElementById('memberSince');
        
        if (nameEl) nameEl.textContent = userData.displayName || 'User';
        if (emailEl) emailEl.textContent = userData.email || '';
        if (creditsEl) creditsEl.textContent = userData.credits || 0;
        
        if (statusEl) {
            if (userData.accountStatus === 'disabled') {
                statusEl.innerHTML = '<span class="status-dot disabled"></span><span>Disabled</span>';
            } else {
                statusEl.innerHTML = '<span class="status-dot active"></span><span>Active</span>';
            }
        }
        
        if (memberSinceEl) {
            if (userData.createdAt && userData.createdAt.toDate) {
                try {
                    memberSinceEl.textContent = userData.createdAt.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                } catch(e) { memberSinceEl.textContent = 'N/A'; }
            } else {
                memberSinceEl.textContent = 'Just Now';
            }
        }
    }
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

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input) input.type = input.type === 'password' ? 'text' : 'password';
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const loginBtn = document.getElementById('loginBtn');
    if (!email || !password) { showToast('Fill all fields', 'error'); return; }
    loginBtn.disabled = true;
    auth.signInWithEmailAndPassword(email, password).then(() => {
        closeAuthModal();
        loginBtn.disabled = false;
        showToast('Login successful!', 'success');
    }).catch((error) => {
        loginBtn.disabled = false;
        showToast(error.message, 'error');
    });
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const registerBtn = document.getElementById('registerBtn');
    if (!name || !email || !password || !confirmPassword) { showToast('Fill all fields', 'error'); return; }
    if (password !== confirmPassword) { showToast('Passwords do not match', 'error'); return; }
    if (password.length < 6) { showToast('Password min 6 chars', 'error'); return; }
    registerBtn.disabled = true;
    auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
        const user = userCredential.user;
        return user.updateProfile({ displayName: name }).then(() => {
            return db.collection('users').doc(user.uid).set({
                uid: user.uid, displayName: name, email: email, credits: 0,
                accountStatus: 'active',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        });
    }).then(() => {
        closeAuthModal();
        registerBtn.disabled = false;
        showToast('Account created!', 'success');
    }).catch((error) => {
        registerBtn.disabled = false;
        showToast(error.message, 'error');
    });
}

function logoutUser() {
    auth.signOut().then(() => {
        showToast('Logged out', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 1000);
    });
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

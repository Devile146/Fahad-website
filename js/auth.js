// =========================
// FAHAD TECH - AUTHENTICATION (NO FLICKER FIX)
// =========================

let currentUser = null;
let currentUserData = null;
let userStatusListener = null;

// Page load hote hi - TURANT check from localStorage
document.addEventListener('DOMContentLoaded', function() {
    // Pehle localStorage se check karo
    const savedUser = localStorage.getItem('fahad_tech_user');
    if (savedUser) {
        try {
            currentUserData = JSON.parse(savedUser);
            currentUser = { uid: currentUserData.uid, email: currentUserData.email, displayName: currentUserData.displayName };
            
            // UI turant update karo - NO FLICKER
            const guestButtons = document.getElementById('guestButtons');
            const userLoggedIn = document.getElementById('userLoggedIn');
            if (guestButtons) guestButtons.style.display = 'none';
            if (userLoggedIn) userLoggedIn.style.display = 'flex';
            
            const navUserName = document.getElementById('navUserName');
            const navCredits = document.getElementById('navCredits');
            if (navUserName) navUserName.textContent = currentUserData.displayName || 'Account';
            if (navCredits) navCredits.textContent = currentUserData.credits || 0;
        } catch(e) {
            localStorage.removeItem('fahad_tech_user');
        }
    }
});

// Auth state listener
auth.onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
        startUserListener(user);
    } else {
        currentUser = null;
        currentUserData = null;
        localStorage.removeItem('fahad_tech_user');
        showGuestState();
    }
});

// Real-time user listener
function startUserListener(user) {
    if (userStatusListener) userStatusListener();
    
    userStatusListener = db.collection('users').doc(user.uid).onSnapshot(function(doc) {
        if (doc.exists) {
            currentUserData = doc.data();
            
            // LOCAL STORAGE ME SAVE KARO - next page load ke liye
            localStorage.setItem('fahad_tech_user', JSON.stringify(currentUserData));
            
            updateUserUI(user, currentUserData);
            
            if (window.location.pathname.includes('account.html')) {
                displayAccountData(currentUserData);
            }
            
            if (currentUserData.accountStatus === 'disabled') {
                showToast('Account disabled!', 'error');
                localStorage.removeItem('fahad_tech_user');
                setTimeout(() => { auth.signOut(); window.location.href = 'index.html'; }, 2000);
            }
        } else {
            createUserDocument(user);
        }
    }, function(error) {
        console.error("Listener error:", error);
    });
}

function loadUserData(user) {
    db.collection('users').doc(user.uid).get().then((doc) => {
        if (doc.exists) {
            currentUserData = doc.data();
            localStorage.setItem('fahad_tech_user', JSON.stringify(currentUserData));
            updateUserUI(user, currentUserData);
            if (window.location.pathname.includes('account.html')) displayAccountData(currentUserData);
        } else {
            createUserDocument(user);
        }
    }).catch((error) => {
        console.error("Error:", error);
    });
}

function createUserDocument(user) {
    const userData = {
        uid: user.uid, displayName: user.displayName || 'User', email: user.email,
        credits: 0, accountStatus: 'active',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    db.collection('users').doc(user.uid).set(userData).then(() => {
        currentUserData = userData;
        localStorage.setItem('fahad_tech_user', JSON.stringify(userData));
        updateUserUI(user, userData);
    }).catch((error) => { console.error("Error:", error); });
}

function updateUserUI(user, userData) {
    const guestButtons = document.getElementById('guestButtons');
    const userLoggedIn = document.getElementById('userLoggedIn');
    const navUserName = document.getElementById('navUserName');
    const navCredits = document.getElementById('navCredits');
    const mobileAuthArea = document.getElementById('mobileAuthArea');
    
    if (guestButtons) guestButtons.style.display = 'none';
    if (userLoggedIn) userLoggedIn.style.display = 'flex';
    if (navUserName) navUserName.textContent = userData.displayName || 'Account';
    if (navCredits) navCredits.textContent = userData.credits || 0;
    
    if (mobileAuthArea) {
        mobileAuthArea.innerHTML = `
            <div class="mobile-user-info">
                <span class="mobile-user-name">${userData.displayName || 'User'}</span>
                <span class="mobile-user-credits"><i class="fas fa-coins"></i> ${userData.credits || 0} Credits</span>
            </div>
            <button class="mobile-logout-btn" onclick="logoutUser()"><i class="fas fa-sign-out-alt"></i> Logout</button>
        `;
    }
}

function showGuestState() {
    const guestButtons = document.getElementById('guestButtons');
    const userLoggedIn = document.getElementById('userLoggedIn');
    const mobileAuthArea = document.getElementById('mobileAuthArea');
    
    if (guestButtons) guestButtons.style.display = 'flex';
    if (userLoggedIn) userLoggedIn.style.display = 'none';
    
    if (mobileAuthArea) {
        mobileAuthArea.innerHTML = `
            <button class="mobile-auth-btn" onclick="openAuthModal('login')"><i class="fas fa-sign-in-alt"></i> Login</button>
            <button class="mobile-auth-btn" onclick="openAuthModal('register')"><i class="fas fa-user-plus"></i> Create Account</button>
        `;
    }
}

function displayAccountData(data) {
    const loadingEl = document.getElementById('accountLoading');
    const contentEl = document.getElementById('accountContent');
    const loginRequiredEl = document.getElementById('loginRequired');
    if (loadingEl) loadingEl.style.display = 'none';
    if (loginRequiredEl) loginRequiredEl.style.display = 'none';
    if (contentEl) contentEl.style.display = 'block';
    
    const nameEl = document.getElementById('accountName');
    const emailEl = document.getElementById('accountEmail');
    const creditsEl = document.getElementById('accountCredits');
    if (nameEl) nameEl.textContent = data.displayName || 'User';
    if (emailEl) emailEl.textContent = data.email || '';
    if (creditsEl) creditsEl.textContent = data.credits || 0;
}

function openAuthModal(mode = 'login') {
    const modal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    if (!modal) return;
    modal.style.display = 'flex';
    if (mode === 'login') {
        if (loginForm) loginForm.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
    } else {
        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'block';
    }
}

function closeAuthModal() { const modal = document.getElementById('authModal'); if (modal) modal.style.display = 'none'; }
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
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    auth.signInWithEmailAndPassword(email, password).then(() => {
        showToast('Login successful!', 'success');
        closeAuthModal();
        loginBtn.disabled = false;
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
    }).catch((error) => {
        showToast(error.message, 'error');
        loginBtn.disabled = false;
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
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
        showToast('Account created!', 'success');
        closeAuthModal();
        registerBtn.disabled = false;
    }).catch((error) => {
        showToast(error.message, 'error');
        registerBtn.disabled = false;
    });
}

function logoutUser() {
    localStorage.removeItem('fahad_tech_user');
    auth.signOut().then(() => {
        showToast('Logged out', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 1000);
    });
}

function goToAccount() { window.location.href = 'account.html'; }
function updateCreditsDisplay(credits) { const el = document.getElementById('navCredits'); if (el) el.textContent = credits; }

function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) { container = document.createElement('div'); container.className = 'toast-container'; container.id = 'toastContainer'; document.body.appendChild(container); }
    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`);
    const icons = { 'success': 'fas fa-check-circle', 'error': 'fas fa-exclamation-circle', 'info': 'fas fa-info-circle' };
    toast.innerHTML = `<i class="${icons[type] || icons.info}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
            }

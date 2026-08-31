// =========================
// FAHAD TECH - AUTHENTICATION (FINAL)
// =========================

let currentUser = null;
let currentUserData = null;
let userStatusListener = null;

// Page load hote hi turant check
document.addEventListener('DOMContentLoaded', function() {
    const user = auth.currentUser;
    if (user) {
        currentUser = user;
        const guestButtons = document.getElementById('guestButtons');
        const userLoggedIn = document.getElementById('userLoggedIn');
        if (guestButtons) guestButtons.style.display = 'none';
        if (userLoggedIn) userLoggedIn.style.display = 'flex';
        loadUserData(user);
        startUserListener(user);
    }
});

// Auth state listener
auth.onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
        loadUserData(user);
        startUserListener(user);
    } else {
        currentUser = null;
        currentUserData = null;
        showGuestState();
    }
});

// Real-time user listener (admin changes turant reflect honge)
function startUserListener(user) {
    // Purana listener hatao
    if (userStatusListener) userStatusListener();
    
    userStatusListener = db.collection('users').doc(user.uid).onSnapshot(function(doc) {
        if (doc.exists) {
            currentUserData = doc.data();
            updateUserUI(user, currentUserData);
            
            if (window.location.pathname.includes('account.html')) {
                displayAccountData(currentUserData);
            }
            
            if (currentUserData.accountStatus === 'disabled') {
                showToast('Your account has been disabled by admin!', 'error');
                setTimeout(() => {
                    auth.signOut();
                    window.location.href = 'index.html';
                }, 2000);
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
            updateUserUI(user, currentUserData);
            
            if (window.location.pathname.includes('account.html')) {
                displayAccountData(currentUserData);
            }
        } else {
            createUserDocument(user);
        }
    }).catch((error) => {
        console.error("Error:", error);
        if (window.location.pathname.includes('account.html')) {
            const loadingEl = document.getElementById('accountLoading');
            const loginRequiredEl = document.getElementById('loginRequired');
            if (loadingEl) loadingEl.style.display = 'none';
            if (loginRequiredEl) loginRequiredEl.style.display = 'flex';
        }
    });
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
    const statusEl = document.getElementById('accountStatus');
    const memberSinceEl = document.getElementById('memberSince');
    
    if (nameEl) nameEl.textContent = data.displayName || 'User';
    if (emailEl) emailEl.textContent = data.email || '';
    if (creditsEl) creditsEl.textContent = data.credits || 0;
    
    if (statusEl) {
        if (data.accountStatus === 'disabled') {
            statusEl.innerHTML = '<span class="status-dot disabled"></span><span>Disabled</span>';
        } else {
            statusEl.innerHTML = '<span class="status-dot active"></span><span>Active</span>';
        }
    }
    
    if (memberSinceEl && data.createdAt) {
        try {
            const date = data.createdAt.toDate();
            memberSinceEl.textContent = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        } catch(e) { memberSinceEl.textContent = 'N/A'; }
    }
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
        updateUserUI(user, userData);
        if (window.location.pathname.includes('account.html')) displayAccountData(userData);
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
    
    if (window.location.pathname.includes('account.html')) {
        const loadingEl = document.getElementById('accountLoading');
        const contentEl = document.getElementById('accountContent');
        const loginRequiredEl = document.getElementById('loginRequired');
        if (loadingEl) loadingEl.style.display = 'none';
        if (contentEl) contentEl.style.display = 'none';
        if (loginRequiredEl) loginRequiredEl.style.display = 'flex';
    }
}

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
        const user = result.user;
        db.collection('users').doc(user.uid).get().then((doc) => {
            if (!doc.exists) {
                return db.collection('users').doc(user.uid).set({
                    uid: user.uid, displayName: user.displayName || 'User', email: user.email,
                    credits: 0, accountStatus: 'active',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
        }).then(() => { showToast('Google login successful!', 'success'); });
    }).catch((error) => { showToast(error.message, 'error'); });
}

function openAuthModal(mode = 'login') {
    const modal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const modalTitle = document.getElementById('authModalTitle');
    const modalSubtitle = document.getElementById('authModalSubtitle');
    if (!modal) return;
    modal.style.display = 'flex';
    if (mode === 'login') {
        if (loginForm) loginForm.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
        if (modalTitle) modalTitle.textContent = 'Login';
        if (modalSubtitle) modalSubtitle.textContent = 'Access your account';
    } else {
        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'block';
        if (modalTitle) modalTitle.textContent = 'Create Account';
        if (modalSubtitle) modalSubtitle.textContent = 'Join Fahad Tech Premium';
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
    registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';
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
        registerBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
    }).catch((error) => {
        showToast(error.message, 'error');
        registerBtn.disabled = false;
        registerBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
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

// =========================
// FAHAD TECH - MAIN SCRIPT
// =========================

// Configuration
const CONFIG = {
    WHATSAPP_LINK: "https://wa.me/923251138960",
    TELEGRAM_LINK: "https://t.me/fahad_tricks_bot",
    EMAIL_LINK: "mailto:fahadali2727@gmail.com",
    PREMIUM_WHATSAPP: "https://wa.me/923251138959",
    PROFILE_IMAGE: "https://raw.githubusercontent.com/Devile146/Demols/main/Fahad.jpg"
};

// Current state
let currentUser = null;
let currentUserData = null;
let isProcessingTool = false;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initContactLinks();
    initProfileImage();
    initAuthState();
    
    // Initialize tools if on tools page
    if (document.getElementById('toolsGrid')) {
        // Load tools from Firestore first
        loadToolsFromFirestore().then(() => {
            renderTools('all');
            checkUrlCategory();
        }).catch(() => {
            renderTools('all');
            checkUrlCategory();
        });
    }
});

// =========================
// AUTHENTICATION FUNCTIONS
// =========================

// Initialize Auth State
function initAuthState() {
    if (typeof auth === 'undefined') return;
    
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
}

// Load User Data from Firestore
function loadUserData(user) {
    db.collection('users').doc(user.uid).get().then((doc) => {
        if (doc.exists) {
            currentUserData = doc.data();
            updateUserUI(user, currentUserData);
        } else {
            // Create user document if doesn't exist
            createUserDocument(user);
        }
    }).catch((error) => {
        console.error("Error loading user data:", error);
        showToast('Error loading user data', 'error');
    });
}

// Create User Document
function createUserDocument(user) {
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
        updateUserUI(user, userData);
        showToast('Welcome to Fahad Tech!', 'success');
    }).catch((error) => {
        console.error("Error creating user document:", error);
    });
}

// Update User UI
function updateUserUI(user, userData) {
    const guestButtons = document.getElementById('guestButtons');
    const userLoggedIn = document.getElementById('userLoggedIn');
    const navUserName = document.getElementById('navUserName');
    const navCredits = document.getElementById('navCredits');
    const mobileAuthArea = document.getElementById('mobileAuthArea');
    
    if (guestButtons) guestButtons.style.display = 'none';
    if (userLoggedIn) userLoggedIn.style.display = 'flex';
    
    if (navUserName) {
        navUserName.textContent = userData.displayName || user.displayName || 'Account';
    }
    
    if (navCredits) {
        navCredits.textContent = userData.credits || 0;
    }
    
    if (mobileAuthArea) {
        mobileAuthArea.innerHTML = `
            <div class="mobile-user-info">
                <span class="mobile-user-name">${userData.displayName || 'User'}</span>
                <span class="mobile-user-credits"><i class="fas fa-coins"></i> ${userData.credits || 0} Credits</span>
            </div>
            <button class="mobile-logout-btn" onclick="logoutUser()">
                <i class="fas fa-sign-out-alt"></i> Logout
            </button>
        `;
    }
}

// Show Guest State
function showGuestState() {
    const guestButtons = document.getElementById('guestButtons');
    const userLoggedIn = document.getElementById('userLoggedIn');
    const mobileAuthArea = document.getElementById('mobileAuthArea');
    
    if (guestButtons) guestButtons.style.display = 'flex';
    if (userLoggedIn) userLoggedIn.style.display = 'none';
    
    if (mobileAuthArea) {
        mobileAuthArea.innerHTML = `
            <button class="mobile-auth-btn" onclick="openAuthModal('login')">
                <i class="fas fa-sign-in-alt"></i> Login
            </button>
            <button class="mobile-auth-btn" onclick="openAuthModal('register')">
                <i class="fas fa-user-plus"></i> Create Account
            </button>
        `;
    }
}

// Open Auth Modal
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

// Close Auth Modal
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Switch Auth Mode
function switchAuthMode(mode) {
    openAuthModal(mode);
}

// Toggle Password Visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    }
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const loginBtn = document.getElementById('loginBtn');
    
    if (!email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    
    auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
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

// Handle Register
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const registerBtn = document.getElementById('registerBtn');
    
    if (!name || !email || !password || !confirmPassword) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    registerBtn.disabled = true;
    registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    
    auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
        const user = userCredential.user;
        
        return user.updateProfile({
            displayName: name
        }).then(() => {
            const userData = {
                uid: user.uid,
                displayName: name,
                email: email,
                credits: 0,
                accountStatus: 'active',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            return db.collection('users').doc(user.uid).set(userData);
        });
    }).then(() => {
        showToast('Account created successfully!', 'success');
        closeAuthModal();
        registerBtn.disabled = false;
        registerBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
    }).catch((error) => {
        showToast(error.message, 'error');
        registerBtn.disabled = false;
        registerBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
    });
}

// Logout User
function logoutUser() {
    auth.signOut().then(() => {
        showToast('Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }).catch((error) => {
        showToast('Error logging out', 'error');
    });
}

// Go to Account
function goToAccount() {
    window.location.href = 'account.html';
}

// =========================
// CREDIT FUNCTIONS
// =========================

// Check Tool Access
function checkToolAccess(category) {
    if (!currentUser) {
        openAuthModal('login');
        return;
    }
    
    if (currentUserData && currentUserData.accountStatus === 'disabled') {
        showToast('Your account is currently disabled. Please contact support.', 'error');
        return;
    }
    
    if (!currentUserData || currentUserData.credits < 5) {
        showInsufficientCredits(5);
        return;
    }
    
    deductCredits(5, 'tool_access', category).then(() => {
        window.location.href = `tools.html?category=${category}`;
    }).catch((error) => {
        showToast(error.message, 'error');
    });
}

// Process Tool Access
function processToolAccess() {
    if (isProcessingTool) return;
    
    const visitLink = document.getElementById('visitLink');
    const toolLink = visitLink.getAttribute('href');
    const toolName = document.getElementById('modalToolName').textContent;
    
    if (!currentUser) {
        closeModal();
        openAuthModal('login');
        return;
    }
    
    if (currentUserData && currentUserData.accountStatus === 'disabled') {
        closeModal();
        showToast('Your account is currently disabled. Please contact support.', 'error');
        return;
    }
    
    if (!currentUserData || currentUserData.credits < 5) {
        closeModal();
        showInsufficientCredits(5);
        return;
    }
    
    isProcessingTool = true;
    
    deductCredits(5, 'tool_open', toolName).then(() => {
        isProcessingTool = false;
        closeModal();
        window.open(toolLink, '_blank');
    }).catch((error) => {
        isProcessingTool = false;
        showToast(error.message, 'error');
    });
}

// Deduct Credits
function deductCredits(amount, action, details) {
    const userRef = db.collection('users').doc(currentUser.uid);
    
    return db.runTransaction((transaction) => {
        return transaction.get(userRef).then((doc) => {
            if (!doc.exists) {
                throw new Error('User data not found');
            }
            
            const userData = doc.data();
            const currentCredits = userData.credits || 0;
            
            if (userData.accountStatus === 'disabled') {
                throw new Error('Account is disabled');
            }
            
            if (currentCredits < amount) {
                throw new Error('Insufficient credits');
            }
            
            const newCredits = currentCredits - amount;
            
            transaction.update(userRef, {
                credits: newCredits,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            return newCredits;
        });
    }).then((newCredits) => {
        currentUserData.credits = newCredits;
        updateCreditsDisplay(newCredits);
        
        // Log transaction
        const transactionLog = {
            userId: currentUser.uid,
            userEmail: currentUser.email,
            action: action,
            details: details,
            amount: -amount,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        db.collection('transactions').add(transactionLog).catch((error) => {
            console.error("Error logging transaction:", error);
        });
        
        showToast(`${amount} credits deducted`, 'success');
        return newCredits;
    });
}

// Update Credits Display
function updateCreditsDisplay(credits) {
    const navCredits = document.getElementById('navCredits');
    if (navCredits) {
        navCredits.textContent = credits;
    }
}

// Show Insufficient Credits
function showInsufficientCredits(required) {
    const modal = document.getElementById('insufficientModal');
    const currentCreditsDisplay = document.getElementById('currentCreditsDisplay');
    const requiredCreditsDisplay = document.getElementById('requiredCreditsDisplay');
    
    if (modal) {
        if (currentCreditsDisplay) {
            currentCreditsDisplay.textContent = currentUserData ? currentUserData.credits : 0;
        }
        if (requiredCreditsDisplay) {
            requiredCreditsDisplay.textContent = required;
        }
        modal.style.display = 'flex';
    }
}

// Close Insufficient Credits Modal
function closeInsufficientModal() {
    const modal = document.getElementById('insufficientModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Go to Buy Credits
function goToBuyCredits() {
    closeInsufficientModal();
    window.location.href = 'buy-credits.html';
}

// =========================
// TOAST NOTIFICATION SYSTEM
// =========================

function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        container.id = 'toastContainer';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`);
    
    const icons = {
        'success': 'fas fa-check-circle',
        'error': 'fas fa-exclamation-circle',
        'info': 'fas fa-info-circle',
        'warning': 'fas fa-exclamation-triangle'
    };
    
    toast.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// =========================
// MOBILE MENU
// =========================

function initMobileMenu() {
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });
        
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
            });
        });
    }
}

// =========================
// CONTACT LINKS
// =========================

function initContactLinks() {
    document.querySelectorAll('[data-whatsapp]').forEach(el => {
        el.href = CONFIG.WHATSAPP_LINK;
    });
    document.querySelectorAll('[data-telegram]').forEach(el => {
        el.href = CONFIG.TELEGRAM_LINK;
    });
    document.querySelectorAll('[data-email]').forEach(el => {
        el.href = CONFIG.EMAIL_LINK;
    });
}

// =========================
// PROFILE IMAGE
// =========================

function initProfileImage() {
    const profileImg = document.getElementById('profileImage');
    if (profileImg) {
        profileImg.src = CONFIG.PROFILE_IMAGE;
    }
}

// =========================
// URL CATEGORY CHECK
// =========================

function checkUrlCategory() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        filterTools(category);
    }
}

// =========================
// RENDER TOOLS
// =========================

function renderTools(category = 'all', searchTerm = '') {
    const toolsGrid = document.getElementById('toolsGrid');
    const toolsEmpty = document.getElementById('toolsEmpty');
    
    if (!toolsGrid) return;
    
    let filteredTools = toolsData;
    
    if (category !== 'all') {
        filteredTools = filteredTools.filter(tool => tool.category === category);
    }
    
    if (searchTerm) {
        filteredTools = filteredTools.filter(tool => 
            tool.name.toLowerCase().includes(searchTerm) ||
            tool.description.toLowerCase().includes(searchTerm)
        );
    }
    
    toolsGrid.innerHTML = '';
    
    if (filteredTools.length === 0) {
        toolsGrid.style.display = 'none';
        if (toolsEmpty) {
            toolsEmpty.style.display = 'block';
        }
        return;
    }
    
    toolsGrid.style.display = 'grid';
    if (toolsEmpty) {
        toolsEmpty.style.display = 'none';
    }
    
    filteredTools.forEach((tool, index) => {
        const card = document.createElement('div');
        card.classList.add('tool-card');
        card.style.animationDelay = (index * 0.05) + 's';
        
        const isPremium = tool.type === 'premium';
        
        if (isPremium) {
            card.innerHTML = `
                <div class="tool-icon">
                    <i class="${tool.icon}"></i>
                </div>
                <span class="tool-category-badge premium-badge">⭐ PREMIUM</span>
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
                <button onclick="window.open('${CONFIG.PREMIUM_WHATSAPP}?text=${encodeURIComponent('Hello! I am interested in: ' + tool.name)}', '_blank')" class="tool-btn premium-btn">
                    Contact Admin <i class="fas fa-crown"></i>
                </button>
            `;
        } else {
            card.innerHTML = `
                <div class="tool-icon">
                    <i class="${tool.icon}"></i>
                </div>
                <span class="tool-category-badge">${getCategoryName(tool.category)}</span>
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
                <button onclick="openVisitModal('${tool.name.replace(/'/g, "\\'")}', '${tool.link}')" class="tool-btn free-btn">
                    Open Tool (5 Credits) <i class="fas fa-external-link-alt"></i>
                </button>
            `;
        }
        
        toolsGrid.appendChild(card);
    });
}

// =========================
// FILTER TOOLS
// =========================

function filterTools(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    const searchTerm = document.getElementById('toolSearchInput')?.value || '';
    renderTools(category, searchTerm);
}

// =========================
// SEARCH TOOLS
// =========================

function searchTools() {
    const searchInput = document.getElementById('toolSearchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    
    renderTools(activeCategory, searchTerm);
}

// =========================
// GET CATEGORY NAME
// =========================

function getCategoryName(category) {
    const names = {
        'ai': 'AI Tools',
        'photo': 'Photo AI',
        'video': 'Video Makers',
        'osint': 'OSINT',
        'telegram': 'Telegram Bots',
        'encoder': 'Encoders',
        'social': 'Social Media',
        'mods': 'Mod Apps',
        'hacking': 'Hacking',
        'prank': 'Prank',
        'courses': 'Courses',
        'gaming': 'Gaming',
        'fonts': 'Fonts',
        'utility': 'Utilities',
        'premium': 'Premium'
    };
    return names[category] || category;
}

// =========================
// VISIT MODAL
// =========================

function openVisitModal(toolName, toolLink) {
    const modal = document.getElementById('visitModal');
    const modalToolName = document.getElementById('modalToolName');
    const visitLink = document.getElementById('visitLink');
    
    if (modal && modalToolName && visitLink) {
        modalToolName.textContent = toolName;
        visitLink.setAttribute('href', toolLink);
        visitLink.textContent = 'Visit Tool (5 Credits)';
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('visitModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// =========================
// EVENT LISTENERS
// =========================

window.onclick = function(event) {
    const modal = document.getElementById('visitModal');
    if (event.target === modal) {
        closeModal();
    }
    
    const authModal = document.getElementById('authModal');
    if (event.target === authModal) {
        closeAuthModal();
    }
    
    const insufficientModal = document.getElementById('insufficientModal');
    if (event.target === insufficientModal) {
        closeInsufficientModal();
    }
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
        closeAuthModal();
        closeInsufficientModal();
    }
});

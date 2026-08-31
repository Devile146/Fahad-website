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
    
    // Initialize tools if on tools page
    if (document.getElementById('toolsGrid')) {
        if (typeof loadToolsFromFirestore === 'function') {
            loadToolsFromFirestore().then(() => {
                renderTools('all');
                checkUrlCategory();
            }).catch(() => {
                renderTools('all');
                checkUrlCategory();
            });
        } else {
            renderTools('all');
            checkUrlCategory();
        }
    }
});

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

// Check Toolkit Access
function checkToolkitAccess() {
    if (!currentUser) {
        openAuthModal('login');
        return;
    }
    
    if (currentUserData && currentUserData.accountStatus === 'disabled') {
        showToast('Your account is currently disabled. Please contact support.', 'error');
        return;
    }
    
    if (!currentUserData || currentUserData.credits < 20) {
        showInsufficientCredits(20);
        return;
    }
    
    deductCredits(20, 'toolkit_maker_access', 'Toolkit Maker').then(() => {
        window.location.href = 'toolkit-maker.html';
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
    
    let filteredTools = toolsData || [];
    
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
    if (event.target === authModal && typeof closeAuthModal === 'function') {
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
        if (typeof closeAuthModal === 'function') closeAuthModal();
        closeInsufficientModal();
    }
});

// =========================
// TOOLKIT MAKER - MAIN SCRIPT
// =========================

// Themes Configuration
const themes = [
    {
        id: 'hacker',
        name: 'Hacker Type',
        bg: 'linear-gradient(135deg, #0a0a0a, #001a00)',
        accent: '#00ff00',
        cardBg: 'rgba(0, 20, 0, 0.8)',
        textColor: '#00ff00',
        font: 'monospace'
    },
    {
        id: 'clean',
        name: 'Clean UI',
        bg: 'linear-gradient(135deg, #f5f5f5, #ffffff)',
        accent: '#3B82F6',
        cardBg: 'rgba(255, 255, 255, 0.9)',
        textColor: '#1a1a1a',
        font: 'Inter, sans-serif'
    },
    {
        id: 'neon',
        name: 'Neon Cyber',
        bg: 'linear-gradient(135deg, #0a0a2e, #1a0030)',
        accent: '#ff00ff',
        cardBg: 'rgba(20, 0, 40, 0.8)',
        textColor: '#00ffff',
        font: 'Orbitron, sans-serif'
    },
    {
        id: 'glass',
        name: 'Glassmorphism',
        bg: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        accent: '#6D5CFF',
        cardBg: 'rgba(255, 255, 255, 0.1)',
        textColor: '#F5F5FF',
        font: 'Inter, sans-serif'
    },
    {
        id: 'gradient',
        name: 'Modern Gradient',
        bg: 'linear-gradient(135deg, #667eea, #764ba2)',
        accent: '#ffd700',
        cardBg: 'rgba(255, 255, 255, 0.15)',
        textColor: '#ffffff',
        font: 'Inter, sans-serif'
    },
    {
        id: 'dark',
        name: 'Dark Premium',
        bg: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)',
        accent: '#ffd700',
        cardBg: 'rgba(30, 30, 30, 0.9)',
        textColor: '#ffffff',
        font: 'Inter, sans-serif'
    },
    {
        id: 'minimal',
        name: 'Minimal White',
        bg: '#ffffff',
        accent: '#333333',
        cardBg: '#f8f8f8',
        textColor: '#333333',
        font: 'Inter, sans-serif'
    },
    {
        id: 'futuristic',
        name: 'Futuristic Blue',
        bg: 'linear-gradient(135deg, #0a0a2e, #003366)',
        accent: '#00d4ff',
        cardBg: 'rgba(0, 40, 80, 0.8)',
        textColor: '#00d4ff',
        font: 'Orbitron, sans-serif'
    },
    {
        id: 'purple',
        name: 'Purple Galaxy',
        bg: 'linear-gradient(135deg, #1a0030, #0a0a2e)',
        accent: '#9b59b6',
        cardBg: 'rgba(30, 0, 50, 0.8)',
        textColor: '#d4a5ff',
        font: 'Inter, sans-serif'
    },
    {
        id: 'rgb',
        name: 'RGB Tech',
        bg: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)',
        accent: '#ffffff',
        cardBg: 'rgba(0, 0, 0, 0.7)',
        textColor: '#ffffff',
        font: 'Orbitron, sans-serif'
    },
    {
        id: 'elegant',
        name: 'Elegant Professional',
        bg: 'linear-gradient(135deg, #2c3e50, #3498db)',
        accent: '#ecf0f1',
        cardBg: 'rgba(255, 255, 255, 0.12)',
        textColor: '#ecf0f1',
        font: 'Georgia, serif'
    },
    {
        id: 'colorful',
        name: 'Colorful Modern',
        bg: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1)',
        accent: '#ffffff',
        cardBg: 'rgba(255, 255, 255, 0.2)',
        textColor: '#ffffff',
        font: 'Inter, sans-serif'
    },
    {
        id: 'midnight',
        name: 'Midnight Tech',
        bg: 'linear-gradient(135deg, #0a0a1a, #1a1a3a)',
        accent: '#4169e1',
        cardBg: 'rgba(10, 10, 30, 0.8)',
        textColor: '#87ceeb',
        font: 'Inter, sans-serif'
    },
    {
        id: 'aurora',
        name: 'Aurora',
        bg: 'linear-gradient(135deg, #00b4db, #0083b0, #00b4db)',
        accent: '#ffd700',
        cardBg: 'rgba(0, 60, 80, 0.7)',
        textColor: '#ffffff',
        font: 'Inter, sans-serif'
    },
    {
        id: 'dashboard',
        name: 'Advanced Dashboard',
        bg: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        accent: '#6D5CFF',
        cardBg: 'rgba(255, 255, 255, 0.08)',
        textColor: '#F5F5FF',
        font: 'Inter, sans-serif'
    }
];

// State
let products = [];
let selectedTheme = 'glass';
let profileImageData = null;
let editingProductIndex = -1;
let isGenerating = false;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderThemes();
    initMobileMenu();
});

// =========================
// AUTHENTICATION CHECK
// =========================

function checkToolkitMakerAccess() {
    const loadingOverlay = document.getElementById('toolkitLoadingOverlay');
    const mainContent = document.getElementById('toolkitMainContent');
    const protectedAccess = document.getElementById('protectedAccess');
    const loadingText = document.getElementById('loadingText');
    
    if (!currentUser) {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        if (mainContent) mainContent.style.display = 'none';
        if (protectedAccess) protectedAccess.style.display = 'flex';
        return;
    }
    
    // Check account status
    if (currentUserData && currentUserData.accountStatus === 'disabled') {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        if (mainContent) mainContent.style.display = 'none';
        if (protectedAccess) {
            protectedAccess.innerHTML = `
                <div class="protected-box">
                    <div class="protected-icon">
                        <i class="fas fa-ban"></i>
                    </div>
                    <h2>Account Disabled</h2>
                    <p>Your account is currently disabled. Please contact support.</p>
                </div>
            `;
            protectedAccess.style.display = 'flex';
        }
        return;
    }
    
    // Check credits
    if (!currentUserData || currentUserData.credits < 20) {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        if (mainContent) mainContent.style.display = 'none';
        if (protectedAccess) protectedAccess.style.display = 'none';
        
        showInsufficientCredits(20);
        return;
    }
    
    // Deduct 20 credits for access
    if (loadingText) loadingText.textContent = 'Deducting 20 credits...';
    
    deductCreditsForToolkit().then(() => {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        if (mainContent) mainContent.style.display = 'block';
        if (protectedAccess) protectedAccess.style.display = 'none';
        showToast('20 credits deducted for Toolkit Maker access', 'success');
    }).catch((error) => {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        if (mainContent) mainContent.style.display = 'none';
        if (protectedAccess) protectedAccess.style.display = 'none';
        showToast(error.message, 'error');
    });
}

function deductCreditsForToolkit() {
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
            
            if (currentCredits < 20) {
                throw new Error('Insufficient credits');
            }
            
            const newCredits = currentCredits - 20;
            
            transaction.update(userRef, {
                credits: newCredits,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            // Log transaction
            const transactionLog = {
                userId: currentUser.uid,
                action: 'toolkit_maker_access',
                details: 'Toolkit Maker access',
                amount: -20,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            db.collection('transactions').add(transactionLog);
            
            return newCredits;
        });
    }).then((newCredits) => {
        if (currentUserData) {
            currentUserData.credits = newCredits;
        }
        const navCredits = document.getElementById('navCredits');
        if (navCredits) {
            navCredits.textContent = newCredits;
        }
        return newCredits;
    });
}

function showProtectedAccess() {
    const loadingOverlay = document.getElementById('toolkitLoadingOverlay');
    const mainContent = document.getElementById('toolkitMainContent');
    const protectedAccess = document.getElementById('protectedAccess');
    
    if (loadingOverlay) loadingOverlay.style.display = 'none';
    if (mainContent) mainContent.style.display = 'none';
    if (protectedAccess) protectedAccess.style.display = 'flex';
}

// =========================
// RENDER THEMES
// =========================

function renderThemes() {
    const themesGrid = document.getElementById('themesGrid');
    
    if (!themesGrid) return;
    
    themesGrid.innerHTML = themes.map(theme => `
        <div class="theme-card ${theme.id === selectedTheme ? 'selected' : ''}" 
             onclick="selectTheme('${theme.id}')">
            <div class="theme-preview-box" style="background: ${theme.bg}; border: 2px solid ${theme.accent};"></div>
            <h4 style="color: ${theme.textColor};">${theme.name}</h4>
            <div class="theme-check"><i class="fas fa-check-circle"></i></div>
        </div>
    `).join('');
}

// Select Theme
function selectTheme(themeId) {
    selectedTheme = themeId;
    renderThemes();
    showToast('Theme selected: ' + themeId, 'info');
}

// Handle Image Upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImageData = e.target.result;
            showProfilePreview(profileImageData);
        };
        reader.readAsDataURL(file);
    }
}

// Preview Image URL
function previewImageUrl() {
    const url = document.getElementById('profileImageUrl').value;
    if (url) {
        profileImageData = url;
        showProfilePreview(url);
    }
}

// Show Profile Preview
function showProfilePreview(src) {
    const preview = document.getElementById('profilePreview');
    const img = document.getElementById('profilePreviewImg');
    if (preview && img) {
        img.src = src;
        preview.style.display = 'block';
    }
}

// Show Product Form
function showProductForm() {
    document.getElementById('productForm').style.display = 'flex';
    document.getElementById('productName').focus();
    editingProductIndex = -1;
    document.getElementById('productName').value = '';
    document.getElementById('productLink').value = '';
    document.getElementById('productAbout').value = '';
    document.getElementById('productType').value = 'free';
}

// Hide Product Form
function hideProductForm() {
    document.getElementById('productForm').style.display = 'none';
}

// Save Product
function saveProduct() {
    const name = document.getElementById('productName').value.trim();
    const link = document.getElementById('productLink').value.trim();
    const about = document.getElementById('productAbout').value.trim();
    const type = document.getElementById('productType').value;
    
    if (!name) {
        showToast('Please enter product name', 'error');
        return;
    }
    if (!link) {
        showToast('Please enter product link', 'error');
        return;
    }
    
    if (editingProductIndex >= 0) {
        products[editingProductIndex] = { name, link, about, type };
        showToast('Product updated successfully', 'success');
    } else {
        products.push({ name, link, about, type });
        showToast('Product added successfully', 'success');
    }
    
    hideProductForm();
    renderProducts();
}

// Render Products
function renderProducts() {
    const productsList = document.getElementById('productsList');
    
    if (!productsList) return;
    
    if (products.length === 0) {
        productsList.innerHTML = '<p style="color: #B8B8C8; font-size: 13px; text-align: center;">No products added yet.</p>';
        return;
    }
    
    productsList.innerHTML = products.map((product, index) => `
        <div class="product-item">
            <div class="product-item-info">
                <span class="product-item-name">${product.name}</span>
                <span class="product-item-type ${product.type}">${product.type}</span>
            </div>
            <div class="product-item-actions">
                <button class="product-action-btn edit-action" onclick="editProduct(${index})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="product-action-btn delete-action" onclick="deleteProduct(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Edit Product
function editProduct(index) {
    const product = products[index];
    editingProductIndex = index;
    document.getElementById('productName').value = product.name;
    document.getElementById('productLink').value = product.link;
    document.getElementById('productAbout').value = product.about;
    document.getElementById('productType').value = product.type;
    document.getElementById('productForm').style.display = 'flex';
    document.getElementById('productForm').scrollIntoView({ behavior: 'smooth' });
}

// Delete Product
function deleteProduct(index) {
    if (confirm('Delete this product?')) {
        products.splice(index, 1);
        renderProducts();
        showToast('Product deleted', 'info');
    }
}

// Generate Toolkit
function generateToolkit() {
    if (isGenerating) return;
    
    const toolkitName = document.getElementById('toolkitName').value.trim();
    
    if (!toolkitName) {
        showToast('Please enter toolkit name', 'error');
        return;
    }
    
    isGenerating = true;
    
    // Show generation progress
    const progressDiv = document.getElementById('generationProgress');
    progressDiv.style.display = 'block';
    
    const steps = [
        'Preparing your toolkit...',
        'Creating your selected theme...',
        'Adding your products...',
        'Setting up contact information...',
        'Optimizing your website...',
        'Finalizing your toolkit...'
    ];
    
    const progressSteps = document.getElementById('progressSteps');
    progressSteps.innerHTML = steps.map(step => `
        <div class="progress-step">
            <i class="fas fa-spinner fa-spin"></i>
            <span>${step}</span>
        </div>
    `).join('');
    
    // Simulate progress
    let stepIndex = 0;
    const interval = setInterval(() => {
        const steps = progressSteps.querySelectorAll('.progress-step');
        if (stepIndex > 0) {
            steps[stepIndex - 1].classList.remove('active');
            steps[stepIndex - 1].classList.add('complete');
            steps[stepIndex - 1].querySelector('i').className = 'fas fa-check-circle';
        }
        if (stepIndex < steps.length) {
            steps[stepIndex].classList.add('active');
            stepIndex++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                const code = buildToolkitCode();
                showGeneratedCode(code);
                isGenerating = false;
                showToast('Toolkit generated successfully!', 'success');
            }, 500);
        }
    }, 800);
}

// Build Toolkit Code
function buildToolkitCode() {
    const toolkitName = document.getElementById('toolkitName').value.trim();
    const toolkitAbout = document.getElementById('toolkitAbout').value.trim();
    const whatsapp = document.getElementById('whatsappNumber').value.trim();
    const telegram = document.getElementById('telegramUsername').value.trim();
    const youtube = document.getElementById('youtubeLink').value.trim();
    const popupEnabled = document.getElementById('popupToggle').checked;
    
    const theme = themes.find(t => t.id === selectedTheme) || themes[3];
    const profileImg = profileImageData || 'https://via.placeholder.com/150';
    
    // Build products HTML
    const productsHTML = products.map((product, index) => {
        const isFree = product.type === 'free';
        const buttonAction = isFree 
            ? `window.open('${product.link}', '_blank')` 
            : `window.open('https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello! I am interested in purchasing: ' + product.name)}', '_blank')`;
        
        return `
        <div class="tool-card" style="background: ${theme.cardBg}; border: 1px solid ${theme.accent}40; border-radius: 16px; padding: 25px; transition: all 0.3s ease;">
            <span class="badge" style="background: ${isFree ? 'rgba(74,222,128,0.15)' : 'rgba(255,215,0,0.15)'}; color: ${isFree ? '#4ade80' : '#ffd700'}; padding: 4px 12px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase;">${isFree ? 'FREE' : 'PREMIUM'}</span>
            <h3 style="color: ${theme.textColor}; font-size: 18px; font-weight: 700; margin: 12px 0 8px;">${product.name}</h3>
            <p style="color: ${theme.textColor}99; font-size: 13px; margin-bottom: 20px;">${product.about || 'No description available'}</p>
            <button onclick="${buttonAction}" style="background: ${isFree ? theme.accent : '#ffd700'}; color: ${isFree ? '#000000' : '#000000'}; border: none; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">${isFree ? 'Visit Tool' : 'Purchase Now'}</button>
        </div>`;
    }).join('');
    
    // Build contact HTML
    const contactButtons = [];
    if (whatsapp) {
        const cleanNumber = whatsapp.replace(/[^0-9]/g, '');
        contactButtons.push(`<a href="https://wa.me/${cleanNumber}" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;width:50px;height:50px;border-radius:50%;background:rgba(74,222,128,0.15);color:#4ade80;font-size:22px;text-decoration:none;transition:all 0.3s ease;"><i class="fab fa-whatsapp"></i></a>`);
    }
    if (telegram) {
        const cleanTelegram = telegram.replace('@', '');
        contactButtons.push(`<a href="https://t.me/${cleanTelegram}" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;width:50px;height:50px;border-radius:50%;background:rgba(59,130,246,0.15);color:#3B82F6;font-size:22px;text-decoration:none;transition:all 0.3s ease;"><i class="fab fa-telegram"></i></a>`);
    }
    if (youtube) {
        contactButtons.push(`<a href="${youtube}" target="_blank" style="display:inline-flex;align-items:center;justify-content:center;width:50px;height:50px;border-radius:50%;background:rgba(255,77,145,0.15);color:#FF4D91;font-size:22px;text-decoration:none;transition:all 0.3s ease;"><i class="fab fa-youtube"></i></a>`);
    }
    
    const contactHTML = contactButtons.length > 0 ? `
    <div class="contact-section" style="text-align:center;margin-top:40px;">
        <h3 style="color: ${theme.textColor}; font-size:20px; margin-bottom:20px;">Get In Touch</h3>
        <div style="display:flex;gap:15px;justify-content:center;flex-wrap:wrap;">${contactButtons.join('')}</div>
    </div>` : '';
    
    // Popup HTML
    const popupHTML = popupEnabled && contactButtons.length > 0 ? `
    <div id="welcomePopup" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:${theme.cardBg};backdrop-filter:blur(20px);border:1px solid ${theme.accent}40;border-radius:20px;padding:30px;text-align:center;z-index:1000;box-shadow:0 25px 50px rgba(0,0,0,0.3);">
        <h3 style="color:${theme.textColor};margin-bottom:10px;">Welcome to ${toolkitName}! 🎉</h3>
        <p style="color:${theme.textColor}99;margin-bottom:20px;">Join us and stay connected!</p>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:20px;">${contactButtons.join('')}</div>
        <button onclick="document.getElementById('welcomePopup').style.display='none'" style="background:${theme.accent};color:#000;border:none;padding:10px 24px;border-radius:8px;font-weight:600;cursor:pointer;">Cancel</button>
    </div>` : '';
    
    // Full generated code
    const fullCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${toolkitName}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: '${theme.font}';
            background: ${theme.bg};
            color: ${theme.textColor};
            min-height: 100vh;
            overflow-x: hidden;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            padding: 40px 20px;
        }
        .profile-img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid ${theme.accent};
            box-shadow: 0 0 30px ${theme.accent}40;
            animation: pulse 3s ease-in-out infinite;
            margin-bottom: 20px;
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        h1 {
            font-size: 2.5rem;
            font-weight: 900;
            margin-bottom: 10px;
        }
        .about-text {
            font-size: 1rem;
            opacity: 0.8;
            max-width: 600px;
            margin: 0 auto;
        }
        .tools-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-top: 40px;
        }
        .tool-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }
        footer {
            text-align: center;
            padding: 30px;
            margin-top: 40px;
            border-top: 1px solid ${theme.accent}20;
            font-size: 0.9rem;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    ${popupHTML}
    <div class="container">
        <div class="header">
            <img src="${profileImg}" alt="Profile" class="profile-img" onerror="this.src='https://via.placeholder.com/150'">
            <h1>${toolkitName}</h1>
            ${toolkitAbout ? `<p class="about-text">${toolkitAbout}</p>` : ''}
        </div>
        <div class="tools-grid">
            ${productsHTML}
        </div>
        ${contactHTML}
        <footer>
            © 2026 ${toolkitName}. All Rights Reserved.
        </footer>
    </div>
</body>
// TOOLKIT MAKER ACCESS CHECK
let currentUser = null;
let currentUserData = null;

auth.onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
        db.collection('users').doc(user.uid).get().then((doc) => {
            if (doc.exists) {
                currentUserData = doc.data();
                checkToolkitAccess();
            }
        });
    } else {
        showLoginRequired();
    }
});

function checkToolkitAccess() {
    const loadingOverlay = document.getElementById('toolkitLoadingOverlay');
    const mainContent = document.getElementById('toolkitMainContent');
    const protectedAccess = document.getElementById('protectedAccess');
    
    if (!currentUserData) {
        showLoginRequired();
        return;
    }
    
    if (currentUserData.accountStatus === 'disabled') {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        if (mainContent) mainContent.style.display = 'none';
        showToast('Account disabled', 'error');
        return;
    }
    
    if (currentUserData.credits < 20) {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        if (mainContent) mainContent.style.display = 'none';
        showInsufficientCredits(20);
        return;
    }
    
    // Deduct 20 credits
    const userRef = db.collection('users').doc(currentUser.uid);
    
    db.runTransaction((transaction) => {
        return transaction.get(userRef).then((doc) => {
            if (!doc.exists) throw new Error('User not found');
            const data = doc.data();
            if ((data.credits || 0) < 20) throw new Error('Insufficient credits');
            const newCredits = (data.credits || 0) - 20;
            transaction.update(userRef, { credits: newCredits });
            return newCredits;
        });
    }).then((newCredits) => {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        if (mainContent) mainContent.style.display = 'block';
        if (protectedAccess) protectedAccess.style.display = 'none';
        document.getElementById('navCredits').textContent = newCredits;
        showToast('20 credits deducted!', 'success');
    }).catch((error) => {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        showToast(error.message, 'error');
    });
}

function showLoginRequired() {
    const loadingOverlay = document.getElementById('toolkitLoadingOverlay');
    const mainContent = document.getElementById('toolkitMainContent');
    const protectedAccess = document.getElementById('protectedAccess');
    
    if (loadingOverlay) loadingOverlay.style.display = 'none';
    if (mainContent) mainContent.style.display = 'none';
    if (protectedAccess) protectedAccess.style.display = 'flex';
}
</html>`;
    
    return fullCode;
}

// Show Generated Code
function showGeneratedCode(code) {
    document.getElementById('generationProgress').style.display = 'none';
    document.getElementById('generatedOutput').style.display = 'block';
    document.getElementById('generatedCode').value = code;
    document.getElementById('generatedOutput').scrollIntoView({ behavior: 'smooth' });
}

// Run Toolkit
function runToolkit() {
    const code = document.getElementById('generatedCode').value;
    const previewModal = document.getElementById('previewModal');
    const previewFrame = document.getElementById('previewFrame');
    
    previewModal.style.display = 'flex';
    previewFrame.srcdoc = code;
}

// Close Preview
function closePreview() {
    document.getElementById('previewModal').style.display = 'none';
}

// Copy Code
function copyCode() {
    const codeBox = document.getElementById('generatedCode');
    codeBox.select();
    codeBox.setSelectionRange(0, 99999);
    
    navigator.clipboard.writeText(codeBox.value).then(() => {
        showToast('Code copied successfully!', 'success');
    }).catch(() => {
        document.execCommand('copy');
        showToast('Code copied successfully!', 'success');
    });
}

// Download Code
function downloadCode() {
    const code = document.getElementById('generatedCode').value;
    const toolkitName = document.getElementById('toolkitName').value.trim() || 'toolkit';
    const filename = toolkitName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '.html';
    
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Toolkit downloaded successfully!', 'success');
            }

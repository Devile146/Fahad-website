// =========================
// BUY CREDITS - PAYMENT SYSTEM
// =========================

let currentUser = null;
let currentUserData = null;
let selectedPackage = { credits: 0, price: 0, label: '' };
let selectedPaymentMethod = 'easypaisa';
let paymentScreenshotFile = null;

const PAYMENT_ACCOUNT = {
    name: 'FATMIA TUL ZAHRA',
    number: '03251138959'
};

// Auth state listener
auth.onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
        loadUserData(user);
        showPricing();
    } else {
        currentUser = null;
        currentUserData = null;
        showLoginRequired();
        showGuestState();
    }
});

function loadUserData(user) {
    db.collection('users').doc(user.uid).get().then((doc) => {
        if (doc.exists) {
            currentUserData = doc.data();
            updateUserUI(user, currentUserData);
        }
    }).catch((error) => {
        console.error("Error loading user:", error);
    });
}

function showPricing() {
    document.getElementById('loginRequired').style.display = 'none';
    document.getElementById('pricingContent').style.display = 'block';
}

function showLoginRequired() {
    document.getElementById('loginRequired').style.display = 'flex';
    document.getElementById('pricingContent').style.display = 'none';
}

// Select package
function selectPackage(credits, price, label) {
    if (!currentUser) {
        openAuthModal('login');
        return;
    }
    
    selectedPackage = { credits, price, label };
    document.getElementById('selectedPackageText').textContent = `${credits} Credits - Rs. ${price} (${label})`;
    openPaymentModal();
}

// Open payment modal
function openPaymentModal() {
    document.getElementById('paymentModal').style.display = 'flex';
}

// Close payment modal
function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

// Select payment method
function selectPaymentMethod(method, element) {
    selectedPaymentMethod = method;
    document.querySelectorAll('.payment-option').forEach(opt => {
        opt.classList.remove('active');
    });
    element.classList.add('active');
}

// Preview screenshot
function previewScreenshot(event) {
    const file = event.target.files[0];
    if (file) {
        paymentScreenshotFile = file;
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('screenshotPreview').style.display = 'block';
            document.getElementById('screenshotImg').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Submit payment request
function submitPaymentRequest() {
    if (!currentUser) {
        showToast('Please login first', 'error');
        return;
    }
    
    const payerName = document.getElementById('payerName').value.trim();
    const payerPhone = document.getElementById('payerPhone').value.trim();
    const transactionId = document.getElementById('transactionId').value.trim();
    const submitBtn = document.getElementById('submitPaymentBtn');
    
    if (!payerName || !payerPhone || !transactionId) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (selectedPackage.credits === 0) {
        showToast('Please select a package', 'error');
        return;
    }
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    
    // Upload screenshot if exists
    if (paymentScreenshotFile) {
        const storageRef = storage.ref('payment-screenshots/' + currentUser.uid + '/' + Date.now() + '.jpg');
        storageRef.put(paymentScreenshotFile).then((snapshot) => {
            return snapshot.ref.getDownloadURL();
        }).then((downloadURL) => {
            savePaymentRequest(downloadURL, submitBtn);
        }).catch((error) => {
            console.error("Error uploading screenshot:", error);
            savePaymentRequest(null, submitBtn);
        });
    } else {
        savePaymentRequest(null, submitBtn);
    }
}

function savePaymentRequest(screenshotURL, submitBtn) {
    const payerName = document.getElementById('payerName').value.trim();
    const payerPhone = document.getElementById('payerPhone').value.trim();
    const transactionId = document.getElementById('transactionId').value.trim();
    
    const requestData = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        userName: currentUserData ? currentUserData.displayName : payerName,
        packageCredits: selectedPackage.credits,
        packagePrice: selectedPackage.price,
        packageLabel: selectedPackage.label,
        paymentMethod: selectedPaymentMethod,
        paymentAccountName: PAYMENT_ACCOUNT.name,
        paymentAccountNumber: PAYMENT_ACCOUNT.number,
        payerName: payerName,
        payerPhone: payerPhone,
        transactionId: transactionId,
        paymentScreenshotURL: screenshotURL,
        status: 'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    db.collection('purchaseRequests').add(requestData).then(() => {
        showToast('Payment request submitted successfully!', 'success');
        closePaymentModal();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Payment Request';
        
        // Clear form
        document.getElementById('payerName').value = '';
        document.getElementById('payerPhone').value = '';
        document.getElementById('transactionId').value = '';
        document.getElementById('paymentScreenshot').value = '';
        document.getElementById('screenshotPreview').style.display = 'none';
        paymentScreenshotFile = null;
        
        setTimeout(() => {
            showToast('Your request is pending. Credits will be added after approval.', 'info');
        }, 1500);
    }).catch((error) => {
        showToast('Error: ' + error.message, 'error');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Payment Request';
    });
}

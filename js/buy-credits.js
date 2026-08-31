// =========================
// BUY CREDITS - PAYMENT SYSTEM
// =========================

let selectedPackage = {
    credits: 0,
    price: 0
};

let currentUser = null;
let currentUserData = null;

// Payment details
const paymentDetails = {
    easypaisa: {
        name: 'FAHAD ALI',
        number: '03251138960',
        instructions: 'Send payment to the EasyPaisa number below and enter the transaction ID.'
    },
    jazzcash: {
        name: 'FAHAD ALI',
        number: '03251138960',
        instructions: 'Send payment to the JazzCash number below and enter the transaction ID.'
    },
    bank: {
        name: 'FAHAD ALI',
        accountNumber: 'PK00XXXX0000000000000',
        bankName: 'Bank Name',
        instructions: 'Transfer payment to the bank account below and enter the reference number.'
    }
};

// Auth state listener
auth.onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
        loadUserData(user);
        showPricingContent();
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
        console.error("Error loading user data:", error);
    });
}

function showPricingContent() {
    document.getElementById('loginRequired').style.display = 'none';
    document.getElementById('pricingContent').style.display = 'block';
}

function showLoginRequired() {
    document.getElementById('loginRequired').style.display = 'flex';
    document.getElementById('pricingContent').style.display = 'none';
}

// Select package
function selectPackage(credits, price) {
    if (!currentUser) {
        openAuthModal('login');
        return;
    }
    
    selectedPackage.credits = credits;
    selectedPackage.price = price;
    
    document.getElementById('selectedPackageText').textContent = 
        `${credits} Credits - Rs. ${price}`;
    
    openPaymentModal();
}

// Open payment modal
function openPaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'flex';
    updatePaymentInstructions('easypaisa');
}

// Close payment modal
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'none';
}

// Update payment instructions based on method
document.addEventListener('change', function(e) {
    if (e.target.name === 'paymentMethod') {
        updatePaymentInstructions(e.target.value);
    }
});

function updatePaymentInstructions(method) {
    const instructionsDiv = document.getElementById('paymentInstructions');
    const details = paymentDetails[method];
    
    if (method === 'easypaisa' || method === 'jazzcash') {
        instructionsDiv.innerHTML = `
            <strong>${method === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'} Payment Details:</strong>
            <p>Name: ${details.name}</p>
            <p>Number: ${details.number}</p>
            <p>Amount: Rs. ${selectedPackage.price}</p>
            <p style="margin-top: 5px;">${details.instructions}</p>
        `;
    } else {
        instructionsDiv.innerHTML = `
            <strong>Bank Transfer Details:</strong>
            <p>Account Name: ${details.name}</p>
            <p>Account Number: ${details.accountNumber}</p>
            <p>Bank: ${details.bankName}</p>
            <p>Amount: Rs. ${selectedPackage.price}</p>
            <p style="margin-top: 5px;">${details.instructions}</p>
        `;
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
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const submitBtn = document.getElementById('submitPaymentBtn');
    
    if (!payerName || !payerPhone || !transactionId) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (selectedPackage.credits === 0 || selectedPackage.price === 0) {
        showToast('Please select a package', 'error');
        return;
    }
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    
    const requestData = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        userName: currentUser.displayName || payerName,
        packageCredits: selectedPackage.credits,
        packagePrice: selectedPackage.price,
        paymentMethod: paymentMethod,
        payerName: payerName,
        payerPhone: payerPhone,
        transactionId: transactionId,
        status: 'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    db.collection('purchaseRequests').add(requestData).then((docRef) => {
        showToast('Payment request submitted successfully!', 'success');
        closePaymentModal();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Payment Request';
        
        // Clear form
        document.getElementById('payerName').value = '';
        document.getElementById('payerPhone').value = '';
        document.getElementById('transactionId').value = '';
        
        // Show pending status
        setTimeout(() => {
            showToast('Your request is pending. Credits will be added after approval.', 'info');
        }, 1500);
    }).catch((error) => {
        showToast('Error submitting request: ' + error.message, 'error');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Payment Request';
    });
}

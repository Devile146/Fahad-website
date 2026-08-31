// =========================
// FAHAD TECH - CREDIT SYSTEM
// =========================

// Check if user has enough credits
function checkCredits(requiredCredits) {
    return new Promise((resolve, reject) => {
        if (!currentUser) {
            reject(new Error('Please login first'));
            return;
        }
        
        if (!currentUserData) {
            reject(new Error('User data not loaded'));
            return;
        }
        
        if (currentUserData.accountStatus === 'disabled') {
            reject(new Error('Your account is currently disabled. Please contact support.'));
            return;
        }
        
        if (currentUserData.credits < requiredCredits) {
            reject(new Error('Insufficient credits'));
            return;
        }
        
        resolve(currentUserData.credits);
    });
}

// Deduct credits using Firestore transaction
function deductCredits(amount, action, details) {
    return new Promise((resolve, reject) => {
        if (!currentUser) {
            reject(new Error('Please login first'));
            return;
        }
        
        const userRef = db.collection('users').doc(currentUser.uid);
        
        db.runTransaction((transaction) => {
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
            // Update local data
            if (currentUserData) {
                currentUserData.credits = newCredits;
            }
            
            // Update UI
            updateCreditsDisplay(newCredits);
            
            // Log transaction
            logTransaction(action, details, -amount);
            
            resolve(newCredits);
        }).catch((error) => {
            reject(error);
        });
    });
}

// Add credits (for admin use)
function addCredits(amount, action, details) {
    return new Promise((resolve, reject) => {
        if (!currentUser) {
            reject(new Error('Please login first'));
            return;
        }
        
        const userRef = db.collection('users').doc(currentUser.uid);
        
        db.runTransaction((transaction) => {
            return transaction.get(userRef).then((doc) => {
                if (!doc.exists) {
                    throw new Error('User data not found');
                }
                
                const userData = doc.data();
                const currentCredits = userData.credits || 0;
                const newCredits = currentCredits + amount;
                
                transaction.update(userRef, {
                    credits: newCredits,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                
                return newCredits;
            });
        }).then((newCredits) => {
            if (currentUserData) {
                currentUserData.credits = newCredits;
            }
            
            updateCreditsDisplay(newCredits);
            logTransaction(action, details, amount);
            
            resolve(newCredits);
        }).catch((error) => {
            reject(error);
        });
    });
}

// Log transaction
function logTransaction(action, details, amount) {
    const transactionData = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        action: action,
        details: details || '',
        amount: amount,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    db.collection('transactions').add(transactionData).catch((error) => {
        console.error("Error logging transaction:", error);
    });
}

// Update credits display
function updateCreditsDisplay(credits) {
    const navCredits = document.getElementById('navCredits');
    if (navCredits) {
        navCredits.textContent = credits;
    }
    
    const accountCredits = document.getElementById('accountCredits');
    if (accountCredits) {
        accountCredits.textContent = credits;
    }
}

// Show insufficient credits modal
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

// Close insufficient credits modal
function closeInsufficientModal() {
    const modal = document.getElementById('insufficientModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Go to buy credits
function goToBuyCredits() {
    closeInsufficientModal();
    window.location.href = 'buy-credits.html';
}

// Check tool access
function checkToolAccess(toolName, toolLink) {
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
    
    // Deduct credits and open tool
    deductCredits(5, 'tool_open', toolName).then(() => {
        window.open(toolLink, '_blank');
    }).catch((error) => {
        showToast(error.message, 'error');
    });
}

// Check toolkit maker access
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
    
    // Deduct credits and go to toolkit maker
    deductCredits(20, 'toolkit_maker_access', 'Toolkit Maker access').then(() => {
        window.location.href = 'toolkit-maker.html';
    }).catch((error) => {
        showToast(error.message, 'error');
    });
}
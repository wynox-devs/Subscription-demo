// Subscription Plans Configuration
const plans = {
    Free: { price: 0, storage: '5 GB', features: ['Basic Support', '1 Project'] },
    Basic: { price: 9, storage: '100 GB', features: ['Email Support', '10 Projects', 'Basic Analytics'] },
    Advanced: { price: 29, storage: '500 GB', features: ['Priority Support', '50 Projects', 'Advanced Analytics', 'Team Collaboration'] },
    Pro: { price: 59, storage: '2 TB', features: ['24/7 Phone Support', 'Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'Custom Domain'] },
    Max: { price: 99, storage: '5 TB', features: ['Dedicated Support', 'Unlimited Projects', 'Enterprise Analytics', 'Custom Domain'] },
    Ultra: { price: 199, storage: '10 TB', features: ['Dedicated Account Manager', 'Unlimited Projects', 'Custom Analytics', '24/7 Priority Support', 'Multiple Custom Domains'] }
};

// Get username input element
const usernameInput = document.getElementById('usernameInput');
const usernameError = document.getElementById('usernameError');

// Validate username
function validateUsername(username) {
    if (!username || username.trim().length === 0) {
        showError('Username is required');
        return false;
    }
    
    if (username.trim().length < 3) {
        showError('Username must be at least 3 characters');
        return false;
    }
    
    if (username.trim().length > 50) {
        showError('Username cannot exceed 50 characters');
        return false;
    }
    
    // Allow alphanumeric, underscore, and hyphen
    const validUsernamePattern = /^[a-zA-Z0-9_-]+$/;
    if (!validUsernamePattern.test(username.trim())) {
        showError('Username can only contain letters, numbers, underscore, and hyphen');
        return false;
    }
    
    hideError();
    return true;
}

// Show error message
function showError(message) {
    usernameError.textContent = message;
    usernameError.classList.add('show');
    usernameInput.focus();
}

// Hide error message
function hideError() {
    usernameError.textContent = '';
    usernameError.classList.remove('show');
}

// Handle subscription
function handleSubscribe(planName) {
    const username = usernameInput.value;
    
    // Validate username
    if (!validateUsername(username)) {
        return;
    }
    
    // Get plan details
    const plan = plans[planName];
    
    // Create subscription data
    const subscriptionData = {
        username: username.trim(),
        plan: planName,
        price: plan.price,
        storage: plan.storage,
        timestamp: new Date().toLocaleString(),
        subscriptionId: generateSubscriptionId()
    };
    
    // Save to localStorage
    saveSubscription(subscriptionData);
    
    // Show success modal
    showSuccessModal(subscriptionData);
    
    // Log subscription (in production, send to backend)
    console.log('Subscription created:', subscriptionData);
}

// Generate unique subscription ID
function generateSubscriptionId() {
    return 'SUB-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Save subscription to localStorage
function saveSubscription(data) {
    let subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
    subscriptions.push(data);
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
}

// Show success modal
function showSuccessModal(subscriptionData) {
    const modal = document.getElementById('successModal');
    const confirmationMessage = document.getElementById('confirmationMessage');
    
    const message = `
        <strong>${subscriptionData.username}</strong> has successfully subscribed to the <strong>${subscriptionData.plan}</strong> plan!<br><br>
        <strong>Plan Details:</strong><br>
        Price: $${subscriptionData.price}/month<br>
        Storage: ${subscriptionData.storage}<br>
        Subscription ID: ${subscriptionData.subscriptionId}<br>
        Date: ${subscriptionData.timestamp}
    `;
    
    confirmationMessage.innerHTML = message;
    modal.classList.add('show');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
    
    // Clear username input
    usernameInput.value = '';
    usernameInput.focus();
    hideError();
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Allow Enter key to close modal
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('successModal');
    if (event.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// Focus username input on page load
window.addEventListener('load', function() {
    usernameInput.focus();
});

// Clear error on input
usernameInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        hideError();
    }
});

// Example: Load and display existing subscriptions
function displaySubscriptions() {
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
    console.log('Existing subscriptions:', subscriptions);
    return subscriptions;
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateUsername,
        generateSubscriptionId,
        displaySubscriptions,
        plans
    };
}

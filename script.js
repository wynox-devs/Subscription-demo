// Subscription Plans Configuration
const plans = {
    Free: { price: 0, storage: '5 GB', features: ['5 GB Storage', 'Basic Support', '1 Project'] },
    Student: { price: 19, storage: '500 GB', features: ['500 GB Storage', 'Email Support', '10 Projects', 'Basic Analytics'] },
    Family: { price: 39, storage: '1 TB', features: ['1 TB Shared Storage', 'Priority Email Support', '25 Projects', 'Advanced Analytics', 'Team Collaboration'] },
    Pro: { price: 59, storage: '2 TB', features: ['2 TB Storage', '24/7 Phone Support', 'Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'Custom Domain'] }
};

// Get input elements
const usernameInput = document.getElementById('usernameInput');
const emailInput = document.getElementById('emailInput');
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');

// Validate username
function validateUsername(username) {
    if (!username || username.trim().length === 0) {
        showUsernameError('Username is required');
        return false;
    }
    if (username.trim().length < 3) {
        showUsernameError('Username must be at least 3 characters');
        return false;
    }
    if (username.trim().length > 50) {
        showUsernameError('Username cannot exceed 50 characters');
        return false;
    }
    // Allow alphanumeric, underscore, and hyphen
    const validUsernamePattern = /^[a-zA-Z0-9_-]+$/;
    if (!validUsernamePattern.test(username.trim())) {
        showUsernameError('Username can only contain letters, numbers, underscore, and hyphen');
        return false;
    }
    hideUsernameError();
    return true;
}

// Validate email
function validateEmail(email) {
    if (!email || email.trim().length === 0) {
        showEmailError('Email is required');
        return false;
    }
    // simple email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email.trim())) {
        showEmailError('Please enter a valid email address');
        return false;
    }
    hideEmailError();
    return true;
}

function showUsernameError(message) { usernameError.textContent = message; usernameError.classList.add('show'); }
function hideUsernameError() { usernameError.textContent = ''; usernameError.classList.remove('show'); }
function showEmailError(message) { emailError.textContent = message; emailError.classList.add('show'); }
function hideEmailError() { emailError.textContent = ''; emailError.classList.remove('show'); }

// Handle subscription
function handleSubscribe(planName) {
    const usernameRaw = usernameInput ? usernameInput.value : '';
    const emailRaw = emailInput ? emailInput.value : '';

    // strip leading @ if user included it
    const username = usernameRaw.startsWith('@') ? usernameRaw.slice(1) : usernameRaw;

    if (!validateUsername(username) || !validateEmail(emailRaw)) {
        return;
    }

    const plan = plans[planName];
    const subscriptionData = {
        username: username.trim(),
        email: emailRaw.trim(),
        plan: planName,
        price: plan.price,
        storage: plan.storage,
        timestamp: new Date().toLocaleString(),
        subscriptionId: generateSubscriptionId()
    };

    saveSubscription(subscriptionData);
    showSuccessModal(subscriptionData);
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
        <strong>@${subscriptionData.username}</strong> (${subscriptionData.email}) has successfully subscribed to the <strong>${subscriptionData.plan}</strong> plan!<br><br>
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

    // Clear inputs
    if (usernameInput) usernameInput.value = '';
    if (emailInput) emailInput.value = '';

    if (usernameInput) usernameInput.focus();
    hideUsernameError();
    hideEmailError();
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

// Preview modal functions
function showPreview(planName) {
    const modal = document.getElementById('previewModal');
    const titleEl = document.getElementById('previewTitle');
    const listEl = document.getElementById('previewList');

    const plan = plans[planName];
    titleEl.textContent = planName + ' — Features';
    listEl.innerHTML = '';

    if (plan && Array.isArray(plan.features)) {
        plan.features.forEach(f => {
            const li = document.createElement('li');
            li.textContent = '✓ ' + f;
            listEl.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No details available.';
        listEl.appendChild(li);
    }

    modal.classList.add('show');
}

function closePreview() {
    const modal = document.getElementById('previewModal');
    modal.classList.remove('show');
}

// Close modals on outside click and Escape
window.addEventListener('click', function(event) {
    const successModal = document.getElementById('successModal');
    const previewModal = document.getElementById('previewModal');
    if (event.target === successModal) closeModal();
    if (event.target === previewModal) closePreview();
});
document.addEventListener('keydown', function(event) {
    const successModal = document.getElementById('successModal');
    const previewModal = document.getElementById('previewModal');
    if (event.key === 'Escape') {
        if (successModal.classList.contains('show')) closeModal();
        if (previewModal.classList.contains('show')) closePreview();
    }
});

// Close icon on preview modal
const previewClose = document.getElementById('previewClose');
if (previewClose) previewClose.addEventListener('click', closePreview);

// Focus input on load + clear error on input
window.addEventListener('load', function() { if (usernameInput) usernameInput.focus(); });
if (usernameInput) usernameInput.addEventListener('input', function() { if (this.value.length > 0) hideUsernameError(); });
if (emailInput) emailInput.addEventListener('input', function() { if (this.value.length > 0) hideEmailError(); });

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
        validateEmail,
        generateSubscriptionId,
        displaySubscriptions,
        plans
    };
}

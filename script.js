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
    const validUsernamePattern = /^[a-zA-Z0-9_-]+$/;
    if (!validUsernamePattern.test(username.trim())) {
        showError('Username can only contain letters, numbers, underscore, and hyphen');
        return false;
    }
    hideError();
    return true;
}

// Show/hide error
function showError(message) { usernameError.textContent = message; usernameError.classList.add('show'); usernameInput.focus(); }
function hideError() { usernameError.textContent = ''; usernameError.classList.remove('show'); }

// Handle subscription
function handleSubscribe(planName) {
    const username = usernameInput.value;
    if (!validateUsername(username)) return;
    const plan = plans[planName];
    const subscriptionData = {
        username: username.trim(),
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

// ID generator + storage
function generateSubscriptionId() { return 'SUB-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase(); }
function saveSubscription(data) {
    let subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
    subscriptions.push(data);
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
}

// Success modal
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

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
    usernameInput.value = '';
    usernameInput.focus();
    hideError();
}

// Preview modal: show features on click
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
if (usernameInput) usernameInput.addEventListener('input', function() { if (this.value.length > 0) hideError(); });

// Utility for testing/debug
function displaySubscriptions() {
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
    console.log('Existing subscriptions:', subscriptions);
    return subscriptions;
}

// Exports for tests (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateUsername, generateSubscriptionId, displaySubscriptions, plans };
}

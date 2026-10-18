document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('validation-form');
    const showError = (inputId, show) => {
        const errorDiv = document.getElementById(`${inputId}-error`);
        errorDiv.style.display = show ? 'block' : 'none';
        const inputField = document.getElementById(inputId);
        inputField.style.borderColor = show ? 'var(--mc-error)' : 'var(--mc-border-light)';
    };
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const username = document.getElementById('username').value;
        if (!username.trim()) {
            showError('username', true);
            isValid = false;
        } else {
            showError('username', false);
        }
        const email = document.getElementById('email').value;
        if (!validateEmail(email)) {
            showError('email', true);
            isValid = false;
        } else {
            showError('email', false);
        }
        const password = document.getElementById('password').value;
        if (password.length<8) {
            showError('password', true);
            isValid = false;
        } else {
            showError('password', false);
        }
        const confirmPassword = document.getElementById('confirm-password').value;
        if (password !== confirmPassword || confirmPassword === '') {
            showError('confirm-password', true);
            isValid = false;
        } else {
            showError('confirm-password', false);
        }
        if (isValid) {
            alert('Account crafted successfully!');
            form.reset();
        }
    });
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.paddingTop = '0';
                content.style.paddingBottom = '0';
            } else {
                content.style.maxHeight = content.scrollHeight+30+"px"; 
                content.style.paddingTop = '15px';
                content.style.paddingBottom = '15px';
            }
        });
    });
    const popupOverlay = document.getElementById('popup-overlay');
    const openPopupBtn = document.getElementById('open-popup');
    const closePopupBtn = document.getElementById('close-popup');
    openPopupBtn.addEventListener('click', () => {
        popupOverlay.style.display = 'flex';
    });
    closePopupBtn.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
    });
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = 'none';
        }
    });
    const colorBtn = document.getElementById('color-btn');
    const colors = ['#5c85d6', '#872b2b', '#2b8743', '#872b84', '#1a1a1a'];
    let colorIndex = 0;
    colorBtn.addEventListener('click', () => {
        colorIndex = (colorIndex+1)%colors.length;
        document.body.style.backgroundColor = colors[colorIndex];
    });
    const updateDateTime = () => {
        const datetimeDisplay = document.getElementById('datetime-display');
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        datetimeDisplay.textContent = now.toLocaleDateString('en-US', options);
    };
    updateDateTime();
    setInterval(updateDateTime, 1000);
});
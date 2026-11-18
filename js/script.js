// Global initialization immediately executes to apply background and prevent color flashing
(function initPersistedSettings() {
    try {
        const savedBg = localStorage.getItem('mcBgColor');
        if (savedBg) {
            document.documentElement.style.setProperty('--bg-color', savedBg);
        }
    } catch (e) {}
})();

document.addEventListener('DOMContentLoaded', () => {
    const clickSound = new Audio('https://www.myinstants.com/media/sounds/minecraft_click.mp3');

    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('mcTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            clickSound.play().catch(e => {});
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('mcTheme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    // Handles generating, applying, and saving random background colors
    const colorBtn = document.getElementById('color-btn');
    if (colorBtn) {
        const colors = ['#5c85d6', '#872b2b', '#2b8743', '#872b84', '#1a1a1a', '#5c3a21'];
        colorBtn.addEventListener('click', () => {
            let currentIndex = parseInt(localStorage.getItem('mcBgColorIndex') || '-1');
            let nextIndex = (currentIndex + 1) % colors.length;
            let selectedColor = colors[nextIndex];
            
            document.documentElement.style.setProperty('--bg-color', selectedColor);
            localStorage.setItem('mcBgColor', selectedColor);
            localStorage.setItem('mcBgColorIndex', nextIndex);
        });
    }

    const navLinks = document.querySelectorAll('nav ul li a');
    let currentNavIndex = 0;
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            currentNavIndex = (currentNavIndex + 1) % navLinks.length;
            navLinks[currentNavIndex].focus();
        } else if (e.key === 'ArrowLeft') {
            currentNavIndex = (currentNavIndex - 1 + navLinks.length) % navLinks.length;
            navLinks[currentNavIndex].focus();
        }
    });

    const greetingMsg = document.getElementById('greeting-message');
    if (greetingMsg) {
        const hour = new Date().getHours();
        let greeting = '';
        switch (true) {
            case (hour < 12): greeting = 'Good Morning, Crafter!'; break;
            case (hour < 18): greeting = 'Good Afternoon, Crafter!'; break;
            default: greeting = 'Good Evening, Crafter!'; break;
        }
        greetingMsg.textContent = greeting;
    }

    const timeBtn = document.getElementById('time-btn');
    const timeDisplay = document.getElementById('time-display');
    if (timeBtn && timeDisplay) {
        timeBtn.addEventListener('click', () => {
            timeDisplay.textContent = new Date().toLocaleTimeString();
            timeDisplay.style.marginLeft = '10px';
        });
    }

    const readMoreBtn = document.getElementById('read-more-btn');
    const readMoreText = document.getElementById('read-more-text');
    if (readMoreBtn && readMoreText) {
        readMoreBtn.addEventListener('click', () => {
            if (readMoreText.style.display === 'inline') {
                readMoreText.style.display = 'none';
                readMoreBtn.textContent = 'Read More';
            } else {
                readMoreText.style.display = 'inline';
                readMoreBtn.textContent = 'Read Less';
            }
        });
    }

    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            clickSound.play().catch(e => {});
            const rating = parseInt(star.getAttribute('data-value'));
            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-value')) <= rating) {
                    s.style.color = '#FFFF55';
                } else {
                    s.style.color = '#555555';
                }
            });
        });
    });

    const showError = (inputId, show, message = '') => {
        const errorDiv = document.getElementById(`${inputId}-error`);
        if (errorDiv) {
            errorDiv.style.display = show ? 'block' : 'none';
            if (show && message) errorDiv.textContent = message;
        }
        const inputField = document.getElementById(inputId);
        if (inputField) {
            inputField.style.borderColor = show ? 'var(--mc-error)' : 'var(--mc-border-light)';
        }
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^\d{10}$/.test(phone);
    const validatePassword = (pwd) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pwd);

    let user = null;
    try {
        const storedData = localStorage.getItem('libraryUser');
        if (storedData) user = JSON.parse(storedData);
    } catch (e) {
        localStorage.removeItem('libraryUser');
    }
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const sidebarUserInfo = document.getElementById('sidebar-user-info');
    if (sidebarUserInfo) {
        if (user && isLoggedIn) {
            sidebarUserInfo.style.display = 'block';
            const sidebarName = document.getElementById('sidebar-name');
            if (sidebarName) sidebarName.textContent = user.name || 'Crafter';
        } else {
            sidebarUserInfo.style.display = 'none';
        }
    }

    const profileData = document.getElementById('profile-data');
    if (profileData) {
        if (user && isLoggedIn) {
            const pName = document.getElementById('prof-name');
            const pEmail = document.getElementById('prof-email');
            const pPhone = document.getElementById('prof-phone');
            if (pName) pName.textContent = user.name || 'N/A';
            if (pEmail) pEmail.textContent = user.email || 'N/A';
            if (pPhone) pPhone.textContent = user.phone || 'N/A';
        } else {
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.innerHTML = '<section class="card"><h2>Access Denied</h2><p>Please <a href="hub.html" style="color:#4caf50; font-weight:bold;">log in</a> to view your profile.</p></section>';
            }
        }
    }

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        window.location.href = 'hub.html';
    };

    const sidebarLogoutBtn = document.getElementById('sidebar-logout-btn');
    if (sidebarLogoutBtn) sidebarLogoutBtn.addEventListener('click', handleLogout);
    
    const profileLogoutBtn = document.getElementById('logout-btn');
    if (profileLogoutBtn) profileLogoutBtn.addEventListener('click', handleLogout);

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById('signup-name').value.trim();
            if (!name) { showError('signup-name', true, 'Name is required.'); isValid = false; }
            else { showError('signup-name', false); }

            const email = document.getElementById('signup-email').value.trim();
            if (!validateEmail(email)) { showError('signup-email', true, 'Invalid email format.'); isValid = false; }
            else { showError('signup-email', false); }

            const phone = document.getElementById('signup-phone').value.trim();
            if (!validatePhone(phone)) { showError('signup-phone', true, 'Must be 10 digits.'); isValid = false; }
            else { showError('signup-phone', false); }

            const password = document.getElementById('signup-password').value;
            if (!validatePassword(password)) { showError('signup-password', true, 'Min 8 chars, 1 letter, 1 number.'); isValid = false; }
            else { showError('signup-password', false); }

            const confirmPassword = document.getElementById('signup-confirm').value;
            if (password !== confirmPassword || confirmPassword === '') { showError('signup-confirm', true, 'Passwords do not match.'); isValid = false; }
            else { showError('signup-confirm', false); }

            if (isValid) {
                const userData = { name, email, phone, password };
                localStorage.setItem('libraryUser', JSON.stringify(userData));
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'profile.html';
            }
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const email = document.getElementById('login-email').value.trim();
            if (!email) { showError('login-email', true, 'Email required.'); isValid = false; }
            else { showError('login-email', false); }

            const password = document.getElementById('login-password').value;
            if (!password) { showError('login-password', true, 'Password required.'); isValid = false; }
            else { showError('login-password', false); }

            if (isValid) {
                let storedUser = null;
                try {
                    const stored = localStorage.getItem('libraryUser');
                    if (stored) storedUser = JSON.parse(stored);
                } catch (err) {}
                
                if (storedUser && storedUser.email === email && storedUser.password === password) {
                    localStorage.setItem('isLoggedIn', 'true');
                    window.location.href = 'profile.html';
                } else {
                    showError('login-password', true, 'Invalid credentials.');
                }
            }
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById('fullName').value.trim();
            if (!name) { showError('fullName', true, 'Name is required.'); isValid = false; }
            else { showError('fullName', false); }

            const email = document.getElementById('email').value.trim();
            if (!validateEmail(email)) { showError('email', true, 'Invalid email format.'); isValid = false; }
            else { showError('email', false); }

            const message = document.getElementById('message').value.trim();
            if (!message) { showError('message', true, 'Message is required.'); isValid = false; }
            else { showError('message', false); }

            if (isValid) {
                let btn = contactForm.querySelector('button[type="submit"]');
                let originalText = btn.textContent;
                btn.disabled = true;
                btn.innerHTML = '<span class="spinner"></span>Please wait...';
                setTimeout(() => {
                    btn.disabled = false;
                    btn.textContent = originalText;
                    const toast = document.getElementById('toast');
                    toast.textContent = "Form submitted successfully!";
                    toast.style.display = 'block';
                    setTimeout(() => toast.style.display = 'none', 3000);
                    contactForm.reset();
                }, 2000);
            }
        });
    }

    const apiSearchBtn = document.getElementById('api-search-btn');
    if (apiSearchBtn) {
        apiSearchBtn.addEventListener('click', async () => {
            const query = document.getElementById('api-search-input').value;
            const resultsContainer = document.getElementById('api-results');
            if (!query.trim()) return;
            resultsContainer.innerHTML = '<div style="width:100%; text-align:center;"><span class="spinner"></span> Searching Library...</div>';
            try {
                const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=4`);
                if (!response.ok) throw new Error('Network error');
                const data = await response.json();
                resultsContainer.innerHTML = '';
                if (data.docs.length === 0) {
                    resultsContainer.innerHTML = '<p>No books found.</p>';
                    return;
                }
                data.docs.forEach(book => {
                    const card = document.createElement('div');
                    card.className = 'flex-card';
                    
                    const title = document.createElement('h3');
                    title.textContent = book.title;
                    
                    const author = document.createElement('p');
                    author.textContent = book.author_name ? book.author_name[0] : 'Unknown Crafter';
                    
                    const link = document.createElement('a');
                    if (book.key) {
                        link.href = `https://openlibrary.org${book.key}`;
                    } else {
                        link.href = '#';
                    }
                    link.target = '_blank';
                    link.style.textDecoration = 'none';
                    link.style.marginTop = 'auto';
                    
                    const btn = document.createElement('button');
                    btn.textContent = 'View Book';
                    btn.style.width = '100%';
                    btn.style.boxSizing = 'border-box';
                    
                    link.appendChild(btn);
                    card.appendChild(title);
                    card.appendChild(author);
                    card.appendChild(link);
                    
                    resultsContainer.appendChild(card);
                });
            } catch (error) {
                resultsContainer.innerHTML = '<p class="error" style="display:block;">Error fetching archives.</p>';
            }
        });
    }

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
                content.style.maxHeight = content.scrollHeight + 30 + "px"; 
                content.style.paddingTop = '15px';
                content.style.paddingBottom = '15px';
            }
        });
    });

    const popupOverlay = document.getElementById('popup-overlay');
    const openPopupBtn = document.getElementById('open-popup');
    const closePopupBtn = document.getElementById('close-popup');
    if (popupOverlay && openPopupBtn && closePopupBtn) {
        openPopupBtn.addEventListener('click', () => { popupOverlay.style.display = 'flex'; });
        closePopupBtn.addEventListener('click', () => { popupOverlay.style.display = 'none'; });
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) popupOverlay.style.display = 'none';
        });
    }

    const updateDateTime = () => {
        const datetimeDisplay = document.getElementById('datetime-display');
        if (datetimeDisplay) {
            const now = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            datetimeDisplay.textContent = now.toLocaleDateString('en-US', options);
        }
    };
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

$(document).ready(function() {
    $(window).on('scroll', function() {
        let docHeight = $(document).height() - $(window).height();
        let scrollPercent = ($(window).scrollTop() / docHeight) * 100;
        $('#scroll-progress-bar').css('width', scrollPercent + '%');
    });

    const faqData = ["How to craft a pickaxe?", "What do creepers drop?", "How to tame a wolf?"];
    
    let savedSearch = localStorage.getItem('faqSearchQuery');
    if (savedSearch) {
        $('#faq-search').val(savedSearch);
        setTimeout(() => $('#faq-search').trigger('keyup'), 100);
    }

    $('#faq-search').on('keyup', function() {
        let val = $(this).val().toLowerCase();
        localStorage.setItem('faqSearchQuery', $(this).val());
        
        let suggestions = "";
        if (val.length > 0) {
            let matches = faqData.filter(item => item.toLowerCase().includes(val));
            matches.forEach(match => { suggestions += `<div class="suggestion-item">${match}</div>`; });
        }
        $('#autocomplete-list').html(suggestions);
        $('.accordion-item').each(function() {
            let $item = $(this);
            let $header = $item.find('.accordion-header');
            let $content = $item.find('.accordion-content p');
            let originalHeaderText = $header.text().replace(/<mark>|<\/mark>/gi, "");
            let originalContentText = $content.text().replace(/<mark>|<\/mark>/gi, "");
            $header.text(originalHeaderText);
            $content.text(originalContentText);
            if (val.length > 0) {
                let regex = new RegExp(`(${val})`, "gi");
                let matchFound = false;
                if (originalHeaderText.toLowerCase().includes(val)) {
                    $header.html(originalHeaderText.replace(regex, "<mark>$1</mark>"));
                    matchFound = true;
                }
                if (originalContentText.toLowerCase().includes(val)) {
                    $content.html(originalContentText.replace(regex, "<mark>$1</mark>"));
                    matchFound = true;
                }
                if (matchFound) $item.show();
                else $item.hide();
            } else {
                $item.show();
            }
        });
    });

    $(document).on('click', '.suggestion-item', function() {
        $('#faq-search').val($(this).text()).trigger('keyup');
        $('#autocomplete-list').empty();
    });

    $('.counter').each(function() {
        $(this).prop('Counter', 0).animate({ Counter: $(this).data('target') }, {
            duration: 2000, easing: 'swing',
            step: function(now) { $(this).text(Math.ceil(now) + "+"); }
        });
    });

    $('#copy-btn').on('click', function() {
        let text = $('#coord-text').text();
        navigator.clipboard.writeText(text).then(function() {
            $('#copy-btn').html('&#10003; Copied');
            $('#toast').text("Copied to clipboard!").fadeIn().delay(2000).fadeOut();
            setTimeout(() => $('#copy-btn').text('Copy'), 2000);
        });
    });

    function lazyLoad() {
        $('.lazy').each(function() {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height() + 100) {
                $(this).attr('src', $(this).attr('data-src')).removeClass('lazy');
            }
        });
    }
    $(window).on('scroll', lazyLoad);
    lazyLoad();
});
document.addEventListener('DOMContentLoaded', () => {
    
    const clickSound = new Audio('https://www.myinstants.com/media/sounds/minecraft_click.mp3');

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            clickSound.play().catch(e => {});
            document.body.classList.toggle('dark-mode');
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
            case (hour < 12):
                greeting = 'Good Morning, Crafter!';
                break;
            case (hour < 18):
                greeting = 'Good Afternoon, Crafter!';
                break;
            default:
                greeting = 'Good Evening, Crafter!';
                break;
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

    const bookCollection = [
        { title: "Minecraft Guide to Redstone", type: "featured", img: "images/ebooks.jpg" },
        { title: "Advanced Building Tactics", type: "featured", img: "images/library.jpg" },
        { title: "Old Server Logs", type: "archived", img: "images/event.jpg" }
    ];

    const dynamicBooksContainer = document.getElementById('dynamic-books');
    if (dynamicBooksContainer) {
        const featuredBooks = bookCollection.filter(book => book.type === 'featured');
        
        featuredBooks.forEach(book => {
            const card = document.createElement('div');
            card.classList.add('flex-card');
            
            const img = document.createElement('img');
            img.src = book.img;
            img.alt = book.title;
            
            const title = document.createElement('h3');
            title.textContent = book.title;
            
            const btn = document.createElement('button');
            btn.textContent = 'Read';
            
            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(btn);
            dynamicBooksContainer.appendChild(card);
        });
    }

    const contactForm = document.getElementById('contact-form');
    const formSuccessMessage = document.getElementById('form-success-message');

    const validationForm = document.getElementById('validation-form');
    if (validationForm) {
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
        validationForm.addEventListener('submit', (e) => {
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
                validationForm.reset();
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
    }

    const colorBtn = document.getElementById('color-btn');
    if (colorBtn) {
        const colors = ['#5c85d6', '#872b2b', '#2b8743', '#872b84', '#1a1a1a'];
        let colorIndex = 0;
        colorBtn.addEventListener('click', () => {
            colorIndex = (colorIndex + 1) % colors.length;
            document.body.style.backgroundColor = colors[colorIndex];
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
    console.log("jQuery is ready!");
    $(window).on('scroll', function() {
        let docHeight = $(document).height() - $(window).height();
        let scrollPercent = ($(window).scrollTop() / docHeight) * 100;
        $('#scroll-progress-bar').css('width', scrollPercent + '%');
    });
    const faqData = [
        "How to craft a pickaxe?",
        "What do creepers drop?",
        "How to tame a wolf?"
    ];
    $('#faq-search').on('keyup', function() {
        let val = $(this).val().toLowerCase();
        let suggestions = "";
        if (val.length > 0) {
            let matches = faqData.filter(item => item.toLowerCase().includes(val));
            matches.forEach(match => {
                suggestions += `<div class="suggestion-item">${match}</div>`;
            });
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

                if (matchFound) {
                    $item.show();
                } else {
                    $item.hide();
                }
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
        $(this).prop('Counter', 0).animate({
            Counter: $(this).data('target')
        }, {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
                $(this).text(Math.ceil(now) + "+");
            }
        });
    });
    function showToast(message) {
        $('#toast').text(message).fadeIn().delay(3000).fadeOut();
    }
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        let $btn = $(this).find('button[type="submit"]');
        let originalText = $btn.text();
        $btn.prop('disabled', true).html('<span class="spinner"></span>Please wait...');
        setTimeout(function() {
            $btn.prop('disabled', false).text(originalText);
            showToast("Form submitted successfully!");
            $('#contact-form')[0].reset();
        }, 2000);
    });
    $('#copy-btn').on('click', function() {
        let text = $('#coord-text').text();
        navigator.clipboard.writeText(text).then(function() {
            $('#copy-btn').html('&#10003; Copied');
            showToast("Copied to clipboard!");
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
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });
    }

    // Email form handler for contact page
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            
            const recipientEmail = '100218919@student.burnley.ac.uk';
            const emailSubject = encodeURIComponent(subject);
            const emailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            
            const mailtoLink = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;
            
            window.location.href = mailtoLink;
            
            // Reset form after a short delay
            setTimeout(() => {
                contactForm.reset();
                alert('Your email client should open. If it doesn\'t, please send your message to: ' + recipientEmail);
            }, 100);
        });
    }

    // Word darkening effect on hover for paragraphs only
    function wrapWordsInSpans() {
        // Only target paragraphs, not headings or navigation
        const textElements = document.querySelectorAll('p, .map-description');
        
        textElements.forEach(element => {
            // Skip if already processed or if it's inside navigation or art-item boxes
            if (element.querySelector('.word-hover') || 
                element.closest('nav') || 
                element.closest('.desktop-nav') || 
                element.closest('.mobile-nav') ||
                element.closest('.art-item')) {
                return;
            }
            
            const text = element.textContent;
            const words = text.split(/(\s+)/);
            
            element.innerHTML = words.map(word => {
                if (word.trim() === '') return word;
                return `<span class="word-hover">${word}</span>`;
            }).join('');
        });
    }

    function getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    // Throttle mouse move for better performance
    let mouseMoveTimeout;
    function handleMouseMove(e) {
        if (mouseMoveTimeout) return;
        
        mouseMoveTimeout = setTimeout(() => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const hoverDistance = 40;

            document.querySelectorAll('.word-hover').forEach(word => {
                const rect = word.getBoundingClientRect();
                const wordCenterX = rect.left + rect.width / 2;
                const wordCenterY = rect.top + rect.height / 2;
                
                const distance = getDistance(mouseX, mouseY, wordCenterX, wordCenterY);
                
                if (distance <= hoverDistance) {
                    word.classList.add('enlarged');
                } else {
                    word.classList.remove('enlarged');
                }
            });
            
            mouseMoveTimeout = null;
        }, 16); // ~60fps
    }

    wrapWordsInSpans();
    document.addEventListener('mousemove', handleMouseMove);
});


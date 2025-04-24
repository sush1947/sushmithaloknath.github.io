// Enhanced smooth scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Update URL without jumping
        history.pushState(null, null, targetId);
    });
});

// Sticky navigation with shadow
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.padding = '15px 0';
        navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Form submission
//document.getElementById('contact-form').addEventListener('submit', function(e) {
    //e.preventDefault();
    
    // Get form values
    //const name = document.getElementById('name').value;
    //const email = document.getElementById('email').value;
    //const subject = document.getElementById('subject').value;
    //const message = document.getElementById('message').value;
    
    // Here you would typically send this data to a server
    // For now, we'll just log it and show an alert
    //console.log({name, email, subject, message});
    //alert('Thank you for your message! I will get back to you soon.');
    
    // Reset the form
    //this.reset();
//});
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const formData = new FormData(this);
  
    fetch('https://formspree.io/f/xblojbre', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        alert('Thank you');
        this.reset();
      } else {
        alert('Oops! There was a problem submitting your form.');
      }
    }).catch(error => {
      alert('Oops! Something went wrong.');
    });
  });
  

// Active link highlighting with intersection observer (more efficient)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Add fade-in animation on scroll
const fadeElements = document.querySelectorAll('.section, .project-card, .resume-item, .contact-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});
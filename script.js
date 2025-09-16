// script.js

// Progress line functionality
function updateProgressLine() {
    const progressLine = document.getElementById('navbar-progress-line');
    if (!progressLine) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    
    progressLine.style.width = Math.min(scrollProgress, 100) + '%';
}

// Add scroll event listener
window.addEventListener('scroll', updateProgressLine);

// Initialize on page load
document.addEventListener('DOMContentLoaded', updateProgressLine);



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        targetElement.scrollIntoView({
            behavior: 'smooth', // Smooth scroll animation
            block: 'start' // Scroll to the top of the section
        });
    });
});

// Blow out animation for social icons
function blowOutSocialIcons() {
    const icons = document.querySelectorAll('.social-icon');
    icons.forEach((icon, i) => {
        setTimeout(() => {
            icon.classList.add('social-blowout');
        }, i * 180);
    });
}

// Rotating roles animation
function startRoleRotator() {
    const roles = [
        "Aspiring Software Engineer",
        "Full Stack Developer",
        "AI/ ML Enthusiast",
        "Python Developer",
        "IoT Engineer"
    ];
    const rotator = document.getElementById('role-rotator');
    let idx = 0;
    function showRole(nextIdx) {
        if (!rotator) return;
        rotator.classList.remove('role-flip-in');
        rotator.classList.add('role-flip-out');
        setTimeout(() => {
            rotator.innerHTML = roles[nextIdx];
            rotator.classList.remove('role-flip-out');
            rotator.classList.add('role-flip-in');
            // Floating effect
            rotator.classList.add('floating');
            setTimeout(() => {
                rotator.classList.remove('floating');
            }, 2000); // match animation duration
        }, 400);
    }
    // Initial
    if (rotator) {
        rotator.innerHTML = roles[0];
        rotator.classList.add('role-flip-in');
        rotator.classList.add('floating');
        setTimeout(() => {
            rotator.classList.remove('floating');
        }, 2000);
    }
    setInterval(() => {
        idx = (idx + 1) % roles.length;
        showRole(idx);
    }, 2200);
}

// Typing animation for the name
function startTypingAnimation() {
    const name = "Pardha Sai\nGudivada";
    const typedName = document.getElementById('typed-name');
    const cursor = document.getElementById('typed-cursor');
    let i = 0;
    function type() {
        if (i < name.length) {
            if (name[i] === "\n") {
                typedName.innerHTML += "<br>";
            } else {
                typedName.innerHTML += name[i];
            }
            i++;
            setTimeout(type, 120);
        } else {
            if (cursor) cursor.style.display = 'none';
        }
    }
    if (typedName) {
        typedName.innerHTML = '';
        if (cursor) cursor.style.display = 'inline-block';
        type();
    }
}

// Animate skill icons
function animateSkillIcons() {
    const icons = document.querySelectorAll('.skill-icon');
    icons.forEach((icon, i) => {
        setTimeout(() => {
            icon.classList.add('animated');
        }, 300 + i * 180);
    });
}

// Profile image loading animation
function startProfileImageAnimation() {
    const profileImage = document.getElementById('profile-image');
    const profileLoader = document.getElementById('profile-loader');

    if (profileImage && profileLoader) {
        // Show loader and hide image initially
        profileLoader.style.display = 'block';
        profileLoader.style.opacity = '1';
        profileImage.style.opacity = '0';
        profileImage.style.filter = 'blur(10px)';
        profileImage.style.transform = 'scale(0.8)';

        // After 1 second, fade out loader and show image (sharp)
        setTimeout(function() {
            profileLoader.style.transition = 'opacity 0.5s';
            profileLoader.style.opacity = '0';
            // setTimeout(function() {
            //     profileLoader.style.display = 'none';
            // }, 500);
            profileImage.style.transition = 'filter 1s, opacity 1s, transform 1s';
            profileImage.style.opacity = '1';
            profileImage.style.filter = 'blur(0px)';
            profileImage.style.transform = 'scale(1)';
            // Start typing animation after image is visible
            setTimeout(startTypingAnimation, 1000);
            // Start role rotator
            startRoleRotator();
            // Blow out social icons
            blowOutSocialIcons();
            // Animate skill icons
            animateSkillIcons();
        }, 1000);
    }
}

// Typing effect for About section heading
function typeHeadingText(element, text, speed = 40) {
  let i = 0;
  element.textContent = '';
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Animate About Section on scroll into view (repeatable)
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0
  );
}

document.addEventListener('DOMContentLoaded', function() {
  // Splash screen logic
  const splashScreen = document.getElementById('splash-screen');
  // If you have a content wrapper, you can show/hide it here
  setTimeout(() => {
    if (splashScreen) splashScreen.style.display = 'none';
    // Start the profile image animation after splash
    startProfileImageAnimation();
  }, 2000); // 2 second splash

  // About section animation
  const aboutSection = document.querySelector('#aboutSection .about-bg');
  const aboutHeading = document.getElementById('about-typed-heading');
  const fullHeadingText = aboutHeading ? aboutHeading.textContent : '';
  let aboutAnimated = false;

  // Skills section animation
  const skillsSection = document.getElementById('skillsSection');
  let skillsAnimated = false;
  const skillCards = document.querySelectorAll('#skillsSection .skills-card');

  function checkAboutSection() {
    if (aboutSection && isInViewport(aboutSection)) {
      if (!aboutAnimated) {
        aboutSection.classList.add('animate-in');
        if (aboutHeading && fullHeadingText) {
          aboutHeading.textContent = fullHeadingText;
        }
        aboutAnimated = true;
      }
    } else {
      if (aboutAnimated) {
        aboutSection.classList.remove('animate-in');
        if (aboutHeading && fullHeadingText) {
          aboutHeading.textContent = fullHeadingText;
        }
        aboutAnimated = false;
      }
    }

    // Skills section animation
    if (skillsSection && isInViewport(skillsSection)) {
      if (!skillsAnimated) {
        skillsSection.classList.add('skills-animate-in');
        skillsAnimated = true;
      }
    } else {
      if (skillsAnimated) {
        skillsSection.classList.remove('skills-animate-in');
        skillsAnimated = false;
      }
    }

    // Animate each skill card individually
    skillCards.forEach(card => {
      if (isInViewport(card)) {
        card.classList.add('card-animate-in');
      } else {
        card.classList.remove('card-animate-in');
      }
    });
  }
  window.addEventListener('scroll', checkAboutSection);
  checkAboutSection();

  // Animate project cards and certificates on scroll
  const projectCards = document.querySelectorAll('.projects-card');
  const certificateFlips = document.querySelectorAll('.certificate-flip');

  function animateOnScroll() {
    // Animate project cards
    projectCards.forEach(card => {
      if (isInViewport(card)) {
        card.classList.add('scroll-animate');
      } else {
        card.classList.remove('scroll-animate');
      }
    });
    
    // Animate certificate flip containers
    certificateFlips.forEach(cert => {
      if (isInViewport(cert)) {
        cert.classList.add('scroll-animate');
      } else {
        cert.classList.remove('scroll-animate');
      }
    });
  }

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

  // Timeline animation
  const timelineLine = document.querySelector('.timeline-line');
  const timelineItems = document.querySelectorAll('.timeline-item');

  function animateTimeline() {
    if (timelineLine && isInViewport(timelineLine)) {
      timelineLine.classList.add('animate');
    }

    timelineItems.forEach((item, index) => {
      if (isInViewport(item)) {
        setTimeout(() => {
          item.classList.add('animate');
        }, index * 200); // Stagger animation by 200ms
      } else {
        item.classList.remove('animate');
      }
    });
  }

  window.addEventListener('scroll', animateTimeline);
  animateTimeline();
});

// Auto-scroll projects section horizontally when not hovered
// Bidirectional auto-scroll for projects section (no duplicates)
const projectsRow = document.querySelector('#projectsSection .row');
let scrollInterval;
let scrollDirection = 1; // 1 for left-to-right, -1 for right-to-left

function startAutoScroll() {
    if (!scrollInterval) {
        scrollInterval = setInterval(() => {
            const maxScrollLeft = projectsRow.scrollWidth - projectsRow.clientWidth;
            // Use Math.round for reliable comparison
            if (scrollDirection === 1 && Math.round(projectsRow.scrollLeft) >= Math.round(maxScrollLeft)) {
                scrollDirection = -1;
            }
            if (scrollDirection === -1 && Math.round(projectsRow.scrollLeft) <= 0) {
                scrollDirection = 1;
            }
            projectsRow.scrollLeft += scrollDirection;
        }, 20);
    }
}

function stopAutoScroll() {
    clearInterval(scrollInterval);
    scrollInterval = null;
}

if (projectsRow) {
    projectsRow.addEventListener('mouseenter', stopAutoScroll);
    projectsRow.addEventListener('mouseleave', startAutoScroll);
    startAutoScroll();
}

// Certificate stack scroll effect
const certificateSection = document.getElementById('certificateSection');
const certificateStack = certificateSection ? certificateSection.querySelector('.certificate-stack') : null;
if (certificateStack) {
  const certificates = Array.from(certificateStack.querySelectorAll('.certificate-flip'));
  let currentIndex = 0;
  function updateStack() {
    certificates.forEach((cert, idx) => {
      cert.classList.remove('active', 'prev', 'next');
      if (idx === currentIndex) {
        cert.classList.add('active');
      } else if (idx === currentIndex - 1) {
        cert.classList.add('prev');
      } else if (idx === currentIndex + 1) {
        cert.classList.add('next');
      }
    });
  }
  updateStack();
  certificateStack.addEventListener('wheel', (e) => {
    if (e.deltaY > 0 && currentIndex < certificates.length - 1) {
      currentIndex++;
      updateStack();
    } else if (e.deltaY < 0 && currentIndex > 0) {
      currentIndex--;
      updateStack();
    }
    e.preventDefault();
  });
  // Touch support for mobile
  let touchStartY = null;
  certificateStack.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  });
  certificateStack.addEventListener('touchend', (e) => {
    if (touchStartY !== null) {
      const touchEndY = e.changedTouches[0].clientY;
      if (touchStartY - touchEndY > 30 && currentIndex < certificates.length - 1) {
        currentIndex++;
        updateStack();
      } else if (touchEndY - touchStartY > 30 && currentIndex > 0) {
        currentIndex--;
        updateStack();
      }
      touchStartY = null;
    }
  });
}
import './style.css'

// Function to set divider heights
function setDividerHeights() {
  // Only apply on desktop (>1000px)
  if (window.innerWidth <= 1000) return;
  
  const dividers = document.querySelectorAll('.Q_Divider');
  
  dividers.forEach(divider => {
    const parent = divider.closest('.O_Halfs');
    if (parent) {
      // Get computed styles for the parent
      const parentStyle = window.getComputedStyle(parent);
      const paddingTop = parseFloat(parentStyle.paddingTop);
      const paddingBottom = parseFloat(parentStyle.paddingBottom);
      
      // Calculate height (parent height minus padding)
      const parentHeight = parent.offsetHeight;
      const dividerHeight = parentHeight - paddingTop - paddingBottom;
      
      // Set divider height
      divider.style.height = `${dividerHeight}px`;
      divider.style.minHeight = `${dividerHeight}px`;
    }
  });
}

// Reset divider styles for mobile
function resetDividerStyles() {
  if (window.innerWidth <= 1000) {
    const dividers = document.querySelectorAll('.Q_Divider');
    dividers.forEach(divider => {
      divider.style.height = '';
      divider.style.minHeight = '';
    });
  }
}

// Smooth scroll for anchor links
function setupSmoothScroll() {
  // Get all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      // Skip if href is just "#" with nothing after
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Smooth scroll to the element
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Burger menu functionality
function setupBurgerMenu() {
  const burgerButton = document.querySelector('.A_BurgerMenuButton');
  const burgerMenu = document.querySelector('.O_BurgerMenu');
  const burgerMenuList = document.querySelector('.W_BurgerMenuList');
  const closeButton = document.querySelector('.A_BurgerCloseButton');
  const menuLinks = document.querySelectorAll('.W_BurgerMenuList a');
  
  // Function to close the burger menu
  const closeBurgerMenu = () => {
    burgerMenu.classList.remove('U_Open');
    burgerMenuList.classList.remove('U_BurgerMenuListOpen');
  };
  
  if (burgerButton && burgerMenu && burgerMenuList && closeButton) {
    // Open burger menu on burger button click
    burgerButton.addEventListener('click', () => {
      burgerMenu.classList.add('U_Open');
      burgerMenuList.classList.add('U_BurgerMenuListOpen');
    });
    
    // Close burger menu on close button click
    closeButton.addEventListener('click', closeBurgerMenu);
    
    // Close burger menu when clicking on any link inside it
    menuLinks.forEach(link => {
      link.addEventListener('click', closeBurgerMenu);
    });
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  setDividerHeights();
  resetDividerStyles();
  setupSmoothScroll();
  setupBurgerMenu();
});

// Run on window resize
window.addEventListener('resize', () => {
  setDividerHeights();
  resetDividerStyles();
});

function createPopout(content, options = {}) {
  // Default options
  const defaults = {
    width: '80%',
    height: '80%',
    showCloseButton: true,
    backdrop: true,
    backdropBlur: true,
    animationDuration: 300 // in ms
  };
  
  const config = { ...defaults, ...options };
  
  // Create backdrop
  const backdrop = document.createElement('div');
  backdrop.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0);
    ${config.backdropBlur ? 'backdrop-filter: blur(10px);' : ''}
    transition: background ${config.animationDuration}ms ease;
  `;
  
  // Create popout container
  const container = document.createElement('div');
container.style.cssText = `
  background: rgba(255, 255, 255, 0.2); /* semi-transparent */
  color: var(--text-color, #000);
  border-radius: 12px;
  padding: 20px;
  width: ${config.width};
  height: ${config.height};
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18); /* frosty border */
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  
  transform: scale(0.8);
  opacity: 0;
  transition: transform ${config.animationDuration}ms ease, opacity ${config.animationDuration}ms ease;
`;
  
  // Add close button if enabled
  if (config.showCloseButton) {
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      position: absolute;
      top: 10px;
      right: 15px;
      border: none;
      background: none;
      font-size: 24px;
      cursor: pointer;
      color: var(--text-color, #000);
    `;
    closeBtn.onclick = () => closePopout();
    container.appendChild(closeBtn);
  }
  
  // Add content
  if (typeof content === 'string') {
    container.innerHTML += content;
  } else {
    container.appendChild(content);
  }
  
  // Append first (hidden)
  document.body.appendChild(backdrop);
  backdrop.appendChild(container);
  
  // Animate in
  requestAnimationFrame(() => {
    backdrop.style.background = 'rgba(0, 0, 0, 0.5)';
    container.style.transform = 'scale(1)';
    container.style.opacity = '1';
  });
  
  // Close function with animation
  function closePopout() {
    container.style.transform = 'scale(0.8)';
    container.style.opacity = '0';
    backdrop.style.background = 'rgba(0, 0, 0, 0)';
    
    setTimeout(() => {
      if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
    }, config.animationDuration);
  }
  
  // Close on backdrop click
  if (config.backdrop) {
    backdrop.onclick = (e) => {
      if (e.target === backdrop) closePopout();
    };
  }
  
  return closePopout; // Return close function for external use
}

document.addEventListener("DOMContentLoaded", function() {
    var anchors = document.querySelectorAll("a");
    anchors.forEach(function(anchor) {
        anchor.addEventListener("click", function(event) {
            // Prevent the default action of the anchor tag (i.e., navigating to the URL)
            event.preventDefault();

            // Extract the URL from the anchor tag's href attribute
            var website = anchor.getAttribute("href");

            // Construct the confirmation message
            var confirmationMessage = "You are about to visit " + website + ". Proceed?";

            // Display confirmation dialog
            var proceed = confirm(confirmationMessage);

            // If user confirms, redirect to the website
            if (proceed) {
                window.location.href = website;
            }
        });
    });
});

// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Elements
const toggle = document.getElementById('theme-toggle');
const root = document.documentElement;

// Auto-detect system preference if no saved theme
if (!localStorage.getItem('theme')) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('nord-dark');
        toggle.checked = true;
    } else {
        root.classList.remove('nord-dark');
        toggle.checked = false;
    }
} else {
    // Apply saved preference
    const theme = localStorage.getItem('theme');
    root.classList.toggle('nord-dark', theme === 'nord-dark');
    toggle.checked = theme === 'nord-dark';
}

// Toggle theme on switch change
toggle.addEventListener('change', () => {
    if (toggle.checked) {
        root.classList.add('nord-dark');
        localStorage.setItem('theme', 'nord-dark');
    } else {
        root.classList.remove('nord-dark');
        localStorage.setItem('theme', 'nord-light');
    }
});

function showLicense() {
  fetch('/LICENSE')
    .then(response => response.text())
    .then(text => {
      createPopout(`<pre style="white-space: pre-wrap;">${text}</pre>`, {
        width: '70%',
        height: '80%'
      });
    });
}
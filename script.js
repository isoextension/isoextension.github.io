// Attach event listener to all anchor tags
function createPopout(content, options = {}) {
  // Default options
  const defaults = {
    width: '80%',
    height: '80%',
    showCloseButton: true,
    backdrop: true,
    backdropBlur: true
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
    background: rgba(0, 0, 0, 0.5);
    ${config.backdropBlur ? 'backdrop-filter: blur(10px);' : ''}
  `;
  
  // Create popout container
  const container = document.createElement('div');
  container.style.cssText = `
    background: var(--bg-color, #fff);
    color: var(--text-color, #000);
    border-radius: 12px;
    padding: 20px;
    width: ${config.width};
    height: ${config.height};
    position: relative;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
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
  
  // Close function
  function closePopout() {
    document.body.removeChild(backdrop);
  }
  
  // Close on backdrop click
  if (config.backdrop) {
    backdrop.onclick = (e) => {
      if (e.target === backdrop) closePopout();
    };
  }
  
  backdrop.appendChild(container);
  document.body.appendChild(backdrop);
  
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
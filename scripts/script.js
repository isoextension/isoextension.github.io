function createPopout(content) {
  const backdrop = document.createElement('div');
  backdrop.style.cssText = `
background: hsla(0, 0%, 0%, 0.00);
width: 100%;
height: 100%;
`
  const container = document.createElement('div');
  container.style.cssText = `
background: var(--background);
color: var(--text, #ffffff);
border-radius: 12px;
padding: 80%;
width: 80%;
position: relative;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
overflow: auto;
  `;

  if (typeof content === 'string') {
    container.innerHTML += content;
  } else {
    container.appendChild(content);
  }

  backdrop.appendChild(container);

  function closePopout() {
    container.remove()
    backdrop.remove()
  }
  
  return closePopout;
}


function createExternalLinkPopup(url, siteName) {
    const popupContent = `
        <div style="text-align: center; padding: 20px;">
            <h3>Leaving Site</h3>
            <p>You're about to visit:</p>
            <p><strong>${siteName}</strong></p>
            <p><code style="background: rgba(0,0,0,0.1); padding: 5px; border-radius: 3px;">${url}</code></p>
            <div style="margin-top: 25px; display: flex; gap: 10px; justify-content: center;">
                <button onclick="window.open('${url}', '_blank')" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    ↗ Open in New Tab
                </button>
                <button onclick="window.location.href = '${url}'" style="padding: 10px 20px; background: transparent; border: 1px solid #ccc; border-radius: 5px; cursor: pointer;">
                    Navigate Directly
                </button>
                <button onclick="
                <button onclick="closePopup()" style="padding: 10px 20px; background: transparent; border: 1px solid #ccc; border-radius: 5px; cursor: pointer;">
                    Cancel
                </button>
            </div>
        </div>
    `;
    
    const closePopup = createPopout(popupContent, {
        width: '400px',
        height: 'auto',
        backdrop: true,
        showCloseButton: false
    });
    
    // Make closePopup globally available for the buttons
    window.closePopup = closePopup;
}

document.addEventListener("DOMContentLoaded", function() {
    var anchors = document.querySelectorAll("a:not(.trusted)");
    anchors.forEach(function(anchor) {
        anchor.addEventListener("click", function(event) {
            const href = anchor.getAttribute("href");
            
            // Only intercept external links
            if (href && (href.startsWith('http') || href.startsWith('//'))) {
                event.preventDefault();
                
                // YOUR FANCY POPUP instead of confirm()
                createExternalLinkPopup(href, anchor.textContent);
            }
        });
    });
});

// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Elements
const toggle = document.getElementById('theme-toggle');
const root = document.documentElement;

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  root.classList.add('dark');
}

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
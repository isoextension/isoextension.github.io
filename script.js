// Attach event listener to all anchor tags
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
        root.classList.add('dark');
        toggle.checked = true;
    } else {
        root.classList.remove('dark');
        toggle.checked = false;
    }
} else {
    // Apply saved preference
    const theme = localStorage.getItem('theme');
    root.classList.toggle('dark', theme === 'dark');
    toggle.checked = theme === 'dark';
}

// Toggle theme on switch change
toggle.addEventListener('change', () => {
    if (toggle.checked) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
});


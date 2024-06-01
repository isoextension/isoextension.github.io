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

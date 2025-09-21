/* ---
Junior Dev Notes:
This script uses modern, "vanilla" JavaScript (no jQuery).
It's generally better for performance on simple pages like this.
I've added comments to explain each part.
--- */

// Wait for the entire HTML document to be loaded and parsed before running the script.
document.addEventListener("DOMContentLoaded", () => {
  // --- Smooth Scrolling for all CTA buttons ---
  // Select all anchor links that have a `href` starting with '#'
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Prevent the default jump-link behavior
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Use the modern, built-in smooth scroll behavior
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start", // Aligns the top of the target element to the top of the viewport
        });
      }
    });
  });

  // --- Form Submission Logic ---
  const leadForm = document.getElementById("lead-form");
  const submitButton = leadForm.querySelector(".submit-button");
  const formMessage = document.getElementById("form-message");

  // Replace this URL with the actual URL from your Google Apps Script Web App.
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyYYNjNHZkcu4Fx-PZOuJpuM0U7W6hPDcKLA5y3xNesB0AiaxwawjUzSog5aFoQN2B2Lw/exec";

  leadForm.addEventListener("submit", (e) => {
    // Prevent the form from submitting the traditional way (which would reload the page)
    e.preventDefault();

    // --- Provide user feedback ---
    // 1. Disable the button to prevent multiple submissions
    // 2. Change the text to show something is happening
    submitButton.disabled = true;
    submitButton.textContent = "جاري الإرسال...";
    formMessage.style.display = "none"; // Hide any previous messages

    // Use the Fetch API to send the form data
    fetch(SCRIPT_URL, {
      method: "POST",
      body: new FormData(leadForm),
    })
      .then((response) => {
        // The fetch was successful.
        if (response.ok) {
          // Show a success message
          formMessage.textContent = "تم استلام طلبك بنجاح! سنتصل بك قريباً.";
          formMessage.className = "form-message success";

          // Reset the form fields for a clean slate
          leadForm.reset();
        } else {
          // The server responded with an error (e.g., 404, 500)
          throw new Error("حدث خطأ في الشبكة. يرجى المحاولة مرة أخرى.");
        }
      })
      .catch((error) => {
        // The fetch failed entirely (e.g., no internet connection).
        console.error("Error!", error.message);
        formMessage.textContent =
          "فشل إرسال الطلب. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.";
        formMessage.className = "form-message error";
      })
      .finally(() => {
        // This block runs whether the fetch succeeded or failed.
        // It's the perfect place to re-enable the button.
        submitButton.disabled = false;
        submitButton.textContent = "إكمال الطلب";
        formMessage.style.display = "block"; // Make sure the message is visible
      });
  });
});

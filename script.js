document.addEventListener("DOMContentLoaded", () => {
  // --- Smooth Scrolling for all CTA buttons ---
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // --- Form Submission Logic ---
  const leadForm = document.getElementById("lead-form");
  const submitButton = leadForm.querySelector(".submit-button");
  const formMessage = document.getElementById("form-message");

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyYYNjNHZkcu4Fx-PZOuJpuM0U7W6hPDcKLA5y3xNesB0AiaxwawjUzSog5aFoQN2B2Lw/exec";

  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = "جاري الإرسال...";
    formMessage.style.display = "none";

    fetch(SCRIPT_URL, {
      method: "POST",
      body: new FormData(leadForm),
    })
      .then((response) => {
        if (response.ok) {
          // --- THIS IS THE KEY CHANGE ---
          // Instead of showing a message, we redirect to the thank you page.
          window.location.href = "thank-you.html";
        } else {
          throw new Error("حدث خطأ في الشبكة. يرجى المحاولة مرة أخرى.");
        }
      })
      .catch((error) => {
        console.error("Error!", error.message);
        formMessage.textContent =
          "فشل إرسال الطلب. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.";
        formMessage.className = "form-message error";
        formMessage.style.display = "block";
      })
      .finally(() => {
        // This part now only runs if there is an error
        submitButton.disabled = false;
        submitButton.textContent = "إكمال الطلب";
      });
  });
});

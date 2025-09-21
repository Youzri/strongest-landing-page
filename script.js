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
    "https://script.google.com/macros/s/AKfycbxvU4WCf32d7O88S4J5I1JOrnEp_6FSiRcF3Sxu2MFTO_985n9fl30HJd07aFv19kRYiA/exec";

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

  // ===============================================
  // --- NEW: Problem Section Image Slider ---
  // ===============================================
  const sliderImages = document.querySelectorAll(
    "#problem-slider .slider-image"
  );
  let currentImageIndex = 0;

  if (sliderImages.length > 0) {
    setInterval(() => {
      // Hide the current image
      sliderImages[currentImageIndex].classList.remove("active");

      // Calculate the index of the next image
      currentImageIndex = (currentImageIndex + 1) % sliderImages.length;

      // Show the next image
      sliderImages[currentImageIndex].classList.add("active");
    }, 2500); // Change image every 2.5 seconds
  }
});

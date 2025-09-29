document.addEventListener("DOMContentLoaded", () => {
  // ===================================================
  // --- Capture URL Source Parameter ---
  // ===================================================
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const sourceCode = urlParams.get("source");
    const sourceInput = document.getElementById("source");
    if (sourceInput) {
      if (sourceCode) {
        sourceInput.value = sourceCode;
      } else {
        sourceInput.value = "organic";
      }
    }
  } catch (error) {
    console.error("Error capturing source parameter:", error);
    const sourceInput = document.getElementById("source");
    if (sourceInput) {
      sourceInput.value = "error-capturing-source";
    }
  }

  // --- Smooth Scrolling for all CTA buttons ---
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
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

    // ===================================================
    // --- NEW: Client-Side Input Validation ---
    // We check the data before trying to send it.
    // ===================================================
    const nameInput = document.getElementById("name").value.trim();
    const phoneInput = document.getElementById("phone").value.trim();
    const addressInput = document.getElementById("address").value.trim();

    // Rule 1: Validate Name (at least 3 characters)
    if (nameInput.length < 3) {
      formMessage.textContent = "يرجى إدخال اسم صحيح (3 أحرف على الأقل).";
      formMessage.className = "form-message error";
      formMessage.style.display = "block";
      return; // Stop the function here
    }

    // Rule 2: Validate Phone (at least 10 characters and must be numbers)
    const phoneRegex = /^\d{10,}$/; // This checks for 10 or more digits
    if (!phoneRegex.test(phoneInput)) {
      formMessage.textContent =
        "يرجى إدخال رقم هاتف صحيح (10 أرقام على الأقل وبدون حروف).";
      formMessage.className = "form-message error";
      formMessage.style.display = "block";
      return; // Stop the function here
    }

    // Rule 3: Validate Address (at least 3 characters)
    if (addressInput.length < 3) {
      formMessage.textContent = "يرجى إدخال عنوان صحيح (3 أحرف على الأقل).";
      formMessage.className = "form-message error";
      formMessage.style.display = "block";
      return; // Stop the function here
    }
    // --- End of Validation Block ---

    // If all validation checks pass, we proceed to submit the form.
    submitButton.disabled = true;
    submitButton.textContent = "جاري الإرسال...";
    formMessage.style.display = "none";

    fetch(SCRIPT_URL, {
      method: "POST",
      body: new FormData(leadForm),
    })
      .then((response) => {
        if (response.ok) {
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
        submitButton.disabled = false;
        submitButton.textContent = "إكمال الطلب";
      });
  });

  // --- Problem Section Image Slider ---
  const sliderImages = document.querySelectorAll(
    "#problem-slider .slider-image"
  );
  let currentImageIndex = 0;
  if (sliderImages.length > 0) {
    setInterval(() => {
      sliderImages[currentImageIndex].classList.remove("active");
      currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
      sliderImages[currentImageIndex].classList.add("active");
    }, 2500);
  }
});

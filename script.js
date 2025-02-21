document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input_FAQ");
    const headers = document.querySelectorAll(".accordion__header_FAQ");
    const bodies = document.querySelectorAll(".accordion__body_FAQ");
  
    searchInput.addEventListener("keyup", function () {
      const value = searchInput.value.toLowerCase();
      let hasActiveAccordion = false;
      headers.forEach((header) => {
        const question = header.textContent.toLowerCase();
        const isVisible = question.includes(value);
        if (isVisible) {
          header.style.display = "flex";
          if (header.classList.contains("is-active")) {
            header.nextElementSibling.style.display = "flex";
            hasActiveAccordion = true;
          } else {
            header.nextElementSibling.style.display = "none";
          }
        } else {
          header.style.display = "none";
          header.nextElementSibling.style.display = "none";
        }
      });
      if (!hasActiveAccordion) {
        bodies.forEach((body) => {
          body.style.display = "none";
        });
      }
    });
  
    headers.forEach((header) => {
      header.addEventListener("click", function (event) {
        event.preventDefault();
        const isActive = this.classList.contains("is-active");
        headers.forEach((hdr) => hdr.classList.remove("is-active"));
        bodies.forEach((body) => {
          body.classList.remove("is-active_FAQ");
          body.style.display = "none";
        });
        if (!isActive) {
          this.classList.add("is-active");
          this.nextElementSibling.classList.add("is-active_FAQ");
          this.nextElementSibling.style.display = "flex";
        }
      });
    });
  });
  

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("faqForm");
    const phoneInput = document.getElementById("telNo");
    const phoneError = document.getElementById("phoneError");

    function validateIndianPhone(phone) {
        const regex = /^(?:\+91)?[6-9]\d{9}$/; 
        return regex.test(phone);
    }

    phoneInput.addEventListener("input", function () {
        let phoneValue = phoneInput.value.trim();
        if (/^[6-9]\d{9}$/.test(phoneValue)) {
            phoneInput.value =  phoneValue;
        }

        if (validateIndianPhone(phoneInput.value)) {
            phoneError.style.display = "none";
        } else {
            phoneError.style.display = "block";
        }
    });
});
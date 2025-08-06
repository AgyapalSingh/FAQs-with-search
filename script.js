document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input_FAQ");
  const headers = document.querySelectorAll(".accordion__header_FAQ");
  const bodies = document.querySelectorAll(".accordion__body_FAQ");

  const faqData = Array.from(headers).map((header) => ({
    header,
    body: header.nextElementSibling,
    question: header.textContent.trim(),
    answer: header.nextElementSibling?.textContent.trim() || "",
  }));

  const fuse = new Fuse(faqData, {
    keys: ["question", "answer"],
    threshold: 0.5,
  });

  searchInput.addEventListener("keyup", function () {
    const value = searchInput.value.trim();

    if (!value) {
      faqData.forEach(({ header, body }) => {
        header.style.display = "flex";
        body.style.display = "none";
      });
      return;
    }

    const results = fuse.search(value);

    faqData.forEach(({ header, body }) => {
      header.style.display = "none";
      body.style.display = "none";
    });

    results.forEach(({ item }) => {
      item.header.style.display = "flex";
    });
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
      phoneInput.value = phoneValue;
    }

    if (validateIndianPhone(phoneInput.value)) {
      phoneError.style.display = "none";
    } else {
      phoneError.style.display = "block";
    }
  });
});

// FORM

const form = document.getElementById("faqForm");
document.addEventListener("DOMContentLoaded", () => {
  const currentDate = new Date().toISOString().split("T")[0];
  document.getElementById("date").value = currentDate;
});

// Handle Form Submission

form.addEventListener("submit", function (event) {
  event.preventDefault();
  // Show a loading message
  const formResponse = document.getElementById("formResponse");
  formResponse.textContent = "Submitting your response, please wait...";

  const formData = new FormData(this);

  fetch(
    "https://script.google.com/macros/s/AKfycbypItH9eErwNzg0Wa6yZfJj71E9ncVGyZs9ZQ9Xpoh8z7WboKb7BWO3puqrlHVhYGebjA/exec",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.text())
    .then((data) => {
      formResponse.textContent =
        "Thank you! Your submission has been received.";
      form.reset();
      const currentDate = new Date().toISOString().split("T")[0];
      document.getElementById("date").value = currentDate;
      setTimeout(() => {
        formResponse.textContent = "";
      }, 2000);
    })
    .catch((error) => {
      formResponse.textContent =
        "An error occurred while submitting. Please try again.";
    });
});


//  OPEN CONTACT FORM
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("faqModal");
  const openBtn = document.getElementById("openFAQModal");
  const closeBtn = document.getElementById("closeFAQModal");

  openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

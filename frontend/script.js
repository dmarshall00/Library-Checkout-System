let angle = 0;
function rotateBackground() {
  angle += 0.1;
  document.querySelector(".main-bg-1").style.transform = `rotate(${angle}deg)`;
  document.querySelector(".main-bg-2").style.transform = `rotate(${-angle}deg)`;
  requestAnimationFrame(rotateBackground);
}
rotateBackground();

// Form Validation
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.addEventListener("submit", (e) => {
      const username = document.getElementById("username")?.value.trim();
      const password = document.getElementById("password")?.value.trim();

      if (!username || !password) {
        e.preventDefault();
        showError("All fields are required!");
      }
    });
  }
}

function showError(message) {
  const errorBox = document.createElement("div");
  errorBox.className = "error-message";
  errorBox.innerText = message;
  document.querySelector("main").appendChild(errorBox);
  setTimeout(() => errorBox.remove(), 3000);
}

validateForm("login-form");
validateForm("register-form");

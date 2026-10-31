const messages = {
    invalid: "Email or password is incorrect. Please try again.",
    exists: "An account with that email already exists.",
    invalidInput: "Enter a valid email address and a password with at least 12 characters.",
    passwordMismatch: "Passwords do not match. Please try again.",
    created: "Your account was created. Please log in to continue.",
};

const error = new URLSearchParams(window.location.search).get("error");
const success = new URLSearchParams(window.location.search).get("success");
const message = messages[error] || (success ? messages[success] : undefined);
const alert = document.getElementById("auth-message");

if (message && alert) {
    alert.textContent = message;
    alert.classList.remove("hidden");
    if (success === "created") {
        alert.classList.remove("bg-red-100", "text-red-800");
        alert.classList.add("bg-green-100", "text-green-800");
        alert.setAttribute("role", "status");
    }
}

const signupForm = document.querySelector('form[action="/signup"]');

if (signupForm) {
    const password = signupForm.elements.namedItem("password");
    const confirmPassword = signupForm.elements.namedItem("confirmPassword");

    function validatePasswordMatch() {
        confirmPassword.setCustomValidity(
            confirmPassword.value && confirmPassword.value !== password.value
                ? "Passwords do not match."
                : "",
        );
    }

    password.addEventListener("input", validatePasswordMatch);
    confirmPassword.addEventListener("input", validatePasswordMatch);
    signupForm.addEventListener("submit", validatePasswordMatch);

    for (const toggle of signupForm.querySelectorAll("[data-toggle-password]")) {
        toggle.addEventListener("click", () => {
            const input = signupForm.elements.namedItem(toggle.dataset.togglePassword);
            const visible = input.type === "password";
            input.type = visible ? "text" : "password";
            toggle.textContent = visible ? "Hide" : "Show";
            toggle.setAttribute("aria-pressed", String(visible));
        });
    }
}

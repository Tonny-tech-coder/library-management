// ============================================
// DOM ELEMENTS & API CONFIGURATION
// ============================================

// Username input field
const usernameInput = document.getElementById("userName");

// Email input field
const emailInput = document.getElementById("email");

// Password input field
const passwordInput = document.getElementById("password");

// Confirm password input field
const confirmPasswordInput = document.getElementById("confirmPassword");

// Sign-up form element
const signUpForm = document.getElementById("signUpForm");

// Error message display element
const error = document.getElementById("error");

// Form input container for error styling
const formInput = document.getElementById("formInput");

// Base API URL
const API_BASE = "http://localhost:3000/api";

// ============================================
// EVENT LISTENERS - FORM VALIDATION
// ============================================

// Clear error message when user focuses on email field
emailInput.addEventListener("focus", () => {
  error.innerText = "";
  formInput.classList.remove("error");
});

// ============================================
// FORM SUBMISSION HANDLER
// ============================================

// Handle form submission for sign-up
const handleSubmitForm = async (e) => {
  e.preventDefault();

  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirm = confirmPasswordInput.value;

  console.log({
    username,
    password,
    email,
    confirm,
  });

  // Validate that passwords match
  if (password !== confirm) {
    return alert(`password doesn't match`);
  }

  // Send sign-up request to backend
  const response = await fetch(`${API_BASE}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    // Redirect to sign-in page on successful registration
    window.location.href = "/frontend/sign-in/sign-in.html";
  } else {
    // Display error message from server
    const data = await response.json();

    error.innerText = data.message;
    error.style.display = "block";
    formInput.classList.add("error");
  }
};

// Attach form submission handler
signUpForm.addEventListener("submit", handleSubmitForm);

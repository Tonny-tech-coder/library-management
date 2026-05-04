// ============================================
// DOM ELEMENTS & API CONFIGURATION
// ============================================

// Email input field
const emailInput = document.getElementById("email");

// Password input field
const passwordInput = document.getElementById("password");

// Sign-in form element
const signInForm = document.getElementById("signInForm");

// Message display element for errors/success
const message = document.getElementById("message");

// Base API URL
const API_BASE = "http://localhost:3000/api";

// ============================================
// SESSION CHECK - REDIRECT IF ALREADY LOGGED IN
// ============================================

// Check if user is already logged in on page load
document.addEventListener("DOMContentLoaded", () => {
  const session = window.localStorage.getItem("userSession");
  if(session) {
    // User already has a session, could redirect to dashboard
    const user = JSON.parse(session);
  }
})

// ============================================
// SIGN-IN FORM SUBMISSION HANDLER
// ============================================

async function handleSubmitForm(e) {
  const email = emailInput.value;
  const password = passwordInput.value;
  e.preventDefault();
  
  try {
    // Send sign-in request to backend
    const response = await fetch(`${API_BASE}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Get user data from response and store in localStorage
      const userData = await response.json();

      window.localStorage.setItem(
        "userSession",
        JSON.stringify({
          userId: userData.data.id,
          email: userData.data.email,
          username: userData.data.username,
        }),
      );

      // Redirect to home page on successful login
      window.location.href = "/frontend/";
    } else {
      // Display error message from server
      const data = await response.json();
      message.innerText = data.message;
    }
  } catch (error) {
    console.log(error);
  }
}

// Attach form submission handler
signInForm.addEventListener("submit", handleSubmitForm);

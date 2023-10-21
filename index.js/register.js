// Register User

let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let registerBtn = document.getElementById("sign_up");

registerBtn.addEventListener("click", register);
function register(e) {
  e.preventDefault();
  if (username.value === "" || email.value === "" || password.value === "") {
    alert("Please fill in all the fields");
  } else {
    localStorage.setItem("username", username.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);
  }

  setTimeout(() => {
    window.location = "login.html";
  }, 1500);
}
if (cartLength > 0) {
  badgeDom.style.display = "block";
  badgeDom.innerHTML = cartLength;
}

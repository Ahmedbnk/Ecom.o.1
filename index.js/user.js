let userInfo = document.querySelector("#user_info");
let userDom = document.querySelector("#user");
let logoutBtn = document.querySelector("#logout");
let links = document.querySelector("#links");

let username = localStorage.getItem("username");
if (username) {
  links.remove();

  userInfo.style.display = "flex";
  userDom.textContent = username;
}
logoutBtn.addEventListener("click", function () {
  localStorage.clear();
  setTimeout(() => {
    window.location = "register.html";
  }, 1500);
});

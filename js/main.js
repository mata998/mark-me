import { showStudents, updateData } from "./students.js";
import { showTeachers, loadTeachers, validateLogin } from "./teachers.js";
import { openSideBar, closeSideBar } from "./sideNav.js";
const dataBox = document.querySelector(".data-box");
const options = document.querySelectorAll(".data-option");
let userName = localStorage.getItem("userName");

loadTeachers();

// If logged in
if (userName) {
  document.querySelector(".landing-section").remove();
  document.querySelector(".about-section").remove();
  document.querySelector(".login-section").remove();
  document.querySelector(".nav-loggedOut").remove();
  document.querySelector(
    ".userName"
  ).firstElementChild.innerHTML = `Ulogovan kao: ${userName}`;

  // Event listeners for options
  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      const selectedOption = e.target;

      if (selectedOption.classList.contains("selected-option")) {
        return;
      } else {
        options.forEach((x) => x.classList.remove("selected-option"));
        selectedOption.classList.add("selected-option");

        const text = selectedOption.innerHTML.trim();
        if (text == "Studenti") {
          showStudents(dataBox);
        } else if (text == "Demonstratori") {
          showTeachers(dataBox);
        }
      }
    });
  });

  //Log out button
  document.getElementById("log-out-btn").addEventListener("click", () => {
    localStorage.removeItem("userName");
    location.href = "";
  });

  // Show students when page loads
  showStudents(dataBox);
  //
} else {
  document.querySelector(".data-section").remove();
  document.querySelector(".nav-loggedIn").remove();

  document.getElementById("login-btn").addEventListener("click", login);
  function login(e) {
    e.preventDefault();

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username == "" || password == "") {
      alert("Popunite formu!");
      return;
    }

    if (validateLogin(username, password)) {
      localStorage.setItem("userName", username);
      location.href = "";
    } else {
      usernameInput.value = "";
      passwordInput.value = "";
      alert("Losa kombinacija");
      console.log(username, password);
    }
  }
}

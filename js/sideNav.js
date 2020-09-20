function closeSideBar() {
  const sideNav = document.querySelector(".side-nav");
  sideNav.style.transform = "translateX(100%)";
}

function openSideBar() {
  const sideNav = document.querySelector(".side-nav");
  sideNav.style.transform = "translateX(0)";
}

export { openSideBar, closeSideBar };

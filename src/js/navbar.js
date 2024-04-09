document.addEventListener("DOMContentLoaded", function() {
/*Open/close mobile menu*/
let mobileMenuBtn = document.querySelector(".navbar__mobile-menu-button");

function showMobileMenu() {
    let navLinks = document.querySelector(".navbar__links");
    let linkItems = document.querySelectorAll(".navbar__links-item");
  
    //Open mobile menu and change icon
    if (navLinks.classList.toggle("is-open")) {
      mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'; //Close
    } else {
      mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  
    //Close navmenu if one of the link clicked
    for (link of linkItems) {
      link.addEventListener("click", showMobileMenu);
    }
  }
  mobileMenuBtn.addEventListener("click", showMobileMenu);

});
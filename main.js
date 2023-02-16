"use strict";

// Change the background color of the Navbar when scrolling
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
// Change the background opacity of the Home when scrolling
const home = document.querySelector("#home");
const homeHeight = home.getBoundingClientRect().height;
const homeContainer = document.querySelector(".home__container");
const contactMe = document.querySelector(".home__contact");
const contact = document.querySelector("#contact");
// Arrow up visible
const arrowUpBtn = document.querySelector(".arrow-up");
window.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("nav-dark");
    arrowUpBtn.classList.add("visible");
  } else {
    navbar.classList.remove("nav-dark");
    arrowUpBtn.classList.remove("visible");
  }

  homeContainer.style.opacity = 1 - window.scrollY / homeHeight;
});

const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (e) => {
  const dataset = e.target.dataset;
  if (dataset == null) {
    return;
  }

  scrollTo(dataset.link);
  selectNavItems(sectionIds.indexOf(dataset.link));
});

// Toggle menu button on mobile screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
  navbar.classList.toggle("open-dark");
});

// Home - Contact me
contactMe.addEventListener("click", () => {
  scrollTo("#contact");
  selectNavItems(sectionIds.indexOf("#contact"));
});

// Arrow up click event
arrowUpBtn.addEventListener("click", () => {
  scrollTo("#home");
  selectNavItems(sectionIds.indexOf("#home"));
});

const scrollTo = (selector) => {
  const element = document.querySelector(selector);
  const top = element.offsetTop - 60;
  window.scrollTo({ top: top, behavior: "smooth" });
};

// Project
const projectCategory = document.querySelector(".project__categories");
const projectContainer = document.querySelector(".project__list");
const projects = document.querySelectorAll(".project__list__item");
projectCategory.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;

  if (filter == undefined) {
    return;
  }

  // remove selected button and new button select
  const selected = document.querySelector(".category__btn.selected");
  if (selected != null) {
    selected.classList.remove("selected");
  }
  const categoryBtn =
    e.target.nodeName == "BUTTON" ? e.target : e.target.parentNode;
  categoryBtn.classList.add("selected");

  // Category click -> project list animation
  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

const sectionIds = ["#home", "#about", "#skills", "#project", "#contact"];

const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = localStorage.getItem("selectedNavIndex") || 0;
let selectedNavItems = navItems[selectedNavIndex];

const selectNavItems = (index) => {
  const selected = navItems[index];
  if (selected == undefined) {
    return;
  }

  selectedNavItems.classList.remove("active");
  selectedNavItems = selected;
  selectedNavItems.classList.add("active");
};

const observerOption = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    // console.log(entry);
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOption);
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
  if (window.scrollY <= 100) {
    selectedNavIndex = 0;
  } else if (
    Math.ceil(window.scrollY + window.innerHeight) >= document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItems(selectedNavIndex);
});

// Refresh
window.addEventListener("beforeunload", () => {
  localStorage.setItem("selectedNavIndex", selectedNavIndex);
});

// Navbar logo
const navbarLogo = document.querySelector(".navbar__logo");
navbarLogo.addEventListener("click", (e) => {
  selectedNavIndex = 0;
});

window.addEventListener("load", () => {
  selectNavItems(selectedNavIndex);

  if (selectedNavIndex != 0) {
    navbar.classList.add("nav-dark");
  }
});

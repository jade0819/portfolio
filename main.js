'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    // console.log(window.scrollY);
    // console.log(`navbarHeight: ${navbarHeight}`);
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
})

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', () => {
    const target = event.target;
    const link = target.dataset.link;
    if(link == null) return;
    
    console.log(event.target.dataset.link);
    scrollIntoView(link);
})

// Handle click on "contact me" button on home
const contactMe = document.querySelector('.home__contact');
contactMe.addEventListener('click', () => {  
    scrollIntoView('#contact');
})

// Make Home slowly fade to transparent as the window scrolling down
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
const homeContainer = document.querySelector('.home__container');
document.addEventListener('scroll', () => {
    homeContainer.style.opacity = 1 - window.scrollY / homeHeight;
})

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight / 2)
        arrowUp.classList.add('visible');
    else
        arrowUp.classList.remove('visible');
})

// Handle click on the "arrow up" button
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
})

// My work projects
// Handle click on the my work projects category button
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null) return;

    // remove selection from the previous item and select the new one
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');
    setTimeout( () => {
        projects.forEach( (project) => {
            // console.log(project.dataset.type);
            if(filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            }else {
                project.classList.add('invisible');
            }
        })

        projectContainer.classList.remove('anim-out');
    }, 300)

})





function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
}
const navBar = document.querySelector('.main-nav');

window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
        console.log("scroll at the top");
        navBar.style.backgroundColor = 'rgb(255,255,255)';
    }
    else {
        navBar.style.backgroundColor = 'rgb(255,255,255, 0.75)';
    }
})
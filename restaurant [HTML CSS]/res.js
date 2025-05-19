let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

window.addEventListener("load",()=>{
    const loader = document.querySelector(".loader");
    loader.classList.add("loader--hidden");
    loader.addEventListener("transitionend",()=> {
        document.body.removeChild(loader);
    });
});
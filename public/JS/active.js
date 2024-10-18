const NavItems = document.querySelectorAll('.nav-link');
// console.log(NavItems);

const path = window.location.pathname;
console.log(path);
// console.log(item.href);

NavItems.forEach(item =>{
    console.log(item.href);
    if (item.href.includes(path)){
        console.log(item);
        item.classList.add('active');
    }
    else {
        item.classList.remove('active');
    }
})


// document.addEventListener('DOMContentLoaded', function () {
//     const currentPath = window.location.pathname;
//     const navLinks = document.querySelectorAll('.nav-link');

//     navLinks.forEach(link => {
//         const href = link.getAttribute('href');

//         // Use strict equality check
//         if (currentPath === href) {
//             navLinks.forEach(l => l.classList.remove('active'));
//             link.classList.add('active');
//         }
//     });
// });
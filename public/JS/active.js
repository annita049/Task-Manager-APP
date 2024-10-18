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

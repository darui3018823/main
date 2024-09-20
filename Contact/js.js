const hamburgerMenu = document.getElementById('hamburger-menu');
const menu = document.getElementById('menu');

hamburgerMenu.addEventListener('click', () => {
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
});

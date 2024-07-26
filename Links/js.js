document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const menu = document.getElementById('menu');
    const loadingScreen = document.getElementById('loading-screen');

    hamburgerMenu.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'block' : 'none';
    });

    window.addEventListener('beforeunload', () => {
        loadingScreen.style.display = 'flex';
    });

    window.addEventListener('load', () => {
        loadingScreen.style.display = 'none';
    });
});

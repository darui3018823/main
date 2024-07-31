document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 1000);

    const hamburgerMenu = document.getElementById('hamburger-menu');
    const menu = document.getElementById('menu');
    
    hamburgerMenu.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
});

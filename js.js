    const welcomeMessage = document.querySelector('.welcome-message');
    const welcomeSubtitle = document.querySelector('.welcome-subtitle');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const menu = document.getElementById('menu');

    if (welcomeMessage) {
        setTimeout(() => {
            welcomeMessage.classList.add('show');
        }, 100);
    } else {
        console.error('Element with class "welcome-message" not found.');
    }

    if (welcomeSubtitle) {
        setTimeout(() => {
            welcomeSubtitle.classList.add('show');
        }, 780);
    } else {
        console.error('Element with class "welcome-subtitle" not found.');
    }

    hamburgerMenu.addEventListener('click', () => {
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    })
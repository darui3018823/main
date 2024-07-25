document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = document.querySelector('.welcome-message');
    const welcomeSubtitle = document.querySelector('.welcome-subtitle');
    
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
        }, 700);
    } else {
        console.error('Element with class "welcome-subtitle" not found.');
    }
});

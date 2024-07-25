document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = document.querySelector('.welcome-message');
    setTimeout(() => {
        welcomeMessage.classList.add('show');
    }, 100); 
});

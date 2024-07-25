document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = document.querySelector('.welcome-message');
    const welcomeSubtitle = document.getElementById('welcome-subtitle');
    
    setTimeout(() => {
        welcomeMessage.classList.add('show')
    },100); //遅延

    setTimeout(() => {
        welcomeSubtitle.classList.add('show')
    }, 125);
});

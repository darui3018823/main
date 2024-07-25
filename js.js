document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = document.querySelector('.welcome-message');
    setTimeout(() => {
        welcomeMessage.classList.add('show');
    }, 100); //100ms
});

document.addEventListener('DOMContentLoaded', () => {
    const welcomeHeading = document.getElementById('welcome-subtitle');
    setTimeout(() => {
        welcomeHeading.classList.add('show');
    }, 125); // 125ms
});

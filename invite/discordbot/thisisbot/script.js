const termsButton = document.getElementById('termsButton');
const privacyButton = document.getElementById('privacyButton');
const agreeCheckbox = document.getElementById('agreeCheckbox');
const inviteButton = document.getElementById('inviteButton');
const warning = document.getElementById('warning');
const confirmCheckbox = document.getElementById('confirmCheckbox');
const confirmButton = document.getElementById('confirmButton');
const minimalButton = document.getElementById('minimalButton');
const adminButton = document.getElementById('adminButton');
const infoMessage = document.getElementById('infoMessage');

termsButton.addEventListener('click', function() {
    window.open('https://drive.google.com/file/d/1SO5O6sEyU2k53H_8W9mvPDJMKdIZCvK1/view', '_blank');
});

privacyButton.addEventListener('click', function() {
    window.open('https://drive.google.com/file/d/1c6oosnUhk66WX4ciZJ6hkd9crsdvneJb/view', '_blank');
});

agreeCheckbox.addEventListener('change', function() {
    const isChecked = this.checked;
    minimalButton.disabled = !isChecked;
    adminButton.disabled = !isChecked;
    inviteButton.disabled = !isChecked;
    inviteButton.classList.toggle('disabled', !isChecked);
    infoMessage.style.display = isChecked ? 'block' : 'none';
});

minimalButton.addEventListener('click', function() {
    this.classList.add('selected');
    adminButton.classList.remove('selected');
    warning.style.display = 'block';
});

adminButton.addEventListener('click', function() {
    this.classList.add('selected');
    minimalButton.classList.remove('selected');
    warning.style.display = 'none';
});

inviteButton.addEventListener('click', function() {
    let selectedPermission = document.querySelector('.permission-btn.selected');
    if (selectedPermission && selectedPermission.id === 'minimalButton') {
        warning.style.display = 'block';
    } else if (selectedPermission && selectedPermission.id === 'adminButton') {
        window.location.href = 'https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&scope=bot';
    }
});

confirmCheckbox.addEventListener('change', function() {
    confirmButton.disabled = !this.checked;
    confirmButton.classList.toggle('disabled', !this.checked);
});

confirmButton.addEventListener('click', function() {
    window.location.href = 'https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=2048&scope=bot';
});

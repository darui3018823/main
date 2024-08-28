const agreeCheckbox = document.getElementById('agreeCheckbox');
const permissions = document.querySelectorAll('input[name="permissions"]');
const inviteButton = document.getElementById('inviteButton');
const warning = document.getElementById('warning');
const confirmCheckbox = document.getElementById('confirmCheckbox');
const confirmButton = document.getElementById('confirmButton');

agreeCheckbox.addEventListener('change', function() {
    permissions.forEach(permission => {
        permission.disabled = !this.checked;
    });
    inviteButton.disabled = !this.checked;
    inviteButton.classList.toggle('disabled', !this.checked);
});

inviteButton.addEventListener('click', function() {
    let selectedPermission = document.querySelector('input[name="permissions"]:checked');
    if (selectedPermission && selectedPermission.value === 'minimal') {
        warning.style.display = 'block';
    } else if (selectedPermission && selectedPermission.value === 'admin') {
        window.location.href = 'https://discord.com/oauth2/authorize?client_id=1240343650664185886&permissions=8&integration_type=0&scope=bot';
    }
});

confirmCheckbox.addEventListener('change', function() {
    confirmButton.disabled = !this.checked;
    confirmButton.classList.toggle('disabled', !this.checked);
});

confirmButton.addEventListener('click', function() {
    window.location.href = 'https://discord.com/oauth2/authorize?client_id=1240343650664185886&permissions=1126984386476096&integration_type=0&scope=bot';
});

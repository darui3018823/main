const termsButton = document.getElementById('termsButton');
const privacyButton = document.getElementById('privacyButton');
const termsCheckbox = document.getElementById('termsCheckbox');
const privacyCheckbox = document.getElementById('privacyCheckbox');
const agreeCheckbox = document.getElementById('agreeCheckbox');
const inviteButton = document.getElementById('inviteButton');
const warning = document.getElementById('warning');
const confirmCheckbox = document.getElementById('confirmCheckbox');
const confirmButton = document.getElementById('confirmButton');
const minimalButton = document.getElementById('minimalButton');
const adminButton = document.getElementById('adminButton');
const infoMessage = document.getElementById('infoMessage');

// 利用規約とプライバシーポリシーのボタン
termsButton.addEventListener('click', function() {
    window.open('https://drive.google.com/file/d/1SO5O6sEyU2k53H_8W9mvPDJMKdIZCvK1/view', '_blank');
});

privacyButton.addEventListener('click', function() {
    window.open('https://drive.google.com/file/d/1c6oosnUhk66WX4ciZJ6hkd9crsdvneJb/view', '_blank');
});

// チェックボックスに基づいてボタンを有効化/無効化
function updateButtons() {
    const isTermsChecked = termsCheckbox.checked;
    const isPrivacyChecked = privacyCheckbox.checked;
    
    const allChecked = isTermsChecked && isPrivacyChecked;
    minimalButton.disabled = !allChecked;
    adminButton.disabled = !allChecked;
    inviteButton.disabled = !allChecked;
    inviteButton.classList.toggle('disabled', !allChecked);
    infoMessage.style.display = allChecked ? 'block' : 'none';
}

termsCheckbox.addEventListener('change', updateButtons);
privacyCheckbox.addEventListener('change', updateButtons);

// 権限選択ボタンのイベント
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

// 招待ボタンのイベント
inviteButton.addEventListener('click', function() {
    let selectedPermission = document.querySelector('.permission-btn.selected');
    if (selectedPermission && selectedPermission.id === 'minimalButton') {
        window.location.href = 'https://discord.com/oauth2/authorize?client_id=1240343650664185886&permissions=1126984386476096&integration_type=0&scope=bot';
    } else if (selectedPermission && selectedPermission.id === 'adminButton') {
        window.location.href = 'https://discord.com/oauth2/authorize?client_id=1240343650664185886&permissions=8&integration_type=0&scope=bot';
    }
});

// 確認チェックボックスに基づいて続行ボタンを有効化/無効化
confirmCheckbox.addEventListener('change', function() {
    confirmButton.disabled = !this.checked;
    confirmButton.classList.toggle('disabled', !this.checked);
});

// 確認ボタンのイベント
confirmButton.addEventListener('click', function() {
    window.location.href = 'https://discord.com/oauth2/authorize?client_id=1240343650664185886&permissions=1126984386476096&integration_type=0&scope=bot';
});

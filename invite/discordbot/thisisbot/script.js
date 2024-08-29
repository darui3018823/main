document.addEventListener('DOMContentLoaded', function() {
    const minimalButton = document.getElementById('minimalButton');
    const adminButton = document.getElementById('adminButton');
    const inviteButton = document.getElementById('inviteButton');
    const popupWrap = document.getElementById('popupWrap');
    const confirmCheckbox = document.getElementById('confirmCheckbox');
    const confirmButton = document.getElementById('confirmButton');

    minimalButton.addEventListener('click', function() {
        minimalButton.classList.add('selected');
        adminButton.classList.remove('selected');
        inviteButton.disabled = false;
        inviteButton.classList.remove('disabled');
    });

    adminButton.addEventListener('click', function() {
        minimalButton.classList.remove('selected');
        adminButton.classList.add('selected');
        inviteButton.disabled = false;
        inviteButton.classList.remove('disabled');
        window.location.href = 'https://discord.com/oauth2/authorize?client_id=1240343650664185886&permissions=8&integration_type=0&scope=bot';
    });

    inviteButton.addEventListener('click', function() {
        if (minimalButton.classList.contains('selected')) {
            popupWrap.querySelector('#trigger').checked = true;
        } else {
            // 管理者権限ボタンが選択されている場合の処理は不要
        }
    });

    confirmCheckbox.addEventListener('change', function() {
        if (confirmCheckbox.checked) {
            confirmButton.classList.remove('disabled');
            confirmButton.disabled = false;
        } else {
            confirmButton.classList.add('disabled');
            confirmButton.disabled = true;
        }
    });

    confirmButton.addEventListener('click', function() {
        if (minimalButton.classList.contains('selected')) {
            window.location.href = 'https://discord.com/oauth2/authorize?client_id=1240343650664185886&permissions=1126984386476096&integration_type=0&scope=bot';
        }
    });
});

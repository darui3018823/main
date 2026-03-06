window.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const menuModal = document.getElementById('menuModal');
    const closeMenu = document.getElementById('closeMenuModal');

    // モバイルメニュー：モーダル表示切り替え
    hamburger?.addEventListener('click', () => {
        menuModal?.classList.remove('hidden');
    });

    closeMenu?.addEventListener('click', () => {
        menuModal?.classList.add('hidden');
    });
});

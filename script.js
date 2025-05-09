window.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('mainTitle');
    const subtitle = document.getElementById('subTitle');
    const hamburger = document.getElementById('hamburger');
    const menuModal = document.getElementById('menuModal');
    const closeMenu = document.getElementById('closeMenuModal');

    // アニメーション表示処理
    setTimeout(() => {
        title?.classList.remove('opacity-0', 'translate-y-8');
    }, 100);

    setTimeout(() => {
        subtitle?.classList.remove('opacity-0', 'translate-y-8');
    }, 700);

    // モバイルメニュー：モーダル表示切り替え
    hamburger?.addEventListener('click', () => {
        menuModal?.classList.remove('hidden');
    });

    closeMenu?.addEventListener('click', () => {
        menuModal?.classList.add('hidden');
    });
});

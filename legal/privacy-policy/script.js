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

    // モーダル外クリックで閉じる
    menuModal?.addEventListener('click', (e) => {
        if (e.target === menuModal) {
            menuModal.classList.add('hidden');
        }
    });

    // スムーズスクロール（目次リンク用）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

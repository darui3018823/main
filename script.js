window.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const menuBackdrop = document.getElementById('menuBackdrop');

    const setMenuOpen = (isOpen) => {
        document.body.classList.toggle('is-menu-open', isOpen);
        hamburger?.setAttribute('aria-expanded', String(isOpen));
        hamburger?.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
        if (hamburger) {
            hamburger.innerHTML = isOpen ? '&times;' : '&#9776;';
        }
    };

    hamburger?.addEventListener('click', () => {
        setMenuOpen(!document.body.classList.contains('is-menu-open'));
    });

    menuBackdrop?.addEventListener('click', () => {
        setMenuOpen(false);
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setMenuOpen(false);
        }
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const centerPanel = document.getElementById('centerPanel');
    const centerPanelCards = Array.from(document.querySelectorAll('[data-panel-card]'));

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

    let currentCardIndex = 0;
    let isCardAnimating = false;

    const setActiveCard = (cardIndex) => {
        centerPanelCards.forEach((card, index) => {
            card.hidden = index !== cardIndex;
        });
        centerPanel?.classList.toggle('is-profile-card', centerPanelCards[cardIndex]?.dataset.panelCard === 'profile');
    };

    setActiveCard(currentCardIndex);

    const showNextCard = () => {
        if (!centerPanel || centerPanelCards.length === 0 || isCardAnimating || document.body.classList.contains('is-menu-open')) {
            return;
        }

        isCardAnimating = true;
        centerPanel.classList.remove('is-card-entering', 'is-card-exiting');
        centerPanel.classList.add('is-card-exiting');

        window.setTimeout(() => {
            currentCardIndex = (currentCardIndex + 1) % centerPanelCards.length;
            setActiveCard(currentCardIndex);

            centerPanel.classList.remove('is-card-exiting');
            centerPanel.classList.add('is-card-entering');
        }, 1000);

        window.setTimeout(() => {
            centerPanel.classList.remove('is-card-entering');
            isCardAnimating = false;
        }, 1500);
    };

    centerPanel?.addEventListener('click', showNextCard);
    centerPanel?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            showNextCard();
        }
    });
});

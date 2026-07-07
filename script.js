window.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const centerPanel = document.getElementById('centerPanel');
    const centerPanelContent = document.getElementById('centerPanelContent');

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

    const cards = [
        `
            <div class="home-card">
                <h1 class="text-3xl md:text-5xl font-bold">Welcome to daruks.com</h1>
                <p class="mt-4 text-base md:text-xl text-slate-300">Make now this page :)</p>
            </div>
        `,
        `
            <section class="profile-card" aria-label="Profile">
                <h2 class="profile-title">Profile!</h2>
                <div class="profile-layout">
                    <div class="profile-left">
                        <img class="profile-icon" src="/images/this-is-bot_icon.png" alt="">
                        <div>
                            <p class="profile-name">darui3018823</p>
                            <p class="profile-intro">
                                daruks.com を作っている人。Webページ、Bot、ちょっとしたツールを気分で作っています。
                            </p>
                        </div>
                    </div>
                    <div class="profile-right">
                        <ul class="profile-status-list">
                            <li>
                                <span>Playing!</span>
                                <p>気になったゲームや作業BGMをここに出せる欄。</p>
                            </li>
                            <li>
                                <span>Making!</span>
                                <p>いま作っているページ、Bot、実験中の機能など。</p>
                            </li>
                            <li>
                                <span>Notice!</span>
                                <p>更新メモや一言掲示を置けるスペース。</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        `
    ];
    let currentCardIndex = 0;
    let isCardAnimating = false;

    const showNextCard = () => {
        if (!centerPanel || !centerPanelContent || isCardAnimating || document.body.classList.contains('is-menu-open')) {
            return;
        }

        isCardAnimating = true;
        centerPanel.classList.remove('is-card-entering', 'is-card-exiting');
        centerPanel.classList.add('is-card-exiting');

        window.setTimeout(() => {
            currentCardIndex = (currentCardIndex + 1) % cards.length;
            centerPanelContent.innerHTML = cards[currentCardIndex];

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

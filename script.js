window.addEventListener('DOMContentLoaded', () => {
    const LANYARD_USER_ID = '973782871963762698';
    const hamburger = document.getElementById('hamburger');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const centerPanel = document.getElementById('centerPanel');
    const centerPanelCards = Array.from(document.querySelectorAll('[data-panel-card]'));
    const lanyardPresence = document.querySelector('[data-lanyard-presence]');
    const lanyardAvatar = document.querySelector('[data-lanyard-avatar]');
    const lanyardStatus = document.querySelector('[data-lanyard-status]');
    const lanyardName = document.querySelector('[data-lanyard-name]');
    const lanyardCustomStatus = document.querySelector('[data-lanyard-custom-status]');
    const lanyardCustomEmoji = document.querySelector('[data-lanyard-custom-emoji]');
    const lanyardRpc = document.querySelector('[data-lanyard-rpc]');

    const getDiscordAvatarUrl = (user) => {
        if (!user?.id || !user?.avatar) {
            return '/images/this-is-bot_icon.png';
        }

        const extension = user.avatar.startsWith('a_') ? 'gif' : 'png';
        return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}?size=128`;
    };

    const formatCustomStatus = (activity) => {
        if (!activity) {
            return 'No custom status';
        }

        return activity.state || activity.name || 'Custom Status';
    };

    const setCustomEmoji = (emoji) => {
        if (!lanyardCustomEmoji) {
            return;
        }

        if (!emoji?.id) {
            lanyardCustomEmoji.hidden = true;
            lanyardCustomEmoji.removeAttribute('src');
            return;
        }

        const extension = emoji.animated ? 'gif' : 'png';
        lanyardCustomEmoji.src = `https://cdn.discordapp.com/emojis/${emoji.id}.${extension}?size=32`;
        lanyardCustomEmoji.hidden = false;
    };

    const formatRpc = (activity) => {
        if (!activity) {
            return 'RPC: none';
        }

        const summary = [activity.name, activity.details, activity.state]
            .filter(Boolean)
            .join(' - ');
        return `RPC: ${summary}`;
    };

    const setLanyardStatus = (status) => {
        if (!lanyardStatus) {
            return;
        }

        const normalizedStatus = ['online', 'idle', 'dnd', 'offline'].includes(status) ? status : 'offline';
        lanyardStatus.className = `discord-status-dot is-${normalizedStatus}`;
        lanyardStatus.setAttribute('aria-label', `Discord status: ${normalizedStatus}`);
    };

    const updateLanyardPresence = async () => {
        if (!lanyardPresence) {
            return;
        }

        try {
            const response = await fetch(`https://api.lanyard.rest/v1/users/${LANYARD_USER_ID}`);
            if (!response.ok) {
                throw new Error(`Lanyard request failed: ${response.status}`);
            }

            const payload = await response.json();
            if (!payload.success || !payload.data) {
                throw new Error('Lanyard response was not successful.');
            }

            const { discord_user: user, discord_status: status, activities = [] } = payload.data;
            const customStatus = activities.find((activity) => activity.type === 4);
            const rpcActivity = activities.find((activity) => activity.type !== 4 && activity.name !== 'Spotify');

            if (lanyardAvatar) {
                lanyardAvatar.src = getDiscordAvatarUrl(user);
            }
            if (lanyardName) {
                lanyardName.textContent = user?.display_name || user?.global_name || user?.username || 'darui3018823';
            }
            if (lanyardCustomStatus) {
                lanyardCustomStatus.textContent = formatCustomStatus(customStatus);
            }
            setCustomEmoji(customStatus?.emoji);
            if (lanyardRpc) {
                lanyardRpc.textContent = formatRpc(rpcActivity);
            }

            setLanyardStatus(status);
        } catch (error) {
            if (lanyardCustomStatus) {
                lanyardCustomStatus.textContent = 'Discord status unavailable';
            }
            if (lanyardRpc) {
                lanyardRpc.textContent = 'RPC: unavailable';
            }
            setCustomEmoji(null);
            setLanyardStatus('offline');
            console.error(error);
        }
    };

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
    let isCardLocked = false;

    const setActiveCard = (cardIndex) => {
        centerPanelCards.forEach((card, index) => {
            card.hidden = index !== cardIndex;
        });
        centerPanel?.classList.toggle('is-profile-card', centerPanelCards[cardIndex]?.dataset.panelCard === 'profile');
    };

    setActiveCard(currentCardIndex);

    const showNextCard = () => {
        if (!centerPanel || centerPanelCards.length === 0 || isCardAnimating || isCardLocked || document.body.classList.contains('is-menu-open')) {
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
            isCardLocked = centerPanelCards[currentCardIndex]?.dataset.panelCard === 'profile';
            centerPanel.classList.toggle('is-card-locked', isCardLocked);
            if (isCardLocked) {
                centerPanel.removeAttribute('role');
                centerPanel.removeAttribute('tabindex');
            }
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

    updateLanyardPresence();
});

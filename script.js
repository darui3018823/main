window.addEventListener('DOMContentLoaded', () => {
    const LANYARD_USER_ID = '973782871963762698';
    const hamburger = document.getElementById('hamburger');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const sidePanelContactLink = document.getElementById('sidePanelContactLink');
    const centerPanel = document.getElementById('centerPanel');
    const centerPanelCards = Array.from(document.querySelectorAll('[data-panel-card]'));
    const typewriterTargets = Array.from(document.querySelectorAll('[data-typewriter]'));
    const homeCardPrompt = document.querySelector('.home-card-prompt');
    const lanyardPresence = document.querySelector('[data-lanyard-presence]');
    const lanyardAvatar = document.querySelector('[data-lanyard-avatar]');
    const lanyardProfileIcon = document.querySelector('[data-lanyard-profile-icon]');
    const lanyardStatus = document.querySelector('[data-lanyard-status]');
    const lanyardName = document.querySelector('[data-lanyard-name]');
    const lanyardCustomStatus = document.querySelector('[data-lanyard-custom-status]');
    const lanyardCustomEmoji = document.querySelector('[data-lanyard-custom-emoji]');
    const lanyardRpc = document.querySelector('[data-lanyard-rpc]');
    const lanyardRpcText = document.querySelector('[data-lanyard-rpc-text]');

    const DISCORD_DEFAULT_AVATAR = 'https://cdn.discordapp.com/embed/avatars/1.png';
    const typewriterItems = typewriterTargets.map((target) => ({
        target,
        text: target.textContent.trim(),
    }));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const sleep = (ms) => new Promise((resolve) => {
        window.setTimeout(resolve, ms);
    });

    const playWelcomeTypewriter = async () => {
        if (typewriterItems.length === 0) {
            return;
        }

        if (prefersReducedMotion) {
            typewriterItems.forEach(({ target, text }) => {
                target.textContent = text;
            });
            return;
        }

        await sleep(260);

        for (const [index, { target, text }] of typewriterItems.entries()) {
            if (index === 1) {
                // 見出しを打ち終えてから、改行して次の行へ移る間を置く
                await sleep(420);
                homeCardPrompt?.classList.remove('is-typewriter-waiting');
            }

            target.classList.add('is-typing');

            for (const character of text) {
                target.textContent += character;
                await sleep(character === ' ' ? 24 : 42);
            }

            await sleep(180);
            target.classList.remove('is-typing');
        }
    };

    if (!prefersReducedMotion) {
        typewriterItems.forEach(({ target }) => {
            target.textContent = '';
        });
        homeCardPrompt?.classList.add('is-typewriter-waiting');
    }

    const getDiscordAvatarUrl = (user) => {
        if (!user?.id || !user?.avatar) {
            return DISCORD_DEFAULT_AVATAR;
        }

        const extension = user.avatar.startsWith('a_') ? 'gif' : 'png';
        return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}?size=256`;
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
            return 'No activity';
        }

        return [activity.name, activity.details, activity.state]
            .filter(Boolean)
            .join(' - ');
    };

    const refreshRpcScroll = () => {
        if (!lanyardRpc || !lanyardRpcText) {
            return;
        }

        lanyardRpc.classList.remove('is-scrolling');
        lanyardRpc.style.removeProperty('--rpc-scroll-distance');

        const overflow = lanyardRpcText.scrollWidth - lanyardRpc.clientWidth;
        if (overflow > 1) {
            lanyardRpc.style.setProperty('--rpc-scroll-distance', `-${overflow}px`);
            lanyardRpc.classList.add('is-scrolling');
        }
    };

    const setRpcText = (text) => {
        if (lanyardRpcText) {
            lanyardRpcText.textContent = text;
        }
        window.requestAnimationFrame(refreshRpcScroll);
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

            const avatarUrl = getDiscordAvatarUrl(user);
            if (lanyardAvatar) {
                lanyardAvatar.src = avatarUrl;
            }
            if (lanyardProfileIcon) {
                lanyardProfileIcon.src = avatarUrl;
            }
            if (lanyardName) {
                lanyardName.textContent = user?.display_name || user?.global_name || user?.username || 'darui3018823';
            }
            if (lanyardCustomStatus) {
                lanyardCustomStatus.textContent = formatCustomStatus(customStatus);
            }
            setCustomEmoji(customStatus?.emoji);
            setRpcText(formatRpc(rpcActivity));

            setLanyardStatus(status);
        } catch (error) {
            if (lanyardCustomStatus) {
                lanyardCustomStatus.textContent = 'Discord status unavailable';
            }
            setRpcText('Unavailable');
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
        if (!isOpen) {
            sidePanelContactLink?.classList.remove('is-contact-highlighted');
        }
    };

    const highlightSidePanelContact = () => {
        if (!sidePanelContactLink) {
            return;
        }

        sidePanelContactLink.classList.remove('is-contact-highlighted');
        window.setTimeout(() => {
            sidePanelContactLink.classList.add('is-contact-highlighted');
        }, 180);
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
        // 非表示中は幅が測れないため、カードが表示されたタイミングで測り直す
        window.requestAnimationFrame(refreshRpcScroll);
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

    document.querySelectorAll('.profile-links a[href="/contact/"]').forEach((profileContactLink) => {
        profileContactLink.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            setMenuOpen(true);
            highlightSidePanelContact();
        });
    });

    window.addEventListener('resize', refreshRpcScroll);

    updateLanyardPresence();
    window.setInterval(updateLanyardPresence, 30000);
    window.addEventListener('load', playWelcomeTypewriter, { once: true });
});

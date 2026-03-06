window.addEventListener('DOMContentLoaded', () => {
    const config = window.CONTACT_PAGE_CONFIG;

    if (!config || !config.category) {
        console.error('Missing CONTACT_PAGE_CONFIG');
        return;
    }

    const hamburger = document.getElementById('hamburger');
    const menuModal = document.getElementById('menuModal');
    const closeMenu = document.getElementById('closeMenuModal');

    hamburger?.addEventListener('click', () => {
        menuModal?.classList.remove('hidden');
    });

    closeMenu?.addEventListener('click', () => {
        menuModal?.classList.add('hidden');
    });

    const pageTitle = document.getElementById('pageTitle');
    const pageDescription = document.getElementById('pageDescription');
    const categoryInput = document.getElementById('categoryInput');
    const subcategorySelect = document.getElementById('subcategorySelect');
    const contactForm = document.getElementById('contactForm');
    const formCard = document.getElementById('formCard');
    const directContactCard = document.getElementById('directContactCard');
    const directContactLink = document.getElementById('directContactLink');

    pageTitle.textContent = config.title;
    pageDescription.textContent = config.description || '';
    categoryInput.value = config.category;

    if (config.formspreeId) {
        contactForm.action = `https://formspree.io/${config.formspreeId}`;
        contactForm.method = 'POST';
    }

    subcategorySelect.innerHTML = '<option value="">選択してください</option>';
    (config.subcategories || []).forEach((subcategory) => {
        const option = document.createElement('option');
        option.value = subcategory;
        option.textContent = subcategory;
        subcategorySelect.appendChild(option);
    });

    const subcategoryWrapper = subcategorySelect.parentElement;
    if (!config.subcategories || config.subcategories.length === 0) {
        subcategoryWrapper.style.display = 'none';
    }

    if (config.isDirectContact) {
        formCard.classList.add('hidden');
        directContactCard.classList.remove('hidden');
        directContactLink.href = config.directContactUrl || 'https://corp.daruks.com/';
    } else {
        formCard.classList.remove('hidden');
        directContactCard.classList.add('hidden');
    }

    const replyMethodSelect = document.getElementById('replyMethodSelect');
    const replyEmailInput = document.getElementById('reply_email');
    const replyDiscordInput = document.getElementById('reply_discord');
    const replySnsTextarea = document.getElementById('reply_sns');
    const emailContainer = document.getElementById('email_container');
    const discordContainer = document.getElementById('discord_container');
    const snsContainer = document.getElementById('sns_container');

    const updateReplyInputs = () => {
        [emailContainer, discordContainer, snsContainer].forEach((el) => {
            el.classList.add('hidden');
        });

        [replyEmailInput, replyDiscordInput, replySnsTextarea].forEach((el) => {
            el.disabled = true;
            el.value = '';
        });

        const selectedValue = replyMethodSelect.value;
        if (selectedValue === 'email') {
            emailContainer.classList.remove('hidden');
            replyEmailInput.disabled = false;
        } else if (selectedValue === 'discord') {
            discordContainer.classList.remove('hidden');
            replyDiscordInput.disabled = false;
        } else if (selectedValue === 'other_sns') {
            snsContainer.classList.remove('hidden');
            replySnsTextarea.disabled = false;
        }
    };

    replyMethodSelect?.addEventListener('change', updateReplyInputs);
});

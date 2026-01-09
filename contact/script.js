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

    // Contact Form Category Selection
    const categoryBtns = document.querySelectorAll('.category-btn');
    const categoriesSection = document.getElementById('categoriesSection');
    const formSection = document.getElementById('formSection');
    const backBtn = document.getElementById('backBtn');
    const contactForm = document.getElementById('contactForm');
    const categoryInput = document.getElementById('categoryInput');
    const ahosinetMessage = document.getElementById('ahosinetMessage');

    const categoryData = {
        thisbot: {
            title: 'This is bot Services へのお問い合わせ',
            description: '機能・使用方法・不具合報告などがございましたら、お気軽にお問い合わせください。',
            formspreeId: 'f/xdaanaya',
            subcategories: [
                '機能について',
                '使用方法について',
                '不具合報告',
                'その他'
            ]
        },
        siteissue: {
            title: 'サイトの問題に関するお問い合わせ',
            description: 'このサイトの不具合やエラーを報告してください。',
            formspreeId: 'f/xdaanaya',
            subcategories: [
                '表示が崩れている',
                'リンクが切れている',
                'ページが開かない',
                'その他の問題'
            ]
        },
        sitefunc: {
            title: 'サイトの機能に関するお問い合わせ',
            description: '機能追加のご提案やご要望をお聞かせください。',
            formspreeId: 'f/xdaanaya',
            subcategories: [
                '機能追加のご提案',
                '改善のご提案',
                'デザインについて',
                'その他のご要望'
            ]
        },
        otherbot: {
            title: 'This is bot Services以外のDiscord Botについて',
            description: 'その他のDiscord Botに関するお問い合わせ、ご要望をお受けしています。',
            formspreeId: 'f/xdaanaya',
            subcategories: [
                '機能について',
                '使用方法について',
                '不具合報告',
                'その他'
            ]
        },
        personal: {
            title: 'darui3018823個人へのお問い合わせ',
            description: '個人的なご質問やご連絡はこちらからお願いします。',
            formspreeId: 'f/xdaanaya',
            subcategories: [
                'コラボレーション相談',
                '出演依頼',
                'ビジネス相談',
                'その他'
            ]
        },
        ahoshinet: {
            title: 'Ahoshinet Groupsに関するお問い合わせ',
            description: '',
            isDirectContact: true
        }
    };

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            const data = categoryData[category];

            categoryInput.value = category;
            document.getElementById('formTitle').textContent = data.title;
            document.getElementById('formDesc').textContent = data.description;

            // Update subcategory options
            const subcategorySelect = document.getElementById('subcategorySelect');
            subcategorySelect.innerHTML = '<option value="">選択してください</option>';
            if (data.subcategories) {
                data.subcategories.forEach(subcat => {
                    const option = document.createElement('option');
                    option.value = subcat;
                    option.textContent = subcat;
                    subcategorySelect.appendChild(option);
                });
                subcategorySelect.parentElement.style.display = 'block';
            } else {
                subcategorySelect.parentElement.style.display = 'none';
            }

            // Update form action if it's Formspree
            if (data.formspreeId) {
                contactForm.action = `https://formspree.io/${data.formspreeId}`;
                contactForm.method = 'POST';
            }

            // Show/hide Ahoshinet message
            if (category === 'ahoshinet') {
                ahosinetMessage.classList.remove('hidden');
                contactForm.parentElement.style.display = 'none';
            } else {
                ahosinetMessage.classList.add('hidden');
                contactForm.parentElement.style.display = 'block';
            }

            categoriesSection.classList.add('hidden');
            formSection.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    backBtn?.addEventListener('click', () => {
        categoriesSection.classList.remove('hidden');
        formSection.classList.add('hidden');
        contactForm.reset();
        categoryInput.value = '';
    });

    // Form submission handling
    contactForm?.addEventListener('submit', (e) => {
        // Formspreeに送信されます
        // 必要に応じてここで追加の処理を行えます
    });

    // 返信方法の選択ハンドラー
    const replyMethodSelect = document.getElementById('replyMethodSelect');
    const replyEmailInput = document.getElementById('reply_email');
    const replyDiscordInput = document.getElementById('reply_discord');
    const replySnsTextarea = document.getElementById('reply_sns');
    const emailContainer = document.getElementById('email_container');
    const discordContainer = document.getElementById('discord_container');
    const snsContainer = document.getElementById('sns_container');

    const updateReplyInputs = () => {
        // すべてのcontainerを非表示・disabledにする
        [emailContainer, discordContainer, snsContainer].forEach(el => {
            el.classList.add('hidden');
        });
        [replyEmailInput, replyDiscordInput, replySnsTextarea].forEach(el => {
            el.disabled = true;
            el.value = '';
        });

        // 選択されたオプションに対応するcontainerとinput/textareaを表示
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

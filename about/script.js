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

function transitionTo(id, url) {
    const el = document.getElementById(id);
    if (!el) return;

    const openLink = () => {
        if (id === 'typescript') {
            const randomNum = Math.floor(Math.random() * 3);
            const targetUrl = randomNum === 0
                ? 'https://github.com/kurehajime/typoscript'
                : url;
            window.open(targetUrl, '_blank', 'noopener,noreferrer');
        } else {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openLink();
    });

    const li = el.closest('li');
    if (li) {
        try { li.style.cursor = 'pointer'; } catch {}
        li.addEventListener('click', (e) => {
            e.preventDefault();
            openLink();
        });
    }
}

// definition for transitionTo()
transitionTo('golang', 'https://go.dev/');
transitionTo('python', 'https://www.python.org/');
transitionTo('rust', 'https://www.rust-lang.org/ja/');
transitionTo('mdn', 'https://developer.mozilla.org/ja/');
transitionTo('nextjs', 'https://nextjs.org/');
transitionTo('typescript', 'https://www.typescriptlang.org/');

transitionTo('vscode', 'https://code.visualstudio.com/');
transitionTo('github', 'https://github.com/');
transitionTo('git', 'https://git-scm.com/');
transitionTo('pwsh', 'https://learn.microsoft.com/ja-jp/powershell/')
transitionTo('twcss', 'https://tailwindcss.com/');
transitionTo('dotnet', 'https://dotnet.microsoft.com/ja-jp/');
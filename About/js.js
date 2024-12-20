document.addEventListener('DOMContentLoaded', () => {
    // ローディング画面の非表示
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 1000);

    // ハンバーガーメニューの動作
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const menu = document.getElementById('menu');
    hamburgerMenu.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    // コンソール風テキストアニメーション
    const line1 = "Hello, welcome to our page!";
    const line2 = "We are happy to have you here.";
    const displayLine1 = document.getElementById("line1");
    const displayLine2 = document.getElementById("line2");

    // 1.5秒後に一行目を表示
    setTimeout(() => {
        displayLine1.textContent = "> " + line1;
    }, 1500);

    // 2.5秒後に二行目を表示
    setTimeout(() => {
        displayLine2.textContent = "> " + line2;
    }, 2500);
});

window.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('mainTitle');
    const subtitle = document.getElementById('subTitle');
    const menu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
  
    // アニメーション表示処理
    setTimeout(() => {
      title?.classList.remove('opacity-0', 'translate-y-8');
    }, 100);
  
    setTimeout(() => {
      subtitle?.classList.remove('opacity-0', 'translate-y-8');
    }, 700);
  
    // モバイルメニュー切り替え
    hamburger?.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  });
  
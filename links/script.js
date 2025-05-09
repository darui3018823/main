const hamburger = document.getElementById('hamburger');
const menuModal = document.getElementById('menuModal');
const closeMenu = document.getElementById('closeMenuModal');

hamburger?.addEventListener('click', () => {
  menuModal.classList.remove('hidden');
});

closeMenu?.addEventListener('click', () => {
  menuModal.classList.add('hidden');
});

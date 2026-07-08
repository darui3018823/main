document.querySelectorAll('.project-row').forEach((row) => {
    const link = row.querySelector('.project-link');
    if (!link) return;
    row.addEventListener('click', (event) => {
        if (event.target.closest('a')) return;
        const selection = window.getSelection();
        if (selection && selection.toString() !== '') return;
        link.click();
    });
});
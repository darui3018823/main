document.querySelectorAll('.project-row').forEach((row) => {
    const link = row.querySelector('.project-link');
    if (!link) return;
    row.addEventListener('click', (event) => {
        if (event.target.closest('a')) return;
        const selection = window.getSelection();
        if (selection && selection.toString() !== '') return;
        if (event.metaKey || event.ctrlKey) {
            window.open(link.href, '_blank', 'noopener,noreferrer');
            return;
        }
        link.click();
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const pageTitle = document.getElementById('page-title');
    const pageContent = document.getElementById('page-content');

    if (pageTitle && pageContent) {
        fetch('../page1.json')
            .then(response => response.json())
            .then(data => {
                pageTitle.textContent = data["1"];
                pageContent.textContent = data["2"];
                pageContent.textContent = data["3"];
                pageTitle.classList.add('animate');
                pageContent.classList.add('animate');
                pageContent.classList.add('animate');
            })
            .catch(error => console.error('Error loading JSON:', error));
    }
});

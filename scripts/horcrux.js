document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.diary, .locket, .nagini, .ring, .diadem, .cup');
    let collectedCount = 0;
    const totalItems = items.length;

    items.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.add('fade-out');
            collectedCount++;

            // Check if all items are collected
            if (collectedCount === totalItems) {
                const message = document.createElement('div');
                message.className = 'success-message';
                message.textContent = 'All Horcruxes Collected!';
                document.body.appendChild(message);

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }
        });
    });

    const item_containers = document.querySelectorAll('.diary-container, .locket-container, .nagini-container, .ring-container, .diadem-container, .cup-container')
    let top_heights = Array(6).fill().map((_, index) => 20 + index * 12);
    let left_heights = Array(6).fill().map((_, index) => 10 + index * 15);

    top_heights = top_heights.sort(() => Math.random() - 0.5);
    left_heights = left_heights.sort(() => Math.random() - 0.5);

    item_containers.forEach((container, index) => {
        container.style.top = `${top_heights[index]}vh`;
        container.style.left = `${left_heights[index]}vw`;

        console.log(container, container.style.top, container.style.left)
    });


}); 
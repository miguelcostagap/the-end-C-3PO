function showNotification(message, type) {
    // Create a div element for the notification
    const notification = document.createElement('div');
    notification.className = `notification ${type} active`;
    notification.textContent = message;

    // Append the notification to the body
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000); // time shown (measured in ms)
}


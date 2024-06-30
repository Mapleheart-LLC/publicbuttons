document.getElementById('tweetForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const tweet = document.getElementById('tweetInput').value;
    const button = document.querySelector('button[type="submit"]');
    const responseMessage = document.getElementById('responseMessage');
    const url = `https://trigger.macrodroid.com/20105183-0b4f-4260-9f8d-33e02ade21ca/x?tweet=${encodeURIComponent(tweet)}`;

    button.disabled = true;
    button.innerText = 'Sending...';

    fetch(url)
        .then(response => response.text())
        .then(data => {
            responseMessage.innerText = 'Tweet sent successfully!';
            document.getElementById('tweetInput').value = '';
            button.innerText = 'Sent!';
            setTimeout(() => {
                button.disabled = false;
                button.innerText = 'Send';
            }, 2000);
        })
        .catch(error => {
            responseMessage.innerText = 'Failed to send tweet. Please try again.';
            button.disabled = false;
            button.innerText = 'Send';
        });
});

document.getElementById('clickerButton').addEventListener('click', function() {
    fetch('https://trigger.macrodroid.com/20105183-0b4f-4260-9f8d-33e02ade21ca/clicker', {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            showNotification('Clicker triggered successfully!', 'success');
        } else {
            showNotification('Failed to trigger clicker.', 'error');
        }
    })
    .catch(error => {
        showNotification('Error: ' + error, 'error');
    });
});

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.backgroundColor = type === 'success' ? '#4caf50' : '#f44336';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

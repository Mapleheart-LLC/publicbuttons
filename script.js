document.getElementById('tweetForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const tweet = document.getElementById('tweetInput').value;
    const button = document.querySelector('button');
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
                button.innerText = 'Tweet';
            }, 2000);
        })
        .catch(error => {
            responseMessage.innerText = 'Failed to send tweet. Please try again.';
            button.disabled = false;
            button.innerText = 'Tweet';
        });
});

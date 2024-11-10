document.addEventListener('DOMContentLoaded', () => {
    const tweetButton = document.getElementById('tweetButton');
    const noteButton = document.getElementById('noteButton');
    const linkButton = document.getElementById('linkButton');

    const tweetDialog = document.getElementById('tweetDialog');
    const noteDialog = document.getElementById('noteDialog');
    const linkDialog = document.getElementById('linkDialog');

    tweetButton.addEventListener('click', () => {
        tweetDialog.classList.remove('hidden');
    });

    noteButton.addEventListener('click', () => {
        noteDialog.classList.remove('hidden');
    });

    linkButton.addEventListener('click', () => {
        linkDialog.classList.remove('hidden');
    });

    document.getElementById('cancelTweetButton').addEventListener('click', () => {
        tweetDialog.classList.add('hidden');
    });

    document.getElementById('cancelNoteButton').addEventListener('click', () => {
        noteDialog.classList.add('hidden');
    });

    document.getElementById('cancelLinkButton').addEventListener('click', () => {
        linkDialog.classList.add('hidden');
    });

    document.getElementById('sendTweetButton').addEventListener('click', () => {
        const tweetText = document.getElementById('tweetInput').value;
        const url = `https://tinyurl.com/yu99rgjb/tweet?text=${encodeURIComponent(tweetText)}`;
        fetch(url, { method: 'POST' })
            .then(response => response.ok ? showNotification('Tweet sent successfully!', 'success') : showNotification('Failed to send tweet.', 'error'))
            .catch(error => showNotification('Error: ' + error, 'error'));
        tweetDialog.classList.add('hidden');
    });

    document.getElementById('sendNoteButton').addEventListener('click', () => {
        const noteText = document.getElementById('noteInput').value;
        const url = `https://tinyurl.com/yu99rgjb/note?text=${encodeURIComponent(noteText)}`;
        fetch(url, { method: 'POST' })
            .then(response => response.ok ? showNotification('Note sent successfully!', 'success') : showNotification('Failed to send note.', 'error'))
            .catch(error => showNotification('Error: ' + error, 'error'));
        noteDialog.classList.add('hidden');
    });

    document.getElementById('sendLinkButton').addEventListener('click', () => {
        const linkUrl = document.getElementById('linkInput').value;
        const url = `https://trigger.macrodroid.com/834a628e-a605-4607-8ecf-d36b504db193/sent?url=${encodeURIComponent(linkUrl)}`;
        fetch(url, { method: 'POST' })
            .then(response => response.ok ? showNotification('Link sent successfully!', 'success') : showNotification('Failed to send link.', 'error'))
            .catch(error => showNotification('Error: ' + error, 'error'));
        linkDialog.classList.add('hidden');
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

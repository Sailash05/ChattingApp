let stompClient = null;

function connect() {
    const socket = new SockJS('/connect');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);

        // Subscribe to the topic for receiving messages
        stompClient.subscribe('/topic/greetings', function (greeting) {
            showMessage(JSON.parse(greeting.body).message);
        });
    });
}

function sendMessage() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();

    if (name && stompClient) {
        stompClient.send('/app/hello', {}, JSON.stringify({ 'name': name }));
        nameInput.value = ''; // Clear input field
    } else {
        alert('Please enter a name');
    }
}

function showMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
}

// Connect on page load
window.onload = connect;

const socket = io();

let userName;
let textarea = document.querySelector('#textarea');
let messagePlace = document.querySelector('.message_place');
do {
  userName = prompt('Please ener your name: ');
} while(!userName);

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    const msg = {
        user: userName,
        message: message.trim()
    }
    addMessage(msg,'outgoing');
    textarea.value = '';
    scrollToBottom();

    socket.emit('message', msg);
}

function addMessage(user,type)  {
    let elem = document.createElement('div');
    let className = type;
    elem.classList.add(className, 'message');
    let messageContent = `
    <h4>${user.user}</h4>
    <p>${user.message}</p>`;

    elem.innerHTML = messageContent;

    messagePlace.appendChild(elem);
}

socket.on('message',(msg) => {
    addMessage(msg, 'incoming')
    scrollToBottom()
});

function scrollToBottom() {
  messagePlace.scrollTop = messagePlace.scrollHeight
};
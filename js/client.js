const socket= io('http://localhost:8000');
const form=document.getElementById('send-container');
const messageInput=document.getElementById('msginp');
const messageContainer=document.querySelector(".container");
//audio play on 
var audio=new Audio('chat.mp3');
//append function in to container
const append=(message, position) =>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
    audio.play();
    } 
}
//ask new user fo name
form.addEventListener('submit',(e)=>{
e.preventDefault();
const message=messageInput.value;
append(`You: ${message}`,'right');
socket.emit('send',message);
messageInput.value='';


})
const names=prompt("enter your name");
//new user joined
socket.emit("new-user-joined",names);
socket.on('user-joined',names=>{
append(`${names} joined the chat`,'right');
})
//receiving msg
socket.on('receive',data=>{
    append(`${data.names}: ${data.message}`,'left')
})
//disconnect
socket.on('left',name=>{
    append(`${name} left the chat`,'left');
})

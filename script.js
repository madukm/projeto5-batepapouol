let userName;

const chatContainer = document.querySelector('.chat-container');
    

axios.defaults.headers.common['Authorization'] = 'BgNaMGjpbxSXb08gFSR5X5hg';

login();

const connectionInterval = setInterval(checkConnection, 5000);

const updateChatInterval = setInterval(updateChat, 3000);

const userInput = document.getElementById("input-message");

userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("btn").click();
    }
});

function login() {
    userName = String(prompt('Qual seu nome?'));    
    const res = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants',
    {
        name: userName
    })
    .then(data => {
        console.log(data);
        alert("Você está conectado!");
        updateChat();
    })
    .catch(error =>{
        console.log(error.response);
        alert('Usuário já logado. Tente novamente');
        window.location.reload();
    })
}


function checkConnection(){
    const res = axios.post('https://mock-api.driven.com.br/api/vm/uol/status',
    {
        name: userName
    })
    .catch(error =>{
        alert("Você foi desconectado");
        window.location.reload();
    })
}


function clearChat(){
    chatContainer.innerHTML = "";
}

function updateChat(){
    const res = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages')
    .then(data => {
        clearChat();
        displayMessages(data);
    })
}

function displayMessages(res){
    for(let i=0; i<100; i++){
        displaySingleMessage(res.data[i]);
    }
    const scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
}


function displaySingleMessage(res){
    const message = document.createElement('div');
    message.classList.add('message');
    message.setAttribute('data-test', 'message');
    message.innerHTML = "";
    message.innerHTML += `
        <span class="time"> ${res.time} </span>
        ` + "&nbsp" + `<span class="bold"> ${res.from} </span>
        <span> para <span/>
        <span class="bold"> ${res.to}: </span>
        <span> ${res.text}</span>
    `;
    if(res.type === "status"){
        message.classList.add('status');
    }
    chatContainer.appendChild(message);
}

function sendMessage(){
    const res = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages',
    {
        from: userName,
        to: "Todos",
        text: userInput.value,
        type: "message"
    })
    .then(data =>{
        userInput.value = "";
        updateChat();
    })
    .catch(error => {
        console.log(error.response);
        window.location.reload();
    });
}

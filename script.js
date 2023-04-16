let userName;


axios.defaults.headers.common['Authorization'] = 'BgNaMGjpbxSXb08gFSR5X5hg';

login();

const connectionInterval = setInterval(checkConnection, 5000);


async function login() {
    try {
        userName = String(prompt('Qual seu nome?'));    
        const res = await axios.post('https://mock-api.driven.com.br/api/vm/uol/participants',
        {
            name: userName
        });
        let data = res.data;
        alert("Você está conectado!");
        updateChat();
        return true;
    } catch (error) {
        console.log(error);
        if(error.response.status === 400){
            alert('Usuário já logado. Tente novamente');
            window.location.reload();
            console.log("Usuário já logado.");
        }
        return false;
    }
}


async function checkConnection(){
    try{
        const res = await axios.post('https://mock-api.driven.com.br/api/vm/uol/status',
        {
            name: userName
        });
        console.log("still connected");
        let data = res.data;;
        updateChat();
        return data;
    } catch(error){
        alert("Você foi desconectado");
        window.location.reload();
        return error.response;
    }
}

function updateChat(){
    const promise = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promise.then(displayMessages);
}

function displayMessages(res){
    res = res.data;
    for(let i=0; i<100; i++){
        displaySingleMessage(res[i]);
    }
    window.scrollTo(0, document.body.scrollHeight);
}

function displaySingleMessage(res){
    const container = document.querySelector('.chat-container');
    const message = document.createElement('div');
    message.classList.add('message');
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
    container.appendChild(message);
}

async function getMessageText(){
    const userInput = document.getElementById("messageText");
    
    try {
        const res = await axios.post('https://mock-api.driven.com.br/api/vm/uol/messages',
        {
            from: userName,
            to: "Todos",
            text: userInput.value,
            type: "message"
        });
        let data = res.data;
        userInput.value = "";
        updateChat();
        return data;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}
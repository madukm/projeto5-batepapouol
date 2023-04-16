let userName, loggedIn;


axios.defaults.headers.common['Authorization'] = 'U3hR3vKhBRjD3SsSokNzrRvU';

loggedIn = enterRoom();

const connectionInterval = setInterval(checkConnection, 5000);

function enterRoom() {
    userName = String(prompt('Qual seu nome?'));
    const promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants',
    {
        name: userName
    });
    promise.then(login); 
    promise.catch(failLogin);

};

function login(){
    alert("Você entrou na sala!");
}

function failLogin(){
    if(erro.response.status === 400) {
        alert('Usuário já logado. Tente novamente');
    }
    location.reload();
}

function checkConnection(){
    const promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/status',
    {
        name: userName
    });
    promise.then(connected);
    promise.catch(disconnected);
}

function connected(){
    console.log("still connected");
}

function disconnected(){
    alert("Você se desconectou!");
}

    
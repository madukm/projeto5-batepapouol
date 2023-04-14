axios.defaults.headers.common['Authorization'] = 'VpIoDEaMTUNu16xPH1ZhJhpF';

let userName, loggedIn;

do{
    loggedIn = enterRoom();
}while(!loggedIn);

function enterRoom() {
    userName = String(prompt('Qual seu nome?'));
    axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', {
        name: userName
    })
    .then((response) => {
        login();
        return true;
    }, (error) => {
        alert('Já existe um usuário com este nome');
        return false;
    });

    
};



    
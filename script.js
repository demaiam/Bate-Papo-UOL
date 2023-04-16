axios.defaults.headers.common['Authorization'] = '97eVqU1AsszfPTccPmhDFe5m';
var nome = '';

let mensagens =  [];

const promise = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
promise.then(processarListaRecebidaDoServidor);

/*const mensagensteste = [
    {
        from: 'João',
        to: 'Todos',
        text: 'Oi',
        type: 'message',
        time: '08:02:50'
    }
]*/



function processarListaRecebidaDoServidor(res){
    console.log(res);
    
    mensagens = res.data;

    renderizarMensagens();
}

function renderizarMensagens(){

    const ulMensagens = document.querySelector('.mensagens');
    ulMensagens.innerHTML = '';


    for (let i = 0; i < mensagens.length; i++){

        let mensagem = mensagens[i];
    
        if (mensagem.type == 'status'){
            ulMensagens.innerHTML += `
                <li class="entrou-saiu">
                    <a class="time">  (${mensagem.time}) </a>
                    <a class="from">${mensagem.from} </a>
                    <a class="text">${mensagem.text}</a>
                </li>
            `;
        }
        else {
            ulMensagens.innerHTML += `
                <li class="mensagem-padrao">
                    <a class="time">  (${mensagem.time})</a>
                    <a class="from">${mensagem.from}</a> para
                    <a class="to">${mensagem.to}</a>:
                    <a class="text">${mensagem.text}</a>
                </li>
            `;
        }
    }
}


function entrarSala() {
    nome = prompt("Qual é o seu nome?");
    const requisicao = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', nome);
}


function enviarMensagem() {
    const message = document.querySelector('.caixa-mensagem');


    const novaMensagem = {
        from: nome,
        to: 'Todos',
        text: message.value,
        type: 'message',
        time:  '04:04:04'
    };

    const promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', novaMensagem);

}


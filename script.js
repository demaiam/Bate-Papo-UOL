axios.defaults.headers.common['Authorization'] = '97eVqU1AsszfPTccPmhDFe5m';
var nome = '';
var nomeRequest = '';

let mensagens =  [];

function entrarSala() {
    nome = prompt("Qual é o seu nome?");

    nomeRequest = {
        name: nome
    };

    criarPromiseNome();
}

function processarNome(res) {
    console.log(res);

    if (res.data == 'OK') {
        console.log('bom');
    }
}

setInterval(criarPromiseMensagens, 3000);

setInterval(verificaStatus, 5000);

function verificaStatus () {
    const requisicaoStatus = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', nomeRequest)
}

function criarPromiseMensagens() {
    const promiseMensagem = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');

    promiseMensagem.then(processarMensagens);
}

function criarPromiseNome() {
    const requisicaoNome = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', nomeRequest);

    requisicaoNome.then(processarNome);
}

function processarMensagens(res) {
    console.log(res);
    
    mensagens = res.data;

    renderizarMensagens();
}

function renderizarMensagens() {
    const ulMensagens = document.querySelector('.mensagens');

    ulMensagens.innerHTML = '';

    for (let i = 0; i < mensagens.length; i++) {

        let mensagem = mensagens[i];
    
        if (mensagem.type == 'status') {
            ulMensagens.innerHTML += `
                <li class="entrou-saiu">
                    <div class="container-mensagem">
                        <a class="time">(${mensagem.time}) </a>
                        <a class="from">${mensagem.from} </a>
                        <a class="text">${mensagem.text}</a>
                    </div>
                </li>
            `;
        } else {
            ulMensagens.innerHTML += `
                <li class="mensagem-padrao">
                    <div class="container-mensagem">
                        <a class="time">(${mensagem.time})</a>
                        <a class="from">${mensagem.from}</a> para
                        <a class="to">${mensagem.to}</a>:
                        <a class="text">${mensagem.text}</a>
                    </div>
                </li>
            `;
        }
    }
}

function enviarMensagem() {
    const message = document.querySelector('.caixa-mensagem');

    const novaMensagem = {
        from: nome,
        to: 'Todos',
        text: message.value,
        type: 'message',
    };

    const promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', novaMensagem);

}


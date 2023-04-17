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
}

function nomeJaExistente() {
    nome = prompt("Nome já utilizado. Escolha outro:");

    nomeRequest = {
        name: nome
    };

    criarPromiseNome();
}

setInterval(criarPromiseMensagens, 3000);

setInterval(verificaStatus, 5000);

function verificaStatus () {
    const requisicaoStatus = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', nomeRequest);
}

function criarPromiseMensagens() {
    const promiseMensagem = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');

    promiseMensagem.then(processarMensagens);
}

function criarPromiseNome() {
    const requisicaoNome = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', nomeRequest);

    requisicaoNome.catch(nomeJaExistente);
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
                <li class="entrou-saiu" data-test="message">
                    <div class="container-mensagem">
                        <a class="time">(${mensagem.time}) </a>
                        <a class="from">${mensagem.from} </a>
                        <a class="text">${mensagem.text}</a>
                    </div>
                </li>
            `;
        } else if (mensagem.type == 'private_message') {
            ulMensagens.innerHTML += `
            <li class="mensagem-privada" data-test="message">
                <div class="container-mensagem">
                    <a class="time">(${mensagem.time}) </a>
                    <a class="from">${mensagem.from} </a> para
                    <a class="to">${mensagem.to}</a>:
                    <a class="text">${mensagem.text}</a>
                </div>
            </li>
        `;
        } else {
            ulMensagens.innerHTML += `
                <li class="mensagem-padrao" data-test="message">
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

    const promiseNovaMensagem = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', novaMensagem);
    promiseNovaMensagem.then(processarNovaMensagem);
    promiseNovaMensagem.catch(erroMensagem);
}

function processarNovaMensagem(res) {
    console.log(res);
    criarPromiseMensagens();
}

function erroMensagem(res){
    console.log(res);
    window.location.reload();
}


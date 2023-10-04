

function criarDivLogin() 
{
    const divLogin = document.createElement('div');
    divLogin.setAttribute('id', 'divLogin');

    // Campo de texto para login
    const labelLogin = document.createElement('label');
    labelLogin.textContent = 'Login:';
    divLogin.appendChild(labelLogin);

    const inputLogin = document.createElement('input');
    inputLogin.setAttribute('id', '_login');
    inputLogin.type = 'text';
    inputLogin.placeholder = 'Digite o login';
    divLogin.appendChild(inputLogin);
    divLogin.appendChild(document.createElement('br'));

    // Campo de texto para senha
    const labelSenha = document.createElement('label');
    labelSenha.textContent = 'Senha:';
    divLogin.appendChild(labelSenha);

    const inputSenha = document.createElement('input');
    inputSenha.setAttribute('id', '_password');
    inputSenha.type = 'password';
    inputSenha.placeholder = 'Digite a senha';
    divLogin.appendChild(inputSenha);
    divLogin.appendChild(document.createElement('br'));

    const labelIp = document.createElement('label');
    labelIp.textContent = 'IP:';
    divLogin.appendChild(labelIp);
    const ipbar = document.createElement('input');
    ipbar.setAttribute('id', '_ip');
    ipbar.type = 'text';
    ipbar.placeholder = 'ip';
    divLogin.appendChild(ipbar);
    divLogin.appendChild(document.createElement('br'));

    // Botão de login
    const btnLogin = document.createElement('button');
    btnLogin.textContent = 'Login';
    btnLogin.setAttribute('id', 'connect_button');
    btnLogin.addEventListener('click', async () => {
        const login = inputLogin.value;
        const senha = inputSenha.value;
        let ip = ipbar.value;
        let port = _g.config.port;
        if (ipbar.value && ipbar.value.includes(':')) {
            const [_ip, _port] = ipbar.value.split(':');
            ip = _ip;
            port = _port;
        }
        await connectToServer(login, senha, ip, port);
    });
    divLogin.appendChild(btnLogin);

    return divLogin;
}

const connectToServer = async (username,passwd,ipaddr = _g.config.ip, port = _g.config.port) => 
{
    _g.socket = new WebSocket('ws://' + (ipaddr || _g.config.ip) + ':' + port + '/');
    
    _g.socket.addEventListener('open', (event) => {
        _g.socket.send(JSON.stringify({
            type: 'login',
            username: username,
            password: passwd
        }));
        _g.user = {
            username: username,
            password: passwd
        };
    });

    _g.socket.addEventListener('message', (event) => {
        let data = JSON.parse(event.data);
        if(_g.methods[data.type])
        {
            let result = _g.methods[data.type](data);
            if (result && result.log && typeof(result.log) == 'string')
            {
                console.log('server response: ' + result.log);
            }
        }
    });
    
}

async function main() 
{
    _g.config = await fetch("./config.json");
    _g.config = await _g.config.json();
    _g.methods = await import("./methods.mjs");
    document.body.appendChild(criarDivLogin());
    const ipbar = document.getElementById("_ip");
    ipbar.placeholder = _g.config.ip + ':' + _g.config.port; // ip padrão no campo de ip
};

await main();
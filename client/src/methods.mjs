export const close = () => {
    _g.socket.close();
    return{
        log: 'connection closed.'
    }
}

export async function spawnLobbyMenu() 
{
    if(document.getElementById('lobbyform') && document.getElementById('lobbyform').remove)
    {
        document.getElementById('lobbyform').remove()
        //document.getElementById('canvas').remove()
    }
    const form = document.createElement("form");
    form.setAttribute('id','lobbyform');
    const label = document.createElement("label");
    label.setAttribute("for", "lobbylist");
    label.textContent = "choose a lobby:";
    form.appendChild(label);

    const br = document.createElement("br");
    form.appendChild(br);

    const select = document.createElement("select");
    select.setAttribute("id", "lobbylist");
    select.setAttribute("size", "5");

    const optionNew = document.createElement("option");
    optionNew.setAttribute("value", "new");
    optionNew.textContent = "new lobby";
    select.appendChild(optionNew);

    form.appendChild(select);

    const divNomeSala = document.createElement("div");
    divNomeSala.setAttribute("id", "nomeSala");
    divNomeSala.style.display = "none";

    const labelNomeSala = document.createElement("label");
    labelNomeSala.setAttribute("for", "nomeSalaInput");
    labelNomeSala.textContent = "lobby name:";
    divNomeSala.appendChild(labelNomeSala);
    divNomeSala.appendChild(document.createElement("br"));

    const inputNomeSala = document.createElement("input");
    inputNomeSala.setAttribute("type", "text");
    inputNomeSala.setAttribute("id", "nomeSalaInput");
    divNomeSala.appendChild(inputNomeSala);
    divNomeSala.appendChild(document.createElement("br"));

    const labelInputTickrate = document.createElement("label");
    labelInputTickrate.setAttribute("for", "__tickrate");
    labelInputTickrate.textContent = "tickrate:";
    divNomeSala.appendChild(labelInputTickrate);
    divNomeSala.appendChild(document.createElement("br"));

    const inputTickrate = document.createElement("input")
    inputTickrate.setAttribute("type", "number");
    inputTickrate.setAttribute("id", "__tickrate");
    inputTickrate.setAttribute("min", "1");
    divNomeSala.appendChild(inputTickrate);
    divNomeSala.appendChild(document.createElement("br"));

    const buttonSala = document.createElement("button");
    buttonSala.setAttribute("id", "create_lobby_button");
    buttonSala.textContent = "create lobby!";
    buttonSala.addEventListener("click",async function(event) 
    {
        event.preventDefault();
        _g.socket.send(
            JSON.stringify(
                {
                    type: 'createLobby',
                    lobbyid:inputNomeSala.value,
                    tickrate:inputTickrate.value,
                    user:_g.user.username,
                    password:_g.user.password
                }
            )
        );
        //await connectToServer();
    });
    divNomeSala.appendChild(buttonSala);
    form.appendChild(divNomeSala);

    const buttonEnter = document.createElement("button");
    buttonEnter.setAttribute("id", "join_lobby_button");
    buttonEnter.textContent = "join lobby!";
    buttonEnter.addEventListener("click",function(event) 
    {
        event.preventDefault();
    });
    buttonEnter.style.display = 'none';
    form.appendChild(buttonEnter);

    document.body.appendChild(form);
    const selectElement = document.getElementById('lobbylist');
    const nomeSalaDiv = document.getElementById('nomeSala');
    selectElement.addEventListener('change', (event) => 
    {
        const selectedValue = event.target.value;
        if (selectedValue === 'new') 
        {
            nomeSalaDiv.style.display = 'block';
            buttonEnter.style.display = 'none';
        }
        else 
        {
            _g.selectedLobby = selectedValue
            nomeSalaDiv.style.display = 'none';
            buttonEnter.style.display = 'block';
        }
    });
    _g.socket.send(JSON.stringify({type: 'getLobbyList'}));
}

export const updateLobbyList = (data) =>
{
    let lobbies = data.lobbies;
    const select = document.getElementById('lobbylist');
    let opt
    for (const key in lobbies) {
        opt = document.createElement("option")
        opt.setAttribute("value", lobbies[key].name);
        opt.textContent = lobbies[key].name;
        select.appendChild(opt);
    }
}
import { deleteByID, jsonPUT, jsonPOST, jsonGET, jsonPATCH} from "../shared/util.mjs";

/*******************************************************************
 *
 *
    LOGIN
 *
 *
*******************************************************************/




function cleanLoginElements() 
{
    let ids = ['_user','label_user','_password','label_password','_ip','label_ip','_button','result','__title','create_lobby_button']
    deleteByID(...ids)
}



//SPAWN_LOBBY_MENU
//SPAWN_LOBBY_MENU
//SPAWN_LOBBY_MENU
async function spawnLobbyMenu(lobbylist,credentials) 
{
    if(document.getElementById('lobbyform') && document.getElementById('lobbyform').remove)
    {
        document.getElementById('lobbyform').remove()
        document.getElementById('canvas').remove()
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
    let opt = {}
    for (let i = 0; i < lobbylist.length; i++) 
    {
        opt = document.createElement("option")
        opt.setAttribute("value", lobbylist[i].name);
        opt.textContent = lobbylist[i].name;
        select.appendChild(opt);
    }

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
        jsonPOST(__url,
            {
                type:"createLobby",
                key:__key,lobbyid:inputNomeSala.value,
                user:__key.split('@')[0],
                tickrate:inputTickrate.value
            }).then(async (result)=>
            {
                
            })
        await connectToServer();
    });
    divNomeSala.appendChild(buttonSala);
    form.appendChild(divNomeSala);

    const buttonEnter = document.createElement("button");
    buttonEnter.setAttribute("id", "join_lobby_button");
    buttonEnter.textContent = "join lobby!";
    buttonEnter.addEventListener("click",function(event) 
    {
        event.preventDefault();
        jsonPATCH(__url,{user:credentials.user,lobbyid:_selectedLobby,key:__key},'joinLobby')
            .then((result)=>
            {
                if (result.status == 200)
                {
                    let tickrate = result.json().tickrate;
                    if (_pingIntervalID) 
                    {
                        clearInterval(_pingIntervalID);
                        _pingIntervalID = undefined;
                    }
                    _pingIntervalID = setInterval(()=>
                    {
                        jsonGET(__url,{user:credentials.user},'ping')
                            .then((result)=>
                            {
                                if (result.status !== 200) 
                                {
                                    result.json().then((result)=>
                                    {
                                        console.log(result.log);
                                        clearInterval(_pingIntervalID);
                                    }).catch((reason)=>
                                    {
                                        console.error(reason)
                                    })
                                }
                                else
                                    console.log('ping')
                            }).catch((reason)=>{console.error(reason)})
                    },tickrate)
                }
            }).catch((reason)=>{console.error(reason)})
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
            _selectedLobby = selectedValue
            nomeSalaDiv.style.display = 'none';
            buttonEnter.style.display = 'block';
        }
    });
}


async function connectToServer() 
{
  
    const ip = document.getElementById('_ip').value;
  
  const resultDiv = document.getElementById('result');
  __url = `http://${ip || (_config.ip + ":" + _config.port)}/`;
  
  const credentials = 
  {
    user: document.getElementById('_user').value || 'debug',
    password: document.getElementById('_password').value || 'debug',
  }

  try 
  {
    const response = await jsonPOST(__url, credentials, 'login');

    if (response.status === 200) 
    {
        let lobbylist = [];
        const result = await jsonGET(__url, { username: credentials.user }, 'getLobbyList');
        lobbylist = await result.json();

        await spawnLobbyMenu(lobbylist, credentials);

        let _canvas = document.createElement("canvas");
        _canvas.setAttribute('id', 'canvas');
        document.body.appendChild(_canvas);

        const __json = await response.json();
        __key = __json.key;
        console.log("login debug : " + __json.message);
    }
    else 
    {
      resultDiv.innerHTML = 'Erro na conexão com o servidor.';
    }
  } 
  catch (error) 
  {
    resultDiv.innerHTML = 'Erro na conexão com o servidor.';
    console.error(error);
  }
}

const bt = document.getElementById("connect_button");
bt.addEventListener("click", connectToServer);



/*******************************************************************
 *
 *
    MAIN
 *
 *
*******************************************************************/



async function main() 
{
    _config = await fetch("./config.json");
    _config = await _config.json();
    const bt = document.getElementById("connect_button");
    bt.addEventListener("click", connectToServer);

    const ipbar = document.getElementById("_ip");
    ipbar.placeholder = _config.ip + ':' + _config.port; // ip padrão no campo de ip
    
};

await main();
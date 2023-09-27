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
    let ids = ['_user','label_user','_password','label_password','_ip','label_ip','_button','result','__title','create_room_button']
    deleteByID(...ids)
}



//SPAWN_ROOM_MENU
//SPAWN_ROOM_MENU
//SPAWN_ROOM_MENU
async function spawnRoomMenu(roomlist) 
{
    if(document.getElementById('roomform') && document.getElementById('roomform').remove)
    {
        document.getElementById('roomform').remove()
        document.getElementById('canvas').remove()
    }
    const form = document.createElement("form");
    form.setAttribute('id','roomform');
    const label = document.createElement("label");
    label.setAttribute("for", "roomlist");
    label.textContent = "choose a room:";
    form.appendChild(label);

    const br = document.createElement("br");
    form.appendChild(br);

    const select = document.createElement("select");
    select.setAttribute("id", "roomlist");
    select.setAttribute("size", "5");

    const optionNew = document.createElement("option");
    optionNew.setAttribute("value", "new");
    optionNew.textContent = "new room";
    select.appendChild(optionNew);
    let opt = {}
    for (let i = 0; i < roomlist.length; i++) 
    {
        opt = document.createElement("option")
        opt.setAttribute("value", roomlist[i].name);
        opt.textContent = roomlist[i].name;
        select.appendChild(opt);
    }

    form.appendChild(select);

    const divNomeSala = document.createElement("div");
    divNomeSala.setAttribute("id", "nomeSala");
    divNomeSala.style.display = "none";

    const labelNomeSala = document.createElement("label");
    labelNomeSala.setAttribute("for", "nomeSalaInput");
    labelNomeSala.textContent = "room name:";
    divNomeSala.appendChild(labelNomeSala);
    divNomeSala.appendChild(document.createElement("br"));

    const inputNomeSala = document.createElement("input");
    inputNomeSala.setAttribute("type", "text");
    inputNomeSala.setAttribute("id", "nomeSalaInput");
    divNomeSala.appendChild(inputNomeSala);
    divNomeSala.appendChild(document.createElement("br"));

    const buttonSala = document.createElement("button");
    buttonSala.setAttribute("id", "create_room_button");
    buttonSala.textContent = "create room!";
    buttonSala.addEventListener("click",async function(event) 
    {
        event.preventDefault();
        jsonPATCH(__url,
            {
                type:"createRoom",
                key:__key,roomname:inputNomeSala.value,
                user:__key.split('@')[0]
            }).then(async (result)=>
            {
                
            })
        await connectToServer();
    });
    divNomeSala.appendChild(buttonSala);
    form.appendChild(divNomeSala);

    const buttonEnter = document.createElement("button");
    buttonEnter.setAttribute("id", "join_room_button");
    buttonEnter.textContent = "join room!";
    buttonEnter.addEventListener("click",async function(event) {});
    buttonEnter.style.display = 'none';
    form.appendChild(buttonEnter);

    document.body.appendChild(form);
    const selectElement = document.getElementById('roomlist');
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
            nomeSalaDiv.style.display = 'none';
            buttonEnter.style.display = 'block';
        }
    });
}


//CONNECT
//CONNECT
//CONNECT
async function connectToServer() 
{
    const ip = document.getElementById('_ip').value;
    const resultDiv = document.getElementById('result');
    __url = `http://${ip || (_defaultIP + ":" + _defaultPort)}/`;
    const credentials = 
    {
        user:document.getElementById('_user').value || 'debug',
        password:document.getElementById('_password').value || 'debug',
        type:'login'
    }
    
    jsonPOST(__url,credentials)
      .then(async response => 
        {
            
            if (response.status === 200) 
            {
                let roomlist = [];
                jsonGET(__url,{username:credentials.user,type:'getRoomList'}).then(async (result)=>
                {
                    roomlist = await result.json();
                    await spawnRoomMenu(roomlist);
                    let _canvas = document.createElement("canvas");
                    _canvas.setAttribute('id','canvas');
                    document.body.appendChild(_canvas);
                    response.json().then((__json)=>
                    {
                        __key = __json.key
                        console.log("login debug : " + __json.message)
                    });
                });
            }
            else
            {
                resultDiv.innerHTML = 'Erro na conexão com o servidor.';
            }
        })
        .catch(error => {
            resultDiv.innerHTML = 'Erro na conexão com o servidor.';
            console.error(error);
        });
    const bt = document.getElementById("connect_button");
    bt.addEventListener("click", connectToServer);
}



/*******************************************************************
 *
 *
    MAIN
 *
 *
*******************************************************************/



function main() 
{
    const bt = document.getElementById("connect_button");
    bt.addEventListener("click", connectToServer);

    const ipbar = document.getElementById("_ip");
    ipbar.placeholder = _defaultIP + ':' + _defaultPort; // ip padrão no campo de ip
};

main();
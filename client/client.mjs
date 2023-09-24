async function jsonPUT(url,data) 
{
    const headers = 
    {
      'Content-Type': 'application/json', // Por padrão, definimos o Content-Type como JSON
    };
  
    const options = 
    {
      method: "PUT",
      headers: headers,
    };
  
    if (data) 
    {
      options.body = JSON.stringify(data); // Se houver dados, convertemos em JSON
    }
    return fetch(url, options);
}

connectToServer = async function() 
{
    const ip = document.getElementById('ipInput').value;
    const resultDiv = document.getElementById('result');
    const url = `http://${ip || "127.0.0.1:8080"}/`;
    const credentials = 
    {
        user:document.getElementById('_user').value || 'debug',
        password:document.getElementById('_password').value || 'debug',
        type:'login'
    }

    jsonPUT(url,credentials)
      .then(async response => 
        {
            if (response.status === 200) 
            {
                let __t = document.getElementById('_user');
                __t.remove();
                __t = document.getElementById('label_user');
                __t.remove();
                __t = document.getElementById('_password');
                __t.remove();
                __t = document.getElementById('label_password');
                __t.remove();
                __t = document.getElementById('ipInput');
                __t.remove();
                __t = document.getElementById('label_ipInput');
                __t.remove();
                __t = document.getElementById('_button');
                __t.remove();
                __t = document.getElementById('result');
                __t.remove();
                __t = document.getElementById('__title');
                __t.remove();
                response.json().then((__json)=>
                {
                    clientKey = __json.key
                    console.log("login debug : " + __json.message)
                })
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
  }
  
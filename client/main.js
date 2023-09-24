class Credential
{
    constructor(user,password)
    {
        this.user = user
        this.password = password
    }
}

async function jsonPUT(url,data) 
{
    const headers = {
      'Content-Type': 'application/json', // Por padrão, definimos o Content-Type como JSON
    };
  
    const options = 
    {
      method: "PUT",
      headers:headers,
    };
  
    if (data) {
      options.body = JSON.stringify(data); // Se houver dados, convertemos em JSON
    }
    return fetch(url, options);
}
  


async function connectToServer() 
{
    const ip = document.getElementById('ipInput').value;
    const resultDiv = document.getElementById('result');
    const url = `http://${ip || "127.0.0.1:8080"}/`;
    const credentials = 
    {
        user:document.getElementById('_user').value,
        password:document.getElementById('_password').value,
    }

    // Fazer uma solicitação GET usando a API Fetch
    jsonPUT(url,credentials)
      .then(async response => {
        console.log(await response.json())
        if (response.status === 200) 
        {
          resultDiv.innerHTML = 'Conexão bem-sucedida!';
        } else {
          resultDiv.innerHTML = 'Erro na conexão com o servidor.';
        }
      })
      .catch(error => {
        resultDiv.innerHTML = 'Erro na conexão com o servidor.';
        console.error(error);
      });
  }
  
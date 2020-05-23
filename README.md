<h1 style='text-align: justify;'> Streaming </h1>

<p style='text-align: justify;'> Es una aplicación de videos con fines educativos de acceso libre </p>

Se necesita un habilitar el autenticador, se uso Auth0 con una configuracion de este estilo:
<code>
{
    "domain": "xxxxxxxxxxx.auth0.com",
    "clientId": "xxxxxxxxxxxxxxxxxxxxxxxxx"
}
</code>
Debe ser ubicado en src/auth_config.json

Se uso la libreria jest@25.5.1 para testing, requiere node -v >10.14.2
Se puede instalar usando los comandos
<code>
nvm install 10.14.2
nvm use 10.14.2
</code>

![ScreenShot](icon.png ) 

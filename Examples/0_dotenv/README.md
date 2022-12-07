# Setting up .env

npm install dotenv

-------

Create a file, name it 
```
.env
```

Inside the file, paste these contents.

```
TOKEN=Your Discord Bot's Token
CLIENT_ID=Your Discord Bot's Client ID
GUILD_ID=Your Server's ID
PUBLICKEY=Your Discord Bot's Public Key
```


You can think of this as a config.JSON, but values passed here are always strings and you will have to parse them if necessary.

Next, import the .env file into other files by doing
```js
import * as dotenv from 'dotenv'
dotenv.config();
```

Accessing .env properties can be done by typing
```js
process.env.TOKEN
```

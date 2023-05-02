<img 
    style="display: block; 
           margin-left: auto;
           margin-right: auto;
           width: 100%;"
    src="header.jpg" 
    alt="Our logo">
</img>

<h1 style="text-align: center;">🐳 Docker learning on the wave 🌊</h1>

## Introduction

> **Learn the core fundamentals of Docker by building a Node/Express app with a Mongo & Redis database.**

## Work Processings:

(✅ done)

✅ 1. In Docker HUB, install Nodejs Docker image

✅ 2. Install MongoDB Docker image<br>

📕 Just curiosity the reason 👉 when I follow the docker doc to use mongodb image, and want to see my database, I used `mongo -u "mongoadmin" -p "mypassword"` , which didn't work in my bash, THEN I used `mongosh` and it worked. So I want to know the difference between `mongo` and `mongosh`.<br>

```bash
mydb> use admin
switched to db admin
admin> db.auth("username", "password")
```

The difference is `mongo` is a shell, and `mongosh` is a shell for MongoDB with more features and better syntax.🤦‍♀️ <br>

📗 Update-note: In index.js, starting with Mongoose version 6, you should not specify that as an option. It will be handled automatically. `useNewUrlParser`, `useUnifiedTopology`, `useFindAndModify`, and `useCreateIndex` are no longer supported options. Mongoose 6 always behaves as if `useNewUrlParser`, `useUnifiedTopology`, and `useCreateIndex` are true, and `useFindAndModify` is false. <br>

✅3. Install Redis and Redis Cluster<br>

- Sigup and Signin in RedisLabs<br>
- Troubleshooting in Redis Version 4.0.9<br>
  the error I got

```bash
  Mon, 01 May 2023 04:41:24 GMT express-session deprecated undefined resave option; provide resave option at file:/app/index.js:48:3
  Mon, 01 May 2023 04:41:24 GMT express-session deprecated undefined saveUninitialized option; provide saveUninitialized option at file:/app/index.js:48:3
  Server listening on port 3000
  MongoDB connected successfully
  correct!!!!!!!
  Error: The client is closed
    at Commander._RedisClient_sendCommand (/app/node_modules/@redis/client/dist/lib/client/index.js:490:31)
    at Commander.commandsExecutor (/app/node_modules/@redis/client/dist/lib/client/index.js:188:154)
    at BaseClass.<computed> [as set] (/app/node_modules/@redis/client/dist/lib/commander.js:8:29)
    at Object.set (file:///app/node_modules/connect-redis/dist/esm/index.js:22:34)
    at RedisStore.set (file:///app/node_modules/connect-redis/dist/esm/index.js:69:39)
    at Session.save (/app/node_modules/express-session/session/session.js:72:25)
    at Session.save (/app/node_modules/express-session/index.js:406:15)
    at ServerResponse.end (/app/node_modules/express-session/index.js:335:21)
    at ServerResponse.send (/app/node_modules/express/lib/response.js:232:10)
    at ServerResponse.json (/app/node_modules/express/lib/response.js:278:15)
```

**Solution 1st** with Redis Version 4.0.9<br>

```bash
const { createClient } = require('redis');
const { REDIS_HOST_URL } = require('../config');

const client = createClient({ url: REDIS_HOST_URL });

(async () => {
    await client.connect();
})();

client.on('connect', () => console.log('::> Redis Client Connected'));
client.on('error', (err) => console.log('<:: Redis Client Error', err));
```

Cannot solve the problem, I got infinite loop for server listening on port 3000<br>

**Solution 2nd** with Redis Version 3.0.2, problem solved 😶 <br>
Here is the reference I used [link](https://stackoverflow.com/questions/70145795/node-redis-does-not-work-on-my-windows-computer-even-though-the-server-is-up-and)<br>

✅4. Nginx for Load balancing to multiple node containers<br>

- 2 node instances (port3000) connected to Nginx ✅<br>
- Express CORS configuration ✅<br>

Conclusions: This repo is done, all learning and works flow above, the reason I choose this freeCodeCamp [Tutorial](https://www.youtube.com/watch?v=9zUHg7xjIqQ&ab_channel=freeCodeCamp.org) because it taught docker compose with many packages (node, express, mongodb, redis, nginx) and how to run 2 node instances <br>
🤔 Probably I don't strong recommend this tutorial, because the Redis version is version3, I got many errors in the work process, I focused on troubleshooting on most learning time, still have one error leave there, I markered in comment.

**If you are interested in this tutorial**

To get started, clone the repository and install the dependencies. Code works good.

Not finished parts:
<br> 5. Dev to Prod <-Jump here, because have to installing docker on Ubuntu(Digital Ocean), and deploy to Digital Ocean
<br> 6. Automating <- Setting in Digital Ocean, and Github Actions

## What next?

Docker learning never end...🐳

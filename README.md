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

✅ 1. In Docker HUB, install Nodejs Docker image

✅ 2. Install MongoDB Docker image<br>

📕 Just curiosity the reason 👉 when I follow the docker doc to use mongodb image, and want to see my database, I used `mongo -u "mongoadmin" -p "mypassword"` , which didn't work in my bash, THEN I used `mongosh` and it worked. So I want to know the difference between `mongo` and `mongosh`.<br>

```bash
mydb> use admin
switched to db admin
admin> db.auth("username", "password")
```

The difference is `mongo` is a shell, and `mongosh` is a shell for MongoDB with more features and better syntax.🤦‍♀️ <br>

📗 Update-note: In index.js, starting with Mongoose version 6, you should not specify that as an option. It will be handled automatically. `useNewUrlParser`, `useUnifiedTopology`, `useFindAndModify`, and `useCreateIndex` are no longer supported options. Mongoose 6 always behaves as if `useNewUrlParser`, `useUnifiedTopology`, and `useCreateIndex` are true, and `useFindAndModify` is false.
<br> 3. Install Redis and Redis Cluster <br> 4. Nginx for Load balancing to multiple node containers<br> 5. Dev to Prod <br> 6. Automating

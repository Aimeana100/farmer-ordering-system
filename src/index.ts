import express from 'express';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.get('/',  (req, res)=> {
    res.send("Hello BK, we want to work from you and we may make it, that is good");
})

app.get('/hello',  (req, res)=> {
    res.send("Hello BK yetu, tuna");
})

const {APP_PORT} = process.env;

app.listen(APP_PORT, ()=> {console.log(`app running on port ${APP_PORT}`)});
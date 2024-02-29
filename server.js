//Imports to allow functions from modules to load
import { Server } from "socket.io";
import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { exec } from 'child_process';
import exports from './JavaFile.cjs';
import * as fs from 'fs'
//import {compile,execute,runfile} from './JavaFile.js';

//exec('gdown --folder https://drive.google.com/drive/u/1/folders/1eusuajDuuSzQGX3Ad6NHuKOlJt1_n4is -O /app/JAVA');

/*fs.readdir("/app/JAVA", (err, files) => {
  files.forEach(file => {
    exports.compile('/app/JAVA/'+file);
  });
});*/
//exports.runfile('UserStuff')


//Create an instance of Express, the HTML loader, and SOCKET.IO for transfer of data
const app = express();
const server = createServer(app);
const io = new Server(server);

//App.get '/url.type' sends html or a file
const __dirname = dirname(fileURLToPath(import.meta.url)); //This directory

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});
app.get('/index.html', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});
app.get('/chat.css', (req, res) => {
  res.sendFile(join(__dirname, 'chat.css'));
});
app.get('/all.css', (req, res) => {
  res.sendFile(join(__dirname, 'all.css'));
});
app.get('/account/login', (req, res) => {
  res.sendFile(join(__dirname, '/account/login.html'));
});
app.get('/account/new', (req, res) => {
  res.sendFile(join(__dirname, '/account/new.html'));
});
app.get('/account/user.css', (req, res) => {
  res.sendFile(join(__dirname, '/account/user.css'));
});
app.get('/favicon.ico', (req, res) => {
  res.sendFile(join(__dirname, 'favicon.ico'));
});
app.get('/logo.svg', (req, res) => {
  res.sendFile(join(__dirname, 'logo.svg'));
});
app.get('/all.js', (req, res) => {
  res.sendFile(join(__dirname, 'all.js'));
});

//Socket.IO connections
let onlineUsers = []

io.on('connection', (socket) => {
  console.log('USER CONNECTED');
  io.emit('TOCLIENT',"CONNECTED","SERVER");
  
  socket.on('TOSERVER', (msg,user) => { //Detect chat
    console.log('message: ' + msg + " FROM "+user);
  });
  
  socket.on('TOSERVER', (msg,user) => {
    io.emit('TOCLIENT', msg,user);
  });
  socket.on('toLogin', (uname,pwd) => { //Log in to account
    exports.runfile(['AccountFront', 'Login', "", uname , pwd],(toreturn) => {
      socket.emit("fromLogin",toreturn[0]);
    });
  });
  socket.on('toCreate', (uname,pwd) => { //Create account
    exports.runfile(['AccountFront', 'Create', "", uname , pwd],(toreturn) => {
      socket.emit("fromCreate",toreturn[0]);
    });
  });
  
  
  socket.on('disconnect', () => {
    //console.log('USER LEFT');
  });
});

//Startup node
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
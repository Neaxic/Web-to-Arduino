const express = require('express')
const app = express()
 
app.use(express.static('public'));

//intialize / initialisere port
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

// const serialPortName = "/dev/tty-usbserial1"
const serialPortName = "/dev/cu.usbmodem14101";
const port = new SerialPort(serialPortName, function(err) {
  if (err) {
    return console.log("Error: ", err.message);
  }
});

// app.get('/', function (req, res) {
//   res.send('Hello Wodrld')
// })
// Shift command 7

function sendCommand(command) {
  port.write(command, function(err) {
    if (err) {
      return console.log("Error on write: ", err.message);
    }
    console.log(`command: '${command}' was sent to ${serialPortName}`);
  });
}

const server = app.listen(2917)

const socket = require('socket.io');
const io = socket(server);

 io.on('connection', newConnection)

function newConnection(socket){
  console.log(`New connection ${socket.id}`)
  socket.on('positionEvent', (data) => {
    // console.log(data);
    socket.broadcast.emit('positionEvent',data);

    const colorData = {
      x: data.x,
      r: data.r,
      g: data.g,
      b: data.b,
      a: data.a,
      f: data.f,
      s: data.s
    };

    const jsonStr = JSON.stringify(colorData);
    sendCommand(jsonStr);
    console.log(jsonStr);
  });


  // function mouseMsg(data){
  //   socket.broadcast.emit('positionEvent',data);
  //   console.log(data),
  // }

}

// io.on('positionEvent', (data) => {
//   console.log(data);
// })

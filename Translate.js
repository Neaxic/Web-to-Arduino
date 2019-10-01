const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

// const serialPortName = "/dev/tty-usbserial1"
const serialPortName = "COM17";
const port = new SerialPort(serialPortName, function(err) {
  if (err) {
    return console.log("Error: ", err.message);
  }
});

// // Read data that is available but keep the stream in "paused mode"
// port.on("readable", function() {
//   console.log("Data:", port.read());
// });

// // Switches the port into "flowing mode"
// port.on("data", function(data) {
//   console.log("Data:", data);
// });

// Pipe the data into another stream (like a parser or standard out)
const lineStream = port.pipe(new Readline());

const parser = port.pipe(new Readline({ delimiter: "\r\n" }));
parser.on("data", console.log);


function sendCommand(command) {
  port.write(command, function(err) {
    if (err) {
      return console.log("Error on write: ", err.message);
    }
    console.log(`command: '${command}' was sent to ${serialPortName}`);
  });
}

async function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function sendCommands() {

  let data = {
    delay: 10,
    y: 200,
    arr: [1,2,3,4]
  }

  let x = 0;
  for (let i = 0; i < 100; i++) {
    data.delay = x;
    const jsonStr = JSON.stringify(data);
    console.log(`sending ${i}: ${jsonStr}`);
    //sendCommand('j');
    sendCommand(jsonStr);
    await sleep(1000);

    x += 10;
  }
}

sendCommands();

var ws = new WebSocket("wss://gateway.discord.gg/?v=6&encoding=json");
var interval = 0;
var token = "YOUR_DISCORD_TOKEN"

payload = {
   op: 2,
   d: {
      token: token,
      intents: 512,
      properties: {
         $os: "linux",
         $browser: "chrome",
         $device: "chrome",
      },
   },
};

ws.addEventListener("open", function open(x) {
   ws.send(JSON.stringify(payload));
});

ws.addEventListener("message", function incoming(data) {
   var x = data.data;
   var payload = JSON.parse(x);

   const { t, event, op, d } = payload;

   switch (op) {
      // OPCODE 10 GIVES the HEARTBEAT INTERVAL, SO YOU CAN KEEP THE CONNECTION ALIVE
      case 10:
         const { heartbeat_interval } = d;
         setInterval(() => {
            ws.send(JSON.stringify({ op: 2, d: null })); // If automaticly close change op: 2 to op: 1 
         }, heartbeat_interval);

         break;
   }

   // switch (t) {
          // IF MESSAGE IS CREATED, IT WILL LOG IN THE CONSOLE
       // case "MESSAGE_CREATE":
       // console.log(d.author.username + ": " + d.content);
   // } This code work for if you're in 75 servers or above i think. Or you must use bot account? 
});

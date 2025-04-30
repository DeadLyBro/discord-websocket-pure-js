var ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');
var token = 'YOUR_DISCORD_TOKEN'

let heartbeatTimer;
let heartbeatInterval;

identifyPayload = {
   op: 2,
   d: {
      token: token,
      intents: 32769, // GUILDS + GUILD_MESSAGES + MESSAGE_CONTENT. If you want more, you can check this site =>   https://discord-intents-calculator.vercel.app   (NOT MY PROJECT/SITE.)
      properties: {
         $os: 'linux',
         $browser: 'chrome',
         $device: 'chrome',
      },
   },
};

function startHeartbeat() {
  heartbeatTimer = setInterval(() => {
    console.log('Sending heartbeat');
    ws.send(JSON.stringify({ op: 1, d: null }));
  }, heartbeatInterval);
}

ws.addEventListener('message', function incoming(data) {
   var x = data.data;
   var incomingPayload = JSON.parse(x);

   const { t, event, op, d } = incomingPayload;

   switch (op) {
      case 10: // Hello
         console.log('Received Hello');
         heartbeatInterval = d.heartbeat_interval;
         startHeartbeat();
         ws.send(JSON.stringify(identifyPayload));
         break;
      case 11: // Heartbeat ACK
        console.log('Heartbeat acknowledged');
        break;

      case 0: // Dispatch
        if (t === 'READY') {
          console.log(`Logged in as ${d.user.username}`);
        }
        break;

      default:
        // Handle other opcodes if needed
        break;
   }

   switch (t) {
       // IF MESSAGE IS CREATED, IT WILL LOG IN THE CONSOLE
       case 'MESSAGE_CREATE':

          if (d.content) {
               console.log(`%c${d.author.username}#${d.author.discriminator}` + '%c: ' + `%c${d.content}`, 'color: #7289d9', 'color: #a1a1a1', 'color: white');
          } // If bot sending embed or other things, can't log. Just messages logged here.
   
          if (d.interaction != undefined) {
               console.log('%cUser: ' + `%c${(d.interaction).user.username}#${(d.interaction).user.discriminator}` + '%c used interaction named ' + `%c${(d.interaction).name}` + '.', 'color: yellow', 'color: #4bd13f', 'color: yellow', 'color: #309ccf')
          } // Logs user interactions.
   
          if (d.attachments && d.attachments.length > 0) {
               console.log('%cUser: ' + `%c${(d.author).username}#${(d.author).discriminator}` + '%c sended a ' + `%c${(d.attachments)[0].content_type}` + '.', 'color: yellow', 'color: #4bd13f', 'color: yellow', 'color: #309ccf')
          } // Logs sended attachment types. 
         
         break; // Breaks MESSAGE_CREATE event
         
      // IF MESSAGE IS EDITED, IT WILL LOG IN THE CONSOLE
      case 'MESSAGE_UPDATE': // Be carefull while using this, you might get caught to rate-limit
         
         if (d.content) {
            console.log( '%cUser: ' + `%c${(d.author).username}#${(d.author).discriminator}` + '%c updated a message, new message: ' + `%c${d.content}`, 'color: yellow', 'color: #4bd13f', 'color: yellow', 'color: #309ccf');
         }

         break; // Breaks MESSAGE_UPDATE event
   }
});

ws.addEventListener('close', (code, reason) => {
  console.log(`Disconnected: ${code} - ${reason}`);
  clearInterval(heartbeatTimer);
});

ws.addEventListener('error', (err) => {
  console.error('WebSocket error:', err);
});

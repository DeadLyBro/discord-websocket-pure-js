{

var ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
var interval = 0;
var token = "YOUR_DISCORD_TOKEN"

payload = {
   op: 2,
   d: {
      token: token,
      intents: 3276799, // All intents, you can check: https://discord-intents-calculator.vercel.app/ ( It's not my website/project. )
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
            ws.send(JSON.stringify({ op: 1, d: null }));
         }, heartbeat_interval);

         break;
   }

   switch (t) {
       // IF MESSAGE IS CREATED, IT WILL LOG IN THE CONSOLE
       case "MESSAGE_CREATE":

       if (d.content != "") {
            console.log(`%c${d.author.username}#${d.author.discriminator}` + "%c: " + `%c${d.content}`, "color: #7289d9", "color: #a1a1a1", "color: white");
       } // If bot sending embed or other things, can't log. Just messages logged here.

	   if (d.interaction != undefined) {
            console.log("%cUser: " + `%c${(d.interaction).user.username}#${(d.interaction).user.discriminator}` + "%c used interaction named " + `%c${(d.interaction).name}` + ".", "color: yellow", "color: #4bd13f", "color: yellow", "color: #309ccf")
	   } // Logs user interactions.

	   if (d.attachments != "") {
	        console.log("%cUser: " + `%c${(d.author).username}#${(d.author).discriminator}` + "%c sended a " + `%c${(d.attachments)[0].content_type}` + ".", "color: yellow", "color: #4bd13f", "color: yellow", "color: #309ccf")
	   } // Logs sended attachment types. 

   }

    // switch (t) { case "MESSAGE_UPDATE": if (d.content != "") { console.log( "%cUser: " + `%c${(d.author).username}#${(d.author).discriminator}` + "%c updated a message, new message: " + `%c${d.content}`, "color: yellow", "color: #4bd13f", "color: yellow", "color: #309ccf") } console.log(d) } // Don't use "MESSAGE_UPDATE" because you will get caught to rate limit.



});

}

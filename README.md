# discord-websocket-pure-js
You can share your codes on Discussion tab.

# Usage

Open `index.js` > Copy > open `Discord tab` or `Discord Application` > Open `DevTools` > Click `Console` Tab > Paste > Change `fifth line` with your `Token` and send it! 

## If you can't open `Devtools` on `Discord Application` apply this; 

1. Close Discord client (`Quit Discord` in system tray) !!! `DONT SKIP THIS STEP` !!! 
2. Open the settings file, it's location depends on your OS:
   - Windows: `%appdata%\discord\settings.json`
   - macOS: `~/Library/Application Support/Discord/settings.json`
   - Linux: `~/.config/discord/settings.json`
3. Add `"DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING": true,` (this is necessary [since last update](https://www.reddit.com/r/discordapp/comments/sc61n3/comment/hu4fw5x))
4. Save the file
5. Restart/Open Discord client!

Now you can use devtools pressing `CTRL + Shift + i`

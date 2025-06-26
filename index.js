const mineflayer = require('mineflayer');
const express = require('express');

// === WEB SERVER FOR UPTIMEROBOT ===
const app = express();
app.get('/', (req, res) => res.send('AFK Bot is alive!'));
app.listen(3000, () => console.log('Web server running on port 3000'));

// === CONFIG ===
const bot = mineflayer.createBot({
  host: 'qw-balls.mcsh.io', // Your cracked server IP
  port: 25565,              // Default Minecraft port
  username: 'qwww-AFKBOT',  // Any name, since it's a cracked server
  auth: 'offline'           // Offline = cracked
});

// === EVENT: When the bot spawns ===
bot.on('spawn', () => {
  console.log('Bot has joined the server!');

  // Anti-kick movement
  setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);
  }, 10000); // Jump every 10 seconds
});

// === Auto-reconnect if kicked or disconnected ===
bot.on('end', () => {
  console.log('Bot was disconnected. Reconnecting in 5s...');
  setTimeout(() => reconnectBot(), 5000);
});

bot.on('error', err => {
  console.log('Bot error:', err);
});

// === Reconnect Function ===
function reconnectBot() {
  const newBot = mineflayer.createBot({
    host: 'qw-balls.mcsh.io',
    port: 25565,
    username: 'qwww-AFKBOT',
    auth: 'offline'
  });

  newBot.on('spawn', () => {
    console.log('Bot reconnected!');
    setInterval(() => {
      newBot.setControlState('jump', true);
      setTimeout(() => newBot.setControlState('jump', false), 500);
    }, 10000);
  });

  newBot.on('end', () => {
    console.log('Re-disconnected. Trying again...');
    setTimeout(reconnectBot, 5000);
  });

  newBot.on('error', err => {
    console.log('Reconnection error:', err);
  });
}

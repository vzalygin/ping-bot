const TelegramBot = require('node-telegram-bot-api');

const token = process.argv[2];

const bot = new TelegramBot(token, {webHook: { port: process.env.PORT }});
const url = process.env.APP_URL || 'https://muver-ping-bot.herokuapp.com:443';
bot.setWebHook(`${url}/bot${token}`);

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

// Just to ping!
bot.on('message', function onMessage(msg) {
    bot.sendMessage(msg.chat.id, 'I am alive on Heroku!');
});
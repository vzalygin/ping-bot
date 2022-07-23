const TelegramBot = require("node-telegram-bot-api");

const IDS = [1377576664, 947163681, 838805281, 734752306];
const TOKEN = process.env.TOKEN;
const OPTIONS = {
  webHook: {
    port: process.env.PORT,
  },
};

const pingAll = (msg) => {
  const chatId = msg.chat.id;
  let message = "";
  for (const id of IDS) {
    if (id !== msg.from.id) {
      const member = await bot.getChatMember(chatId, id);
      const name = member.user.first_name;
      message += `[${name}](tg://user?id=${id}) `;
    }
  }
  bot.sendMessage(chatId, message, { reply_to_message_id: msg.message_id, parse_mode: 'MarkdownV2' });
}

const setupBot = () => {
  const bot = new TelegramBot(TOKEN, OPTIONS);
  console.log("bot online");
  const url = process.env.APP_URL || 'https://floating-falls-26181.herokuapp.com:443';;
  bot.setWebHook(`${url}/bot${TOKEN}`);
  console.log(`webhook was created: ${url}`);
  
  bot.on("message", async (msg) => {
    try {
      if (msg.text !== undefined) {
        if (msg.text.includes("@all") || msg.text.includes("@all_42bot")) {
          pingAll();
        }
      }
    } catch (e) {
      bot.sendMessage(msg.chat.id, `Something went wrong: ${e}`);
    }
  });
}

setupBot();
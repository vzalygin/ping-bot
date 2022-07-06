const TelegramBot = require("node-telegram-bot-api");

const ids = [1377576664, 947163681,]; //838805281, 734752306];

const token = process.env.TOKEN;
// const options = {
//   polling: true,
// };
const options = {
  webHook: {
    port: process.env.PORT,
  },
};

const bot = new TelegramBot(token, options);

const url = process.env.APP_URL || 'https://muver-ping-bot.herokuapp.com:443';;
bot.setWebHook(`${url}/bot${token}`);

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  try {
    if (msg.text !== undefined) {
      if (msg.text.includes("@all")) {
        let message = "";
        for (const id of ids) {
          if (id !== msg.from.id) {
            const member = await bot.getChatMember(chatId, id);
            const name = member.user.first_name;
            message += `[${name}](tg://user?id=${id}) `;
          }
        }
        bot.sendMessage(chatId, message, { parse_mode: 'MarkdownV2' });
      }
    }
  } catch (e) {
    bot.sendMessage(chatId, `Something went wrong: ${e}`);
  }
});

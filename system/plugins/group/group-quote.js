module.exports = {
  command: "quote",
  alias: ["kutip"],
  category: ["group"],
  settings: {
    group: true,
  },
  description: "💬 *Fitur Kutip Pesan - Ambil dan kirimkan kembali pesan dengan tambahan!* 💬",
  async run(m, { sock }) {
    const quotedMessage = m.quoted ? m.quoted : m;
    const quotedSender = quotedMessage.sender;
    const quotedText = quotedMessage.text || quotedMessage.caption || "Pesan tidak ditemukan.";
    
    const quoteMessage = `${quotedText}`;
    
    const message = m.text ? m.text.replace(/^\S+\s+/, '') : '';

    if (message) {
      m.reply(`${quoteMessage}${message}`);
    } else {
      m.reply(`*Pesan yang dikutip:* \n${quoteMessage}`);
    }
  }
};
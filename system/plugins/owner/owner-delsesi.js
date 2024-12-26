const fs = require('fs');

module.exports = {
  command: "delsesi",
  alias: ["clearsesi", "deletesesi"],
  category: ["owner"],
  settings: {
    owner: true,
  },
  description: "Untuk Clear Sesi",
  async run(m, { sock, Func, text, config }) {
    const sessionPath = process.cwd() + '/Devo-Sessions';

    fs.readdir(sessionPath, async function (err, files) {
      if (err) {
        console.log('Unable to scan directory: ' + err);
        return m.reply('Unable to scan directory: ' + err);
      }

      let filteredArray = await files.filter(item => 
        item.startsWith("pre-key") ||
        item.startsWith("sender-key") || 
        item.startsWith("session-") || 
        item.startsWith("app-state")
      );

      let teks = `Terdeteksi ${filteredArray.length} file kenangan <3\n\n`;
      if (filteredArray.length == 0) return m.reply(`${teks}`);
      
      filteredArray.map(function(e, i) {
        teks += (i + 1) + `. ${e}\n`;
      });

      m.reply(`${teks}`); 

      await sleep(2000);
      m.reply("Menghapus file Kenangan...");
      
      await filteredArray.forEach(function (file) {
        fs.unlinkSync(`${sessionPath}/${file}`);
      });

      await sleep(2000);
      m.reply("Berhasil menghapus semua Kenangan di folder session");
    });
  }
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
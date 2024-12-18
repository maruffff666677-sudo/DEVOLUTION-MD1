const fs = require('fs');

module.exports = {
   command: "catat",
   alias: ["catatan"], 
   category: ["fun"],
   description: "Menyimpan catatan pribadi",
   settings: {
      group: true
   }, 
   loading: true, 
   async run(m, { sock, text }) {
      if (!text) return m.reply("Tulis sesuatu untuk disimpan sebagai catatan.");

      const note = text.trim();
      const userNotesPath = `${process.cwd()}/database/notes_${m.sender}.txt`;

      fs.appendFileSync(userNotesPath, note + '\n', 'utf8');
      
      m.reply(`Catatan berhasil disimpan: ${note}`);
   }
};
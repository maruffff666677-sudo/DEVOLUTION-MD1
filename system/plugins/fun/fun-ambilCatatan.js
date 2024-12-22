const fs = require('fs');

module.exports = {
   command: "ambilcatatan",
   alias: ["getcatatan"], 
   category: ["fun"],
   settings: {
      group: true
   }, 
   description: "Mengambil catatan pribadi berdasarkan sender",
   loading: true, 
   async run(m, { sock }) {
      const userNotesPath = `${process.cwd()}/database/notes_${m.sender}.txt`;

      if (!fs.existsSync(userNotesPath)) {
         return m.reply("Tidak ada catatan yang ditemukan untuk anda.");
      }

      const notes = fs.readFileSync(userNotesPath, 'utf8');
      
      sock.sendMessage(m.sender, { text: notes });

      m.reply("Catatan telah dikirimkan ke pesan pribadi anda.");
   }
};
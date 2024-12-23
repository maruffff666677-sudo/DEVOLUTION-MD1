const fs = require('fs');
const usersFile = `${process.cwd()}/database/anonim.json`;

module.exports = {
   command: "anonymous",
   alias: ["chat", "anon"],
   category: ["fun"],
   settings: {
      limit: false
   },
   description: "Fitur Anonymous Chat, temukan pasangan anonim untuk ngobrol!",
   async run(m, { sock }) {
      const sender = m.sender;
      const data = JSON.parse(fs.readFileSync(usersFile, "utf8"));

      const sendMessage = async (id, text) => {
         await sock.sendMessage(id, { text });
      };

      const startChat = async () => {
         if (data.queue.includes(sender)) {
            return sendMessage(sender, "🚫 Kamu sudah dalam antrian. Tunggu pasangan chat.");
         }

         data.queue.push(sender);
         fs.writeFileSync(usersFile, JSON.stringify(data, null, 2));

         sendMessage(sender, "👀 Kamu telah masuk ke antrian. Menunggu pasangan chat...");

         if (data.queue.length > 1) {
            const partner = data.queue.find(user => user !== sender);
            if (partner) {
               data.users[sender] = partner;
               data.users[partner] = sender;

               data.queue = data.queue.filter(user => user !== sender && user !== partner);
               fs.writeFileSync(usersFile, JSON.stringify(data, null, 2));

               sendMessage(sender, "Kamu Berhasil Terhubung Selamat Mengobrol!");
               sendMessage(partner, "Kamu Berhasil Terhubung Selamat Mengobrol!");
            }
         }
      };

      const stopChat = async () => {
         if (!data.users[sender]) {
            return sendMessage(sender, "🚫 Kamu tidak sedang dalam sesi chat.");
         }

         const partner = data.users[sender];
         delete data.users[sender];
         delete data.users[partner];

         fs.writeFileSync(usersFile, JSON.stringify(data, null, 2));

         sendMessage(sender, "❌ Kamu telah keluar dari sesi chat.");
         sendMessage(partner, "⚠️ Pasanganmu telah keluar dari sesi chat.");
      };

      const sendToPartner = async (message) => {
         const partner = data.users[sender];
         if (partner) {
            sendMessage(partner, `💬${message}`);
         } else {
            sendMessage(sender, "🚫 Kamu tidak sedang terhubung dengan siapa pun.");
         }
      };

      const command = m.text.split(" ")[0];
      const message = m.text.slice(command.length).trim();

      if (command === "!start") {
         startChat();
      } else if (command === "!stop") {
         stopChat();
      } else if (data.users[sender]) {
         sendToPartner(message);
      } else {
         sendMessage(sender, "❓ Gunakan `!start` untuk memulai atau `!stop` untuk keluar.");
      }
   }
};
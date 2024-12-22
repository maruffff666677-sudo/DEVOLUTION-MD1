/*
🔥🔥🔥 Jangan hapus wm ini atau kamu mati 🔥🔥🔥
💥💥💥 Fitur -> Jawaban Acak "Apakah" 💥💥💥
🔗 🔥 https://whatsapp.com/channel/0029VamzFetC6ZvcD1qde90Z 🔥
*/

module.exports = {
   command: "apakah",
   alias: ["apakah", "apaka"],
   category: ["fun"],
   settings: {
      limit: true
   },
   description: "Beri pertanyaan dengan kata 'apakah' dan dapatkan jawaban",
   async run(m, { text }) {
      if (!text) {
         return m.reply("❌ *Eh salah, cuy!* Pertanyaan harus diawali dengan *'Apakah'*. \nContoh: *!apakah dia gay?*");
      }

      const answers = [
         "😁 *Tentu Saja.*",
         "😏 *Keknya Kaga*",
         "🔮 *Mungkin Iya , Mungkin Tidak Tergantung Takdirnya.* ",
         "💀 *Berharap Jawaban Apa Broo*",
         "🥱 *Mending Turu Daripada Banyak Tanya*",
         "🥱 *malas jawabnya.*",
         "*kamu Nanya? 🤣*",
         "⚡️ *Udah jangan tanya kenapa, tanya apakah lo bakal sukses kaga.*",
         "🍔 *Apa Apa Terus, lo mending fokus makan burger daripada mikir beginian.*",
         "🌭 *Banyak Tanya, bumi ini nggak peduli sama lo.*",
         "🫡 *Tanya Apa Apa Terus? gue bot, bukan Babu Luh!*"
      ];

      const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      m.reply(randomAnswer);
   }
}
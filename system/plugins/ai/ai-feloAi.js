module.exports = {
   command: "felo",
   alias: ["felo-ai"],
   category: ["ai"],
   settings: {},
   description: "Berikan Pertanyaan Apa pun Kepada Felo",
   loading: true,
   async run(m, { text, sock }) {
      try {
         if (!text) {
            return sock.sendMessage(m.cht, {
               text: "*⚠️ Masukkan pertanyaan setelah command!*",
               footer: "Felo AI • RiooXdzz",
               quoted: m
            });
         }

         const apiUrl = `https://restapi.apibotwa.biz.id/api/felo?query=${encodeURIComponent(text)}`;
         const response = await fetch(apiUrl);
         const result = await response.json();

         if (response.ok && result.status === 200) {
            let answer = result.result.answer.replace(/\*\*/g, "*");
            const sources = result.result.source.length > 0
               ? result.result.source.map((s, i) => `[${i + 1}] ${s.link}`).join("\n")
               : "Tidak ada sumber referensi.";

            sock.sendMessage(m.cht, {
               text: `*${answer}*\n\n📚 *Sumber Referensi:*\n\n${sources}`,
               footer: "Powered by Felo AI",
               quoted: m
            });
         } else {
            throw new Error("Gagal mengambil data dari Felo.");
         }
      } catch (error) {
         sock.sendMessage(m.cht, {
            text: `*⚠️ Error:*\n${error.message}`,
            footer: "Felo AI • Hubungi Admin",
            quoted: m
         });
      }
   }
};
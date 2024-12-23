module.exports = {
   command: "no-wm",
   alias: ["removewm"],
   category: ["utility"],
   settings: {
      limit: true
   },
   loading: true,
   async run(m, { text, sock }) {
      if (!text) {
         return m.reply("Masukkan kode yang ingin dihapus watermark-nya.")
      }
      try {
         let codeLines = text.split('\n');
         let result = [];
         codeLines.forEach(line => {
              if (/wm/i.test(line) || /\/\/.*wm/i.test(line) || /\/\*.*wm.*\*\//i.test(line)) {
               return;
            }
            result.push(line.trim());
         });
         let cleanedCode = result.join('\n').trim();

         if (cleanedCode.length === 0) {
            return m.reply("Semua baris mengandung watermark atau komentar yang mengandung wm. Tidak ada kode yang tersisa.");
         }
         await sock.sendMessage(m.cht, {
            text: `${cleanedCode}`
         }, { quoted: m });
      } catch (error) {
         console.error("Terjadi kesalahan saat menghapus watermark:", error);
         return m.reply("Upss! Terjadi kesalahan saat memproses kode. Coba lagi nanti.");
      }
   }
}
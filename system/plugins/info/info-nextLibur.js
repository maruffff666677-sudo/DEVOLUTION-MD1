module.exports = {
   command: "nextlibur",
   alias: ["kapanlibur"],
   category: ["info"],
   settings: {},
   description: "Dapatkan Informasi Kapan Hari Libur",
   loading: true,
   async run(m, { sock }) {
      try {
         let hari = await fetch(`https://server.apisanz.my.id/news/harilibur`)
         let libur = await hari.json();
         let nextLibur = libur.data.nextLibur;
         let libnasContent = libur.data.libnas_content;

         let liburInfo = `*🔥 Libur Selanjutnya:* \n\n${nextLibur}\n\n*📅 Daftar Hari Libur Lainnya:*`;

         libnasContent.forEach((item, index) => {
            liburInfo += `
*${index + 1}. ${item.summary}*
*🗓️ Hari:* ${item.days}
*📅 Tanggal:* ${item.dateMonth}
\n`;
         });

         m.reply(liburInfo);
      } catch (error) {
         console.error(error);
         m.reply("*( ⚠️ Error )* Terjadi kesalahan saat mengambil data hari libur.");
      }
   }
};
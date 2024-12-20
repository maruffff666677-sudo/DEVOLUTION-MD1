module.exports = {
    command: "sfile-search",
    alias: ["filesearch"],
    category: ["tools"],
    settings: {},
    description: "🔍 *Cari File di Sfile dengan Mudah!*",
    loading: true,
    async run(m, { text, sock }) {
        if (!text) {
            return m.reply("*[ ❌ Denied ]* Masukkan nama file yang ingin dicari! Contoh: `!sfile-search baseorderkuotaUpdate`");
        }

        try {
            m.reply("*⏳ Sedang mencari file, harap tunggu...*");

            let apiSearch = await fetch(`https://restapii.rioooxdzz.web.id/api/search-sfile?message=${text}`);
            let hasil = await apiSearch.json();

            if (!hasil?.data?.response) {
                return m.reply("*[ ⚠️ Not Found ]* Maaf, file yang Anda cari tidak ditemukan.");
            }

            let responses = Object.values(hasil.data.response);
            let responseMessage = `*✨ Hasil Pencarian untuk:*\n*'${text}'*\n\n`;

            responses.forEach((item, index) => {
                responseMessage += `*🔹 File ${index + 1}:*\n`;
                responseMessage += `📁 *Nama*: ${item.namafile}\n`;
                responseMessage += `📦 *Ukuran*: ${item.filesize}\n`;
                responseMessage += `🔗 *Link*: ${item.download}\n\n`;
            });
                responseMessage += `📞 _Untuk mendownload silahkan gunakan sfile-download_`;

            m.reply(responseMessage.trim());
        } catch (error) {
            console.error("Error saat mencari file:", error);
            m.reply("*[ ❌ Error ]* Terjadi kesalahan saat mencari file. Silakan coba lagi nanti.");
        }
    }
};
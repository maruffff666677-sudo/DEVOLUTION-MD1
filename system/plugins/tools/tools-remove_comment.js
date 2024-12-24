const fs = require('fs');

module.exports = {
    command: "remove-comment",
    alias: ["rmc", "delcom"],
    category: ["tools"],
    settings: {
        limit: true
    },
    loading: true,
    run: async (m, { text }) => {
        try {
            if (!text && !m.quoted.body) return m.reply("> Harap reply atau kirim teks kode yang ingin dibersihkan.");

            const code = text || m.quoted.body;
            const removeComments = (code) => {
                return code
                    .replace(/\/\/.*|\/\*[\s\S]*?\*\/|#[^\r\n]*|<!--[\s\S]*?-->|--[^\r\n]*|;[^\r\n]*|^\s*%\s?.*$/gm, '')
                    .replace(/^\s*[\r\n]/gm, ''); 
            };

            const cleanCode = removeComments(code);

            await m.reply(`${cleanCode.trim()}`);
        } catch (error) {
            m.reply(`> ⚠️ Terjadi kesalahan: ${error.message}`);
        }
    }
};
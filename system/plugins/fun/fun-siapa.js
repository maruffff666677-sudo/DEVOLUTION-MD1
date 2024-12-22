module.exports = {
    command: "siapakah",
    alias: ["whois"],
    category: ["fun"],
    description: "Menunjukkan siapa orang yang terpilih secara acak di grup.",
    loading: true,
    async run(m, { sock }) {
        try {
            const group = await sock.groupMetadata(m.cht);
            const participants = group.participants;
            const randomUser = participants[Math.floor(Math.random() * participants.length)];
            sock.sendMessage(m.cht, { text: `*Siapa yang terpilih?* 😎\n\n🎉 *Selamat @${randomUser.id.split('@')[0]}, kamu yang terpilih!*` }, { mentions: [randomUser.id] });
        } catch (error) {
            console.error(error);
            sock.sendMessage(m.cht, { text: "Terjadi kesalahan, coba lagi!" });
        }
    }
};
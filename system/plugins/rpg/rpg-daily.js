module.exports = {
    command: "daily",
    alias: [],
    category: ["rpg"],
    settings: {},
    loading: true,

    async run(m, { sock }) {
        const user = db.list().user[m.sender];
        const now = Date.now();

        if (!user) {
            return m.reply(`╭━「 ❌ USER NOT FOUND 」━╗
│
│ ⚠️ Anda belum terdaftar.
│    Ketik *register* untuk mendaftar.
│
╰════════════════════`);
        }

        if (now - user.lastDaily < 24 * 60 * 60 * 1000) {
            const remaining = new Date(24 * 60 * 60 * 1000 - (now - user.lastDaily));
            const hours = remaining.getUTCHours();
            const minutes = remaining.getUTCMinutes();
            return m.reply(`╭═━「 ⏳ COOLDOWN 」━╗
│
│ Anda sudah mengklaim *daily reward*.
│ Tunggu ${hours} jam ${minutes} menit lagi.
│
╰════════════════════`);
        }

        user.money += 10000;
        user.lastDaily = now;
        return m.reply(`╭━「 🎉 DAILY REWARD 」━╗
│
│ 🎁 Money: +10.000
│ 💰 Total: ${user.money.toLocaleString()}
│
╰════════════════════`);
    },
};
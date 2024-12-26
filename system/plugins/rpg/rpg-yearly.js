module.exports = {
    command: "yearly",
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

        if (now - user.lastYearly < 365 * 24 * 60 * 60 * 1000) {
            const remaining = new Date(365 * 24 * 60 * 60 * 1000 - (now - user.lastYearly));
            const months = Math.floor(remaining / (30 * 24 * 60 * 60 * 1000));
            const days = Math.floor((remaining % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
            return m.reply(`╭━「 ⏳ COOLDOWN 」━╗
│
│ Anda sudah mengklaim *yearly reward*.
│ Tunggu ${months} bulan ${days} hari lagi.
│
╰════════════════════`);
        }

        user.stats.strength += 100;
        user.stats.agility += 100;
        user.stats.defense += 100;
        user.money += 100000;
        user.lastYearly = now;

        return m.reply(`╭━「 🎉 YEARLY REWARD 」━╗
│
│ 🎁 Stats: +100 (Strength, Agility, Defense)
│ 🎁 Money: +100.000
│ 💰 Total Money: ${user.money.toLocaleString()}
│
╰════════════════════`);
    },
};
module.exports = {
    command: "monthly",
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

        if (now - user.lastMonthly < 30 * 24 * 60 * 60 * 1000) {
            const remaining = new Date(30 * 24 * 60 * 60 * 1000 - (now - user.lastMonthly));
            const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
            return m.reply(`╭═━「 ⏳ COOLDOWN 」━╗
│
│ Anda sudah mengklaim *monthly reward*.
│ Tunggu ${days} hari lagi.
│
╰════════════════════`);
        }

        user.stats.strength += 10;
        user.stats.agility += 10;
        user.stats.defense += 10;
        user.money += 50000;
        user.lastMonthly = now;

        return m.reply(`╭═━「 🎉 MONTHLY REWARD 」━═╗
│
│ 🎁 Stats: +10 (Strength, Agility, Defense)
│ 🎁 Money: +50.000
│ 💰 Total Money: ${user.money.toLocaleString()}
│
╰════════════════════`);
    },
};
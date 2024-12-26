module.exports = {
    command: "gajian",
    alias: ["salary", "dailyreward"],
    category: ["rpg"],
    settings: {},
    loading: true,

    async run(m, { sock }) {
        let user = db.list().user[m.sender];
        try {
            if (!user) {
                return m.reply(`╭══━「 ❌ USER NOT FOUND 」━══╗
│
│ ⚠️ Anda belum terdaftar.
│    Ketik *register* untuk mendaftar.
│
╰════════════════════`);
            }

            const cooldownTime = 24 * 60 * 60 * 1000; // 24 jam
            if (user.lastGajian && (Date.now() - user.lastGajian) < cooldownTime) {
                let timeLeft = Math.ceil((cooldownTime - (Date.now() - user.lastGajian)) / 1000 / 60 / 60);
                return m.reply(`╭══━「 ⏳ GAJIAN COOLDOWN 」━══╗
│
│ ⏰ Anda sudah menerima gaji hari ini.
│    Tunggu ${timeLeft} jam untuk gajian berikutnya.
│
╰════════════════════`);
            }

            const salary = 50000;
            user.money += salary;
            user.lastGajian = Date.now();

            return m.reply(`╭══━「 💵 GAJIAN HARIAN 」━══╗
│
│ 🎉 Selamat! Anda telah menerima gaji.
│ 💰 Tambahan Saldo: +${salary.toLocaleString()}
│ 💹 Total Saldo Anda: ${user.money.toLocaleString()}
│
╰════════════════════`);
        } catch (error) {
            console.error('Error in gajian command:', error);
            return m.reply(`╭══════════════════════
│ ❌ Terjadi kesalahan.
│ Mohon coba beberapa saat lagi.
╰══════════════════════`);
        }
    }
};
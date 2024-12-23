const moment = require('moment-timezone');

module.exports = {
    command: "limit",
    alias: ["limit-saya", "ceklimit", "mylimit"],
    category: ["fun"],
    settings: {},
    loading: true,
    
    async run(m, { Func, sock }) {
        try {
            let user = db.list().user[m.sender];
            let limitt = user.limit || 0;
            const maxLimit = 100;
            const limitPercentage = (limitt / maxLimit * 100).toFixed(1);
            
            const progressBarLength = 10;
            
            const currentTime = moment().tz('Asia/Jakarta').format('HH:mm:ss');
            const currentDate = moment().tz('Asia/Jakarta').format('DD/MM/YYYY');
            
            const getLimitStatus = (limit) => {
                if (limit >= 70) return '🟢 Tinggi';
                if (limit >= 30) return '🟡 Sedang';
                return '🔴 Rendah';
            };

            const caption = `╭═══❯ *LIMIT CHECK* ❮═══
│
│ 👤 *Username:* ${m.pushName}
│ 🆔 *User ID:* ${m.sender.split('@')[0]}
│ ⭐ *Limit:* ${Func.formatNumber(limitt)}/${Func.formatNumber(maxLimit)}
│ 📈 *Status:* ${getLimitStatus(limitt)}
│ ⏰ *Last Check:* ${currentTime}
│ 📅 *Date:* ${currentDate}
│
╰════════════════════

💡 *Tips:*
• Dapatkan limit tambahan dengan bermain game
• Selesaikan misi harian untuk bonus limit

📝 *Note:* Limit akan direset setiap hari
pada pukul 00:00 WIB.`;

            await m.reply("⌛ *Mengecek limit...*");
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            await m.reply(caption);
            
        } catch (error) {
            console.error('Error in limit command:', error);
            return m.reply(`╭══════════════════════
│ ❌ *Terjadi Kesalahan*
│ Mohon coba beberapa saat lagi
╰══════════════════════`);
        }
    }
};
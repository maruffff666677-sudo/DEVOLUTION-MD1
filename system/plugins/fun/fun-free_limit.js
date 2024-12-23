const moment = require('moment-timezone');

module.exports = {
    command: "free-limit",
    alias: ["limit-free", "claim-limit", "daily-limit"],
    category: ["fun"],
    settings: {},
    loading: true,
    
    async run(m, { Func, sock }) {
        try {
            let user = db.list().user[m.sender];
            const currentTime = moment().tz('Asia/Jakarta');
            const cooldownHours = 7;
            
            if (user.lastLimitClaim) {
                const lastClaim = moment(user.lastLimitClaim).tz('Asia/Jakarta');
                const timeDiff = currentTime.diff(lastClaim, 'hours', true);
                
                if (timeDiff < cooldownHours) {
                    const remainingTime = cooldownHours - timeDiff;
                    const remainingHours = Math.floor(remainingTime);
                    const remainingMinutes = Math.floor((remainingTime % 1) * 60);
                    
                    const caption = `╭═══❯ *LIMIT CLAIM* ❮═══
│
│ ⏰ *Cooldown Active*
│ ❌ Anda sudah mengklaim limit gratis!
│ ⌛ *Waktu Menunggu:*
│ ${remainingHours} jam ${remainingMinutes} menit
│ 📅 *Claim Terakhir:*
│ ${lastClaim.format('HH:mm:ss DD/MM/YYYY')}
│
╰═════════════════════

💡 *Tips:* 
• Mainkan game untuk dapat limit tambahan
• Selesaikan misi harian untuk bonus
• Kembali lagi setelah cooldown selesai`;

                    return m.reply(caption);
                }
            }
            
            let randomLimit = Math.floor(Math.random() * 100) + 1;
            
            const hour = currentTime.hour();
            if (hour >= 1 && hour <= 5) randomLimit *= 1.5;
            
            user.limit += Math.floor(randomLimit);
            user.lastLimitClaim = currentTime.format();
            
            const maxLimit = 1000;
            const limitPercentage = (user.limit / maxLimit * 100).toFixed(1);
            
            const caption = `╭═══❯ *LIMIT CLAIMED!* ❮═══
│
│ ✨ *Selamat!* 
│ Anda mendapatkan ${Func.formatNumber(Math.floor(randomLimit))} limit!
│ 👤 *Username:* ${m.pushName}
│ 💫 *Total Limit:* ${Func.formatNumber(user.limit)}
│ ⏰ *Claim Time:* ${currentTime.format('HH:mm:ss')}
│ 📅 *Date:* ${currentTime.format('DD/MM/YYYY')}
│ ⌛ *Next Claim:* 
│ ${currentTime.add(cooldownHours, 'hours').format('HH:mm:ss')}
│
╰═════════════════════

💡 *Bonus Info:*
• Claim antara jam 01:00 - 05:00 WIB
  mendapatkan bonus limit 50%!
• Cooldown: ${cooldownHours} jam

📝 *Note:* Jangan lupa claim lagi setelah
cooldown selesai!`;

            await m.reply("⌛ *Mengecek sistem limit...*");
            await new Promise(resolve => setTimeout(resolve, 1000));
            await m.reply("🎲 *Mengacak jumlah limit...*");
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            return m.reply(caption);
            
        } catch (error) {
            console.error('Error in free-limit command:', error);
            return m.reply(`╭══════════════════════
│ ❌ *Terjadi Kesalahan*
│ Mohon coba beberapa saat lagi
╰══════════════════════`);
        }
    }
};
let path = require('path');
let dataPath = path.join(process.cwd(), "lib", "levelling.js")
let levelling = require(dataPath)

module.exports = {
   command: "profile",
   alias: ["me", "myprofile"],
   category: ["rpg"],
   settings: {},
   loading: true,

   async run(m, { sock }) {
      let user = db.list().user[m.sender];
      let now = Date.now();
      let premiumTimeLeft = "";

      if (user.premium.status) {
         let timeLeft = user.premium.expired - now;
         let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
         let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         premiumTimeLeft = `${days}d ${hours}h`;
      }

      let cooldownCheck = (lastClaim, duration) => {
         let remaining = lastClaim + duration - now;
         if (remaining <= 0) return "✔";
         let hours = Math.floor(remaining / (1000 * 60 * 60));
         let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
         return `${hours}h ${minutes}m`;
      };

      let dailyCooldown = cooldownCheck(user.lastDaily, 24 * 60 * 60 * 1000);
      let monthlyCooldown = cooldownCheck(user.lastMonthly, 30 * 24 * 60 * 60 * 1000);
      let yearlyCooldown = cooldownCheck(user.lastYearly, 365 * 24 * 60 * 60 * 1000);

      let { min, xp, max } = levelling.xpRange(user.level, global.multiplier);
      let currentProgress = user.exp - min;
      let progressPercentage = ((currentProgress / xp) * 100).toFixed(2);

      let progressBar = "[";
      for (let i = 0; i < 10; i++) {
         if (i < Math.floor(progressPercentage / 10)) {
            progressBar += "▰";
         } else {
            progressBar += "▱";
         }
      }
      progressBar += "]";

      let memoriesText = "";
      if (Array.isArray(user.memories) && user.memories.length > 0) {
         memoriesText = `╔══━「 💭 MEMORIES 」━══╗\n\n`;
         user.memories.forEach((memory, index) => {
            memoriesText += `  ${index + 1}. ${memory.text}\n`;
         });
         memoriesText += "\n";
      }

      let profile = `
╔══━「 🎭 PROFILE INFO 」━══╗

  👤 Nama: ${m.pushName}
  ${user.premium.status ? '👑 Status: Premium User' : '👥 Status: Regular User'}
  ${user.banned.status ? '🚫 Account: BANNED' : '✅ Account: Active'}
  ${user.register ? '📝 Registered: Yes' : '📝 Registered: No'}

╔══━「 📊 STATISTICS 」━══╗

  📈 〉Level: ${user.level}
  ⭐ 〉EXP: ${currentProgress}/${xp}
  📊 〉Progress: ${progressBar} ${progressPercentage}%
  💰 〉Money: ${user.money.toLocaleString()}
  🎫 〉Limit: ${user.limit}

╔══━「 💪 BATTLE STATS 」━══╗

  ⚔️ 〉Strength : ${user.stats.strength}
  🏃 〉Agility  : ${user.stats.agility}
  ❤️ 〉Health   : ${user.stats.health}
  🛡️ 〉Defense  : ${user.stats.defense}

╔══━「 🕒 CLAIM COOLDOWN 」━══╗

  🗓️ 〉Daily   : ${dailyCooldown}
  🗓️ 〉Monthly : ${monthlyCooldown}
  🗓️ 〉Yearly  : ${yearlyCooldown}

╔══━「 📅 CLAIMED 」━══╗

  🕒 〉Last Claim: ${user.lastLimitClaim ? new Date(user.lastLimitClaim).toLocaleString() : 'Never'}
  🏢 〉Last Work : ${user.lastkerja ? new Date(user.lastkerja).toLocaleString() : 'Never'}

${memoriesText}╚══━━━━━━━━━━━━━══╝`.trim();

      await sock.sendMessage(m.cht, {
         contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
               showAdAttribution: true,
               renderLargerThumbnail: true,
               title: `Pʀᴏғɪʟᴇ || ${m.pushName}`,
               body: `Lᴇᴠᴇʟ || ${user.level}`,
               previewType: "PHOTO",
               sourceUrl: "https://e2.yotools.net/images/user_image/2024/12/676c30efe6be8.jpg",
               mediaType: 1,
               thumbnailUrl: "https://e2.yotools.net/images/user_image/2024/12/676c30efe6be8.jpg"
            }
         },
         text: profile
      }, { quoted: m.fopenai });
   }
};
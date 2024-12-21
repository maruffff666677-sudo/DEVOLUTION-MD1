const moment = require("moment-timezone");
const pkg = require(process.cwd() + "/package.json");
const fs = require("node:fs");

module.exports = {
    command: "menu",
    alias: ["menu", "help"],
    category: ["main"],
    description: "Menampilkan menu bot",
    loading: true,
    async run(m, { sock, plugins, config, Func }) {
        let data = fs.readFileSync(process.cwd() + "/system/case.js", "utf8");
        let casePattern = /case\s+"([^"]+)"/g;
        let matches = data.match(casePattern);
        if (!matches) return m.reply("Tidak ada case yang ditemukan.");
        matches = matches.map(match => match.replace(/case\s+"([^"]+)"/, "$1"));

        let menu = {};
        plugins.forEach(item => {
            if (item.category && item.command) {
                item.category.forEach(cat => {
                    if (!menu[cat]) {
                        menu[cat] = { command: [] };
                    }
                    menu[cat].command.push({
                        name: item.command,
                        alias: item.alias
                    });
                });
            }
        });

        let cmd = 0, alias = 0;
        let pp = await sock.profilePictureUrl(m.sender, 'image').catch(e => 'https://files.catbox.moe/8getyg.jpg');

        Object.values(menu).forEach(category => {
            cmd += category.command.length;
            category.command.forEach(command => alias += command.alias.length);
        });

        let caption = `Wᴇʟᴄᴏᴍᴇ @${m.sender.split('@')[0]} sᴀʏᴀ ᴅᴇᴠᴏʟᴜᴛɪᴏɴ sᴇʙᴜᴀʜ sᴄʀɪᴘᴛ ʙᴏᴛ ᴡʜᴀᴛ'sᴀᴘᴘ ʏᴀɴɢ ᴅɪ ᴋᴇᴍʙᴀɴɢᴋᴀɴ ᴏʟᴇʜ ᴛᴇᴀᴍ ʏᴀɴɢ ʜᴇʙᴀᴛ \`( ᴅᴇᴠᴏʟᴜᴛɪᴏɴ-ᴅᴇᴠᴇʟᴏᴘᴍᴇɴᴛ )\` ʏᴀɴɢ ᴛᴇʀᴅɪʀɪ ᴅᴀʀɪ 𝟼 ᴏʀᴀɴɢ ʜᴇʙᴀᴛ. 
      
sᴀʏᴀ ᴅɪ ʙᴜᴀᴛ ᴜɴᴛᴜᴋ ᴍᴇᴍʙᴀɴᴛᴜ ᴀɴᴅᴀ ᴅᴀʟᴀᴍ ᴍᴇᴍᴜᴅᴀʜᴋᴀɴ sᴇᴛɪᴀᴘ ᴀᴋᴛɪᴠɪᴛᴀs ʏᴀɴɢ sᴜʟɪᴛ, sᴇᴘᴇʀᴛɪ ᴍᴇɴᴊᴀᴡᴀʙ sᴏᴀʟ ᴍᴇʟᴀᴋᴜᴋᴀɴ sᴇᴀʀᴄʜɪɴɢ ᴀᴛᴀᴜ ʙᴀʜᴋᴀɴ ᴍᴇᴍᴜᴛᴀʀ ʟᴀɢᴜ 🎶 sᴇʟᴀɪɴ ɪᴛᴜ sᴀʏᴀ ᴊᴜɢᴀ ᴍᴇᴍɪʟɪᴋɪ ʙᴀɴʏᴀᴋ ғᴇᴀᴛᴜʀᴇ ʙᴇʀɢᴜɴᴀ ʟᴏʜ! sɪʟᴀʜᴋᴀɴ ᴅɪ ʟɪʜᴀᴛ. 

╭─❒ *Wᴇʟᴄᴏᴍᴇ* ❒
│ • Total Alias: ${alias}  
│ • Total Command: ${cmd}  
╰───────────────╯

\`INFO PENGGUNA\`
 • Nama: ${m.pushName}
 • Perangkat: ${m.device}
 • Tag: @${m.sender.split("@")[0]}

\`INFO BOT\`
 • Nama: ${pkg.name}
 • Versi: v${pkg.version}
 • Prefix: [ ${m.prefix} ]
 • Runtime: ${Func.toDate(process.uptime() * 1000)}

Jika menemukan bug atau error, hubungi owner.

*– Menu Tambahan*
${matches.map((a, i) => ` ${i + 1}. *${m.prefix + a}*`).join("\n")}`;

        Object.entries(menu).forEach(([tag, commands]) => {
            caption += `\n\n╭─❒ *M ᴇ ɴ ᴜ - ${tag.toUpperCase()}* ❒`;
            commands.command.forEach((command, index) => {
                caption += `\n│ *${command.name}*`;
            });
            caption += `\n╰───────────────╯`;
        });

        await sock.sendMessage(m.cht, {
            text: caption,
            contextInfo: {
            mentionedJid: [m.sender],
            isForwarded: !0,
            forwardingScore: 127,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363329425162176@newsletter",
                newsletterName: "Dᴇᴠᴏʟᴜᴛɪᴏɴ | 𝟷.𝟶.𝟷",
                 serverMessageId: -1
             },
                externalAdReply: {
                    title: "DEVOLUTION-MD1 v1.0.1",
                    body: "Saya siap membantu Anda!",
                    mediaType: 1,
                    thumbnailUrl: "https://img100.pixhost.to/images/950/543947535_rizz.jpg",
                    sourceUrl: "https://restapii.rioooxdzz.web.id/",
                },
            },
        });
    },
};
const moment = require('moment-timezone');

module.exports = {
    command: "cheat",
    alias: ["hackrpg", "rpghack"],
    category: ["owner"],
    settings: {
        owner: true
    },
    loading: false,
    async run(m, { text, sock }) {
        try {
            const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            const generateTimestamp = () => moment().tz('Asia/Jakarta').format('DD/MM/YY HH:mm:ss');
            const validateInput = (amount) => {
                const num = parseInt(amount);
                return !isNaN(num) && num > 0;
            };
            const sendProgressMessage = async (messages) => {
                for (const msg of messages) {
                    await m.reply(msg);
                    await new Promise(resolve => setTimeout(resolve, 1500));
                }
            };
            const createSuccessEmbed = (type, amount, currentBalance) => {
                return `*『 CHEAT SYSTEM 』*
╭━━━━━━━━━━━━━━━╮
┃ 🎮 *CHEAT SUCCESS*
┃ 📅 ${generateTimestamp()}
╰━━━━━━━━━━━━━━━╯

*👤 USER INFORMATION*
╭━━━━━━━━━━━━━━━╮
┃ 📝 Name: ${m.pushName}
┃ 🏷️ Tag: @${m.sender.split('@')[0]}
╰━━━━━━━━━━━━━━━╯

*💫 CHEAT DETAILS*
╭━━━━━━━━━━━━━━━╮
┃ 🎯 Type: ${type}
┃ 📊 Amount: ${formatNumber(amount)}
┃ 💰 Current: ${formatNumber(currentBalance)}
╰━━━━━━━━━━━━━━━╯

✨ *Success Rate: 100%*
⚡ *Process Time: 4.5s*`;
            };

            if (!text) {
                return m.reply(`*『 CHEAT SYSTEM HELP 』*
╭━━━━━━━━━━━━━━━╮
┃ 🎮 *COMMAND FORMAT*
┃ • cheat [type]|[amount]
╰━━━━━━━━━━━━━━━╯

*📝 AVAILABLE TYPES*
╭━━━━━━━━━━━━━━━╮
┃ 💰 money - Currency cheat
┃ 🎯 limit - Limit points cheat
┃ ⭐ exp - Experience points
┃ 📊 level - Level progression
╰━━━━━━━━━━━━━━━╯

*💡 EXAMPLES*
╭━━━━━━━━━━━━━━━╮
┃ • cheat money|999999
┃ • cheat limit|5000
┃ • cheat exp|50000
┃ • cheat level|100
╰━━━━━━━━━━━━━━━╯

⚠️ *Note: Owner only command*`);
            }

            const [type, amount] = text.split('|');
            if (!['money', 'limit', 'exp', 'level'].includes(type.toLowerCase())) {
                return m.reply(`❌ *Invalid cheat type!*\nAvailable types: money, limit, exp, level`);
            }
            if (!validateInput(amount)) {
                return m.reply(`❌ *Invalid amount!*\nAmount must be a positive number`);
            }

            if (!db.list().user[m.sender]) {
                return m.reply(`❌ *User not found in database!*`);
            }

            const user = db.list().user[m.sender];
            const cheatedAmount = parseInt(amount);

            const cheatProcesses = {
                money: {
                    messages: [
                        "🔒 *ACCESSING BANK SYSTEM...*",
                        "💻 *BYPASSING SECURITY...*",
                        "💰 *INJECTING CURRENCY...*",
                        "✨ *FINALIZING TRANSACTION...*"
                    ],
                    execute: () => {
                        user.money = (user.money || 0) + cheatedAmount;
                        return user.money;
                    }
                },
                limit: {
                    messages: [
                        "🔓 *ACCESSING LIMIT SYSTEM...*",
                        "🛡️ *BYPASSING RESTRICTIONS...*",
                        "🎯 *INJECTING LIMIT POINTS...*",
                        "✨ *STABILIZING SYSTEM...*"
                    ],
                    execute: () => {
                        user.limit = (user.limit || 0) + cheatedAmount;
                        return user.limit;
                    }
                },
                exp: {
                    messages: [
                        "🔓 *ACCESSING EXP SYSTEM...*",
                        "⚡ *BYPASSING EXP CAPS...*",
                        "⭐ *INJECTING EXPERIENCE...*",
                        "✨ *STABILIZING PROGRESS...*"
                    ],
                    execute: () => {
                        user.exp = (user.exp || 0) + cheatedAmount;
                        return user.exp;
                    }
                },
                level: {
                    messages: [
                        "🔓 *ACCESSING LEVEL SYSTEM...*",
                        "📊 *BYPASSING LEVEL CAPS...*",
                        "📈 *ADJUSTING LEVEL DATA...*",
                        "✨ *STABILIZING PROGRESS...*"
                    ],
                    execute: () => {
                        user.level = (user.level || 1) + cheatedAmount;
                        if (user.level < 1) user.level = 1;
                        return user.level;
                    }
                }
            };

            const selectedCheat = cheatProcesses[type.toLowerCase()];
            await m.reply(`*『 INITIALIZING CHEAT 』*
╭━━━━━━━━━━━━━━━╮
┃ 🎮 Type: ${type}
┃ 📊 Amount: ${formatNumber(cheatedAmount)}
╰━━━━━━━━━━━━━━━╯`);

            await sendProgressMessage(selectedCheat.messages);
            const newBalance = selectedCheat.execute();

            await sock.sendMessage(m.cht, {
                text: createSuccessEmbed(type, cheatedAmount, newBalance),
                mentions: [m.sender]
            });

            setTimeout(async () => {
                await m.reply(`*🎮 CHEAT COMPLETED!*
💫 Restart game to see changes`);
            }, 1000);

        } catch (error) {
            console.error('Cheat Command Error:', error);
            return m.reply(`⚠️ *ERROR*\n${error.message}`);
        }
    }
};
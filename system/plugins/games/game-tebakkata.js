const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const ongoingGames = new Map();

const gameEmojis = {
    game: "🎮",
    think: "🤔",
    correct: "✅",
    wrong: "❌",
    time: "⏰",
    brain: "🧠",
    party: "🎉",
    star: "⭐",
    warn: "⚠️",
    fire: "🔥"
};

const formatMessage = (text) => {
    return `┌──『 *TEBAK KATA* 』──⭐\n${text}\n└──────────────⭐`;
};

const checkAnswer = async (msg, sock) => {
    if (!msg || !msg.message) return;
    
    const realMsg = msg.message.ephemeralMessage ? msg.message.ephemeralMessage.message : msg.message;
    const quotedMsg = realMsg.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quotedMsg) return;
    
    const sender = msg.key.participant || msg.key.remoteJid;
    const gameData = ongoingGames.get(sender);
    
    if (!gameData) return;
    
    const userAnswer = realMsg.conversation || realMsg.extendedTextMessage?.text || '';
    const cleanAnswer = userAnswer.toLowerCase().trim();
    const isCorrect = cleanAnswer === gameData.answer;

    if (!gameData.answered) {
        gameData.answered = true;
        
        const responseText = isCorrect 
            ? `\`WINNERS\`\n*Kamu Benar!*\n*+ 5 Poin Limits*`
            : `\`LOSSER\`\n*Kamu Salah Besar!*`;
            if (isCorrect) {
               db.list().user[m.sender].limit += 5
               }
        await sock.sendMessage(gameData.chatId, { 
            text: responseText
        });

        if (isCorrect) {
            ongoingGames.delete(sender);
        } else {
            gameData.answered = false;
        }
    }
};

module.exports = {
    command: "tebakkata",
    alias: ["tebak-kata"],
    category: ["games"],
    settings: {},
    loading: true,
    async run(m, { sock }) {
        try {
            if (ongoingGames.has(m.sender)) {
                return m.reply(`${gameEmojis.warn} Selesaikan dulu permainan sebelumnya!`);
            }

            const res = await fetch('https://btch.us.kg/tebakkata');
            if (!res.ok) throw new Error('Gagal mengambil data dari API.');

            const json = await res.json();

            if (!json || !json.status || !json.result || !json.result.soal || !json.result.jawaban) {
                throw new Error('Format data API tidak sesuai.');
            }

            const soal = json.result.soal;
            const jawabanApi = json.result.jawaban.toLowerCase().trim();
            
            const gameData = {
                answer: jawabanApi,
                chatId: m.cht,
                startTime: Date.now(),
                msgId: m.key.id,
                answered: false
            };

            ongoingGames.set(m.sender, gameData);

            const questionText = `\`TEBAK KATA\`
📙 *Soal:* ${soal}
⏱️ *Waktu:* 30 Detik
🎁 *Hadiah:* + 5 Point Limits
🩸 *Penalti:* - 1 Point Limits
            
_Jawab Dengan Benar! Jangan Sampai Waktu Habis!_`
      
            await sock.sendMessage(m.cht, { 
                text: questionText
            }, { quoted: m });

            setTimeout(async () => {
                const gameData = ongoingGames.get(m.sender);
                if (gameData && !gameData.answered) {
                 db.list().user[m.sender].limit -= 1
                    const timeoutText = `\`TIMEOUT\`
*Waktu Bermain Telah Habis!*
📋 *Jawaban:* ${jawabanApi}
🩸 *Penalti:* - 1 Point Limits

_Terkena Penalti Point Limit Berkurang 1_`
                    await sock.sendMessage(gameData.chatId, { 
                        text: timeoutText
                    }, { quoted: m });
                    ongoingGames.delete(m.sender);
                }
            }, 30000);

            let isListenerSet = false;

            if (!isListenerSet) {
                sock.ev.on("messages.upsert", async (cht) => {
                    if (cht.messages.length === 0) return;
                    const msg = cht.messages[0];
                    if (msg.key.fromMe) return;
                    await checkAnswer(msg, sock);
                });
                isListenerSet = true;
            }
        } catch (e) {
            console.error('Game error:', e);
            const errorText = `│ ${gameEmojis.wrong} *Error!*\n│\n│ ${e.message}`;
            await sock.sendMessage(m.cht, { 
                text: formatMessage(errorText)
            });
        }
    }
};
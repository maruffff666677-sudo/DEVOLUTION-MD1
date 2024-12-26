module.exports = {
    command: "request",
    alias: ["req", "pitur"],
    category: ["fun"],
    description: "Kirim permintaan fitur ke pemilik",
    async run(m, { sock, text, config }) {
        if (!m.isGroup) return m.reply("Perintah ini hanya dapat digunakan di grup!")
        if (!text) return m.reply("Harap masukkan deskripsi fitur yang ingin Anda minta!")

        const groupMetadata = await sock.groupMetadata(m.cht)
        const requestInfo = {
            feature: text,
            user: m.sender.split('@')[0],
            userJid: m.sender,
            group: groupMetadata.subject,
            groupJid: m.cht,
            time: new Date().toLocaleString('id-ID')
        }

        const requestMessage = `╭━━━━『 *FEATURE REQUEST* 』━━━━╮
┃
┃ ⚡ *New Request Incoming!* ⚡
┃
┃ 📑 *Request Detail*
┃ ${text}
┃
┃ 👤 *Requester Info*
┃ • Name: @${requestInfo.user}
┃ • Group: ${requestInfo.group}
┃
┃ ⏰ *Timestamp*
┃ • ${requestInfo.time}
┃
┃ 📍 *Status*: Pending Review ⏳
┃
╰━━━━━━━━━━━━━━━━━━╯

⚠️ This is an automated message.
📩 Reply this message to respond.`

        try {
            await sock.sendMessage("6282181938329@s.whatsapp.net", {
                text: requestMessage,
                mentions: [m.sender]
            })
            await m.reply(`╭─『 *Request Sent* 』
┃
┃ ✅ Feature request delivered!
┃ ⏳ Please wait for owner review
┃
╰━━━━━━━━━━━╯`)
        } catch (error) {
            console.error(error)
            await m.reply("❌ Failed to send request. Please try again later.")
        }
    }
}
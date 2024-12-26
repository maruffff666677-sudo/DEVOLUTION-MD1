const { downloadContentFromMessage } = require('baileys');

module.exports = {
    name: "readviewonce",
    alias: ["rvo", "readvo"],
    category: ["tools"], 
    settings: {}, 
    loading: true, 
    async run (m, { text, sock }) {
        if (!m.quoted) return m.reply('Reply to a view once message!');
        
        try {
            let msg = m.quoted.message;
            let type = Object.keys(msg)[0];
            let media = await downloadContentFromMessage(msg[type], type.includes('image') ? 'image' : 'video');
            
            let buffer = Buffer.from([]);
            for await (const chunk of media) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            
            await sock.sendMessage(m.cht, { react: { text: `🔎`, key: m.key } });
            
            if (type.includes('video')) {
                await sock.sendMessage(m.cht, {
                    video: buffer,
                    caption: msg[type].caption || '',
                    mimetype: 'video/mp4'
                }, { quoted: m });
            } else if (type.includes('image')) {
                await sock.sendMessage(m.cht, {
                    image: buffer,
                    caption: msg[type].caption || ''
                }, { quoted: m });
            }
        } catch (error) {
            console.error('Error in readviewonce:', error);
            m.reply('Failed to process view once message!');
        }
    }
};
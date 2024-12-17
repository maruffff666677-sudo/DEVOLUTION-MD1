const { proto, generateWAMessageFromContent } = require('baileys');

module.exports = {
    command: "bstation",
    alias: ["bst"],
    category: ["downloader"],
    settings: {
        limit: true
    },
    description: "*⚡ Unduh Video dari Bstation Anda ⚡*",
    loading: true,
    async run(m, { text, sock, config }) {
        const apikey = config.apikey 
        try {
            if (text.includes('https://')) {
                let res = await fetch(`https://aniravecdo.online/api/downloader/bstationdl?url=${text.trim()}&apikey=${apikey}`);
                let info = await res.json();
                const videoData = Buffer.from(info.base64, 'base64');

                await sock.sendMessage(m.cht, {
                    video: videoData,
                    caption: `*🎥 Title:* ${info.info.title}\n*🔗 URL:* ${text.trim()}`
                }, { quoted: m });

            } else {
                let res = await fetch(`https://aniravecdo.online/api/searcher/bstationsearch?q=${text}&apikey=${apikey}`);
                res = await res.json();
                let items = res.result.slice(0, 10);

                let carouselCards = await Promise.all(
                    items.map(async (a) => ({
                        body: proto.Message.InteractiveMessage.Body.fromObject({
                            text: `*🎬 Title:* ${a.title}\n*👤 Author:* ${a.author.nickname || 'Unknown'}\n*⏱ Duration:* ${a.duration}\n*👁 Views:* ${a.view}`
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.fromObject({
                            text: "*🔽 Pilih tombol Download untuk mengunduh.*"
                        }),
                        header: proto.Message.InteractiveMessage.Header.fromObject({
                            hasMediaAttachment: true,
                            imageMessage: a.cover 
                                ? await createImage(a.cover) 
                                : await createImage('https://files.catbox.moe/rmcoi5.jpg')
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                            buttons: [
                                {
                                    "name": "cta_url",
                                    "buttonParamsJson": `{"display_text":"⬇️ Download","url":"https://wa.me/6285184448387?text=.bstation ${a.url}","merchant_url":"${a.url}"}`
                                }
                            ]
                        })
                    }))
                );

                const carouselMessage = generateWAMessageFromContent(m.chat, {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                                body: proto.Message.InteractiveMessage.Body.create({
                                    text: `*✨ Total Pencarian Bstation:* ${items.length} Video ✨*`
                                }),
                                footer: proto.Message.InteractiveMessage.Footer.create({
                                    text: "*⚡ DEVOLUTION-MD1 ⚡*"
                                }),
                                header: proto.Message.InteractiveMessage.Header.create({
                                    hasMediaAttachment: false
                                }),
                                carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                                    cards: carouselCards
                                })
                            })
                        }
                    }
                }, { quoted: m });

                await sock.relayMessage(m.chat, carouselMessage.message, { messageId: carouselMessage.key.id });
            }
        } catch (error) {
            m.reply(`*❌ Terjadi Kesalahan!*\n\n${error.message}`);
        }
    }
};
const bail = require('baileys');
const { generateWAMessageFromContent, proto, toNumber } = bail;

module.exports = {
  command: "add",
  alias: [],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "Untuk menambahkan Member ke group",
  async run(m, { sock, text, Func }) {
    const input = m.input
      ? m.input
      : m.quoted
      ? m.quoted.sender
      : m.mentions.length > 0
      ? m.mentions[0]
      : false;

    if (!input) throw `> Reply / masukkan nomor yang ingin ditambah ke group`;

    const p = await sock.onWhatsApp(input.trim());
    if (p.length === 0) return m.reply('> Orang tersebut tidak memiliki aplikasi WhatsApp');

    const jid = sock.decodeJid(p[0].jid);
    const member = m.metadata.participants.find((u) => u.id == jid);
    if (member?.id) return m.reply('> Orang tersebut sudah ada di dalam group ini');

    const resp = await sock.groupParticipantsUpdate(m.cht, [jid], 'add');

    for (let res of resp) {
      if (res.status === 421) {
        m.reply(`> Gagal menambahkan @${jid.split('@')[0]} karena akun tersebut dibatasi untuk ditambahkan ke grup.`, {
          mentions: [jid],
        });
      } else if (res.status === 408) {
        await m.reply(`> Link grup berhasil dikirim ke @${jid.split('@')[0]} karena dia baru saja meninggalkan grup!`, {
          mentions: [jid],
        });
        await sock.sendMessage(jid, {
          text: "https://chat.whatsapp.com/" + (await sock.groupInviteCode(m.cht)),
        });
      } else if (res.status === 403) {
        const { code, expiration } = res.content.content[0].attrs;
        const pp = await sock.profilePictureUrl(m.cht).catch(() => null);
        const gp = await Func.fetchBuffer(pp);
        const msgs = generateWAMessageFromContent(
          jid,
          proto.Message.fromObject({
            groupInviteMessage: {
              groupJid: m.cht,
              inviteCode: code,
              inviteExpiration: toNumber(expiration),
              groupName: await sock.getName(m.cht),
              jpegThumbnail: gp || null,
              caption: `> Hai @${jid.split('@')[0]}, salah satu admin *${m.metadata.subject}* mengundang Anda ke dalam grup!`,
            },
          }),
          { userJid: sock.user.jid }
        );
        await sock.copyNForward(jid, msgs);
      } else {
        await m.reply(`> Berhasil menambahkan @${jid.split('@')[0]} ke grup!`, {
          mentions: [jid],
        });
      }
    }
  },
};
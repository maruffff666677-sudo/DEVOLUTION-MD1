module.exports = {
   command: "accmember",
   alias: ["accmem"],
   category: ["group"],
   settings: {
     group: true
   },
   description: "Acc Member Atau Melihat List Acc",
   loading: true,
   async run(m, { text, sock }) {
      if (!text) return m.reply("*⚠️ Perintah tidak valid! ⚠️*\nGunakan:\n- *acc list*\n- *acc approve [nomor]*\n- *acc reject [nomor]*\n- *acc reject [JID]*\n- *acc reject/approve all* untuk menolak/menyetujui semua permintaan bergabung. 🚫✅");

      try {
         let groupId = m.cht;
         let [subCommand, options] = text.split(" ");
         let joinRequestList = await sock.groupRequestParticipantsList(groupId);

         const formatDate = (timestamp) => new Intl.DateTimeFormat('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
         }).format(new Date(timestamp * 1000));

         if (subCommand === "list") {
            const formattedList = joinRequestList.length > 0 ?
               joinRequestList.map((request, i) => `*${i + 1}.*\n• Nomor: ${request.jid.split('@')[0]}\n• Metode Permintaan: ${request.request_method}\n• Waktu Permintaan: ${formatDate(request.request_time)}\n\n`).join('') :
               "*❌ Tidak ada permintaan bergabung yang tertunda.* 🕒";
            m.reply(`*📋 Daftar Permintaan Bergabung:*\n\n${formattedList}`);
         }

         if (subCommand === "reject" || subCommand === "approve") {
            if (options === "all") {
               for (const request of joinRequestList) {
                  await sock.groupRequestParticipantsUpdate(groupId, [request.jid], subCommand);
                  console.log(`Meng-${subCommand} participant dengan JID: ${request.jid}`);
               }
               m.reply(`*✅ ${subCommand === 'approve' ? 'Menyetujui' : 'Menolak'} semua permintaan bergabung.*`);
            } else {
               const actions = options.split(" ").map(action => action.trim());
               const participants = actions.map(action => joinRequestList[parseInt(action) - 1]).filter(request => request);
               if (participants.length > 0) {
                  let formattedResponse = '';
                  for (const request of participants) {
                     const response = await sock.groupRequestParticipantsUpdate(groupId, [request.jid], subCommand);
                     const status = response[0].status === 'success' ? 'Berhasil' : 'Gagal';
                     formattedResponse += `*${participants.indexOf(request) + 1}.*\n• Status: ${status}\n• Nomor: ${request.jid.split('@')[0]}\n\n`;
                     console.log(`Meng-${subCommand} participant dengan JID: ${request.jid}`);
                  }
                  m.reply(`*🔑 ${subCommand === 'approve' ? 'Menyetujui' : 'Menolak'} Permintaan Bergabung:*\n\n${formattedResponse}`);
               } else {
                  m.reply("*❌ Tidak ada anggota yang cocok untuk reject/approve.*");
               }
            }
         }
      } catch (err) {
         console.log(err);
         m.reply("*💥 Terjadi kesalahan, coba lagi nanti! 💥*");
      }
   }
}
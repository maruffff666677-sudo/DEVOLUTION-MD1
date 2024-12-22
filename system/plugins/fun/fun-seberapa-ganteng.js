module.exports = {
    command: "seberapa-ganteng",
    alias: ["apakah-gw-ganteng"],
    category: ["fun"],
    settings: {
        group: true
    },
    loading: true,
    async run(m, { sock }) {
        try {
            let random = Math.floor(Math.random() * 100) + 1;
            let response;

            switch (random) {
                case 100:
                    response = "💯 *100% Mas Ayok Sama Devo! Ini sih level sultan ganteng, semua orang ngelirik!*";
                    break;
                case 99:
                    response = "🔥 *99% Wah, hampir sempurna, pesona kamu bikin semua orang salah fokus!*";
                    break;
                case 98:
                    response = "😎 *98% Ganteng maksimal! Pantes sering diajak foto bareng.*";
                    break;
                case 97:
                    response = "😉 *97% Ganteng banget, udah kayak artis sinetron prime time.*";
                    break;
                case 96:
                    response = "😁 *96% Masih ganteng di atas standar! Senyumnya bikin hati berdebar.*";
                    break;
                case 95:
                    response = "😍 *95% Pesonanya kuat banget, jalan aja semua mata ngeliat!*";
                    break;
                case 94:
                    response = "🫣 *94% Ganteng banget, tapi jangan sok cool nanti bisa kena karma!*";
                    break;
                case 93:
                    response = "💥 *93% Cukup keren, tapi kayaknya ada yang lebih ganteng deh dari kamu.*";
                    break;
                case 92:
                    response = "😏 *92% Ya, cukup ganteng lah, tapi gak bikin cewek langsung jatuh cinta.*";
                    break;
                case 91:
                    response = "🙃 *91% Hmmm, gak jelek, cuma bisa lebih baik lagi.*";
                    break;
                case 90:
                    response = "😜 *90% Agak menarik, tapi kadang keliatan biasa aja, ya.*";
                    break;
                case 89:
                    response = "😬 *89% Ganteng? Yah, cukup sih, tapi jangan kebanyakan pamer!*";
                    break;
                case 88:
                    response = "🥴 *88% Biasa aja sih, tapi masih oke lah, jangan khawatir!*";
                    break;
                case 87:
                    response = "🙄 *87% Ganteng gak ganteng banget sih, tapi masih lumayanlah.*";
                    break;
                case 86:
                    response = "🤔 *86% Mungkin kalau lebih rajin dandan bisa lebih oke.*";
                    break;
                case 85:
                    response = "🤨 *85% Ganteng sih, tapi agak kurang charisma-nya.*";
                    break;
                case 84:
                    response = "🤭 *84% Lumayan ganteng, cuma agak standar aja.*";
                    break;
                case 83:
                    response = "😅 *83% Ganteng sedikit, tapi lebih keren kalau lebih percaya diri.*";
                    break;
                case 82:
                    response = "😌 *82% Ganteng sih, cuma nggak terlalu menonjol.*";
                    break;
                case 81:
                    response = "😏 *81% Ganteng cukup, tapi masih bisa lebih baik lagi.*";
                    break;
                case 80:
                    response = "😉 *80% Ya, lumayanlah. Tapi bukan tipe yang bikin terpesona.*";
                    break;
                case 79:
                    response = "😆 *79% Gantengnya sih cukup, cuma jangan kebanyakan berharap!*";
                    break;
                case 78:
                    response = "😂 *78% Ganteng sih, tapi nggak bikin orang jadi kagum gitu.*";
                    break;
                case 77:
                    response = "😬 *77% Hmmm, gantengnya agak kurang... Mungkin bisa jadi lebih.*";
                    break;
                case 76:
                    response = "🥺 *76% Ganteng sih, tapi kayaknya perlu usaha lebih biar maksimal.*";
                    break;
                case 75:
                    response = "🤭 *75% Ganteng cukup lah, tapi ya biasa aja kok.*";
                    break;
                case 74:
                    response = "🥱 *74% Ganteng sih, tapi lebih ke biasa aja.*";
                    break;
                case 73:
                    response = "😐 *73% Ganteng bisa lebih oke lagi kalau lebih sering dandan!*";
                    break;
                case 72:
                    response = "😝 *72% Ganteng agak pas-pasan, ya, tapi bisa lebih lagi kalau mau!*";
                    break;
                case 71:
                    response = "😏 *71% Hmmm, lumayan sih gantengnya. Cuma... belum bisa bikin orang terpukau.*";
                    break;
                case 70:
                    response = "😆 *70% Ya, lumayan juga lah. Tapi jangan khawatir, nggak jelek kok.*";
                    break;
                case 69:
                    response = "🤨 *69% Ganteng sih, tapi agak aneh sedikit, jangan sedih!*";
                    break;
                case 68:
                    response = "🤔 *68% Cukup oke sih, tapi masih bisa lebih menarik lagi.*";
                    break;
                case 67:
                    response = "😜 *67% Biasa aja, tapi tetep oke. Keep it up!*";
                    break;
                case 66:
                    response = "🤭 *66% Gantengnya sih cukup, tapi jauh dari sempurna.*";
                    break;
                case 65:
                    response = "😎 *65% Ya, gak jelek sih, tapi lebih keren kalau lebih percaya diri!*";
                    break;
                case 64:
                    response = "😉 *64% Gantengnya sih biasa aja, bisa lebih menarik kalau kamu percaya diri!*";
                    break;
                case 63:
                    response = "😅 *63% Ganteng nggak terlalu menonjol, lebih baik kalau sering berlatih gaya!*";
                    break;
                case 62:
                    response = "😏 *62% Ganteng, tapi lebih banyak yang lebih menarik sih.*";
                    break;
                case 61:
                    response = "🙃 *61% Masih oke sih, tapi lebih sering senyum biar keliatan lebih ganteng!*";
                    break;
                case 60:
                    response = "😜 *60% Gantengnya sih bisa lah, tapi butuh sedikit usaha lebih.*";
                    break;
                case 59:
                    response = "😉 *59% Ganteng standar, nggak buruk tapi juga nggak wah.*";
                    break;
                case 58:
                    response = "😬 *58% Ganteng, tapi nggak sampai bikin orang terpesona.*";
                    break;
                case 57:
                    response = "😆 *57% Biasa aja, tapi masih oke lah kalau banyak senyum!*";
                    break;
                case 56:
                    response = "😏 *56% Ganteng sih, cuma nggak ada yang spesial banget.*";
                    break;
                case 55:
                    response = "🤔 *55% Ganteng nggak buruk, cuma agak kurang menonjol!*";
                    break;
                case 54:
                    response = "😎 *54% Ya, masih oke sih, tapi lebih keren kalau lebih percaya diri!*";
                    break;
                case 53:
                    response = "😐 *53% Gantengnya sih ada, tapi biasa banget.*";
                    break;
                case 52:
                    response = "😂 *52% Hahaha, lumayan ganteng lah, tapi lebih oke kalau lebih nyantai!*";
                    break;
                case 51:
                    response = "🙃 *51% Ganteng sih, tapi bisa lebih menarik kalau lebih percaya diri.*";
                    break;
                case 50:
                    response = "😏 *50% Ganteng lumayan, tapi jangan terlalu pamer ya!*";
                    break;
                case 49:
                    response = "😒 *49% Ganteng sih, tapi ya biasa aja.*";
                    break;
                case 48:
                    response = "😜 *48% Cukup ganteng lah, tapi bisa lebih baik lagi.*";
                    break;
                case 47:
                    response = "🤔 *47% Ganteng? Yah, cukup sih.*";
                    break;
                case 46:
                    response = "😉 *46% Agak biasa aja, tapi nggak jelek kok.*";
                    break;
                case 45:
                    response = "🤭 *45% Gantengnya standar, nggak buruk tapi bisa lebih.*";
                    break;
                case 44:
                    response = "🥱 *44% Gantengnya sih biasa aja, nggak ada yang luar biasa.*";
                    break;
                case 43:
                    response = "😂 *43% Ganteng sih, tapi nggak ada yang bikin kagum.*";
                    break;
                case 42:
                    response = "🙃 *42% Ganteng? Hmm, nggak jelek sih, cuma biasa.*";
                    break;
                case 41:
                    response = "😬 *41% Ganteng tapi agak standar banget.*";
                    break;
                case 40:
                    response = "😅 *40% Ganteng? Ya lumayan, tapi jangan kebanyakan berharap.*";
                    break;
                case 39:
                    response = "🤭 *39% Ganteng banget sih, cuma agak biasa aja.*";
                    break;
                case 38:
                    response = "😐 *38% Ganteng standar aja, nggak terlalu mencolok.*";
                    break;
                case 37:
                    response = "😏 *37% Gantengnya biasa aja, tapi nggak buruk kok.*";
                    break;
                case 36:
                    response = "🤨 *36% Ganteng bisa lebih sih.*";
                    break;
                case 35:
                    response = "😆 *35% Ganteng, tapi ada yang lebih keren.*";
                    break;
                case 34:
                    response = "😜 *34% Ganteng standar aja sih.*";
                    break;
                case 33:
                    response = "😎 *33% Ganteng cukup, tapi agak kurang menonjol.*";
                    break;
                case 32:
                    response = "😂 *32% Ganteng lumayan, tapi nggak yang bikin semua orang terpesona.*";
                    break;
                case 31:
                    response = "🤔 *31% Ganteng cukup, tapi bisa lebih menarik kalau lebih percaya diri.*";
                    break;
                case 30:
                    response = "😉 *30% Ganteng, tapi jangan kebanyakan berharap.*";
                    break;
                case 29:
                    response = "😂 *29% Hmmm, mungkin lebih baik kalau kamu lebih santai aja.*";
                    break;
                case 28:
                    response = "🥱 *28% Gantengnya biasa aja, nggak jelek kok.*";
                    break;
                case 27:
                    response = "😒 *27% Ganteng bisa lebih lah, jangan khawatir!*";
                    break;
                case 26:
                    response = "🤨 *26% Ganteng biasa aja, tapi nggak buruk sih.*";
                    break;
                case 25:
                    response = "😆 *25% Ganteng ya, tapi ada yang lebih keren!*";
                    break;
                case 24:
                    response = "😜 *24% Ganteng cukup, tapi bisa lebih sih.*";
                    break;
                case 23:
                    response = "😏 *23% Ganteng? Yah, cukup sih, tapi ada yang lebih oke.*";
                    break;
                case 22:
                    response = "😂 *22% Ya, biasa aja lah. Coba lebih santai lagi!*";
                    break;
                case 21:
                    response = "😬 *21% Ganteng, tapi nggak menonjol.*";
                    break;
                case 20:
                    response = "😝 *20% Ganteng, tapi ya nggak wah banget.*";
                    break;
                case 19:
                    response = "😆 *19% Ganteng cukup, tapi bisa lebih baik.*";
                    break;
                case 18:
                    response = "🙃 *18% Ganteng standar aja.*";
                    break;
                case 17:
                    response = "🤔 *17% Hmmm, lumayan sih.*";
                    break;
                case 16:
                    response = "😏 *16% Biasa aja sih, tapi nggak jelek.*";
                    break;
                case 15:
                    response = "😂 *15% Lumayan, tapi nggak yang wow banget.*";
                    break;
                case 14:
                    response = "😉 *14% Ganteng, tapi nggak ada yang luar biasa.*";
                    break;
                case 13:
                    response = "🤨 *13% Ganteng biasa aja, tapi nggak buruk.*";
                    break;
                case 12:
                    response = "😜 *12% Ganteng, tapi nggak bikin terkesan.*";
                    break;
                case 11:
                    response = "😎 *11% Ganteng bisa lebih.*";
                    break;
                case 10:
                    response = "🙄 *10% Ganteng sih, tapi nggak terlalu menonjol.*";
                    break;
                case 9:
                    response = "😂 *9% Ganteng sih, tapi bisa lebih.*";
                    break;
                case 8:
                    response = "🙃 *8% Cukup sih, tapi nggak spesial banget.*";
                    break;
                case 7:
                    response = "😒 *7% Yah, bisa lebih baik sih.*";
                    break;
                case 6:
                    response = "🤭 *6% Ganteng sih, tapi agak biasa aja.*";
                    break;
                case 5:
                    response = "😝 *5% Biasa aja sih, nggak ada yang wah.*";
                    break;
                case 4:
                    response = "😆 *4% Ganteng sih, tapi nggak yang bikin orang terpesona.*";
                    break;
                case 3:
                    response = "🙃 *3% Ganteng sih, tapi kurang percaya diri.*";
                    break;
                case 2:
                    response = "😂 *2% Wah, hampir nggak kelihatan gantengnya, tapi nggak masalah!*";
                    break;
                case 1:
                    response = "😂 *1% Wah, ini sih hampir nggak keliatan gantengnya. Tapi tetap semangat, yang penting hati baik!*";
                    break;
                default:
                    response = `🤔 *${random}% Hmm, lumayan sih, jangan khawatir!*`;
            }

            await sock.sendMessage(m.cht, { text: response }, { quoted: m });
        } catch (error) {
            console.error("Error in seberapa-ganteng command:", error);
            m.reply("> Terjadi kesalahan, coba lagi nanti.");
        }
    }
};
module.exports = {
    canModifyQueue(member) {
        const {channel} = member.voice;
        const botChannel = member.guild.me.voice.channel;

        if (channel !== botChannel) {
            member.send("You need to join the voice channel first!").catch(console.error);
            return false;
        }

        return true;
    },
    pickRandomElement(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    },
    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    },
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    nounToPlural(str, quantity, pluralOverride) {
        if (quantity === 1) {
            return str;
        } else {
            if (pluralOverride) {
                return pluralOverride
            } else {
                return str + "s";
            }
        }
    },
    counter(str) {
        let spar = str.split('');
        let cnt = {};
        spar.forEach(function (x) {
            cnt[x] = (cnt[x] || 0) + 1;
        });
        return cnt;
    }
};

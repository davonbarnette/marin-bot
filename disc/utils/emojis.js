const numberEmojis = [
    "1⃣",
    "2⃣",
    "3⃣",
    "4⃣",
    "5⃣",
    "6⃣",
    "7⃣",
    "8⃣",
    "9⃣",
]

function emojiToNumber(emoji){
    let index = numberEmojis.indexOf(emoji)
    if (index !== -1){
        index += 1;
    }
    return index;
}

function numberToEmoji(number){
    if (number > 9){
        return number;
    } else {
        return numberEmojis[number - 1]
    }
}

module.exports = {
    numberToEmoji,
    emojiToNumber
}
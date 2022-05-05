async function onEnd(collected, reason, parentInteraction) {
    if (reason === 'time') {
        await parentInteraction.editReply({content: "_This sale initiation has expired. Use the_ `/sale` _command again._", components: []})
    }
}

module.exports = onEnd;
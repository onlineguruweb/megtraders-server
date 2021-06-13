// to send response to user's request
exports.response = function (Success, Message, res) {
    res.json({
        success: Success,
        message: Message,
        // status: StatusCode | 200
    })
}
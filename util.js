module.exports = {
    getError: function(msg, code)
    {
        return {
            "message": msg,
            "code": (code || 0),
            "datetime": (new Date()).toString()
        }
    }
}
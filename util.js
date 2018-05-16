module.exports = {
    getError: function(msg, code)
    {
        return {
            "message": msg,
            "code": (code || 0),
            "datetime": (new Date()).toString()
        }
    },

    getNow: function() {
        if (!Date.now) {
            Date.now = function() { return new Date().getTime(); }
        }
        return Date.now();
    }
}
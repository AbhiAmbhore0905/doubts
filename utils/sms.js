exports.sendSMS = ({ number, message }) => new Promise((resolve, reject) => {
    var unirest = require("unirest");

    var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

    req.query({
        "authorization": process.env.SMS_KEY,
        message,
        "language": "english",
        "route": "q",
        number
    });

    req.headers({
        "cache-control": "no-cache"
    });


    req.end(function (res) {
        if (res.error) {
            console.log(res.error)

            reject(res.error)
        } else {
            console.log("sms send")
            resolve()
        }


    });
})
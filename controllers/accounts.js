module.exports.set = function(app) {
    app.get("/account/details", function(req, res) {
        res.status(200).send("Account Details Page");
    });
}

module.exports.set = function(app) {
    app.get("/courier/:id", function(req, res) {
        res.status(200).send("Courier Details");
    });
}
module.exports.testRoute = (req, res) => {
    console.log('------test API call---', req.body);
    res.status(200).send("api called")
}
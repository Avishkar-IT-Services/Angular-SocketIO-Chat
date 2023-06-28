const loggerRequest = (req, res, next) => {
    try {
        let log = console.log
        log(`${req.method} ${req.originalUrl}`)
        next()
    } catch (error) {
        return res.send(400).send({ error })
    }
}
module.exports = loggerRequest
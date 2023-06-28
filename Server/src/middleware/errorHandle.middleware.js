const errorHandle = (err, _, res, next) => {
    try {
        const errStatus = err.status || 500;
        const errMessage = err.message || "Something went wrong";
        res.status(errStatus).send({
            success: false,
            status: errStatus,
            message: errMessage,
        })
    } catch (error) {
        console.log('error: ', error);
    }
}
module.exports = errorHandle
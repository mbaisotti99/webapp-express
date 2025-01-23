const handleError = (req, resp, err, next) =>{
    return resp.status(500).json({
        status:"fail",
        message: err.message
    })
}

module.exports = handleError
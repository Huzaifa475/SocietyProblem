class apiResponse{
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }

    static send(res, statusCode, data = null, message = "Success"){
        const response = new apiResponse(statusCode, data, message);
        return res.status(statusCode).json(response);
    }
}
const mongoose = require("mongoose")
const Joi = require("joi");

const Genre = new mongoose.model("Genre", new mongoose.Schema({
    title: { type: String, required: true, min: 2, max: 20 }
}))

const validateReqBody = (reqBody) => {
    const schema = Joi.object({
        title: Joi.string().required().min(2).max(20)
    })

    return schema.validate(reqBody);
}

module.exports = {
    validateReqBody,
    Genre
}

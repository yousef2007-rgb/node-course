const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model("Customer", new mongoose.Schema({
    name: { type: String, required: true, min: 2, max: 20 },
    isGoled: { type: Boolean, required: true },
    phone: { type: String, required: true, min: 10, max: 20 },
}));

const validateReqBody = (reqBody) => {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(20),
        isGoled: Joi.bool().required(),
        phone: Joi.string().required().min(10).max(20),
    })

    return schema.validate(reqBody);
}

module.exports = {
    validateReqBody,
    Customer
}
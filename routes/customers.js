const express = require("express");
const router = express.Router();

const { Customer, validateReqBody } = require('../model/customer');

router.get("/", async (req, res) => {
    const result = await Customer.find();
    res.send(result);
})

router.get("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
        res.send(customer)
    } else {
        res.status(404).send("customer not found")
    }
})

router.post("/", async (req, res) => {
    const { error } = validateReqBody(req.body);

    if (error) return res.status(401).send(error.details[0].message)
    const newCustomer = new Customer({
        name: req.body.name,
        isGoled: req.body.isGoled,
        phone: req.body.phone
    })

    const result = await newCustomer.save();
    res.send(result)
})

router.put("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
        const { error } = validateReqBody(req.body);

        if (error) return res.status(401).send(error.details[0].message)
        customer.set({
            name: req.body.name,
            isGoled: req.body.isGoled,
            phone: req.body.phone
        })
        const result = await customer.save();
        res.send(result)
    } else {
        res.status(404).send("customer not found")
    }
})

router.delete("/:id", async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    res.send(customer)
})


module.exports = router;
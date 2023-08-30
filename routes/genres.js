const express = require("express");
const router = express.Router();

const { validateReqBody, Genre } = require("../model/genre");

router.get("/", async (req, res) => {
    const result = await Genre.find();
    res.send(result);
})

router.get("/:id", async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (genre) {
        res.send(genre)
    } else {
        res.status(404).send("genre not found")
    }
})

router.post("/", async (req, res) => {
    const { error } = validateReqBody(req.body);

    if (error) return res.status(401).send(error.details[0].message)
    const newGenre = new Genre({
        title: req.body.title
    })

    const result = await newGenre.save();
    res.send(result)
})

router.put("/:id", async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (genre) {
        const { error } = validateReqBody(req.body);

        if (error) return res.status(401).send(error.details[0].message)
        genre.set({
            title: req.body.title
        })
        const result = await genre.save();
        res.send(result)
    } else {
        res.status(404).send("genre not found")
    }
})

router.delete("/:id", async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    res.send(genre)
})


module.exports = router;
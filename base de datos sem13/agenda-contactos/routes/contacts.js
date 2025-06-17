const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
router.post("/", async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    const { search, sort = "nombre" } = req.query;
    const query = search
        ? {
                $or: [
                    { nombre: new RegExp(search, "i") },
                    { email: new RegExp(search, "i") }
                ]
            }
        : {};

    try {
        const contacts = await Contact.find(query).sort({ [sort]: 1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ error: "No encontrado" });
        }
        res.json(contact);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!contact) {
            return res.status(404).json({ error: "No encontrado" });
        }
        res.json(contact);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ error: "No encontrado" });
        }
        res.json({ mensaje: "Contacto eliminado" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;

const mongoose = require("mongoose");
const validator = require("validator");
const contactSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        telefono: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            unique: true,
            sparse: true,
            validate: {
                validator: v => !v || validator.isEmail(v),
                message: "Email inválido"
            }
        },
        direccion: {
            type: String
        },
        fechaNacimiento: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Contact", contactSchema);

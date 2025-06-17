require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const contactsRoutes = require("./routes/contacts");
const Contact = require("./models/Contact");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.error("Error en la conexión:", err.message));

app.use("/api/contactos", contactsRoutes);

app.get("/contactos", async (req, res) => {
    const { search } = req.query;
    const filtro = search
        ? {
            $or: [
                { nombre: new RegExp(search, "i") },
                { email: new RegExp(search, "i") }
            ]
        }
        : {};

    try {
        const lista = await Contact.find(filtro).sort({ nombre: 1 });

        let html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Mi Agenda</title>
            <style>
                body { font-family: Verdana, sans-serif; margin: 40px; background-color: #fafafa; }
                h1 { color: #2c3e50; }
                label { font-weight: bold; display: block; margin-top: 10px; }
                input, button { padding: 8px; width: 100%; margin-top: 5px; box-sizing: border-box; }
                button { margin-top: 15px; background-color: #3498db; color: white; border: none; cursor: pointer; }
                button:hover { background-color: #2980b9; }
                table { width: 100%; margin-top: 30px; border-collapse: collapse; background: white; }
                th, td { padding: 12px; border: 1px solid #ccc; text-align: left; }
                th { background-color: #f4f4f4; }
                .acciones button { margin-right: 6px; font-size: 16px; }
            </style>
        </head>
        <body>
            <h1>Registro de Contactos</h1>
            <form id="formulario">
                <input type="hidden" id="contactId" />
                <label>Nombre:</label>
                <input type="text" id="nombre" required />
                <label>Teléfono (único):</label>
                <input type="text" id="telefono" required />
                <label>Email (opcional):</label>
                <input type="email" id="email" />
                <label>Dirección:</label>
                <input type="text" id="direccion" />
                <label>Fecha de nacimiento:</label>
                <input type="date" id="fechaNacimiento" />
                <button type="submit">Guardar contacto</button>
            </form>
            <hr>
            <h2>Buscar en Agenda</h2>
            <form method="get" action="/contactos">
                <input type="text" name="search" placeholder="Escribe un nombre o email" value="${search || ""}" />
                <button type="submit">Filtrar</button>
            </form>
            <h2>Contactos Guardados</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Dirección</th>
                        <th>Nacimiento</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${lista.map(c => `
                        <tr>
                            <td>${c.nombre}</td>
                            <td>${c.telefono}</td>
                            <td>${c.email || ""}</td>
                            <td>${c.direccion || ""}</td>
                            <td>${c.fechaNacimiento ? new Date(c.fechaNacimiento).toISOString().split("T")[0] : ""}</td>
                            <td class="acciones">
                                <button onclick='editar(${JSON.stringify(c)})'>editar</button>
                                <button onclick='eliminar("${c._id}")'>eliminar</button>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
            <script>
                const form = document.getElementById("formulario");
                form.addEventListener("submit", async (e) => {
                    e.preventDefault();
                    const id = document.getElementById("contactId").value;
                    const datos = {
                        nombre: document.getElementById("nombre").value,
                        telefono: document.getElementById("telefono").value,
                        email: document.getElementById("email").value,
                        direccion: document.getElementById("direccion").value,
                        fechaNacimiento: document.getElementById("fechaNacimiento").value
                    };
                    const url = id ? "/api/contactos/" + id : "/api/contactos";
                    const metodo = id ? "PUT" : "POST";
                    const res = await fetch(url, {
                        method: metodo,
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(datos)
                    });
                    if (res.ok) {
                        location.reload();
                    } else {
                        const err = await res.json();
                        alert("Error: " + err.error);
                    }
                });

                function editar(contacto) {
                    document.getElementById("contactId").value = contacto._id;
                    document.getElementById("nombre").value = contacto.nombre;
                    document.getElementById("telefono").value = contacto.telefono;
                    document.getElementById("email").value = contacto.email || "";
                    document.getElementById("direccion").value = contacto.direccion || "";
                    document.getElementById("fechaNacimiento").value = contacto.fechaNacimiento
                        ? new Date(contacto.fechaNacimiento).toISOString().split("T")[0]
                        : "";
                    window.scrollTo(0, 0);
                }

                async function eliminar(id) {
                    if (confirm("¿Seguro que deseas eliminar este contacto?")) {
                        const res = await fetch("/api/contactos/" + id, { method: "DELETE" });
                        if (res.ok) location.reload();
                        else alert("No se pudo borrar el contacto.");
                    }
                }
            </script>
        </body>
        </html>`;
        res.send(html);
    } catch (err) {
        res.status(500).send("Error interno al mostrar la agenda.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});

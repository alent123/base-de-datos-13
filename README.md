/*
📒 README – API Agenda de Contactos

📘 Agenda de Contactos – API REST con Node.js, Express y MongoDB

Este proyecto es una API CRUD para gestionar una agenda de contactos personales.
Incluye una interfaz HTML visual y una API con filtros, búsqueda y validaciones.

🚀 Tecnologías utilizadas:
- Node.js
- Express.js
- MongoDB con Mongoose
- HTML + CSS + JS (para la vista en /contactos)
- dotenv, validator

📦 Instalación:
1. Clona este repositorio
2. Instala dependencias:
   npm install

3. Configura tu archivo .env:
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/agenda_contactos

4. Inicia el servidor:
   npm run dev

📂 Rutas principales:

🔵 1. Crear nuevo contacto
POST /api/contactos

Body JSON:
{
  "nombre": "Ana Torres",
  "telefono": "555123456",
  "email": "ana@mail.com",
  "direccion": "Av. Siempre Viva 123",
  "fechaNacimiento": "1992-03-10"
}

Validaciones:
- nombre y telefono son obligatorios
- telefono y email deben ser únicos
- email debe tener formato válido si se proporciona

🟢 2. Obtener todos los contactos
GET /api/contactos

Filtros:
- /api/contactos?search=ana
- /api/contactos?search=gmail

Orden: por nombre (ascendente)

🟡 3. Obtener un contacto por ID
GET /api/contactos/:id

Ejemplo:
GET /api/contactos/665fbdab9d5be7383fbf75c1

🟠 4. Actualizar un contacto
PUT /api/contactos/:id

Body JSON: igual que en POST

🔴 5. Eliminar un contacto
DELETE /api/contactos/:id

💻 Interfaz HTML
GET /contactos

Permite:
- Crear y editar contactos
- Buscar por nombre o email
- Ver contactos en tabla
- Eliminar contactos con botón

✅ Modelo MongoDB:
{
  nombre: String (requerido),
  telefono: String (requerido, único),
  email: String (opcional, único y válido),
  direccion: String (opcional),
  fechaNacimiento: Date (opcional)
}

🧪 Ejemplo de contacto válido:
{
  "nombre": "Carlos Sánchez",
  "telefono": "987654321",
  "email": "carlos@mail.com",
  "direccion": "Calle 1",
  "fechaNacimiento": "1990-01-15"
}

🔐 Validaciones clave:
- telefono: requerido y único
- email: único y formato válido
- nombre: obligatorio

✏️ Autor:
Proyecto para prácticas de Base de Datos Avanzadas – 2025-1
3° C24
*/

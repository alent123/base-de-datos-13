/*
README – API: Agenda de Contactos

Descripción general:
Este proyecto es una API REST desarrollada con Node.js, Express y MongoDB que permite gestionar una agenda de contactos personales. 
Incluye una interfaz HTML simple accesible desde el navegador para facilitar el registro, visualización, búsqueda, edición y eliminación de contactos.

Tecnologías utilizadas:
- Node.js
- Express.js
- MongoDB + Mongoose
- HTML, CSS y JavaScript (vanilla)
- dotenv
- validator

Instalación:
1. Clonar el repositorio.
2. Ejecutar el comando: npm install
3. Crear un archivo .env con el siguiente contenido:

   PORT=3000
   MONGO_URI=mongodb://localhost:27017/agenda_contactos

4. Iniciar el servidor con el comando:
   npm run dev

Rutas API:

1. Crear un nuevo contacto
   Método: POST
   URL: /api/contactos
   Cuerpo (JSON):
   {
     "nombre": "Ana Torres",
     "telefono": "555123456",
     "email": "ana@mail.com",
     "direccion": "Av. Siempre Viva 123",
     "fechaNacimiento": "1992-03-10"
   }
   Validaciones:
   - nombre y teléfono son obligatorios
   - el teléfono debe ser único
   - si se proporciona email, debe tener formato válido y ser único

2. Obtener todos los contactos
   Método: GET
   URL: /api/contactos
   Parámetro opcional de búsqueda:
   /api/contactos?search=ana
   La búsqueda se realiza sobre los campos nombre y email.
   Los resultados se ordenan alfabéticamente por nombre.

3. Obtener un contacto por ID
   Método: GET
   URL: /api/contactos/:id

4. Actualizar un contacto existente
   Método: PUT
   URL: /api/contactos/:id
   Cuerpo igual al del POST.

5. Eliminar un contacto
   Método: DELETE
   URL: /api/contactos/:id

Interfaz Web:
Disponible en la ruta: /contactos
Desde esta página se puede:
- Registrar un nuevo contacto
- Buscar por nombre o email
- Ver los contactos en una tabla
- Editar o eliminar contactos desde botones

Estructura del modelo de datos:
{
  nombre: String (requerido),
  telefono: String (requerido, único),
  email: String (opcional, único, con formato válido),
  direccion: String (opcional),
  fechaNacimiento: Date (opcional)
}

Ejemplo de contacto válido:
{
  "nombre": "Carlos Sánchez",
  "telefono": "987654321",
  "email": "carlos@mail.com",
  "direccion": "Calle 1",
  "fechaNacimiento": "1990-01-15"
}

Notas adicionales:
- El proyecto ha sido desarrollado como parte de las prácticas de la asignatura de Base de Datos Avanzadas, ciclo 2025-1.
- Se recomienda usar MongoDB Compass o el navegador para verificar que los contactos han sido registrados correctamente.
*/

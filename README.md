/*
README – API: Agenda de Contactos

Descripción general:
Este proyecto es una API REST desarrollada con Node.js, Express y MongoDB que permite gestionar una agenda de contactos personales. 
Incluye:
Registro de Contactos
Nombre:
Teléfono (único):
Email (opcional):
Dirección:
Fecha de nacimiento:
Buscar en Agenda
y la tabla de los user 

Tecnologías utilizadas:
- Node.js
- Express.js
- MongoDB + Mongoose

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
[
  {
    "nombre": "Ana Torres",
    "telefono": "555666777",
    "email": "ana@gmail.com",
    "direccion": "Calle Sol 10",
    "fechaNacimiento": "1992-07-22"
  },
  {
    "nombre": "Carlos Ruiz",
    "telefono": "456789123",
    "email": "carlos@mail.com",
    "direccion": "Av. Central 45",
    "fechaNacimiento": "1995-06-10"
  },
  {
    "nombre": "Diego Fernández",
    "telefono": "777111999",
    "email": "diego@mail.com",
    "direccion": "Calle Olmo 88",
    "fechaNacimiento": "1991-12-30"
  },
  {
    "nombre": "Laura Martínez",
    "telefono": "321654987",
    "email": "laura@mail.com",
    "direccion": "Calle Real 123",
    "fechaNacimiento": "1998-11-05"
  },
  {
    "nombre": "Luis Herrera",
    "telefono": "111222333",
    "email": "luis@mail.com",
    "direccion": "Camino del Norte 45",
    "fechaNacimiento": "1985-03-03"
  },
  {
    "nombre": "Mariana Salazar",
    "telefono": "444333222",
    "email": "mariana@mail.com",
    "direccion": "Pasaje Luna 23",
    "fechaNacimiento": "1994-06-12"
  },
  {
    "nombre": "Pedro Gómez",
    "telefono": "123456789",
    "email": "pedro@mail.com",
    "direccion": "Av. Siempre Viva 742",
    "fechaNacimiento": "1990-01-15"
  },
  {
    "nombre": "Sofía Ramírez",
    "telefono": "999888777",
    "email": "sofia@mail.com",
    "direccion": "Boulevard del Este 99",
    "fechaNacimiento": "2000-10-10"
  }
]

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

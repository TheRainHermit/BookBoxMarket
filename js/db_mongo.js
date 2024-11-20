// Importar la biblioteca MongoClient
const { MongoClient } = require('mongodb');

// URI de conexión
const uri = "mongodb+srv://miguelfabra:BookBox45$*@cluster0.bo4x4.mongodb.net/"; 
// Cambiar si usas MongoDB Atlas u otra configuración

// Crear cliente
const client = new MongoClient(uri);

// Función principal
async function conectarMongo() {
    try {
        // Conectar al servidor
        await client.connect();
        console.log("✅ Conectado exitosamente a MongoDB");

        // Seleccionar la base de datos
        const db = client.db("bookboxmarket"); // Cambia "miBaseDeDatos" por el nombre de tu base de datos

        // Seleccionar una colección
        const coleccion = db.collection("users"); // Cambia "miColeccion" por el nombre de tu colección

        // Insertar un documento de ejemplo
      /*  const resultadoInsertar = await coleccion.insertOne({ nombre: "Juan", edad: 30 });
        console.log("Documento insertado con ID:", resultadoInsertar.insertedId);*/

        // Leer un documento
        const documento = await coleccion.findOne({ nombre: "Juan" });
        console.log("Documento encontrado:", documento);

        // Actualizar un documento
      /*  const resultadoActualizar = await coleccion.updateOne(
            { nombre: "Juan" }, // Filtro
            { $set: { edad: 31 } } // Actualización
        );
        console.log("Documentos actualizados:", resultadoActualizar.modifiedCount); */

        // Eliminar un documento
       /* const resultadoEliminar = await coleccion.deleteOne({ nombre: "Juan" });
        console.log("Documentos eliminados:", resultadoEliminar.deletedCount); */

    } catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error);
    } finally {
        // Cerrar la conexión
        await client.close();
        console.log("🔒 Conexión cerrada");
    }
}

// Llamar a la función principal
conectarMongo();
const crearControladorContador = (modelo) => {
  
    const insertarNuevoId = async (req, res) => {
      try {
        const nuevoId = await modelo.insertNewId();
        res.status(200).json({ message: "Nuevo ID insertado con éxito", id: nuevoId });
      } catch (error) {
        console.error("Error al insertar nuevo ID:", error);
        res.status(500).json({ message: "Error al insertar nuevo ID", error });
      }
    };
  
    const obtenerUltimoId = async (req, res) => {
      try {
        const ultimoId = await modelo.obtenerUltimoId();
        res.status(200).json({ id: ultimoId });
      } catch (error) {
        console.error("Error al obtener el último ID:", error);
        res.status(500).json({ message: "Error al obtener el último ID", error });
      }
    };
  
    return {
      insertarNuevoId,
      obtenerUltimoId,
    };
  };
  
  export default crearControladorContador;
  
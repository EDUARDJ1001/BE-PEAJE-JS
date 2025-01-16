import { obtenerEstado as obtenerEstadoModel } from "../models/estadoModel.js";

export const obtenerEstado = async (req, res) => {
    try {
        const estados = await obtenerEstadoModel();
        res.status(200).json(estados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener estados de vias', error});
    }
}

export const seleccionarVia = async (req, res) => {
    const { via } = req.body;

    try {
        const connection = await connectDB();
        const query = 'SELECT * FROM Estado_Via WHERE Id = ?';
        const [rows] = await connection.query(query, [via]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Vía no encontrada.' });
        }

        const estadoVia = rows[0].Descripcion;
        if (estadoVia === "Activa" || estadoVia === "Revision") {
            return res.status(403).json({ message: 'La vía está en estado "Activa" o "Revisión", no puedes seleccionarla.' });
        }

        const updateQuery = 'UPDATE Estado_Via SET Descripcion = "Activa" WHERE Id = ?';
        await connection.query(updateQuery, [via]);

        return res.status(200).json({ message: 'Vía seleccionada correctamente.' });
    } catch (error) {
        console.error('Error al seleccionar la vía:', error);
        return res.status(500).json({ message: 'Error al seleccionar la vía', error });
    }
};


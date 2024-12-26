import {
    obtenerConteoBoletos as obtenerConteoBoletosModel,
    findByValorBoletoId,
    updateCantidadAndTotal,
    insertNewBoleto,
    limpiarConteoBoletos as limpiarTabla
} from "../models/conteoBoletoModel.js";

export const obtenerConteoBoletos = async (req, res) => {
    try {
        const conteo_Billetes = await obtenerConteoBoletosModel();
        res.status(200).json(conteo_Billetes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener conteo de boletos', error });
    }
};

export const actualizarConteoBoletos = async (req, res) => {
    const { valor } = req.body;
    if (!valor) {
        return res.status(400).json({ message: "Datos incompletos" });
    }

    try {
        const boletoExistente = await findByValorBoletoId(valor);

        if (boletoExistente) {
            const nuevaCantidad = boletoExistente.Cantidad + 1;
            const nuevoTotal = parseFloat(boletoExistente.Total) + parseFloat(valor);

            await updateCantidadAndTotal(boletoExistente.Id, nuevaCantidad, nuevoTotal);
        } else {
            await insertNewBoleto(valor, 1, valor);
        }

        res.status(200).json({ message: "Conteo actualizado con éxito" });
    } catch (error) {
        console.error("Error al actualizar conteo de boletos:", error);
        res.status(500).json({ message: "Error al actualizar conteo de boletos", error });
    }
};

export const limpiarConteoBoletos = async (req, res) => {
    try {
        await limpiarTabla();
        return res.status(200).json({ message: 'Tabla Conteo_Boletos limpiada exitosamente.' });
    } catch (error) {
        console.error('Error en el controlador limpiarConteoBoletos:', error);
        return res.status(500).json({ message: 'Error al limpiar la tabla Conteo_Boletos.' });
    }
};
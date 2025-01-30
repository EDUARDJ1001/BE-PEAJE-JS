import { printTicket } from "../services/printService.js";

export const printBoleto = async (req, res) => {
    try {
        const { boleto, userData } = req.body;

        if (!boleto || !userData) {
            return res.status(400).json({ message: 'Datos incompletos' });
        }

        const printResult = await printTicket(boleto, userData);

        res.json({ message: printResult });
    } catch (error) {
        console.error('Error al imprimir boleto:', error);
        res.status(500).json({ message: 'Error al imprimir', error: error.message });
    }
};

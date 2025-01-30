import printTicket from '../services/printService.js';

const printBoleto = async (req, res) => {
    try {
        const { boleto, userData } = req.body;

        if (!boleto || !userData) {
            return res.status(400).json({ message: 'Datos incompletos' });
        }

        await printTicket(boleto, userData);
        res.json({ message: 'Impresión en proceso' });
    } catch (error) {
        res.status(500).json({ message: 'Error al imprimir', error: error.message });
    }
};

export default printBoleto;

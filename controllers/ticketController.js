import {
    obtenerTickets as obtenerTicketsModel
} from "../models/ticketModel.js";

export const getAllTickets = async (req, res) => {
    try {
        const tickets = await obtenerTicketsModel();
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener tickets", error: err });
    }
};

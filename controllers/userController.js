import { obtenerUserToken as obtenerUserTokenModel } from "../models/userModel.js";
import { generarUserToken as generarUserTokenModel } from "../models/userModel.js";
import { obtenerUserPorVia as obtenerUserPorViaModel } from "../models/userModel.js";

export const obtenerUserToken = async (req, res) => {
    try {
        const user = await obtenerUserTokenModel();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener token de usuario', error });
    }
};

export const obtenerUserPorVia = async (req, res) => {
    const { selectedVia } = req.params;

    try {
        const user = await obtenerUserPorViaModel(selectedVia);
        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado con el SelectedVia proporcionado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario por SelectedVia', error });
    }
};

export const generarUserToken = async (req, res) => {
    try {
        const { username, cargo_id, nombre, apellido, selectedVia, loginTime } = req.body;

        if (!username || !cargo_id || !nombre || !apellido || !selectedVia || !loginTime) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        const result = await generarUserTokenModel(username, cargo_id, nombre, apellido, selectedVia, loginTime);

        res.status(201).json({
            message: "Token generado correctamente.",
            result,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al generar token de usuario', error });
    }
};

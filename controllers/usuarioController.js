import { obtenerUsuarios as obtenerUsuariosModel } from '../models/usuarioModel.js';

export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await obtenerUsuariosModel();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
};

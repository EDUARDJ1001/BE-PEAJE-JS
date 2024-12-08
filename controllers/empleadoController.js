import { registrarEmpleado } from "../models/empleadoModel.js";
import { obtenerCargos as obtenerCargosModel } from "../models/cargoModel.js";
import { obtenerGeneros as obtenerGenerosModel } from "../models/generoModel.js";
import { obtenerEmpleados as obtenerEmpleadosModel } from "../models/empleadoModel.js";

export const obtenerEmpleados = async (req, res) => {
    try {
        const empleados = await obtenerEmpleadosModel();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener empleados', error});
    }
}

export const registrarEmpleadoController = async (req, res) => {
    try {
        const { nombre, apellido, identidad, cargoId, generoId } = req.body;

        if (!nombre || !apellido || !identidad || !cargoId || !generoId) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        const empleadoId = await registrarEmpleado(nombre, apellido, identidad, cargoId, generoId);

        res.status(201).json({
            message: "Empleado registrado correctamente.",
            empleadoId,
            redirectTo: `/pages/admin/empleados/crearUsuario/${empleadoId}`,
        });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar empleado.", error });
    }
};

export const obtenerOpcionesParaEmpleado = async (req, res) => {
    try {
        const cargos = await obtenerCargosModel();
        const generos = await obtenerGenerosModel();
        res.status(200).json({ cargos, generos });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener opciones.", error });
    }
};
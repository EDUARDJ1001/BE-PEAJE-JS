import { registrarEmpleado } from "../models/empleadoModel.js";
import { obtenerCargos as obtenerCargosModel } from "../models/cargoModel.js";
import { obtenerGeneros as obtenerGenerosModel } from "../models/generoModel.js";
import { obtenerEmpleados as obtenerEmpleadosModel } from "../models/empleadoModel.js";
import { obtenerEmpleadoPorId } from "../models/empleadoModel.js";
import { actualizarEmpleado as actualizarEmpleadoModel } from "../models/empleadoModel.js";
import { eliminarEmpleado} from "../models/empleadoModel.js";

export const obtenerEmpleados = async (req, res) => {
    try {
        const empleados = await obtenerEmpleadosModel();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener empleados', error});
    }
}

export const obtenerOpcionesParaEmpleado = async (req, res) => {
    try {
        const cargos = await obtenerCargosModel();
        const generos = await obtenerGenerosModel();
        res.status(200).json({ cargos, generos });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener opciones.", error });
    }
};


export const obtenerEmpleadoPorIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const empleado = await obtenerEmpleadoPorId(id);

        if (empleado) {
            res.status(200).json(empleado);
        } else {
            res.status(404).json({ message: "Empleado no encontrado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener empleado.", error });
    }
};

export const registrarEmpleadoController = async (req, res) => {
    try {
        const { nombre, apellido, identidad, cargoId, generoId, username, password } = req.body;

        if (!nombre || !apellido || !identidad || !cargoId || !generoId || !username || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres." });
        }

        const empleadoId = await registrarEmpleado(nombre, apellido, identidad, cargoId, generoId, username, password);

        res.status(201).json({
            message: "Empleado registrado correctamente.",
        });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar empleado.", error });
    }
};

export const actualizarEmpleadoController = async (req, res) => {
    try {
        const { id } = req.params;
        const { cargoId, password } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: "El ID proporcionado no es válido." });
        }

        if (!cargoId && !password) {
            return res.status(400).json({ message: "No se proporcionaron datos para actualizar." });
        }

        const result = await actualizarEmpleadoModel(id, { cargoId, password });

        if (result === 0) {
            return res.status(404).json({ message: "Empleado no encontrado o no hubo cambios." });
        }

        res.status(200).json({
            message: "Empleado actualizado correctamente.",
        });
    } catch (error) {
        console.error("Error al actualizar empleado:", error);
        res.status(500).json({ message: "Error al actualizar empleado.", error });
    }
};

export const eliminarEmpleadoController = async (req, res) => {
    const { id } = req.params;

    try {
        const success = await eliminarEmpleado(id);

        if (success) {
            res.status(200).json({ message: "Empleado eliminado correctamente." });
        } else {
            res.status(404).json({ message: "Empleado no encontrado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar empleado.", error });
    }
};
import connectDB from "../config/db.js";

export const obtenerConteoBoletos = async () => {
    try {
        const connection = await connectDB();
        const query = `
                SELECT 
                    vb.Descripcion,
                    vb.Valor,
                    cb.Cantidad,
                    cb.Total
                FROM Conteo_Boletos cb
                JOIN Valor_Boletos vb ON cb.Valor_Boleto_Id = vb.Id;
`;
        const [rows] = await connection.query(query);
        return rows;
    } catch (err) {
        console.error("Error al obtener conteo de boletos:", err);
        throw err;
    }
};


export const findByValorBoletoId = async (valor) => {
    try {
        const connection = await connectDB();

        const queryValor = "SELECT Id FROM Valor_Boletos WHERE Valor = ?";
        const [valorRows] = await connection.query(queryValor, [valor]);

        if (valorRows.length === 0) {
            return null;
        }

        const valorBoletoId = valorRows[0].Id;

        const queryConteo = "SELECT * FROM Conteo_Boletos WHERE Valor_Boleto_Id = ?";
        const [conteoRows] = await connection.query(queryConteo, [valorBoletoId]);

        return conteoRows[0] || null;
    } catch (err) {
        console.error("Error al buscar boleto:", err);
        throw err;
    }
};


export const updateCantidadAndTotal = async (id, cantidad, total) => {
    try {
        const connection = await connectDB();
        const query = "UPDATE Conteo_Boletos SET cantidad = ?, total = ? WHERE id = ?";
        await connection.query(query, [cantidad, total, id]);
    } catch (err) {
        console.error("Error al actualizar boleto:", err);
        throw err;
    }
};

export const insertNewBoleto = async (valor, cantidad, total) => {
    try {
        const connection = await connectDB();

        const queryValor = "SELECT Id FROM Valor_Boletos WHERE Valor = ?";
        const [valorRows] = await connection.query(queryValor, [valor]);

        if (valorRows.length === 0) {
            throw new Error("El valor del boleto no existe en la tabla Valor_Boletos.");
        }

        const valorBoletoId = valorRows[0].Id;

        const queryInsert = "INSERT INTO Conteo_Boletos (Valor_Boleto_Id, Cantidad, Total) VALUES (?, ?, ?)";
        await connection.query(queryInsert, [valorBoletoId, cantidad, total]);
    } catch (err) {
        console.error("Error al insertar nuevo boleto:", err);
        throw err;
    }
};

export const limpiarConteoBoletos = async () => {
    try {
        const db = await connectDB();
        await db.execute('DELETE FROM Conteo_Boletos');
    } catch (error) {
        throw new Error('Error al limpiar la tabla Conteo_Boletos: ' + error.message);
    }
};


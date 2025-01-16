import connectDB from "../config/db.js";

const crearModeloConteoBoletos = (nombreTabla) => {
  const obtenerConteoBoletos = async () => {
    try {
      const connection = await connectDB();
      const query = `
        SELECT 
          vb.Descripcion,
          vb.Valor,
          cb.Cantidad,
          cb.Total
        FROM ${nombreTabla} cb
        JOIN Valor_Boletos vb ON cb.Valor_Boleto_Id = vb.Id;
      `;
      const [rows] = await connection.query(query);
      return rows;
    } catch (err) {
      console.error(`Error al obtener conteo de boletos de ${nombreTabla}:`, err);
      throw err;
    }
  };

  const findByValorBoletoId = async (valor) => {
    try {
      const connection = await connectDB();
      const queryValor = "SELECT Id FROM Valor_Boletos WHERE Valor = ?";
      const [valorRows] = await connection.query(queryValor, [valor]);

      if (valorRows.length === 0) {
        return null;
      }

      const valorBoletoId = valorRows[0].Id;
      const queryConteo = `SELECT * FROM ${nombreTabla} WHERE Valor_Boleto_Id = ?`;
      const [conteoRows] = await connection.query(queryConteo, [valorBoletoId]);

      return conteoRows[0] || null;
    } catch (err) {
      console.error(`Error al buscar boleto en ${nombreTabla}:`, err);
      throw err;
    }
  };

  const updateCantidadAndTotal = async (id, cantidad, total) => {
    try {
      const connection = await connectDB();
      const query = `UPDATE ${nombreTabla} SET cantidad = ?, total = ? WHERE id = ?`;
      await connection.query(query, [cantidad, total, id]);
    } catch (err) {
      console.error(`Error al actualizar boleto en ${nombreTabla}:`, err);
      throw err;
    }
  };

  const insertNewBoleto = async (valor, cantidad, total) => {
    try {
      const connection = await connectDB();
      const queryValor = "SELECT Id FROM Valor_Boletos WHERE Valor = ?";
      const [valorRows] = await connection.query(queryValor, [valor]);

      if (valorRows.length === 0) {
        throw new Error("El valor del boleto no existe en la tabla Valor_Boletos.");
      }

      const valorBoletoId = valorRows[0].Id;
      const queryInsert = `INSERT INTO ${nombreTabla} (Valor_Boleto_Id, Cantidad, Total) VALUES (?, ?, ?)`;
      await connection.query(queryInsert, [valorBoletoId, cantidad, total]);
    } catch (err) {
      console.error(`Error al insertar nuevo boleto en ${nombreTabla}:`, err);
      throw err;
    }
  };

  const limpiarConteoBoletos = async () => {
    try {
      const connection = await connectDB();
      await connection.execute(`DELETE FROM ${nombreTabla}`);
    } catch (error) {
      throw new Error(`Error al limpiar la tabla ${nombreTabla}: ` + error.message);
    }
  };

  const obtenerUltimoTicket = async () => {
    try {
        const connection = await connectDB();
        const query = `
            SELECT 
                AUTO_INCREMENT as lastTicketId
            FROM 
                INFORMATION_SCHEMA.TABLES
            WHERE 
                TABLE_SCHEMA = DATABASE() AND 
                TABLE_NAME = ?;
        `;
        const [rows] = await connection.query(query, [nombreTabla]);
        return rows[0]?.lastTicketId || 1;
    } catch (err) {
        console.error(`Error al obtener el último ticket de ${nombreTabla}:`, err);
        throw err;
    }
};


  return {
    obtenerConteoBoletos,
    findByValorBoletoId,
    updateCantidadAndTotal,
    insertNewBoleto,
    limpiarConteoBoletos,
    obtenerUltimoTicket, 
  };
};

export default crearModeloConteoBoletos;

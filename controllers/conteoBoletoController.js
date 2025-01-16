const crearControladorConteoBoletos = (modelo) => {
  const obtenerConteoBoletos = async (req, res) => {
    try {
      const conteoBilletes = await modelo.obtenerConteoBoletos();
      res.status(200).json(conteoBilletes);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener conteo de boletos', error });
    }
  };

  const actualizarConteoBoletos = async (req, res) => {
    const { valor } = req.body;
    if (!valor) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    try {
      const boletoExistente = await modelo.findByValorBoletoId(valor);

      if (boletoExistente) {
        const nuevaCantidad = boletoExistente.Cantidad + 1;
        const nuevoTotal = parseFloat(boletoExistente.Total) + parseFloat(valor);

        await modelo.updateCantidadAndTotal(boletoExistente.Id, nuevaCantidad, nuevoTotal);
      } else {
        await modelo.insertNewBoleto(valor, 1, valor);
      }

      res.status(200).json({ message: "Conteo actualizado con éxito" });
    } catch (error) {
      console.error("Error al actualizar conteo de boletos:", error);
      res.status(500).json({ message: "Error al actualizar conteo de boletos", error });
    }
  };

  const limpiarConteoBoletos = async (req, res) => {
    try {
      await modelo.limpiarConteoBoletos();
      res.status(200).json({ message: 'Tabla limpiada exitosamente.' });
    } catch (error) {
      console.error('Error al limpiar la tabla:', error);
      res.status(500).json({ message: 'Error al limpiar la tabla.', error });
    }
  };

  const obtenerUltimoTicket = async (req, res) => {
    try {
      const ultimoTicket = await modelo.obtenerUltimoTicket();
      if (ultimoTicket) {
        res.status(200).json(ultimoTicket);
      } else {
        res.status(404).json({ message: "No se encontró un ticket" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el último ticket", error });
    }
  };


  return {
    obtenerConteoBoletos,
    actualizarConteoBoletos,
    limpiarConteoBoletos,
    obtenerUltimoTicket,
  };
};

export default crearControladorConteoBoletos;

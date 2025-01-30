const escpos = require('escpos');
escpos.USB = require('escpos-usb');

const printTicket = (boleto, userData) => {
    return new Promise((resolve, reject) => {
        try {
            const device = new escpos.USB(); 
            const printer = new escpos.Printer(device);

            device.open(() => {
                printer
                    .font('a')
                    .align('ct')
                    .style('b')
                    .size(1, 1)
                    .text('Municipalidad de Puerto Cortés')
                    .text('RTN 03019000044953')
                    .text('Estación: PUERTO CORTÉS')
                    .text('-------------------------')
                    .text(`Ticket No.V1${boleto.id}`)
                    .text(`Operador: ${userData.nombre}`)
                    .text(`Fecha: ${new Date().toLocaleString()}`)
                    .text(`Vehículo: ${boleto.Descripcion}`)
                    .text(`Total: L. ${Number(boleto.Valor).toFixed(2)}`)
                    .text('Contribución por mejoras')
                    .cut()
                    .close();
                
                resolve('Impresión exitosa');
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { printTicket };

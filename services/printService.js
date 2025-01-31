import escpos from 'escpos';
import usb from 'escpos-usb';

escpos.USB = usb;

export const printTicket = (boleto, userData) => {
    return new Promise((resolve, reject) => {
        try {
            const device = "epson tm-t88vi receipt2";
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
            
            device.on('error', (err) => {
                reject(`Error de dispositivo: ${err}`);
            });

        } catch (error) {
            reject(`Error de impresión: ${error.message}`);
        }
    });
};

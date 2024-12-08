import generoRoutes from './generoRoutes.js';
import cargoRoutes from './cargoRoutes.js';
import viaRoutes from './viaRoutes.js';
import estadoRoutes from './estadoRoutes.js';
import accionRoutes from './accionRoutes.js';
import turnoRoutes from './turnoRoutes.js';
import valorBilleteRoutes from './valorBilleteRoutes.js';
import valorBoletoRoutes from './valorBoletoRoutes.js';
import empleadoRoutes from './empleadoRoutes.js';
import usuarioRoutes from './usuarioRoutes.js';
import conteoBilleteRoutes from './conteoBilleteRoutes.js';
import conteoBoletoRoutes from './conteoBoletoRoutes.js';
import logRoutes from './logRoutes.js';
import reporteVentasRoutes from './reporteVentasRoutes.js';

const registerRoutes = (app) => {
    app.use('/api/generos', generoRoutes);
    app.use('/api/cargos', cargoRoutes);
    app.use('/api/vias', viaRoutes);
    app.use('/api/estado-via', estadoRoutes);
    app.use('/api/acciones', accionRoutes);
    app.use('/api/turnos', turnoRoutes);
    app.use('/api/valor-billetes', valorBilleteRoutes);
    app.use('/api/valor-boletos', valorBoletoRoutes);
    app.use('/api/empleados', empleadoRoutes);
    app.use('/api/usuarios', usuarioRoutes);
    app.use('/api/conteo-billetes', conteoBilleteRoutes);
    app.use('/api/conteo-boletos', conteoBoletoRoutes);
    app.use('/api/logs-usuarios', logRoutes);
    app.use('/api/reportes-ventas', reporteVentasRoutes);
};

export default registerRoutes;

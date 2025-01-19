import generoRoutes from './generoRoutes.js';
import cargoRoutes from './cargoRoutes.js';
import viaRoutes from './viaRoutes.js';
import estadoRoutes from './estadoRoutes.js';
import accionRoutes from './accionRoutes.js';
import valorBoletoRoutes from './valorBoletoRoutes.js';
import empleadoRoutes from './empleadoRoutes.js';
import crearRutasConteoBoletos from './conteoBoletoRoutes.js';
import logRoutes from './logRoutes.js';
import reporteVentasRoutes from './reporteVentasRoutes.js';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import crearRutasContador from './contadorRoutes.js';

const registerRoutes = (app) => {
    app.use('/api/generos', generoRoutes);
    app.use('/api/cargos', cargoRoutes);
    app.use('/api/vias', viaRoutes);
    app.use('/api/estado-via', estadoRoutes);
    app.use('/api/acciones', accionRoutes);
    app.use('/api/valor-boletos', valorBoletoRoutes);
    app.use('/api/empleados', empleadoRoutes);
    app.use('/api/logs-usuarios', logRoutes);
    app.use('/api/reportes-ventas', reporteVentasRoutes);
    app.use('/api/auth', authRoutes);
    app.use('api/userRoutes', userRoutes);

    app.use('/api/conteo-boletos', crearRutasConteoBoletos('Conteo_Boletos'));
    app.use('/api/conteo-boletos-v2', crearRutasConteoBoletos('Conteo_Boletos_V2'));
    app.use('/api/conteo-boletos-v3', crearRutasConteoBoletos('Conteo_Boletos_V3'));
    app.use('/api/conteo-boletos-v4', crearRutasConteoBoletos('Conteo_Boletos_V4'));

    app.use('/api/contador', crearRutasContador('Contador_V1'));
};

export default registerRoutes;

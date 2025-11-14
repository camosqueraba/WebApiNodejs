import express from 'express';
import bodyParser from 'body-parser';
import peticionesRoutes from './routes/peticionesRoutes.js';
import 'dotenv/config.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/peticiones", peticionesRoutes);


try
{
    const PORT = process.env.PORT || 3000;    

    app.listen(PORT, () => {
        console.log('Servidor node activo Puerto: ' + PORT);
    });
    
}
catch (error)
{
    console.log("Error al iniciar el servidor: " + error);
}






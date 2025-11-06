import express from "express";
import cors from "cors";
import personalRutas from "./routes/personalRutas";
import clientesRutas from "./routes/clientesRutas";
import arreglosRutas from "./routes/arreglosRutas"
import pedidosRutas from "./routes/pedidosRutas"

const app = express();
app.use(express.json());
app.use(cors());

//Puerto para escuchar la peticion del frontend
const PUERTO = 3000;

//Activar la ruta base para personal
app.use("/personal", personalRutas);

//Activar la ruta base para clientes
app.use("/clientes", clientesRutas);

//Activar la ruta base para arreglosFloreles
app.use("/arreglos", arreglosRutas);

//Activar la ruta base para pedidos
app.use("/pedidos", pedidosRutas);

app.get("/", (_req, res) => {
    res.send("Hola mundo");
});


//Encendemos el servidor y lo ponemos en escucha
app.listen(PUERTO, () => {
    console.log("Servidor en ejecucion y escuchando en el puerto " + PUERTO);
}) 
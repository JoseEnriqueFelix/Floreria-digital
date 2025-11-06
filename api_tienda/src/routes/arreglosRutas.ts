import express, { Request, Response } from "express";
import * as arreglosServices from "../services/arreglosServices";


const router = express.Router();

//http://localhost:3007/arreglos
router.get("/", async (_req: Request, res: Response) => {
    try {
        const clientes = await arreglosServices.selectArreglos();
        res.status(200).send(clientes);
    } catch (error) {
        console.error("Error al obtener arreglos:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});

router.get("/:ID_Arreglo", async (req: Request, res: Response) => {
    try {
        const {ID_Arreglo} = req.params;
        const clientes = await arreglosServices.selectArreglosId(Number(ID_Arreglo));
        res.status(200).send(clientes);
    } catch (error) {
        console.error("Error al obtener arreglos:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});

router.get("/tipos/:tipo", async (req: Request, res: Response) => {
    try {
        const {tipo} = req.params;
        const clientes = await arreglosServices.selectArreglosTipo(Number(tipo));
        res.status(200).send(clientes);
    } catch (error) {
        console.error("Error al obtener arreglos:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const { Descripcion, Tipo_de_arreglo } = req.body;
        const nuevo = await arreglosServices.agregarArreglos({ Descripcion, Tipo_de_arreglo });
        res.status(200).send(nuevo);
    } catch (error) {
        res.status(400).send("Error en los datos");
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { ID_Arreglo, Descripcion, Tipo_de_arreglo } = req.body;
        const modificado = await arreglosServices.modificarArreglos({ ID_Arreglo, Descripcion, Tipo_de_arreglo, "Estatus": 1 });
        res.send(modificado);
    }
    catch (error) {
        res.status(400).send("Error en los datos");
    }
});

router.patch('/borrar/:ID_Arreglo', async (req: Request, res: Response) => {
    try {
        const { ID_Arreglo } = req.params;
        const eliminado = await arreglosServices.borrarArreglos(Number(ID_Arreglo));
        res.send(eliminado);
    } catch (error) {
        res.status(400).send('Error en los datos');
    }
});

export default router;
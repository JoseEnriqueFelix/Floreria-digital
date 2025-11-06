import express, { Request, Response } from "express";
import * as clientesServices from "../services/clientesServices";


const router = express.Router();

//http://localhost:3007/clientes
router.get("/", async (_req: Request, res: Response) => {
    try {
        const clientes = await clientesServices.selectClientes();
        res.status(200).send(clientes);
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});

router.get("/:ID_Cliente", async (req: Request, res: Response) => {
    try {
        const {ID_Cliente} = req.params;
        const clientes = await clientesServices.selectClientePorID(Number(ID_Cliente));
        res.status(200).send(clientes);
    } catch (error) {
        console.error("Error al obtener cliente:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
})

router.post("/", async (req: Request, res: Response) => {
    try {
        const { Nombre_completo, Direccion, Telefono } = req.body;
        const nuevo = await clientesServices.agregarClientes({ Nombre_completo, Direccion, Telefono });
        res.status(200).send(nuevo);
    } catch (error) {
        res.status(400).send("Error en los datos");
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { ID_Cliente, Nombre_completo, Direccion, Telefono } = req.body;
        const modificado = await clientesServices.modificarClientes({ ID_Cliente, Nombre_completo, Direccion, Telefono });
        res.send(modificado);
    }
    catch (error) {
        res.status(400).send("Error en los datos");
    }
});

router.delete('/borrar/:ID_Cliente', async (req: Request, res: Response) => {
    try {
        const { ID_Cliente } = req.params;
        const eliminado = await clientesServices.borrarClientes(Number(ID_Cliente));
        res.send(eliminado);
    } catch (error) {
        res.status(400).send('Error en los datos');
    }
});


export default router;
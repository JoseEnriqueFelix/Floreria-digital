import express, { Request, Response } from "express";
import * as personalServices from "../services/personalServices"


const router = express.Router();

//http://localhost:3007/personal
router.get("/", async (_req: Request, res: Response) => {
    try {
        const personal = await personalServices.selectAllPersonal();
        res.status(200).send(personal);
    } catch (error) {
        console.error("Error al obtener todo el personal:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});

router.get("/:ID", async (req: Request, res: Response) => {
    try {
        const { ID } = req.params;
        const personal = await personalServices.selectPersonalId(Number(ID));
        res.status(200).send(personal);
    } catch (error) {
        console.error("Error al obtener personal:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});


router.get("/estatus/:estatus", async (req: Request, res: Response) => {
    try {
        const { estatus } = req.params;
        const personal = await personalServices.selectPersonal(Number(estatus));
        res.status(200).send(personal);
    } catch (error) {
        console.error("Error al obtener personal:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const { Nombre_completo, Direccion, Telefono, Estatus } = req.body;
        const nuevo = await personalServices.agregarPersonal({ Nombre_completo, Direccion, Telefono, Estatus });
        res.status(200).send(nuevo);
    } catch (error) {
        res.status(400).send("Error en los datos");
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const { ID, Nombre_completo, Direccion, Telefono } = req.body;
        const modificado = await personalServices.modificarPersonal({ ID, Nombre_completo, Direccion, Telefono, "Estatus": 1 });
        res.send(modificado);
    }
    catch (error) {
        res.status(400).send("Error en los datos");
    }
});

router.patch('/borrar/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const eliminado = await personalServices.borrarPersonal(Number(id));
        res.send(eliminado);
    } catch (error) {
        res.status(400).send('Error en los datos');
    }
});


export default router;
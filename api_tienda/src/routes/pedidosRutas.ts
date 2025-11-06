import express, { Request, Response } from "express";
import * as pedidosServices from "../services/pedidosServices";


const router = express.Router();

//http://localhost:3007/pedidos
router.get("/", async (_req: Request, res: Response) => {
    try {
        const pedidos = await pedidosServices.selectPedidos();
        res.status(200).send(pedidos);
    } catch (error) {
        console.error("Error al obtener pedidos:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const {
            ID_Cliente,
            ID_Arreglo,
            Descripcion_del_pedido,
            Fecha_y_hora_del_pedido,
            Fecha_y_hora_de_entrega,
            Direccion_de_entrega,
            Precio_sugerido,
            ID_personal_asignado,
            Entregado,
            Pagado
        } = req.body;
        const nuevo = await pedidosServices.nuevoPedido({
            ID_Cliente, ID_Arreglo, Descripcion_del_pedido, Fecha_y_hora_del_pedido,
            Fecha_y_hora_de_entrega, Direccion_de_entrega, Precio_sugerido, ID_personal_asignado, Entregado, Pagado
        });
        res.status(200).send(nuevo);
    } catch (error) {
        res.status(400).send("Error en los datos");
    }
});

router.put('/', async (req: Request, res: Response) => {
    try {
        const {
            Folio,
            ID_Cliente,
            ID_Arreglo,
            Descripcion_del_pedido,
            Fecha_y_hora_del_pedido,
            Fecha_y_hora_de_entrega,
            Direccion_de_entrega,
            Precio_sugerido,
            ID_personal_asignado,
            Entregado,
            Pagado
        } = req.body;
        const modificado = await pedidosServices.modificarPedidos({
            Folio, ID_Cliente, ID_Arreglo, Descripcion_del_pedido, Fecha_y_hora_del_pedido,
            Fecha_y_hora_de_entrega, Direccion_de_entrega, Precio_sugerido, ID_personal_asignado, Entregado, Pagado
        });
        res.send(modificado);
    }
    catch (error) {
        res.status(400).send("Error en los datos");
    }
});

router.delete("/borrar/:Folio", async (req: Request, res: Response) => {
    try {
        const { Folio } = req.params;
        const eliminado = await pedidosServices.borrarPedido(Number(Folio));
        res.send(eliminado);
    } catch (error) {
        res.status(400).send('Error en los datos');
    }
});

// Consultar por fecha de pedido
router.get("/por-fecha-pedido/:fecha", async (req: Request, res: Response) => {
    try {
        const { fecha } = req.params;
        const resultado = await pedidosServices.selectPedidosPorFechaPedido(fecha);
        res.send(resultado);
    } catch (error) {
        res.status(500).send({ error: "Error al consultar pedidos por fecha de pedido" });
    }
});

// Consultar por fecha de entrega
router.get("/por-fecha-entrega/:fecha", async (req: Request, res: Response) => {
    try {
        const { fecha } = req.params;
        const resultado = await pedidosServices.selectPedidosPorFechaEntrega(fecha);
        res.send(resultado);
    } catch (error) {
        res.status(500).send({ error: "Error al consultar pedidos por fecha de entrega" });
    }
});

// Consultar por rango de fechas de pedido
router.get("/rango-fecha-pedido", async (req: Request, res: Response) => {
    try {
        const { inicio, fin } = req.query;
        const resultado = await pedidosServices.selectPedidosPorRangoFechaPedido(String(inicio), String(fin));
        res.send(resultado);
    } catch (error) {
        res.status(500).send({ error: "Error al consultar pedidos por rango de fechas de pedido" });
    }
});

// Consultar por rango de fechas de entrega
router.get("/rango-fecha-entrega", async (req: Request, res: Response) => {
    try {
        const { inicio, fin } = req.query;
        const resultado = await pedidosServices.selectPedidosPorRangoFechaEntrega(String(inicio), String(fin));
        res.send(resultado);
    } catch (error) {
        res.status(500).send({ error: "Error al consultar pedidos por rango de fechas de entrega" });
    }
});

// Consultar por estatus de entrega
router.get("/por-estatus-entrega/:entregado", async (req: Request, res: Response) => {
    try {
        const { entregado } = req.params;
        const resultado = await pedidosServices.selectPedidosPorEstatusEntrega(entregado);
        res.send(resultado);
    } catch (error) {
        res.status(500).send({ error: "Error al consultar pedidos por estatus de entrega" });
    }
});

// Consultar por estatus de pago
router.get("/por-estatus-pago/:pagado", async (req: Request, res: Response) => {
    try {
        const { pagado } = req.params;
        const resultado = await pedidosServices.selectPedidosPorEstatusPago(pagado);
        res.send(resultado);
    } catch (error) {
        res.status(500).send({ error: "Error al consultar pedidos por estatus de pago" });
    }
});

//personal asignado
router.get("/personal-asignado/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const resultado = await pedidosServices.selectPersonalPedidos(Number(id));
        res.send(resultado);
    } catch (error) {
        res.status(500).send({ error: "Error al consultar ID_personal_asignado en la tabla pedidos" });
    }
});

router.get("/:Folio", async (req: Request, res: Response) => {
    try {
        const { Folio } = req.params;
        const pedidos = await pedidosServices.selectPedidoPorFolio(Number(Folio));
        res.status(200).send(pedidos);
    } catch (error) {
        console.error("Error al obtener pedidos:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});

export default router;
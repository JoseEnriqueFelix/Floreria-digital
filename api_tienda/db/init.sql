-- phpMyAdmin SQL Dump
-- Sistema Web para Florería "Florería digital"
-- Proyecto Final - Programación Web

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------
-- Base de datos: `tienda`
-- --------------------------------------------------------

CREATE DATABASE IF NOT EXISTS `tienda`;
USE `tienda`;

-- --------------------------------------------------------
-- Eliminar tablas si existen (orden inverso por foreign keys)
-- --------------------------------------------------------

DROP TABLE IF EXISTS `pedidos`;
DROP TABLE IF EXISTS `arreglosflorales`;
DROP TABLE IF EXISTS `clientes`;
DROP TABLE IF EXISTS `personal`;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `personal`
-- Estatus: 1 = Vigente, 2 = Baja
-- --------------------------------------------------------

CREATE TABLE `personal` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_completo` varchar(100) NOT NULL,
  `Direccion` varchar(300) DEFAULT NULL,
  `Telefono` varchar(15) DEFAULT NULL,
  `Estatus` varchar(1) DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `clientes`
-- --------------------------------------------------------

CREATE TABLE `clientes` (
  `ID_Cliente` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_completo` varchar(100) NOT NULL,
  `Direccion` varchar(300) DEFAULT NULL,
  `Telefono` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`ID_Cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `arreglosflorales`
-- Tipo_de_arreglo: 1 = ramo, 2 = centro de mesa, 3 = corona, 4 = mixto
-- Estatus: 1 = vigente, 2 = No vigente
-- --------------------------------------------------------

CREATE TABLE `arreglosflorales` (
  `ID_Arreglo` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(300) DEFAULT NULL,
  `Tipo_de_arreglo` varchar(1) DEFAULT NULL,
  `Estatus` varchar(1) DEFAULT '1',
  PRIMARY KEY (`ID_Arreglo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `pedidos`
-- Entregado: 1 = Sí, 2 = No
-- Pagado: 1 = Sí, 2 = No
-- --------------------------------------------------------

CREATE TABLE `pedidos` (
  `Folio` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Cliente` int(11) DEFAULT NULL,
  `ID_Arreglo` int(11) DEFAULT NULL,
  `Descripcion_del_pedido` varchar(300) DEFAULT NULL,
  `Fecha_y_hora_del_pedido` datetime DEFAULT NULL,
  `Fecha_y_hora_de_entrega` datetime DEFAULT NULL,
  `Direccion_de_entrega` varchar(300) DEFAULT NULL,
  `Precio_sugerido` int(11) DEFAULT NULL,
  `ID_personal_asignado` int(11) DEFAULT NULL,
  `Entregado` varchar(1) DEFAULT '2',
  `Pagado` varchar(1) DEFAULT '2',
  PRIMARY KEY (`Folio`),
  KEY `idx_cliente` (`ID_Cliente`),
  KEY `idx_arreglo` (`ID_Arreglo`),
  KEY `idx_personal` (`ID_personal_asignado`),
  KEY `idx_entregado` (`Entregado`),
  KEY `idx_pagado` (`Pagado`),
  KEY `idx_fecha_pedido` (`Fecha_y_hora_del_pedido`),
  KEY `idx_fecha_entrega` (`Fecha_y_hora_de_entrega`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`ID_Cliente`) REFERENCES `clientes` (`ID_Cliente`),
  CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`ID_Arreglo`) REFERENCES `arreglosflorales` (`ID_Arreglo`),
  CONSTRAINT `pedidos_ibfk_3` FOREIGN KEY (`ID_personal_asignado`) REFERENCES `personal` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================================================
-- INSERCIONES DE DATOS
-- ========================================================

-- --------------------------------------------------------
-- Datos para la tabla `personal`
-- Estatus: 1 = Vigente, 2 = Baja
-- --------------------------------------------------------

INSERT INTO `personal` (`Nombre_completo`, `Direccion`, `Telefono`, `Estatus`) VALUES
('Daniel Torres Martínez', 'Col. Roma Norte #234, CDMX', '5511122233', '1'),
('Lucía Gómez Pérez', 'Av. Las Américas 789, Toluca, Edo. Méx.', '7223344556', '1'),
('Fernando Ruiz Sánchez', 'Calle Victoria 100, Querétaro, Qro.', '4427788990', '1'),
('Marta Delgado Cano', 'Av. Insurgentes 321, CDMX', '5533344455', '2'),
('Iván Castillo Ramírez', 'Calle del Sol 89, Mérida, Yuc.', '9995566778', '1'),
('Sofía Mendoza López', 'Blvd. Miguel Alemán 456, Culiacán, Sin.', '6677889900', '1'),
('Ricardo Flores Vega', 'Col. Centro 567, Guadalajara, Jal.', '3312345678', '1'),
('Patricia Morales Castro', 'Av. Juárez 890, Monterrey, N.L.', '8198765432', '2');

-- --------------------------------------------------------
-- Datos para la tabla `clientes`
-- --------------------------------------------------------

INSERT INTO `clientes` (`Nombre_completo`, `Direccion`, `Telefono`) VALUES
('María Fernanda López García', 'Av. Reforma 123, Col. Juárez, CDMX', '5512345678'),
('Carlos Ramírez Soto', 'Calle Hidalgo 456, Centro, Guadalajara, Jal.', '3329876543'),
('Laura Jiménez Pineda', 'Blvd. Morelos 789, León, Gto.', '4771122334'),
('José Luis Hernández Cruz', 'Col. Centro #56, Puebla, Pue.', '2224455667'),
('Ana Paola Vargas Ruiz', 'Av. Juárez 678, San Pedro, Monterrey, N.L.', '8112233445'),
('Roberto Sánchez Medina', 'Calle 5 de Mayo 234, Mérida, Yuc.', '9991234567'),
('Gabriela Torres Núñez', 'Av. Universidad 345, Culiacán, Sin.', '6672345678'),
('Miguel Ángel Pérez Díaz', 'Col. Del Valle 789, Tijuana, B.C.', '6643456789'),
('Carmen Rosa Gutiérrez', 'Blvd. Lázaro Cárdenas 456, Querétaro, Qro.', '4424567890'),
('Francisco Javier Ramírez', 'Av. Insurgentes Sur 890, CDMX', '5556789012');

-- --------------------------------------------------------
-- Datos para la tabla `arreglosflorales`
-- Tipo: 1=ramo, 2=centro de mesa, 3=corona, 4=mixto
-- Estatus: 1=vigente, 2=No vigente
-- --------------------------------------------------------

INSERT INTO `arreglosflorales` (`Descripcion`, `Tipo_de_arreglo`, `Estatus`) VALUES
-- Ramos (Tipo 1)
('Ramo de 12 rosas rojas con follaje verde y listón', '1', '1'),
('Ramo de tulipanes multicolor con envoltura de papel craft', '1', '1'),
('Ramo de girasoles con margaritas blancas', '1', '1'),
('Ramo de rosas blancas con lirios orientales', '1', '1'),
('Ramo de flores silvestres mixtas', '1', '2'),

-- Centros de mesa (Tipo 2)
('Centro de mesa con lirios, rosas y hortensias', '2', '1'),
('Centro de mesa tropical con aves del paraíso', '2', '1'),
('Centro de mesa bajo con suculentas y flores de temporada', '2', '1'),
('Centro de mesa elegante con orquídeas blancas', '2', '1'),
('Centro de mesa rústico con girasoles y lavanda', '2', '1'),

-- Coronas (Tipo 3)
('Corona fúnebre con claveles blancos y rosas', '3', '1'),
('Corona de condolencias con lirios y gladiolas', '3', '1'),
('Corona circular con rosas rojas y follaje', '3', '1'),

-- Mixtos (Tipo 4)
('Caja floral con rosas azules preservadas', '4', '1'),
('Arreglo en jarrón con flores de temporada', '4', '1'),
('Composición floral en canasta con frutas', '4', '1'),
('Arreglo de globo con flores frescas', '4', '1'),
('Caja de lujo con rosas y chocolates', '4', '2');

-- --------------------------------------------------------
-- Datos para la tabla `pedidos`
-- Entregado: 1=Sí, 2=No
-- Pagado: 1=Sí, 2=No
-- --------------------------------------------------------

INSERT INTO `pedidos` (
  `ID_Cliente`, `ID_Arreglo`, `Descripcion_del_pedido`,
  `Fecha_y_hora_del_pedido`, `Fecha_y_hora_de_entrega`,
  `Direccion_de_entrega`, `Precio_sugerido`,
  `ID_personal_asignado`, `Entregado`, `Pagado`
) VALUES
-- Pedidos entregados y pagados
(1, 1, 'Entrega de ramo de aniversario con tarjeta personalizada: "Feliz aniversario amor"',
 '2025-05-10 10:30:00', '2025-05-10 16:00:00',
 'Av. Reforma 123, Col. Juárez, CDMX', 850, 1, '1', '1'),

(2, 6, 'Centro de mesa para evento corporativo en salón principal',
 '2025-05-09 09:00:00', '2025-05-09 15:00:00',
 'Hotel Real Inn, Av. López Mateos, Guadalajara, Jal.', 1200, 2, '1', '1'),

(3, 11, 'Corona fúnebre urgente para funeral. Entrega en velatorio',
 '2025-05-08 07:45:00', '2025-05-08 10:00:00',
 'Funeraria La Paz, Blvd. Morelos 789, León, Gto.', 950, 3, '1', '1'),

(4, 3, 'Arreglo de girasoles para cumpleaños de mi madre. Con globo de cumpleaños',
 '2025-05-11 12:00:00', '2025-05-11 17:00:00',
 'Col. Centro #56, Puebla, Pue.', 700, 7, '1', '1'),

(5, 14, 'Caja floral azul para regalo de graduación universitaria',
 '2025-05-10 15:30:00', '2025-05-10 19:00:00',
 'Av. Juárez 678, San Pedro, Monterrey, N.L.', 1100, 2, '1', '1'),

-- Pedidos entregados pero NO pagados
(6, 2, 'Ramo de tulipanes para el día de las madres',
 '2025-05-12 08:00:00', '2025-05-12 12:00:00',
 'Calle 5 de Mayo 234, Mérida, Yuc.', 650, 5, '1', '2'),

(7, 7, 'Centro de mesa tropical para fiesta temática hawaiana',
 '2025-05-13 14:00:00', '2025-05-13 18:00:00',
 'Av. Universidad 345, Culiacán, Sin.', 1350, 6, '1', '2'),

-- Pedidos pendientes de entrega pero pagados
(8, 4, 'Ramo de rosas blancas y lirios para boda. Entrega en iglesia',
 '2025-11-08 09:00:00', '2025-11-15 11:00:00',
 'Parroquia San José, Col. Del Valle 789, Tijuana, B.C.', 1500, 1, '2', '1'),

(9, 9, 'Centro de mesa con orquídeas para cena romántica',
 '2025-11-10 16:00:00', '2025-11-14 19:00:00',
 'Restaurante La Terraza, Blvd. Lázaro Cárdenas 456, Querétaro, Qro.', 980, 3, '2', '1'),

-- Pedidos pendientes de entrega y pago
(10, 8, 'Centro de mesa con flores de temporada para evento empresarial',
 '2025-11-11 10:00:00', '2025-11-20 14:00:00',
 'Centro de Convenciones, Av. Insurgentes Sur 890, CDMX', 1200, 7, '2', '2'),

(1, 10, 'Centro de mesa rústico con girasoles para baby shower',
 '2025-11-12 11:30:00', '2025-11-18 15:00:00',
 'Jardín Los Arrayanes, Av. Reforma 123, Col. Juárez, CDMX', 800, 1, '2', '2'),

(4, 15, 'Arreglo en jarrón para decoración de oficina',
 '2025-11-13 13:00:00', '2025-11-25 10:00:00',
 'Oficinas Corporativas, Col. Centro #56, Puebla, Pue.', 550, 6, '2', '2'),

-- Más pedidos para reportes variados
(5, 12, 'Corona de condolencias con lirios blancos',
 '2025-05-14 06:30:00', '2025-05-14 08:00:00',
 'Panteón Municipal, Av. Juárez 678, San Pedro, Monterrey, N.L.', 1050, 2, '1', '1'),

(7, 16, 'Composición floral en canasta con frutas para hospital',
 '2025-05-15 10:00:00', '2025-05-15 14:00:00',
 'Hospital General, Av. Universidad 345, Culiacán, Sin.', 900, 5, '1', '1'),

(9, 17, 'Arreglo con globo y flores para nacimiento de bebé',
 '2025-11-14 12:00:00', '2025-11-22 16:00:00',
 'Blvd. Lázaro Cárdenas 456, Querétaro, Qro.', 750, 3, '2', '2');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
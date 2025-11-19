CREATE DATABASE  IF NOT EXISTS `todo_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `todo_app`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: todo_app
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `todos`
--

DROP TABLE IF EXISTS `todos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todos` (
  `id` varchar(255) NOT NULL DEFAULT (uuid()),
  `title` varchar(255) NOT NULL,
  `description` text,
  `status` enum('Pending','In-Progress','Completed') DEFAULT 'Pending',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todos`
--

LOCK TABLES `todos` WRITE;
/*!40000 ALTER TABLE `todos` DISABLE KEYS */;
INSERT INTO `todos` VALUES ('8bb03b25-c527-11f0-9c73-1c1b0d484c7a','dddd','dddd','Pending','2025-11-19 09:10:08','2025-11-19 09:10:08'),('b1b19a59-c522-11f0-9c73-1c1b0d484c7a','hello','Finish the MERN assignment','Pending','2025-11-19 08:35:24','2025-11-19 08:35:24'),('b25f40e5-c522-11f0-9c73-1c1b0d484c7a','hello','Finish the MERN assignment','Pending','2025-11-19 08:35:26','2025-11-19 08:35:26'),('b2eeff70-c522-11f0-9c73-1c1b0d484c7a','hello','Finish the MERN assignment','Pending','2025-11-19 08:35:27','2025-11-19 08:35:27'),('b36bd378-c522-11f0-9c73-1c1b0d484c7a','hello','Finish the MERN assignment','Pending','2025-11-19 08:35:27','2025-11-19 08:35:27'),('b3e0495f-c522-11f0-9c73-1c1b0d484c7a','hello','Finish the MERN assignment','Pending','2025-11-19 08:35:28','2025-11-19 08:35:28'),('b45490bc-c522-11f0-9c73-1c1b0d484c7a','hello','Finish the MERN assignment','Pending','2025-11-19 08:35:29','2025-11-19 09:11:23'),('b4c5fe78-c522-11f0-9c73-1c1b0d484c7a','update name','Finish the test assignment','Completed','2025-11-19 08:35:30','2025-11-19 08:40:37'),('b7df3255-c53a-11f0-9715-1c1b0d484c7a','sss','ssss','Pending','2025-11-19 11:27:23','2025-11-19 11:27:23'),('c869a8a5-c522-11f0-9c73-1c1b0d484c7a','helloxxxx','Finish the MERN assignment','Pending','2025-11-19 08:36:03','2025-11-19 08:36:03');
/*!40000 ALTER TABLE `todos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-19 19:09:55

-- MySQL dump 10.13  Distrib 8.0.30, for Linux (x86_64)
--
-- Host: localhost    Database: digital_envision_test
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

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
-- Table structure for table `INIT_DATA`
--

DROP TABLE IF EXISTS `INIT_DATA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `INIT_DATA` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_user` bigint NOT NULL,
  `processing_date` date NOT NULL,
  `is_sent` int DEFAULT '0',
  `id_message` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `INIT_DATA`
--

LOCK TABLES `INIT_DATA` WRITE;
/*!40000 ALTER TABLE `INIT_DATA` DISABLE KEYS */;
/*!40000 ALTER TABLE `INIT_DATA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MESSAGES`
--

DROP TABLE IF EXISTS `MESSAGES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MESSAGES` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `message` varchar(250) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MESSAGES`
--

LOCK TABLES `MESSAGES` WRITE;
/*!40000 ALTER TABLE `MESSAGES` DISABLE KEYS */;
INSERT INTO `MESSAGES` VALUES (1,'Hey, {full_name} it’s your birthday.','2022-10-15 20:27:15','2022-10-15 20:27:15');
/*!40000 ALTER TABLE `MESSAGES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USERS`
--

DROP TABLE IF EXISTS `USERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USERS` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `birthday_date` date NOT NULL,
  `location` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERS`
--

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;
INSERT INTO `USERS` VALUES (1,'AndiHeheWEkresdsj','Yusanto','2022-12-01','Asia/Jakarta','2022-10-15 23:09:19','2022-10-15 23:09:19');
/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-16  6:10:08

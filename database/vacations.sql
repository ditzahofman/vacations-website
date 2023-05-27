-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2023 at 04:18 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(18, 8),
(18, 1),
(18, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` char(128) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(16, 'yaeir', 'katz', '4444@gmail.com', '6e0a8e9e5073ce577c00a467ee5b6cffd3fe228bc40454ecae61af17dec4f7acc2fe8c079f808f371ae7c5557a28161244c49be6f05fc66c1d90e10c7224c7f6', 'User'),
(18, 'Nir', 'Barkat', '1111@gmail.com', 'f8931ae128af3068020309290b9143ec39a330eaa70b431de02a62e4576cd30365995139721f1df96aa925b64f54e6eb40aad7ff581ff1ee88ec3898a5d9d2cc', 'User'),
(19, 'Doli', 'Cadin', '555@gmail.com', '8164f0129c554ffb4d11c57317f541188d3c01d5d2452f41ec9f0aa4e6a76e6a00614f2a1eb0ea6992a98a2bef840fea43b26d587ffa290f9d0fd9c2d11d1abc', 'User'),
(20, 'Nili', 'Shachor', '345@gmail.com', '1e1f865b53e0c31631238da39499f5236e5678f20bfe6ae9f0e1eae50587aaf7f1ce4e1d36008edf6146f41e5a09004cdac581e6ccfaac9d9e566658ffdabffc', 'User'),
(21, 'Sara', 'Chen', '56789@gmail.com', '272b5d009088badd90880933223f483ef132de2584849eb393cf0b3d792035b84485b3f5a1a3c1c17c6b2b0fbd69793b5dc74a351522784774ab0bc4069f06c5', 'User'),
(23, 'Galit', 'Bar', '3333@gmail.com', '1858b86f3f3a647595ac7411f443c419bd55d211514e381fde7257c4261b784c2980407bccbe436f0a34fd3607e5ad94e1e35aa41944d1cfbcc71d8aa35e6607', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacation`
--

CREATE TABLE `vacation` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(20) NOT NULL,
  `description` varchar(1200) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `imageName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacation`
--

INSERT INTO `vacation` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 'Alecos Hotel Apartme', 'Offering a pool and a restaurant, Alecos Hotel Apartments is 300 meters from Alykes Beach. The apartments include air conditioning, self-service facilities with views of the garden, and free Wi-Fi. Li', '2023-02-14', '2023-02-17', 860, ''),
(8, 'hifa-hotel', 'jkjkjkjl', '0000-00-00', '0000-00-00', 980, 'nmj.jpg'),
(9, 'poland', 'Poland, in Central Europe, is a captivating destination with a rich history, vibrant culture, and picturesque landscapes. Explore charming old towns, indulge in delicious cuisine, and discover historical landmarks. Immerse yourself in the warmth of Polish hospitality and experience the country\'s unique traditions. From fascinating cities to natural beauty, Poland offers a memorable vacation experience.', '2017-05-23', '2019-05-23', 800, '29ad7b33-fff6-4cd1-a481-18c02fb65af8.jpg'),
(13, 'romanya', 'jkjkjkjl', '0000-00-00', '0000-00-00', 50, 'ncvv.jpg'),
(14, 'romanya', 'jkjkjkjl', '0000-00-00', '0000-00-00', 50, 'ncvv.jpg'),
(15, 'venica', 'Venice, Italy, is a mesmerizing city that captivates visitors with its unique charm. Known as the \"Floating City,\" it is a place where canals replace roads and gondolas glide gracefully through the waterways. Picture yourself strolling along narrow streets lined with colorful buildings, crossing picturesque bridges, and discovering hidden squares filled with bustling cafes and shops. The grandeur of St. Mark\'s Square and its stunning Basilica will leave you in awe. As you wander through the city, indulge in authentic Venetian cuisine, savoring the flavors of fresh seafood and traditional dishes. Don\'t miss the opportunity to explore the nearby islands, such as Murano with its glassblowing workshops, or Burano, known for its vibrant and charming houses. Venice is a city where every corner exudes history, art, and romance, creating an unforgettable vacation experience.', '2030-06-23', '2003-07-23', 1299, '62b76788-996c-4625-962c-76d72760f72b.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacation`
--
ALTER TABLE `vacation`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `vacation`
--
ALTER TABLE `vacation`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacation` (`vacationId`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

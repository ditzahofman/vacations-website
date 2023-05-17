-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2023 at 01:03 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `hospitalystyle`
--

CREATE TABLE `hospitalystyle` (
  `hospitalyStyleId` int(11) NOT NULL,
  `hospitalyStyleName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hospitalystyle`
--

INSERT INTO `hospitalystyle` (`hospitalyStyleId`, `hospitalyStyleName`) VALUES
(1, 'weekEnd'),
(2, 'HalfBoard'),
(3, 'FullBoard'),
(4, 'BedAndBreakfast'),
(5, 'sleepOnly');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(1, 'ditza', 'hoffman', '56578@gmail.com', 'GF7865ui', ' User'),
(2, 'TZVI', 'hoffman', '9808909@gmail.com', 'GF7095ui', ' User'),
(3, 'uiuiu', 'hoffpopman', '98078@gmail.com', '7095ui', ' User');

-- --------------------------------------------------------

--
-- Table structure for table `vacation`
--

CREATE TABLE `vacation` (
  `vacationId` int(11) NOT NULL,
  `nameHotel` varchar(20) NOT NULL,
  `adress` varchar(30) NOT NULL,
  `location` varchar(20) NOT NULL,
  `description` varchar(200) NOT NULL,
  `fullDescription` varchar(200) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `hospitalyStyleId` int(11) NOT NULL,
  `pricePerNight` decimal(10,0) NOT NULL,
  `totalPrice` decimal(10,0) NOT NULL,
  `imageName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacation`
--

INSERT INTO `vacation` (`vacationId`, `nameHotel`, `adress`, `location`, `description`, `fullDescription`, `startDate`, `endDate`, `hospitalyStyleId`, `pricePerNight`, `totalPrice`, `imageName`) VALUES
(1, 'Alecos Hotel Apartme', 'Constantias 9, Kato ', 'Cyprus', 'Offering a pool and a restaurant, Alecos Hotel Apartments is 300 meters from Alykes Beach. The apartments include air conditioning, self-service facilities with views of the garden, and free Wi-Fi. Li', 'All apartments and studios open onto a balcony, and include a seating area with a sofa. All apartments have a kitchenette with a dining table and a stove for cooking. The property also provides an iro', '2023-02-14', '2023-02-17', 4, 208, 860, ''),
(8, 'hifa-hotel', 'akiva 89', 'hifa', 'jkjkjkjl', 'undefined', '0000-00-00', '0000-00-00', 1, 200, 980, 'nmj.jpg'),
(9, 'polunya-hotel', 'xcxcxvc 46 polunya ', 'polunya', 'jkjkjkjl', 'undefined', '0000-00-00', '0000-00-00', 1, 100, 400, 'ncvv.jpg'),
(10, 'hifa-hotel', 'akiva 89', 'hifa', 'jkjkjkjl', 'undefined', '0000-00-00', '0000-00-00', 1, 200, 980, 'nmj.jpg'),
(11, 'plaza-usa', 'fgt 45', 'new york', 'jkjkjkjl', 'undefined', '0000-00-00', '0000-00-00', 2, 200, 980, 'nmj.jpg');

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
-- Indexes for table `hospitalystyle`
--
ALTER TABLE `hospitalystyle`
  ADD PRIMARY KEY (`hospitalyStyleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacation`
--
ALTER TABLE `vacation`
  ADD PRIMARY KEY (`vacationId`),
  ADD KEY `hospitalyStyleId` (`hospitalyStyleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hospitalystyle`
--
ALTER TABLE `hospitalystyle`
  MODIFY `hospitalyStyleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `vacation`
--
ALTER TABLE `vacation`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacation` (`vacationId`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vacation`
--
ALTER TABLE `vacation`
  ADD CONSTRAINT `vacation_ibfk_1` FOREIGN KEY (`hospitalyStyleId`) REFERENCES `hospitalystyle` (`hospitalyStyleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

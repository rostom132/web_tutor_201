-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2020 at 03:03 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web_ass`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `gender` varchar(1) NOT NULL CHECK (`gender` in ('F','M')),
  `phone_number` varchar(15) NOT NULL,
  `description` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `id` int(10) UNSIGNED NOT NULL,
  `city` varchar(30) NOT NULL,
  `district` varchar(30) NOT NULL,
  `ward` varchar(30) NOT NULL,
  `address` varchar(150) NOT NULL,
  `phone_number` varchar(30) NOT NULL,
  `no_students` int(11) NOT NULL CHECK (`no_students` >= 1),
  `gender_of_tutor` varchar(1) NOT NULL CHECK (`gender_of_tutor` in ('F','M','B')),
  `salary_per_lesson` int(11) NOT NULL CHECK (`salary_per_lesson` >= 50),
  `no_lesson_per_week` int(11) NOT NULL CHECK (`no_lesson_per_week` >= 1),
  `time_per_lesson` time NOT NULL,
  `verified` varchar(1) NOT NULL CHECK (`verified` in ('T','F')),
  `user_id` int(10) UNSIGNED NOT NULL,
  `description` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `classschedule`
--

CREATE TABLE `classschedule` (
  `id` int(10) UNSIGNED NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `date` varchar(3) NOT NULL CHECK (`date` in ('MON','TUE','WED','THU','FRI','SAT','SUN')),
  `class_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `parent`
--

CREATE TABLE `parent` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `birth_of_date` date NOT NULL,
  `gender` varchar(1) NOT NULL CHECK (`gender` in ('F','M')),
  `phone_number` varchar(15) NOT NULL,
  `mail` varchar(40) DEFAULT NULL,
  `account_verified` varchar(5) NOT NULL CHECK (`account_verified` in ('T','F'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `id` int(10) UNSIGNED NOT NULL,
  `request_date` datetime NOT NULL,
  `status` varchar(20) DEFAULT NULL CHECK (`status` in ('PASSED','NOT PAIED','DONE')),
  `class_id` int(10) UNSIGNED NOT NULL,
  `tutor_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `specialize`
--

CREATE TABLE `specialize` (
  `years_of_ex` int(10) UNSIGNED DEFAULT NULL,
  `subject_id` int(10) UNSIGNED NOT NULL,
  `tutor_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `specialize`
--

INSERT INTO `specialize` (`years_of_ex`, `subject_id`, `tutor_id`) VALUES
(NULL, 1, 1),
(NULL, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `grade` int(11) NOT NULL CHECK (`grade` >= 1 and `grade` <= 12),
  `teaching_language` varchar(3) NOT NULL CHECK (`teaching_language` in ('VIE','ENG'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`id`, `name`, `grade`, `teaching_language`) VALUES
(1, 'toan', 12, 'ENG'),
(2, 'van', 12, 'VIE'),
(3, 'vat ly', 10, 'ENG'),
(6, 'hoa', 11, 'ENG');

-- --------------------------------------------------------

--
-- Table structure for table `teaching`
--

CREATE TABLE `teaching` (
  `id` int(10) UNSIGNED NOT NULL,
  `start_date` date NOT NULL,
  `due_date` date NOT NULL,
  `class_id` int(10) UNSIGNED NOT NULL,
  `tutor_id` int(10) UNSIGNED NOT NULL,
  `schedule_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tutor`
--

CREATE TABLE `tutor` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` varchar(1) NOT NULL CHECK (`gender` in ('F','M')),
  `phone_number` varchar(15) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `language` varchar(30) NOT NULL,
  `present_job` varchar(40) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `account_verified` varchar(5) NOT NULL CHECK (`account_verified` in ('T','F'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tutor`
--

INSERT INTO `tutor` (`id`, `first_name`, `last_name`, `date_of_birth`, `gender`, `phone_number`, `email`, `language`, `present_job`, `description`, `account_verified`) VALUES
(1, 'TIẾN PRO', 'Tran Dinh', '1999-04-30', 'M', '0845426661', 'tien.trantom@gmail.com', 'Both', '', 'gank full tem', 'T');

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

CREATE TABLE `userinfo` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(200) NOT NULL,
  `salt` varchar(50) NOT NULL,
  `user_type` varchar(30) NOT NULL CHECK (`user_type` in ('admin','tutor','parent')),
  `token` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`id`, `username`, `password`, `salt`, `user_type`, `token`) VALUES
(1, 'tien', 'a0ee70298c764574e2f4af678f827d07419a903370086557e329c2513b208a43', '1604936216971', 'tutor', 'ad76ab3eee9c5364268902299bc295e385da3c19');

-- --------------------------------------------------------

--
-- Table structure for table `weakness`
--

CREATE TABLE `weakness` (
  `id` int(10) UNSIGNED NOT NULL,
  `level` varchar(5) DEFAULT NULL CHECK (`level` in ('BELOW','AVER','GOOD')),
  `class_id` int(10) UNSIGNED NOT NULL,
  `subject_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `classschedule`
--
ALTER TABLE `classschedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `parent`
--
ALTER TABLE `parent`
  ADD KEY `id` (`id`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `tutor_id` (`tutor_id`);

--
-- Indexes for table `specialize`
--
ALTER TABLE `specialize`
  ADD PRIMARY KEY (`subject_id`,`tutor_id`),
  ADD KEY `tutor_id` (`tutor_id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teaching`
--
ALTER TABLE `teaching`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `tutor_id` (`tutor_id`);

--
-- Indexes for table `tutor`
--
ALTER TABLE `tutor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `weakness`
--
ALTER TABLE `weakness`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `subject_id` (`subject_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `classschedule`
--
ALTER TABLE `classschedule`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `teaching`
--
ALTER TABLE `teaching`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `weakness`
--
ALTER TABLE `weakness`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`id`) REFERENCES `userinfo` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userinfo` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `classschedule`
--
ALTER TABLE `classschedule`
  ADD CONSTRAINT `classschedule_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `parent`
--
ALTER TABLE `parent`
  ADD CONSTRAINT `parent_ibfk_1` FOREIGN KEY (`id`) REFERENCES `userinfo` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `request_ibfk_2` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `specialize`
--
ALTER TABLE `specialize`
  ADD CONSTRAINT `specialize_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `specialize_ibfk_2` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `specialize_ibfk_3` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `teaching`
--
ALTER TABLE `teaching`
  ADD CONSTRAINT `teaching_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `teaching_ibfk_2` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tutor`
--
ALTER TABLE `tutor`
  ADD CONSTRAINT `tutor_ibfk_1` FOREIGN KEY (`id`) REFERENCES `userinfo` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `weakness`
--
ALTER TABLE `weakness`
  ADD CONSTRAINT `weakness_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `weakness_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

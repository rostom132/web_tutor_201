-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 24, 2020 at 09:00 AM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

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
  `last_name` varchar(30) DEFAULT NULL,
  `gender` varchar(1) DEFAULT 'M',
  `phone_number` varchar(15) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `first_name`, `last_name`, `gender`, `phone_number`, `description`, `email`) VALUES
(17, 'tkteducation', 'asdas', 'F', '0845425551', NULL, 'vietkhoa1999@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `admincode`
--

CREATE TABLE `admincode` (
  `code` int(7) UNSIGNED ZEROFILL NOT NULL,
  `use_time` int(2) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admincode`
--

INSERT INTO `admincode` (`code`, `use_time`) VALUES
(0004646, 45);

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
  `user_id` int(10) UNSIGNED NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `topic` varchar(50) NOT NULL,
  `post_date` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`id`, `city`, `district`, `ward`, `address`, `phone_number`, `no_students`, `gender_of_tutor`, `salary_per_lesson`, `no_lesson_per_week`, `time_per_lesson`, `user_id`, `description`, `topic`, `post_date`) VALUES
(1, '1', '10', '134', '82/8 Mạc Đỉnh Chi', '0908933671', 1, 'F', 200000, 3, '01:30:00', 4, 'Cần giáo viên nữ dạy cho con gái tui, dạy giỏi có thêm tiền. Con tui hơi rụt rè muốn có giáo viên nhiệt tình để quan tâm cháu hơn kjdfbkjsdnflskdlskdmflskdfmlSKDnJLFSNlKnvlklz;jnblzn;kxcmv;xc,b;bmlcvb', 'Cần giáo viên nữ dạy môn Toán', '2020-11-20'),
(2, '1', '19', '254', '465/1/12 Trần Xuân Soạn', '0708091941', 2, 'M', 150000, 4, '02:00:00', 7, 'Con tôi cần giáo viên dạy Lý bằng Tiếng Anh vì cháu học trường quốc tế', 'Cần giáo viên dạy Lý Tiếng Anh', '2020-11-10'),
(84, '1', '10', '129', '17/10 Đường Cây Điệp Phường Bến Nghé Quận 1', '0969935447', 4, 'M', 100000, 2, '02:30:00', 10, '', 'Tìm gia sư Toán quận', '2020-11-24'),
(85, '1', '2', '20', '17/10 Đường 11A Phường Bình Hưng Hòa A Bình Tân', '0969935447', 4, 'M', 200000, 2, '03:00:00', 10, '', 'tìm gia sư abcd', '2020-11-24'),
(87, '1', '19', '254', '110 Đường 11 Phường Tân Kiểng Quận 7', '0969935447', 6, 'M', 100000, 2, '02:30:00', 10, '', 'Tìm gia sư ở quận 1', '2020-11-24'),
(88, '1', '14', '185', '220A Đường 10G Phường Bình An Quận 2', '0969935447', 10, 'B', 300000, 2, '03:00:00', 10, 'Ngọc Thiện đẹp trai', 'Tìm gia sư ở Quận 2', '2020-11-24');

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
  `last_name` varchar(30) DEFAULT NULL,
  `date_of_birth` date DEFAULT curdate(),
  `gender` varchar(1) NOT NULL DEFAULT 'M',
  `phone_number` varchar(15) DEFAULT NULL,
  `email` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `parent`
--

INSERT INTO `parent` (`id`, `first_name`, `last_name`, `date_of_birth`, `gender`, `phone_number`, `email`) VALUES
(4, 'thienngu', NULL, '2020-11-15', 'M', NULL, 'nhanthien1012@gmail.com'),
(7, 'khoangu', NULL, '2020-11-15', 'M', NULL, 'rostom13299@gmail.com');

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
(NULL, 1, 6),
(NULL, 1, 9),
(NULL, 3, 1),
(NULL, 6, 6);

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
  `last_name` varchar(30) DEFAULT NULL,
  `date_of_birth` date DEFAULT curdate(),
  `gender` varchar(1) NOT NULL DEFAULT 'M',
  `phone_number` varchar(15) DEFAULT NULL,
  `email` varchar(30) NOT NULL,
  `language` varchar(30) DEFAULT NULL,
  `present_job` varchar(40) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tutor`
--

INSERT INTO `tutor` (`id`, `first_name`, `last_name`, `date_of_birth`, `gender`, `phone_number`, `email`, `language`, `present_job`, `description`) VALUES
(1, 'TIẾN PRO', 'Tran Dinh', '1999-04-30', 'F', '0845426661', 'tien.trantom@gmail.com', 'Both', 'sinh vien DHBK', 'gank full tem'),
(6, 'tienn', 'tran', '2020-11-15', 'F', '0845283742', 'rostom13299@gmail.com', 'Vietnamese', '', 'asdaf'),
(8, 'thienn', NULL, '2020-11-17', 'M', NULL, 'nhanthien1012@gmail.com', NULL, NULL, NULL),
(9, 'tiennn', 'tien', '2020-11-17', 'M', '0845162387', 'tien.trandinh99@gmail.com', 'Vietnamese', '', ''),
(10, 'tiennnnn', NULL, '2020-11-22', 'M', NULL, 'rostom13299@gmail.com', NULL, NULL, NULL);

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
(1, 'tien', 'a0ee70298c764574e2f4af678f827d07419a903370086557e329c2513b208a43', '1604936216971', 'tutor', '999f75f935bcc55ea9b028761f3964f42189bc70'),
(4, 'thienngu', 'f57bd22a8f456f9e40a4ae5732d9fa2057afa50332e227882de593f0d567e2ae', '1605422611878', 'parent', NULL),
(6, 'tienn', 'ec355c9fb964b230bd1e22aa23ef49eec3bbcc8965ae9db10522f5d1437bcda2', '1605426734783', 'tutor', '6636914328d0942498e06d06b8585970b7e4add4'),
(7, 'khoangu', '2e88bfeeebe8c6b947a20253d7d45154cbfc7726e744520ab832d1df689648f8', '1605428301016', 'parent', NULL),
(8, 'thienn', '63c854642c3194cd1ad0b3b89895a12a6f1f874ee293261de531678134e2e63d', '1605613059924', 'tutor', NULL),
(9, 'tiennn', '3294a05f6bd3dd40d5a853dc925f68abe45120a050fa156b428cbef08a0a5666', '1605613199261', 'tutor', NULL),
(10, 'tiennnnn', '5c789bba3ab73fc346b245d04cce889f979c7fa075975af532a4765c22f9a07b', '1606039156956', 'tutor', NULL),
(17, 'tkteducation', '1a3836f03122df6d092a01ea94cffb4ac13191b042e96312656c61f5c7a9fe70', '1606196535645', 'admin', '371c2631e44dcbaceb05e195c4f8c27f9ce0b27c');

-- --------------------------------------------------------

--
-- Table structure for table `weakness`
--

CREATE TABLE `weakness` (
  `class_id` int(10) UNSIGNED NOT NULL,
  `subject_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `weakness`
--

INSERT INTO `weakness` (`class_id`, `subject_id`) VALUES
(1, 1),
(2, 1),
(2, 6),
(84, 1),
(84, 3),
(84, 6),
(85, 1),
(85, 3),
(87, 2),
(88, 2),
(88, 6);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admincode`
--
ALTER TABLE `admincode`
  ADD PRIMARY KEY (`code`);

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
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`class_id`,`subject_id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `subject_id` (`subject_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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

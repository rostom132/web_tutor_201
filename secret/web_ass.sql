-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 15, 2020 lúc 09:19 AM
-- Phiên bản máy phục vụ: 10.4.14-MariaDB
-- Phiên bản PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `web_ass`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admin`
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
-- Cấu trúc bảng cho bảng `class`
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
-- Cấu trúc bảng cho bảng `classschedule`
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
-- Cấu trúc bảng cho bảng `parent`
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
-- Đang đổ dữ liệu cho bảng `parent`
--

INSERT INTO `parent` (`id`, `first_name`, `last_name`, `date_of_birth`, `gender`, `phone_number`, `email`) VALUES
(4, 'thienngu', NULL, '2020-11-15', 'M', NULL, 'nhanthien1012@gmail.com'),
(7, 'khoangu', NULL, '2020-11-15', 'M', NULL, 'rostom13299@gmail.com');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `request`
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
-- Cấu trúc bảng cho bảng `specialize`
--

CREATE TABLE `specialize` (
  `years_of_ex` int(10) UNSIGNED DEFAULT NULL,
  `subject_id` int(10) UNSIGNED NOT NULL,
  `tutor_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `specialize`
--

INSERT INTO `specialize` (`years_of_ex`, `subject_id`, `tutor_id`) VALUES
(NULL, 1, 1),
(NULL, 1, 6),
(NULL, 3, 1),
(NULL, 6, 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `subject`
--

CREATE TABLE `subject` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `grade` int(11) NOT NULL CHECK (`grade` >= 1 and `grade` <= 12),
  `teaching_language` varchar(3) NOT NULL CHECK (`teaching_language` in ('VIE','ENG'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `subject`
--

INSERT INTO `subject` (`id`, `name`, `grade`, `teaching_language`) VALUES
(1, 'toan', 12, 'ENG'),
(2, 'van', 12, 'VIE'),
(3, 'vat ly', 10, 'ENG'),
(6, 'hoa', 11, 'ENG');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `teaching`
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
-- Cấu trúc bảng cho bảng `tutor`
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
-- Đang đổ dữ liệu cho bảng `tutor`
--

INSERT INTO `tutor` (`id`, `first_name`, `last_name`, `date_of_birth`, `gender`, `phone_number`, `email`, `language`, `present_job`, `description`) VALUES
(1, 'TIẾN PRO', 'Tran Dinh', '1999-04-30', 'F', '0845426661', 'tien.trantom@gmail.com', 'Both', 'sinh vien DHBK', 'gank full tem'),
(6, 'tienn', 'tran', '2020-11-15', 'F', '0845283742', 'rostom13299@gmail.com', 'Vietnamese', '', 'asdaf');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `userinfo`
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
-- Đang đổ dữ liệu cho bảng `userinfo`
--

INSERT INTO `userinfo` (`id`, `username`, `password`, `salt`, `user_type`, `token`) VALUES
(1, 'tien', 'a0ee70298c764574e2f4af678f827d07419a903370086557e329c2513b208a43', '1604936216971', 'tutor', '999f75f935bcc55ea9b028761f3964f42189bc70'),
(4, 'thienngu', 'f57bd22a8f456f9e40a4ae5732d9fa2057afa50332e227882de593f0d567e2ae', '1605422611878', 'parent', NULL),
(6, 'tienn', 'ec355c9fb964b230bd1e22aa23ef49eec3bbcc8965ae9db10522f5d1437bcda2', '1605426734783', 'tutor', '40c7464574263d8485000503f4206f4edfe01714'),
(7, 'khoangu', '2e88bfeeebe8c6b947a20253d7d45154cbfc7726e744520ab832d1df689648f8', '1605428301016', 'parent', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `weakness`
--

CREATE TABLE `weakness` (
  `id` int(10) UNSIGNED NOT NULL,
  `level` varchar(5) DEFAULT NULL CHECK (`level` in ('BELOW','AVER','GOOD')),
  `class_id` int(10) UNSIGNED NOT NULL,
  `subject_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `classschedule`
--
ALTER TABLE `classschedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`);

--
-- Chỉ mục cho bảng `parent`
--
ALTER TABLE `parent`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `tutor_id` (`tutor_id`);

--
-- Chỉ mục cho bảng `specialize`
--
ALTER TABLE `specialize`
  ADD PRIMARY KEY (`subject_id`,`tutor_id`),
  ADD KEY `tutor_id` (`tutor_id`);

--
-- Chỉ mục cho bảng `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `teaching`
--
ALTER TABLE `teaching`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `tutor_id` (`tutor_id`);

--
-- Chỉ mục cho bảng `tutor`
--
ALTER TABLE `tutor`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Chỉ mục cho bảng `weakness`
--
ALTER TABLE `weakness`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `subject_id` (`subject_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `class`
--
ALTER TABLE `class`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `classschedule`
--
ALTER TABLE `classschedule`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `request`
--
ALTER TABLE `request`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `subject`
--
ALTER TABLE `subject`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `teaching`
--
ALTER TABLE `teaching`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `weakness`
--
ALTER TABLE `weakness`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`id`) REFERENCES `userinfo` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userinfo` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `classschedule`
--
ALTER TABLE `classschedule`
  ADD CONSTRAINT `classschedule_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `parent`
--
ALTER TABLE `parent`
  ADD CONSTRAINT `parent_ibfk_1` FOREIGN KEY (`id`) REFERENCES `userinfo` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `request_ibfk_2` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `specialize`
--
ALTER TABLE `specialize`
  ADD CONSTRAINT `specialize_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `specialize_ibfk_2` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `specialize_ibfk_3` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `teaching`
--
ALTER TABLE `teaching`
  ADD CONSTRAINT `teaching_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `teaching_ibfk_2` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `tutor`
--
ALTER TABLE `tutor`
  ADD CONSTRAINT `tutor_ibfk_1` FOREIGN KEY (`id`) REFERENCES `userinfo` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `weakness`
--
ALTER TABLE `weakness`
  ADD CONSTRAINT `weakness_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `weakness_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

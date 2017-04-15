-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-03-18 12:39:38
-- 服务器版本： 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `csci3100-finddy`
--

-- --------------------------------------------------------

--
-- 表的结构 `activities`
--

CREATE TABLE `activities` (
  `AID` int(10) NOT NULL,
  `TYPE` varchar(1) NOT NULL,
  `DESCRIPTION` varchar(300) NOT NULL,
  `LOCATION` varchar(100) DEFAULT NULL,
  `START_TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `QUOTA` int(3) DEFAULT NULL,
  `NO_OF_JOINERS` int(3) DEFAULT '0',
  `RATING` float(5,4) DEFAULT NULL,
  `STATUS` varchar(1) DEFAULT NULL,
  `EXPIRE_TIME` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `CREATOR_ID` int(10) NOT NULL,
  `CREATE_TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `comments`
--

CREATE TABLE `comments` (
  `CID` int(10) NOT NULL,
  `ACTIVITY_ID` int(10) NOT NULL,
  `CONTENT` varchar(300) NOT NULL,
  `CREATOR_ID` int(10) NOT NULL,
  `CREATOR_TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `joiners`
--

CREATE TABLE `joiners` (
  `RECORDID` int(10) NOT NULL,
  `ACTIVITY_ID` int(10) NOT NULL,
  `JOINER_ID` int(10) NOT NULL,
  `RATING` int(1) DEFAULT NULL,
  `CREATE_TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `userrelationship`
--

CREATE TABLE `userrelationship` (
  `RECORDID` int(10) NOT NULL,
  `HOSTID` int(10) NOT NULL,
  `USERID` int(10) NOT NULL,
  `RELATIONSHIP` varchar(1) NOT NULL,
  `CREATE_TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `UID` int(10) NOT NULL,
  `USERNAME` varchar(12) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `PASSWORD` varchar(512) NOT NULL,
  `PHONE_NO` int(20) NOT NULL,
  `DESCRIPTION` varchar(300) NOT NULL,
  `LAST_MOD_TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`AID`),
  ADD KEY `CREATOR_ID` (`CREATOR_ID`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`CID`),
  ADD KEY `ACTIVITY_ID` (`ACTIVITY_ID`),
  ADD KEY `CREATOR_ID` (`CREATOR_ID`);

--
-- Indexes for table `joiners`
--
ALTER TABLE `joiners`
  ADD PRIMARY KEY (`RECORDID`),
  ADD KEY `ACTIVITY_ID` (`ACTIVITY_ID`),
  ADD KEY `JOINER_ID` (`JOINER_ID`);

--
-- Indexes for table `userrelationship`
--
ALTER TABLE `userrelationship`
  ADD PRIMARY KEY (`RECORDID`),
  ADD KEY `HOSTID` (`HOSTID`),
  ADD KEY `USERID` (`USERID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UID`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `activities`
--
ALTER TABLE `activities`
  MODIFY `AID` int(10) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `comments`
--
ALTER TABLE `comments`
  MODIFY `CID` int(10) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `joiners`
--
ALTER TABLE `joiners`
  MODIFY `RECORDID` int(10) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `userrelationship`
--
ALTER TABLE `userrelationship`
  MODIFY `RECORDID` int(10) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `UID` int(10) NOT NULL AUTO_INCREMENT;
--
-- 限制导出的表
--

--
-- 限制表 `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`CREATOR_ID`) REFERENCES `users` (`UID`);

--
-- 限制表 `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`ACTIVITY_ID`) REFERENCES `activities` (`AID`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`CREATOR_ID`) REFERENCES `users` (`UID`);

--
-- 限制表 `joiners`
--
ALTER TABLE `joiners`
  ADD CONSTRAINT `joiners_ibfk_1` FOREIGN KEY (`ACTIVITY_ID`) REFERENCES `activities` (`AID`),
  ADD CONSTRAINT `joiners_ibfk_2` FOREIGN KEY (`JOINER_ID`) REFERENCES `users` (`UID`);

--
-- 限制表 `userrelationship`
--
ALTER TABLE `userrelationship`
  ADD CONSTRAINT `userrelationship_ibfk_1` FOREIGN KEY (`HOSTID`) REFERENCES `users` (`UID`),
  ADD CONSTRAINT `userrelationship_ibfk_2` FOREIGN KEY (`USERID`) REFERENCES `users` (`UID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

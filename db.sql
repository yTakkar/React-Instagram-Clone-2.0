-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2018 at 02:16 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react-instagram-clone`
--

-- --------------------------------------------------------

--
-- Table structure for table `blocks`
--

CREATE TABLE `blocks` (
  `block_id` int(11) NOT NULL,
  `block_by` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `block_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blocks`
--

INSERT INTO `blocks` (`block_id`, `block_by`, `user`, `block_time`) VALUES
(6, 30, 24, '1518512985015'),
(11, 7, 11, '1518973149200'),
(13, 24, 20, '1524915826749'),
(15, 28, 10, '1528222712390');

-- --------------------------------------------------------

--
-- Table structure for table `bookmarks`
--

CREATE TABLE `bookmarks` (
  `bkmrk_id` int(11) NOT NULL,
  `bkmrk_by` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `bkmrk_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bookmarks`
--

INSERT INTO `bookmarks` (`bkmrk_id`, `bkmrk_by`, `post_id`, `bkmrk_time`) VALUES
(2, 24, 43, '1524497939091'),
(3, 24, 57, '1526210615506');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `type` enum('text','image','sticker') COLLATE utf8mb4_bin NOT NULL,
  `text` mediumtext COLLATE utf8mb4_bin NOT NULL,
  `commentSrc` mediumtext COLLATE utf8mb4_bin NOT NULL,
  `comment_by` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `comment_time` varchar(100) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `type`, `text`, `commentSrc`, `comment_by`, `post_id`, `comment_time`) VALUES
(62, 'text', 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', '', 30, 57, '1518509780928'),
(63, 'text', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '', 30, 57, '1518509825922'),
(64, 'text', '#Hello', '', 24, 57, '1518710983444'),
(66, 'text', 'wooo @takkar', '', 7, 88, '1518945524771'),
(69, 'image', '', 'instagram_comment_1518972851259.jpg', 24, 89, '1518972851259'),
(70, 'text', 'thnx @ghalib', '', 24, 88, '1518972932739'),
(71, 'text', 'hmmm', '', 7, 88, '1518973041037'),
(73, 'text', 'https://regexr.com/?37i6s fffffm', '', 24, 89, '1519113671582'),
(102, 'text', 'mmmm', '', 24, 61, '1524764250449'),
(103, 'sticker', '', 'instagram_comment_1527447892610.jpg', 24, 43, '1527447892610'),
(104, 'sticker', '', 'instagram_comment_1527447929485.jpg', 24, 43, '1527447929485');

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

CREATE TABLE `conversations` (
  `con_id` int(11) NOT NULL,
  `user_one` int(11) NOT NULL,
  `user_two` int(11) NOT NULL,
  `con_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`con_id`, `user_one`, `user_two`, `con_time`) VALUES
(24, 24, 7, '1518016982813'),
(25, 24, 27, '1518972996540'),
(29, 24, 28, '1523883827593'),
(36, 28, 11, '1525092718181'),
(39, 24, 18, '1525194237021');

-- --------------------------------------------------------

--
-- Table structure for table `favourites`
--

CREATE TABLE `favourites` (
  `fav_id` int(11) NOT NULL,
  `fav_by` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `fav_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `favourites`
--

INSERT INTO `favourites` (`fav_id`, `fav_by`, `user`, `fav_time`) VALUES
(1, 30, 24, '1518456837902'),
(2, 27, 18, '1523434966799'),
(3, 24, 14, '1524503038800'),
(4, 24, 17, '1524914211955');

-- --------------------------------------------------------

--
-- Table structure for table `follow_system`
--

CREATE TABLE `follow_system` (
  `follow_id` int(11) NOT NULL,
  `follow_by` int(11) NOT NULL,
  `follow_by_username` varchar(32) NOT NULL,
  `follow_to` int(11) NOT NULL,
  `follow_to_username` varchar(32) NOT NULL,
  `follow_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `follow_system`
--

INSERT INTO `follow_system` (`follow_id`, `follow_by`, `follow_by_username`, `follow_to`, `follow_to_username`, `follow_time`) VALUES
(116, 7, 'ghalib', 8, 'coldplay', '1515919705073'),
(118, 8, 'coldplay', 7, 'ghalib', '1515919766210'),
(183, 7, 'ghalib', 10, 'noddy', '1516633623334'),
(205, 29, 'steve_jobs', 24, 'takkar', '1518018551833'),
(211, 7, 'ghalib', 24, 'takkar', '1518973062269'),
(215, 30, 'doraemon', 24, 'takkar', '1520705816856'),
(228, 11, 'nobita', 18, 'ragnar', '1524499141695'),
(229, 11, 'nobita', 28, 'selena', '1524499144391'),
(230, 11, 'nobita', 10, 'noddy', '1524499148432'),
(231, 11, 'nobita', 8, 'coldplay', '1524499149841'),
(232, 11, 'nobita', 29, 'steve_jobs', '1524499155476'),
(234, 11, 'nobita', 19, 'jonsnow', '1524499189454'),
(235, 11, 'nobita', 12, 'pikachu', '1524499272440'),
(236, 11, 'nobita', 20, 'gian', '1524499274383'),
(237, 11, 'nobita', 13, 'iamsrk', '1524499275724'),
(238, 11, 'nobita', 15, 'suniyo', '1524499276894'),
(239, 11, 'nobita', 30, 'doraemon', '1524499278270'),
(243, 28, 'selena', 11, 'nobita', '1525007005368'),
(246, 24, 'takkar', 7, 'ghalib', '1526210411974'),
(248, 24, 'takkar', 29, 'steve_jobs', '1526210485352'),
(252, 24, 'takkar', 18, 'ragnar', '1526211950472'),
(255, 24, 'takkar', 19, 'jonsnow', '1526212081528'),
(258, 24, 'takkar', 8, 'coldplay', '1526212272503'),
(261, 24, 'takkar', 11, 'nobita', '1526212475856'),
(273, 27, 'taylor_swift', 24, 'takkar', '1526375090236'),
(275, 27, 'taylor_swift', 28, 'selena', '1526375875420'),
(277, 27, 'taylor_swift', 18, 'ragnar', '1526384344800'),
(278, 27, 'taylor_swift', 16, 'zayn', '1526384890053'),
(279, 27, 'taylor_swift', 10, 'noddy', '1526384912449'),
(289, 24, 'takkar', 10, 'noddy', '1526411089128'),
(301, 16, 'zayn', 24, 'takkar', '1526663420190'),
(302, 24, 'takkar', 16, 'zayn', '1528272513281'),
(303, 28, 'selena', 24, 'takkar', '1528534489463');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `group_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `bio` varchar(2000) NOT NULL,
  `admin` int(11) NOT NULL,
  `group_type` enum('public','private') NOT NULL DEFAULT 'public',
  `created` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`group_id`, `name`, `bio`, `admin`, `group_type`, `created`) VALUES
(11, 'a groupss', '#random group', 24, 'private', '1518016737587'),
(12, 'nmnmnmnm', '', 7, 'public', '1518973077594');

-- --------------------------------------------------------

--
-- Table structure for table `group_members`
--

CREATE TABLE `group_members` (
  `grp_member_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `member` int(11) NOT NULL,
  `added_by` int(11) NOT NULL,
  `joined_group` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `group_members`
--

INSERT INTO `group_members` (`grp_member_id`, `group_id`, `member`, `added_by`, `joined_group`) VALUES
(31, 11, 24, 24, '1518016737697'),
(34, 11, 18, 24, '1518016769907'),
(36, 12, 7, 7, '1518973077690'),
(38, 12, 8, 7, '1518973109895'),
(49, 12, 28, 28, '1520846126331'),
(57, 11, 28, 24, '1526212331140'),
(58, 11, 7, 24, '1526212334989');

-- --------------------------------------------------------

--
-- Table structure for table `hashtags`
--

CREATE TABLE `hashtags` (
  `hashtag_id` int(11) NOT NULL,
  `hashtag` varchar(1000) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `hashtag_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hashtags`
--

INSERT INTO `hashtags` (`hashtag_id`, `hashtag`, `post_id`, `user`, `hashtag_time`) VALUES
(13, '#nice', 69, 24, '1518854776646'),
(14, '#travel', 69, 24, '1518854776646'),
(16, '#travel', 71, 24, '1518857913750'),
(43, '#checkout', 88, 24, '1524677077506'),
(53, '#checkout', 89, 24, '1526670596558'),
(54, '#dd', 89, 24, '1526670596840'),
(55, '#fgf', 89, 24, '1526670597020');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `like_by` int(11) NOT NULL,
  `like_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`like_id`, `post_id`, `like_by`, `like_time`) VALUES
(31, 22, 12, '1516523221375'),
(33, 24, 13, '1516523819069'),
(34, 23, 11, '1516524845235'),
(35, 32, 10, '1516524986159'),
(36, 34, 16, '1516525136147'),
(37, 35, 17, '1516525294230'),
(38, 36, 18, '1516525560721'),
(39, 41, 20, '1516527811400'),
(42, 43, 18, '1516528068337'),
(57, 43, 23, '1518016342615'),
(58, 40, 24, '1518016509189'),
(59, 39, 24, '1518016512324'),
(63, 61, 27, '1518018364468'),
(64, 63, 30, '1518510087356'),
(65, 57, 24, '1518515315123'),
(67, 89, 28, '1524245733030'),
(69, 89, 18, '1525862381809'),
(71, 69, 24, '1526210612292'),
(75, 89, 24, '1526663921539');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `con_id` int(11) NOT NULL,
  `mssg_by` int(11) NOT NULL,
  `mssg_to` int(11) NOT NULL,
  `message` longtext COLLATE utf8mb4_bin NOT NULL,
  `type` enum('text','image','sticker') COLLATE utf8mb4_bin NOT NULL,
  `status` enum('read','unread') COLLATE utf8mb4_bin NOT NULL DEFAULT 'unread',
  `message_time` varchar(100) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`message_id`, `con_id`, `mssg_by`, `mssg_to`, `message`, `type`, `status`, `message_time`) VALUES
(77, 25, 24, 27, 'hello', 'text', 'read', '1518973001479'),
(78, 24, 7, 24, 'eo', 'text', 'read', '1518973051916'),
(79, 25, 24, 27, '@takkar', 'text', 'read', '1519028471421'),
(93, 29, 28, 24, 'instagram_message_1525091176544.jpg', 'sticker', 'read', '1525091176544'),
(94, 29, 24, 28, 'kjkjk', 'text', 'unread', '1525809227238'),
(95, 29, 24, 28, 'kjkjk', 'text', 'unread', '1525809483966'),
(96, 39, 24, 18, 'mnm', 'text', 'read', '1525809590186'),
(99, 29, 24, 28, 'instagram_message_1525809886884.jpg', 'sticker', 'unread', '1525809886884'),
(100, 29, 24, 28, 'mnmnmnm', 'text', 'unread', '1525858483641'),
(101, 39, 24, 18, 'kjkj', 'text', 'unread', '1526481006905'),
(102, 29, 24, 28, 'instagram_message_1528278864884.jpg', 'image', 'unread', '1528278864884');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notify_id` int(11) NOT NULL,
  `notify_by` int(11) NOT NULL,
  `notify_to` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `type` enum('follow','tag','like','share','shared_your_post','comment','favourites','recommend','add_grp_member','invite','change_admin','new_con','mention_post','mention_comment') NOT NULL,
  `user` int(11) NOT NULL,
  `notify_time` varchar(100) NOT NULL,
  `status` enum('read','unread') NOT NULL DEFAULT 'unread'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notify_id`, `notify_by`, `notify_to`, `post_id`, `group_id`, `type`, `user`, `notify_time`, `status`) VALUES
(286, 7, 10, 0, 0, 'follow', 0, '1516633623492', 'read'),
(343, 24, 19, 0, 0, 'follow', 0, '1518016486336', 'unread'),
(344, 24, 8, 0, 0, 'follow', 0, '1518016489912', 'unread'),
(345, 24, 19, 40, 0, 'like', 0, '1518016509257', 'unread'),
(346, 24, 19, 39, 0, 'like', 0, '1518016512530', 'unread'),
(353, 24, 8, 0, 11, 'add_grp_member', 0, '1518016765339', 'unread'),
(368, 24, 29, 0, 0, 'follow', 0, '1518342254957', 'unread'),
(382, 24, 7, 88, 0, 'mention_post', 0, '1518945386480', 'read'),
(392, 24, 7, 89, 0, 'share', 0, '1518972830237', 'read'),
(394, 24, 7, 88, 0, 'mention_comment', 0, '1518972932790', 'read'),
(400, 7, 8, 0, 12, 'add_grp_member', 0, '1518973109986', 'unread'),
(402, 24, 20, 0, 0, 'favourites', 0, '1520682122270', 'unread'),
(403, 24, 12, 0, 0, 'favourites', 0, '1520682142190', 'unread'),
(404, 24, 10, 0, 0, 'favourites', 0, '1520682146353', 'unread'),
(410, 30, 8, 0, 0, 'follow', 0, '1520705825470', 'unread'),
(412, 28, 10, 0, 0, 'follow', 0, '1520759245830', 'unread'),
(418, 24, 10, 0, 0, 'follow', 0, '1523373918324', 'unread'),
(429, 24, 28, 0, 0, 'new_con', 0, '1523477732516', 'read'),
(430, 24, 28, 0, 0, 'new_con', 0, '1523478354351', 'read'),
(431, 24, 28, 0, 0, 'new_con', 0, '1523480038393', 'read'),
(434, 24, 28, 61, 0, 'share', 0, '1524496868725', 'read'),
(436, 24, 28, 89, 0, 'share', 0, '1524496878537', 'read'),
(437, 24, 28, 88, 0, 'share', 0, '1524496883529', 'read'),
(439, 24, 28, 69, 0, 'share', 0, '1524496892542', 'read'),
(440, 24, 28, 43, 0, 'share', 0, '1524496908549', 'read'),
(443, 11, 28, 0, 0, 'follow', 0, '1524499144540', 'read'),
(444, 11, 10, 0, 0, 'follow', 0, '1524499148583', 'unread'),
(445, 11, 8, 0, 0, 'follow', 0, '1524499149973', 'unread'),
(446, 11, 29, 0, 0, 'follow', 0, '1524499155724', 'unread'),
(448, 11, 19, 0, 0, 'follow', 0, '1524499189604', 'unread'),
(449, 11, 12, 0, 0, 'follow', 0, '1524499272593', 'unread'),
(450, 11, 20, 0, 0, 'follow', 0, '1524499274479', 'unread'),
(451, 11, 13, 0, 0, 'follow', 0, '1524499275773', 'unread'),
(452, 11, 15, 0, 0, 'follow', 0, '1524499276963', 'unread'),
(453, 11, 30, 0, 0, 'follow', 0, '1524499278473', 'unread'),
(454, 24, 14, 0, 0, 'follow', 0, '1524502749953', 'unread'),
(455, 24, 14, 0, 0, 'favourites', 0, '1524503038903', 'unread'),
(456, 24, 29, 0, 0, 'new_con', 0, '1524504622584', 'unread'),
(497, 24, 12, 0, 0, 'follow', 0, '1524909984699', 'unread'),
(498, 24, 30, 0, 0, 'favourites', 0, '1524914191885', 'unread'),
(499, 24, 17, 0, 0, 'favourites', 0, '1524914212091', 'unread'),
(500, 24, 28, 0, 0, 'recommend', 20, '1524916352456', 'read'),
(501, 24, 10, 0, 0, 'recommend', 20, '1524916590677', 'unread'),
(502, 24, 28, 0, 11, 'invite', 0, '1525002881663', 'read'),
(503, 24, 28, 0, 0, 'recommend', 14, '1525003631635', 'read'),
(504, 24, 14, 0, 0, 'favourites', 0, '1525003730633', 'unread'),
(505, 28, 11, 0, 0, 'follow', 0, '1525006781296', 'unread'),
(506, 28, 11, 0, 0, 'follow', 0, '1525007005464', 'unread'),
(507, 28, 11, 0, 0, 'new_con', 0, '1525077963722', 'unread'),
(508, 28, 10, 0, 0, 'new_con', 0, '1525077978906', 'unread'),
(509, 28, 11, 0, 0, 'new_con', 0, '1525078033167', 'unread'),
(510, 28, 10, 0, 0, 'new_con', 0, '1525078047432', 'unread'),
(511, 28, 11, 0, 0, 'new_con', 0, '1525079204532', 'unread'),
(512, 28, 11, 0, 0, 'new_con', 0, '1525092718395', 'unread'),
(513, 24, 10, 0, 0, 'new_con', 0, '1525108766820', 'unread'),
(516, 24, 13, 0, 0, 'favourites', 0, '1525201599007', 'unread'),
(517, 24, 13, 0, 0, 'favourites', 0, '1525201635936', 'unread'),
(518, 24, 28, 0, 0, 'follow', 0, '1525274124046', 'read'),
(528, 24, 28, 0, 0, 'follow', 0, '1526210407245', 'read'),
(529, 24, 7, 0, 0, 'follow', 0, '1526210412148', 'unread'),
(530, 24, 29, 0, 0, 'follow', 0, '1526210416032', 'unread'),
(531, 24, 29, 0, 0, 'follow', 0, '1526210485494', 'unread'),
(532, 24, 28, 0, 0, 'follow', 0, '1526210510521', 'read'),
(533, 24, 18, 0, 0, 'follow', 0, '1526210869530', 'unread'),
(534, 24, 28, 0, 0, 'follow', 0, '1526211680381', 'read'),
(535, 24, 18, 0, 0, 'follow', 0, '1526211951179', 'unread'),
(536, 24, 28, 0, 0, 'follow', 0, '1526211958615', 'read'),
(537, 24, 15, 0, 0, 'follow', 0, '1526212078067', 'unread'),
(538, 24, 19, 0, 0, 'follow', 0, '1526212081924', 'unread'),
(540, 24, 11, 0, 0, 'follow', 0, '1526212268629', 'unread'),
(541, 24, 8, 0, 0, 'follow', 0, '1526212272635', 'unread'),
(542, 24, 13, 0, 0, 'follow', 0, '1526212282151', 'unread'),
(543, 24, 28, 0, 11, 'add_grp_member', 0, '1526212331248', 'read'),
(544, 24, 7, 0, 11, 'add_grp_member', 0, '1526212335123', 'unread'),
(545, 24, 14, 0, 0, 'follow', 0, '1526212349872', 'unread'),
(546, 24, 11, 0, 0, 'follow', 0, '1526212476055', 'unread'),
(547, 24, 10, 0, 0, 'follow', 0, '1526212485866', 'unread'),
(548, 24, 17, 0, 0, 'follow', 0, '1526212488118', 'unread'),
(549, 24, 16, 0, 0, 'follow', 0, '1526212489438', 'read'),
(550, 24, 12, 0, 0, 'follow', 0, '1526212619648', 'unread'),
(551, 24, 20, 0, 0, 'follow', 0, '1526212779672', 'unread'),
(552, 24, 20, 0, 0, 'follow', 0, '1526212889242', 'unread'),
(553, 24, 12, 0, 0, 'follow', 0, '1526212999593', 'unread'),
(554, 24, 10, 0, 0, 'new_con', 0, '1526235563358', 'unread'),
(555, 24, 16, 0, 0, 'follow', 0, '1526236905180', 'read'),
(567, 27, 28, 0, 0, 'follow', 0, '1526375870059', 'read'),
(568, 27, 28, 0, 0, 'follow', 0, '1526375875471', 'read'),
(569, 27, 18, 0, 0, 'follow', 0, '1526377413720', 'unread'),
(570, 27, 18, 0, 0, 'follow', 0, '1526384344929', 'unread'),
(571, 27, 16, 0, 0, 'follow', 0, '1526384890351', 'read'),
(572, 27, 10, 0, 0, 'follow', 0, '1526384912553', 'unread'),
(573, 24, 27, 0, 0, 'follow', 0, '1526406579336', 'unread'),
(574, 24, 27, 0, 0, 'follow', 0, '1526406708572', 'unread'),
(575, 24, 27, 0, 0, 'follow', 0, '1526406718860', 'unread'),
(576, 24, 27, 0, 0, 'follow', 0, '1526409349650', 'unread'),
(577, 24, 20, 0, 0, 'follow', 0, '1526409870998', 'unread'),
(578, 24, 17, 0, 0, 'follow', 0, '1526410525953', 'unread'),
(579, 24, 17, 0, 0, 'follow', 0, '1526410529295', 'unread'),
(580, 24, 13, 0, 0, 'follow', 0, '1526410971128', 'unread'),
(581, 24, 20, 0, 0, 'follow', 0, '1526411015595', 'unread'),
(582, 24, 10, 0, 0, 'follow', 0, '1526411089320', 'unread'),
(583, 24, 27, 0, 0, 'follow', 0, '1526411705500', 'unread'),
(584, 24, 28, 0, 0, 'follow', 0, '1526411720123', 'read'),
(585, 24, 27, 0, 0, 'follow', 0, '1526412929207', 'unread'),
(586, 24, 27, 0, 0, 'follow', 0, '1526413744730', 'unread'),
(587, 24, 13, 0, 0, 'follow', 0, '1526460822621', 'unread'),
(588, 24, 16, 0, 0, 'follow', 0, '1526460868489', 'read'),
(589, 24, 12, 0, 0, 'follow', 0, '1526460874775', 'unread'),
(590, 24, 27, 0, 0, 'follow', 0, '1526460940835', 'unread'),
(591, 24, 20, 0, 0, 'follow', 0, '1526460962757', 'unread'),
(592, 24, 17, 0, 0, 'follow', 0, '1526460976691', 'unread'),
(593, 24, 11, 0, 0, 'new_con', 0, '1526480355976', 'unread'),
(594, 24, 10, 0, 0, 'new_con', 0, '1526480886797', 'unread'),
(595, 24, 28, 0, 11, 'invite', 0, '1526490301695', 'read'),
(598, 24, 19, 0, 0, 'recommend', 13, '1526643564523', 'unread'),
(599, 24, 28, 89, 0, 'share', 0, '1526647033125', 'read'),
(600, 24, 10, 89, 0, 'share', 0, '1526660088955', 'unread'),
(620, 24, 28, 89, 0, 'share', 0, '1526745600076', 'read'),
(621, 24, 10, 89, 0, 'share', 0, '1526745635731', 'unread'),
(622, 24, 11, 89, 0, 'share', 0, '1526745636769', 'unread'),
(625, 24, 18, 43, 0, 'comment', 0, '1527447892770', 'unread'),
(626, 24, 18, 43, 0, 'comment', 0, '1527447929709', 'unread'),
(627, 7, 28, 0, 12, 'change_admin', 0, '1527942637960', 'read'),
(628, 28, 7, 0, 12, 'change_admin', 0, '1527942673969', 'unread'),
(629, 24, 16, 0, 0, 'follow', 0, '1528272513475', 'unread'),
(630, 24, 10, 0, 0, 'new_con', 0, '1528274472284', 'unread'),
(632, 28, 24, 0, 0, 'follow', 0, '1528534489731', 'read');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `description` mediumtext COLLATE utf8mb4_bin NOT NULL,
  `imgSrc` mediumtext COLLATE utf8mb4_bin NOT NULL,
  `filter` varchar(100) COLLATE utf8mb4_bin NOT NULL DEFAULT 'normal',
  `location` mediumtext COLLATE utf8mb4_bin NOT NULL,
  `type` enum('user','group') COLLATE utf8mb4_bin NOT NULL DEFAULT 'user',
  `group_id` int(11) NOT NULL,
  `post_time` varchar(100) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `user`, `description`, `imgSrc`, `filter`, `location`, `type`, `group_id`, `post_time`) VALUES
(22, 12, '', 'instagram_1516522776339.jpg', 'filter-normal', 'A-301, 90 Feet Road, Dharavi, Mumbai, Maharashtra 400017, India', 'user', 0, '1516522776339'),
(23, 11, '', 'instagram_1516523468369.jpg', 'filter-normal', '', 'user', 0, '1516523468369'),
(24, 13, '@ghalib #travel', 'instagram_1516523813005.jpg', 'filter-normal', '', 'user', 0, '1516523813006'),
(25, 14, '', 'instagram_1516524010087.jpg', 'filter-normal', '', 'user', 0, '1516524010087'),
(26, 14, '', 'instagram_1516524031664.jpg', 'filter-normal', '', 'user', 0, '1516524031664'),
(27, 14, '', 'instagram_1516524056911.jpg', 'filter-normal', '', 'user', 0, '1516524056911'),
(28, 14, '', 'instagram_1516524098767.jpg', 'filter-normal', '', 'user', 0, '1516524098767'),
(29, 14, '', 'instagram_1516524133694.jpg', 'filter-normal', '', 'user', 0, '1516524133694'),
(30, 14, '', 'instagram_1516524190576.jpg', 'filter-normal', '', 'user', 0, '1516524190576'),
(31, 15, '', 'instagram_1516524753923.jpg', 'filter-normal', '', 'user', 0, '1516524753923'),
(32, 10, '', 'instagram_1516524981153.jpg', 'filter-normal', '', 'user', 0, '1516524981153'),
(33, 10, '', 'instagram_1516525040077.jpg', 'filter-normal', '', 'user', 0, '1516525040077'),
(34, 16, '', 'instagram_1516525129889.jpg', 'filter-normal', '', 'user', 0, '1516525129889'),
(35, 17, '', 'instagram_1516525289046.jpg', 'filter-normal', '', 'user', 0, '1516525289046'),
(36, 18, '', 'instagram_1516525555814.jpg', 'filter-normal', '', 'user', 0, '1516525555814'),
(37, 18, '', 'instagram_1516525648412.jpg', 'filter-normal', '', 'user', 0, '1516525648412'),
(38, 18, '', 'instagram_1516525703299.jpg', 'filter-normal', '', 'user', 0, '1516525703299'),
(39, 19, '', 'instagram_1516527391527.jpg', 'filter-normal', '', 'user', 0, '1516527391527'),
(40, 19, '', 'instagram_1516527403042.jpg', 'filter-normal', '', 'user', 0, '1516527403042'),
(41, 20, '', 'instagram_1516527804372.jpg', 'filter-normal', '', 'user', 0, '1516527804372'),
(43, 18, '', 'instagram_1516528062094.jpg', 'filter-normal', '', 'user', 0, '1516528062094'),
(57, 24, 'm', 'instagram_1518016704834.jpg', 'filter-normal', '', 'user', 0, '1518016704834'),
(61, 27, '', 'instagram_1518018358758.jpg', 'filter-normal', 'Progresive Building, 90 Feet Road, Dharavi, Mumbai, Maharashtra 400017, India', 'user', 0, '1518018358758'),
(63, 30, 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', 'instagram_1518510077635.jpg', 'filter-normal', '', 'user', 0, '1518510077635'),
(69, 24, 'That''s a #nice place to #travel', 'instagram_1518854775824.jpg', 'filter-normal', '', 'user', 0, '1518854775824'),
(71, 24, '#travel', 'instagram_1518857912246.jpg', 'filter-normal', '', 'group', 11, '1518857912246'),
(88, 24, 'Hello @ghalib @takkar #checkout', 'instagram_1518945386167.jpg', 'filter-normal', '', 'user', 0, '1518945386167'),
(89, 24, 'he @nobita, @doraemon #checkout, #dd #fgf', 'instagram_1518972814710.jpg', 'filter-ashby', 'A-301, 90 Feet Road, Dharavi, Mumbai, Maharashtra 400017, India', 'user', 0, '1518972814710');

-- --------------------------------------------------------

--
-- Table structure for table `post_tags`
--

CREATE TABLE `post_tags` (
  `post_tag_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `profile_views`
--

CREATE TABLE `profile_views` (
  `view_id` int(11) NOT NULL,
  `view_by` int(11) NOT NULL,
  `view_to` int(11) NOT NULL,
  `view_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profile_views`
--

INSERT INTO `profile_views` (`view_id`, `view_by`, `view_to`, `view_time`) VALUES
(64, 7, 8, '1515919685209'),
(129, 8, 7, '1516289109364'),
(134, 11, 12, '1516524331307'),
(214, 17, 12, '1517245217599'),
(215, 30, 24, '1518454700846'),
(216, 30, 24, '1518455184176'),
(217, 30, 24, '1518455376510'),
(218, 30, 24, '1518455682363'),
(219, 30, 24, '1518455906011'),
(220, 30, 24, '1518456281600'),
(221, 30, 24, '1518456458857'),
(222, 30, 24, '1518456667371'),
(223, 30, 24, '1518456821996'),
(224, 30, 24, '1518509763525'),
(225, 30, 24, '1518512974289'),
(226, 24, 30, '1518513031554'),
(227, 24, 30, '1518513512507'),
(228, 24, 30, '1518513877073'),
(229, 24, 27, '1518513894932'),
(230, 24, 30, '1518514177877'),
(231, 24, 27, '1518514384042'),
(232, 24, 27, '1518514537230'),
(233, 24, 28, '1518514630544'),
(234, 24, 30, '1518514644447'),
(236, 24, 13, '1518708220016'),
(237, 24, 7, '1518941917187'),
(238, 7, 24, '1518973058828'),
(239, 7, 11, '1518973144401'),
(240, 11, 7, '1518973172978'),
(241, 30, 24, '1519060720216'),
(242, 30, 24, '1519061010274'),
(243, 24, 10, '1519982984548'),
(244, 24, 28, '1520109154617'),
(245, 24, 28, '1520263507826'),
(246, 24, 20, '1520682114789'),
(247, 24, 12, '1520682139254'),
(248, 24, 10, '1520682143580'),
(249, 24, 10, '1520682331646'),
(250, 24, 15, '1520682346748'),
(251, 24, 10, '1520682930864'),
(252, 24, 10, '1520683103210'),
(253, 24, 10, '1520683553605'),
(254, 24, 10, '1520683705677'),
(255, 24, 10, '1520683984036'),
(256, 28, 24, '1520684165242'),
(257, 28, 24, '1520684344535'),
(258, 24, 13, '1520700614119'),
(259, 30, 24, '1520704934832'),
(260, 30, 24, '1520705422202'),
(261, 30, 24, '1520705806963'),
(262, 30, 8, '1520705823148'),
(263, 24, 30, '1520705896659'),
(264, 24, 30, '1520706072262'),
(265, 24, 15, '1520706091479'),
(266, 24, 15, '1520707371087'),
(268, 24, 27, '1520757269439'),
(269, 28, 24, '1520757395377'),
(270, 28, 24, '1520758042798'),
(271, 28, 24, '1520758521053'),
(272, 28, 7, '1520759045954'),
(273, 28, 24, '1520759061987'),
(274, 28, 24, '1520759240672'),
(275, 28, 24, '1520759394313'),
(276, 28, 11, '1520760182860'),
(277, 28, 24, '1520760231609'),
(278, 28, 24, '1520760413780'),
(279, 28, 24, '1520760649662'),
(280, 28, 24, '1520763416452'),
(281, 28, 24, '1520763580899'),
(282, 24, 28, '1520763632558'),
(283, 24, 10, '1520763822416'),
(284, 24, 7, '1520763829919'),
(285, 24, 7, '1520764803286'),
(286, 24, 27, '1520768683384'),
(287, 24, 30, '1520768744688'),
(288, 28, 24, '1520768767061'),
(289, 28, 24, '1520846088071'),
(290, 24, 27, '1521657597271'),
(291, 24, 10, '1523203299143'),
(292, 24, 27, '1523203694321'),
(293, 24, 7, '1523285826149'),
(294, 7, 24, '1523285900611'),
(295, 7, 24, '1523286823165'),
(296, 7, 19, '1523286832523'),
(297, 7, 24, '1523287444850'),
(298, 7, 24, '1523287634357'),
(299, 24, 27, '1523363013276'),
(300, 28, 18, '1523433079935'),
(301, 28, 7, '1523433092131'),
(302, 24, 27, '1523433939315'),
(303, 27, 18, '1523434955932'),
(304, 27, 19, '1523435526472'),
(305, 27, 19, '1523435900715'),
(306, 27, 19, '1523436068720'),
(307, 27, 19, '1523436353096'),
(308, 27, 19, '1523436583990'),
(309, 27, 24, '1523470227327'),
(310, 28, 24, '1523478229597'),
(311, 24, 28, '1523478260076'),
(312, 24, 28, '1523480335616'),
(313, 24, 28, '1523480518791'),
(314, 24, 28, '1523480673399'),
(315, 24, 17, '1523480743091'),
(316, 24, 28, '1523480840164'),
(317, 24, 27, '1523481052883'),
(318, 24, 28, '1523481061016'),
(319, 24, 28, '1523520163346'),
(320, 24, 11, '1523520195794'),
(321, 24, 11, '1523522058173'),
(322, 24, 11, '1523522377373'),
(323, 24, 13, '1523523906067'),
(324, 24, 7, '1523523919090'),
(325, 24, 28, '1523809217007'),
(326, 24, 28, '1523809425412'),
(327, 24, 28, '1523809839903'),
(328, 24, 28, '1523883824181'),
(329, 24, 28, '1523883997997'),
(330, 24, 28, '1523884149792'),
(331, 24, 28, '1524303854984'),
(332, 24, 28, '1524304969884'),
(333, 24, 14, '1524491643913'),
(335, 24, 27, '1524496338680'),
(336, 24, 27, '1524496546326'),
(337, 24, 27, '1524496712202'),
(338, 28, 24, '1524497266922'),
(339, 28, 24, '1524497892732'),
(340, 11, 24, '1524499558576'),
(341, 24, 7, '1524500388417'),
(342, 24, 15, '1524502315748'),
(343, 24, 30, '1524502372291'),
(344, 24, 14, '1524502506939'),
(345, 24, 14, '1524502705551'),
(346, 24, 14, '1524502927995'),
(347, 7, 24, '1524568244340'),
(348, 24, 11, '1524899921633'),
(349, 24, 11, '1524900489517'),
(350, 24, 11, '1524901137499'),
(351, 24, 12, '1524909976673'),
(352, 24, 12, '1524910128420'),
(353, 24, 17, '1524913915710'),
(354, 24, 12, '1524914061858'),
(355, 24, 30, '1524914094586'),
(356, 24, 17, '1524914208025'),
(357, 24, 27, '1524914399568'),
(358, 24, 27, '1524914564964'),
(359, 24, 20, '1524914623480'),
(360, 24, 20, '1524914842473'),
(361, 24, 20, '1524915176492'),
(362, 24, 20, '1524915390599'),
(363, 24, 20, '1524915786612'),
(364, 24, 20, '1524916288722'),
(365, 24, 20, '1524916585292'),
(366, 24, 20, '1524916781821'),
(367, 24, 27, '1524989780774'),
(368, 24, 27, '1524990128560'),
(369, 24, 27, '1524990309705'),
(370, 24, 27, '1524990991554'),
(371, 24, 27, '1524991143125'),
(372, 24, 15, '1524991388179'),
(373, 24, 14, '1525003436336'),
(374, 24, 14, '1525003619784'),
(375, 28, 14, '1525006958059'),
(376, 24, 11, '1525098424953'),
(377, 24, 20, '1525198394818'),
(378, 24, 20, '1525198667641'),
(379, 24, 20, '1525199870782'),
(380, 24, 20, '1525200459538'),
(381, 24, 20, '1525200651248'),
(382, 24, 20, '1525200913564'),
(383, 24, 13, '1525201560603'),
(384, 24, 13, '1525202237368'),
(385, 24, 13, '1525202781901'),
(386, 24, 18, '1525274105388'),
(387, 24, 28, '1525274116884'),
(388, 24, 11, '1525279447778'),
(389, 24, 12, '1525283796077'),
(390, 24, 11, '1525283813290'),
(391, 24, 30, '1525283953105'),
(392, 24, 11, '1525284047942'),
(393, 24, 11, '1525336894682'),
(394, 24, 11, '1525337151771'),
(395, 24, 28, '1525860845202'),
(396, 18, 11, '1525860933493'),
(397, 18, 24, '1525860950434'),
(398, 18, 24, '1525861180691'),
(399, 18, 24, '1525862373277'),
(400, 18, 24, '1525862831385'),
(401, 18, 28, '1525863010973'),
(402, 18, 28, '1525863899563'),
(403, 18, 24, '1525864471645'),
(404, 18, 24, '1525866450462'),
(405, 28, 24, '1525949970805'),
(406, 24, 12, '1526114828063'),
(407, 24, 12, '1526114993065'),
(408, 24, 12, '1526115186443'),
(409, 24, 30, '1526210857205'),
(410, 24, 18, '1526210865704'),
(411, 24, 20, '1526222263078'),
(412, 24, 30, '1526223867777'),
(413, 24, 7, '1526223974494'),
(414, 24, 28, '1526223981432'),
(415, 24, 20, '1526231720648'),
(416, 24, 13, '1526232072287'),
(417, 24, 27, '1526235235069'),
(418, 24, 27, '1526235544756'),
(419, 24, 20, '1526235680659'),
(420, 24, 20, '1526236024136'),
(421, 24, 16, '1526236902708'),
(422, 28, 24, '1526286781681'),
(423, 28, 24, '1526286937276'),
(424, 24, 30, '1526303814130'),
(425, 24, 11, '1526304284597'),
(426, 24, 11, '1526304912977'),
(427, 24, 11, '1526305231105'),
(428, 27, 24, '1526375087267'),
(429, 27, 24, '1526375863409'),
(430, 27, 24, '1526377290451'),
(431, 27, 30, '1526384883219'),
(432, 27, 16, '1526384887256'),
(433, 27, 24, '1526384908369'),
(434, 27, 11, '1526384930921'),
(435, 27, 24, '1526385357731'),
(436, 24, 10, '1526411092405'),
(437, 24, 13, '1526460860034'),
(438, 24, 27, '1526460885177'),
(439, 24, 20, '1526460964700'),
(440, 24, 17, '1526460972573'),
(441, 24, 15, '1526461471871'),
(442, 24, 15, '1526461720126'),
(443, 24, 15, '1526461920815'),
(444, 24, 15, '1526462073482'),
(445, 24, 12, '1526495883875'),
(446, 24, 12, '1526497596082'),
(447, 24, 18, '1526576921892'),
(448, 24, 18, '1526577081822'),
(449, 24, 13, '1526643511822'),
(450, 24, 20, '1526643577607'),
(451, 24, 18, '1526646232568'),
(453, 16, 24, '1526663423808'),
(454, 24, 24, '1526983253270'),
(455, 24, 24, '1526983452233'),
(456, 24, 14, '1527157380114'),
(457, 24, 28, '1527194650295'),
(458, 24, 7, '1527239739482'),
(459, 24, 7, '1527339792721'),
(460, 24, 7, '1527349518644'),
(461, 24, 18, '1527621458025'),
(462, 24, 18, '1527680012932'),
(463, 24, 18, '1527682269056'),
(464, 28, 24, '1528222627685'),
(465, 28, 10, '1528222708564'),
(466, 24, 16, '1528272511064'),
(467, 28, 11, '1528534481649'),
(468, 28, 24, '1528534487195'),
(469, 24, 18, '1528534513630');

-- --------------------------------------------------------

--
-- Table structure for table `recommendations`
--

CREATE TABLE `recommendations` (
  `recommend_id` int(11) NOT NULL,
  `recommend_by` int(11) NOT NULL,
  `recommend_to` int(11) NOT NULL,
  `recommend_of` int(11) NOT NULL,
  `recommend_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `recommendations`
--

INSERT INTO `recommendations` (`recommend_id`, `recommend_by`, `recommend_to`, `recommend_of`, `recommend_time`) VALUES
(1, 24, 18, 30, '1518513518719'),
(2, 24, 27, 30, '1518513536449'),
(3, 24, 28, 20, '1524916352254'),
(4, 24, 10, 20, '1524916590540'),
(5, 24, 28, 14, '1525003631546'),
(6, 24, 18, 28, '1525860865598'),
(7, 24, 19, 13, '1526643564409');

-- --------------------------------------------------------

--
-- Table structure for table `shares`
--

CREATE TABLE `shares` (
  `share_id` int(11) NOT NULL,
  `share_by` int(11) NOT NULL,
  `share_to` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `share_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shares`
--

INSERT INTO `shares` (`share_id`, `share_by`, `share_to`, `post_id`, `share_time`) VALUES
(94, 27, 24, 61, '1518018368656'),
(98, 24, 28, 61, '1524496868576'),
(100, 24, 28, 88, '1524496883422'),
(103, 24, 28, 43, '1524496908401'),
(105, 24, 27, 61, '1524739767695'),
(112, 24, 28, 89, '1526745599923'),
(113, 24, 10, 89, '1526745635584'),
(114, 24, 11, 89, '1526745636581');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `tag_id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `tag` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`tag_id`, `user`, `tag`) VALUES
(1, 29, 'apple'),
(33, 24, 'bb');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(32) COLLATE utf8mb4_bin NOT NULL,
  `firstname` varchar(32) COLLATE utf8mb4_bin NOT NULL,
  `surname` varchar(32) COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `bio` varchar(1000) COLLATE utf8mb4_bin NOT NULL,
  `joined` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `email_verified` enum('yes','no') COLLATE utf8mb4_bin NOT NULL DEFAULT 'no',
  `account_type` enum('public','private') COLLATE utf8mb4_bin NOT NULL DEFAULT 'public',
  `instagram` varchar(500) COLLATE utf8mb4_bin NOT NULL,
  `twitter` varchar(500) COLLATE utf8mb4_bin NOT NULL,
  `facebook` varchar(500) COLLATE utf8mb4_bin NOT NULL,
  `github` varchar(500) COLLATE utf8mb4_bin NOT NULL,
  `website` varchar(500) COLLATE utf8mb4_bin NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `isOnline` enum('yes','no') COLLATE utf8mb4_bin NOT NULL DEFAULT 'no',
  `lastOnline` varchar(100) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `firstname`, `surname`, `email`, `password`, `bio`, `joined`, `email_verified`, `account_type`, `instagram`, `twitter`, `facebook`, `github`, `website`, `phone`, `isOnline`, `lastOnline`) VALUES
(7, 'ghalib', 'Mirza', 'Ghalib', 'ghalib@gmail.com', '$2a$10$E3ZgkSwaa6rUopG1CBUm8OoCMKVqzSwv79bfuUrICV0eLOqTlqR/m', '', '1514718748562', 'yes', 'private', '', '', '', '', '', '', 'no', '1527942645296'),
(8, 'coldplay', 'cold', 'play', 'coldplay@gmail.com', '$2a$10$zVPMDJKlOY00UnSlrLEUfuaeTwXkZ.VD4ixp.q1x2RjX/LbezoqPO', '', '1515918435853', 'no', 'public', '', '', '', '', '', '', 'no', ''),
(10, 'noddy', 'your', 'noddy', 'noddy@gmail.com', '$2a$10$/FlxKj904j7TnMo.9gJJTe5cwFakoJc4/w9kba3LeAdP0hTWGCzCG', '', '1516454412744', 'no', 'public', '', '', '', '', '', '', 'no', ''),
(11, 'nobita', 'nobita', 'nobi', 'nobita@gmail.com', '$2a$10$nzMI2G054StCufuo4fzkEOWhpwUWKqZwV67jbPqaqqSNDNnF5led2', '', '1516522466189', 'no', 'public', '', '', '', '', '', '', 'no', '1524499561897'),
(12, 'pikachu', 'your', 'pikachu', 'pikachu@gmail.com', '$2a$10$j/buNE/iwJquKzzyBsOhLe4dEVVXKs56KTet8E4arAjcjsQ87BZt2', '', '1516522598741', 'no', 'public', '', '', '', '', '', '', 'no', ''),
(13, 'iamsrk', 'Shahrukh', 'Khan', 'iamsrk@gmail.com', '$2a$10$Xn99377.3Ns8.QoneTP4qeMuERyvNR2Ki86eRjpmHCsj01xvFoFIq', '', '1516523593107', 'no', 'public', '', '', '', '', '', '', 'no', ''),
(14, 'kinkade', 'Thomas', 'Kinkade', 'kinkade@gmail.com', '$2a$10$IvK3CBxFh/dnkWZtRMh9k.S2/WIdQbd6adF78Bb16.G.62nrSUgcG', '', '1516523852488', 'no', 'public', '', '', '', '', '', '', 'no', ''),
(15, 'suniyo', 'suniyo', 'honekawa', 'suniyo@gmail.com', '$2a$10$60TUnK2JiH8RoloKA/IdB.ZG07o.bc8FpHqu9Euc2kEXc28PslceS', '', '1516524667640', 'no', 'public', '', '', '', '', '', '', 'no', ''),
(16, 'zayn', 'Zayn', 'Malik', 'zayn@gmail.com', '$2a$10$ktjq/vo/8nBxlOnixyTpQuN6gyXc5vN4.rslSVRt4eM6vhq7ftaxS', '', '1516525072573', 'no', 'private', '', '', '', '', '', '', 'yes', '1526663478084'),
(17, 'nfak', 'Nusratfateh', 'Alikhan', 'nfak@gmail.com', '$2a$10$TAzl3pUYIs/HRb8LPhvZdOclk/TSfnmicUVgHEGyUwnUxm7j7Z.Ie', '', '1516525201164', 'no', 'public', '', '', '', '', '', '', 'no', ''),
(18, 'ragnar', 'Ragnar', 'Lothbrok', 'ragnar@gmail.com', '$2a$10$M7lx4wF.PUhAjSJVxb7bW.nk2G6zxeCjhXBnKTyFz3JNq8NQbQQ8m', '', '1516525343645', 'no', 'public', '', '', '', '', '', '', 'no', '1525866681046'),
(19, 'jonsnow', 'jon_', 'snow', 'jonsnow@gmail.com', '$2a$10$9Nb4hFjgg.MKKLLTeXMuWehralT21UCoeWsPq3./VWMkUnu19JpzS', '', '1516527326858', 'no', 'public', '', '', '', '', '', '', 'no', ''),
(20, 'gian', 'Takeshi', 'Gauda', 'gian@gmail.com', '$2a$10$K3ijpio/4HIOKJhQ5yq3DOQ4IW5Oee4O5hwogEQtB/FBuNJRvd9T2', '', '1516527534985', 'no', 'public', '', '', '', '', '', '', 'no', ''),
(24, 'takkar', 'iam_', 'takkar', 'takkar@gmail.com', '$2a$10$R/iWFCwEDgmOvg7mCB3wreerTC0hRuYyZflDN2Gyr3YV/ppMMNgJu', 'Hello #world', '1518016437193', 'no', 'private', '', '', 'm', '', '', 'gg', 'yes', '1528490530271'),
(27, 'taylor_swift', 'taylor', 'swift', 'taylor_swift@gmail.com', '$2a$10$rnQRsp0iWCdV8b6AD24mJ.7rL5XQ31ejULlOQMVkBpjxD7RlRxqKK', '', '1518018283428', 'no', 'public', '', '', '', '', '', '', 'no', '1526387270500'),
(28, 'selena', 'selena', 'gomez', 'selenagomez@gmail.com', '$2a$10$.ifdYlKQdt/acrXtn09NLuENJylSfZIJq2U4tqzZNqeRWaUG0nnQq', '', '1518018409165', 'no', 'public', 'mmmm', '', '', '', '', '', 'no', '1528534503389'),
(29, 'steve_jobs', 'steve', 'jobs', 'steve_jobs@gmail.com', '$2a$10$B05HNF3/pnK.8fU7kCJHpuaU5LpVxwao9Wmkn3Md2sAPc5GINiU6O', '', '1518018498672', 'no', 'public', '', '', '', '', '', '', 'no', ''),
(30, 'doraemon', 'iam_', 'doraemon', 'doraemon@gmail.com', '$2a$10$OjZg/mosNPOT297skkotUetzYL7mIEFDVxVPP2lsBAv4F0LSyK18m', '', '1518454660501', 'no', 'public', '', '', '', '', '', '', 'no', '1525801713580');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blocks`
--
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`block_id`);

--
-- Indexes for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`bkmrk_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`con_id`);

--
-- Indexes for table `favourites`
--
ALTER TABLE `favourites`
  ADD PRIMARY KEY (`fav_id`);

--
-- Indexes for table `follow_system`
--
ALTER TABLE `follow_system`
  ADD PRIMARY KEY (`follow_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`);

--
-- Indexes for table `group_members`
--
ALTER TABLE `group_members`
  ADD PRIMARY KEY (`grp_member_id`);

--
-- Indexes for table `hashtags`
--
ALTER TABLE `hashtags`
  ADD PRIMARY KEY (`hashtag_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notify_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `post_tags`
--
ALTER TABLE `post_tags`
  ADD PRIMARY KEY (`post_tag_id`);

--
-- Indexes for table `profile_views`
--
ALTER TABLE `profile_views`
  ADD PRIMARY KEY (`view_id`);

--
-- Indexes for table `recommendations`
--
ALTER TABLE `recommendations`
  ADD PRIMARY KEY (`recommend_id`);

--
-- Indexes for table `shares`
--
ALTER TABLE `shares`
  ADD PRIMARY KEY (`share_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tag_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blocks`
--
ALTER TABLE `blocks`
  MODIFY `block_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `bookmarks`
--
ALTER TABLE `bookmarks`
  MODIFY `bkmrk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;
--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `con_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT for table `favourites`
--
ALTER TABLE `favourites`
  MODIFY `fav_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `follow_system`
--
ALTER TABLE `follow_system`
  MODIFY `follow_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=304;
--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `group_members`
--
ALTER TABLE `group_members`
  MODIFY `grp_member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
--
-- AUTO_INCREMENT for table `hashtags`
--
ALTER TABLE `hashtags`
  MODIFY `hashtag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;
--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;
--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notify_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=633;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;
--
-- AUTO_INCREMENT for table `post_tags`
--
ALTER TABLE `post_tags`
  MODIFY `post_tag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `profile_views`
--
ALTER TABLE `profile_views`
  MODIFY `view_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=470;
--
-- AUTO_INCREMENT for table `recommendations`
--
ALTER TABLE `recommendations`
  MODIFY `recommend_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `shares`
--
ALTER TABLE `shares`
  MODIFY `share_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;
--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `tag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

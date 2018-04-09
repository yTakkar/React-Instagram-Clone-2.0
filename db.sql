-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2018 at 05:35 PM
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
(11, 7, 11, '1518973149200');

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
(60, 'sticker', '', 'instagram_comment_1518016608385.jpg', 24, 56, '1518016608385'),
(61, 'sticker', '', 'instagram_comment_1518016691913.jpg', 24, 56, '1518016691913'),
(62, 'text', 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', '', 30, 57, '1518509780928'),
(63, 'text', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '', 30, 57, '1518509825922'),
(64, 'text', '#Hello', '', 24, 57, '1518710983444'),
(66, 'text', 'wooo @takkar', '', 7, 88, '1518945524771'),
(69, 'image', '', 'instagram_comment_1518972851259.jpg', 24, 89, '1518972851259'),
(70, 'text', 'thnx @ghalib', '', 24, 88, '1518972932739'),
(71, 'text', 'hmmm', '', 7, 88, '1518973041037'),
(73, 'text', 'https://regexr.com/?37i6s fffffff', '', 24, 89, '1519113671582');

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
(25, 24, 27, '1518972996540');

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
(1, 30, 24, '1518456837902');

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
(196, 24, 'takkar', 7, 'ghalib', '1518016473906'),
(197, 24, 'takkar', 19, 'jonsnow', '1518016486219'),
(198, 24, 'takkar', 8, 'coldplay', '1518016489846'),
(199, 24, 'takkar', 18, 'ragnar', '1518016714400'),
(205, 29, 'steve_jobs', 24, 'takkar', '1518018551833'),
(206, 24, 'takkar', 29, 'steve_jobs', '1518342254836'),
(211, 7, 'ghalib', 24, 'takkar', '1518973062269'),
(212, 24, 'takkar', 28, 'selena', '1520263510726'),
(215, 30, 'doraemon', 24, 'takkar', '1520705816856'),
(218, 28, 'selena', 10, 'noddy', '1520759245687'),
(219, 28, 'selena', 24, 'takkar', '1520846090627'),
(220, 24, 'takkar', 27, 'taylor_swift', '1521657605442'),
(221, 27, 'taylor_swift', 24, 'takkar', '1523203587834');

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
(35, 11, 7, 7, '1518973068231'),
(36, 12, 7, 7, '1518973077690'),
(37, 12, 24, 7, '1518973105166'),
(38, 12, 8, 7, '1518973109895'),
(48, 11, 28, 28, '1520758383955'),
(49, 12, 28, 28, '1520846126331');

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
(13, 'nice', 69, 24, '1518854776646'),
(14, 'travel', 69, 24, '1518854776646'),
(15, 'travel', 70, 24, '1518854819017'),
(16, 'travel', 71, 24, '1518857913750'),
(18, 'checkout', 88, 24, '1518946312842'),
(31, 'checkout', 89, 24, '1520700867954'),
(32, 'dd', 89, 24, '1520700867954'),
(33, 'fgfg', 89, 24, '1520700867954');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `like_by` varchar(32) NOT NULL,
  `like_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`like_id`, `post_id`, `like_by`, `like_time`) VALUES
(31, 22, '12', '1516523221375'),
(33, 24, '13', '1516523819069'),
(34, 23, '11', '1516524845235'),
(35, 32, '10', '1516524986159'),
(36, 34, '16', '1516525136147'),
(37, 35, '17', '1516525294230'),
(38, 36, '18', '1516525560721'),
(39, 41, '20', '1516527811400'),
(42, 43, '18', '1516528068337'),
(57, 43, '23', '1518016342615'),
(58, 40, '24', '1518016509189'),
(59, 39, '24', '1518016512324'),
(61, 56, '24', '1518016672505'),
(63, 61, '27', '1518018364468'),
(64, 63, '30', '1518510087356'),
(65, 57, '24', '1518515315123');

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
(70, 24, 24, 7, 'hello', 'text', 'read', '1518016987604'),
(72, 24, 24, 7, 'vvvv', 'text', 'read', '1518972940553'),
(73, 24, 24, 7, '😚😚😚😚', 'text', 'read', '1518972946654'),
(74, 24, 24, 7, 'instagram_message_1518972953049.jpg', 'image', 'read', '1518972953049'),
(75, 24, 24, 7, 'instagram_message_1518972961638.jpg', 'sticker', 'read', '1518972961638'),
(76, 24, 24, 7, 'instagram_message_1518972971352.jpg', 'sticker', 'read', '1518972971352'),
(77, 25, 24, 27, 'hello', 'text', 'read', '1518973001479'),
(78, 24, 7, 24, 'eo', 'text', 'read', '1518973051916'),
(79, 25, 24, 27, '@takkar', 'text', 'read', '1519028471421');

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
(348, 24, 8, 56, 0, 'tag', 0, '1518016562831', 'unread'),
(350, 24, 19, 56, 0, 'share', 0, '1518016682391', 'unread'),
(351, 24, 18, 0, 0, 'follow', 0, '1518016714529', 'unread'),
(353, 24, 8, 0, 11, 'add_grp_member', 0, '1518016765339', 'unread'),
(354, 24, 18, 0, 11, 'add_grp_member', 0, '1518016769963', 'unread'),
(368, 24, 29, 0, 0, 'follow', 0, '1518342254957', 'unread'),
(375, 24, 18, 0, 0, 'recommend', 30, '1518513518878', 'unread'),
(382, 24, 7, 88, 0, 'mention_post', 0, '1518945386480', 'read'),
(388, 24, 18, 89, 0, 'tag', 0, '1518972815728', 'unread'),
(389, 24, 28, 89, 0, 'tag', 0, '1518972815732', 'read'),
(392, 24, 7, 89, 0, 'share', 0, '1518972830237', 'read'),
(394, 24, 7, 88, 0, 'mention_comment', 0, '1518972932790', 'read'),
(400, 7, 8, 0, 12, 'add_grp_member', 0, '1518973109986', 'unread'),
(401, 24, 28, 0, 0, 'follow', 0, '1520263510890', 'read'),
(402, 24, 20, 0, 0, 'favourites', 0, '1520682122270', 'unread'),
(403, 24, 12, 0, 0, 'favourites', 0, '1520682142190', 'unread'),
(404, 24, 10, 0, 0, 'favourites', 0, '1520682146353', 'unread'),
(405, 24, 28, 0, 0, 'recommend', 10, '1520682338643', 'read'),
(406, 24, 28, 0, 0, 'recommend', 15, '1520682354281', 'read'),
(410, 30, 8, 0, 0, 'follow', 0, '1520705825470', 'unread'),
(412, 28, 10, 0, 0, 'follow', 0, '1520759245830', 'unread'),
(413, 28, 24, 0, 0, 'follow', 0, '1520846090935', 'read'),
(417, 27, 24, 0, 0, 'follow', 0, '1523203587956', 'read');

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
(22, 12, '', 'instagram_1516522776339.jpg', 'normal', 'A-301, 90 Feet Road, Dharavi, Mumbai, Maharashtra 400017, India', 'user', 0, '1516522776339'),
(23, 11, '', 'instagram_1516523468369.jpg', 'normal', '', 'user', 0, '1516523468369'),
(24, 13, '@ghalib #travel', 'instagram_1516523813005.jpg', 'normal', '', 'user', 0, '1516523813006'),
(25, 14, '', 'instagram_1516524010087.jpg', 'normal', '', 'user', 0, '1516524010087'),
(26, 14, '', 'instagram_1516524031664.jpg', 'normal', '', 'user', 0, '1516524031664'),
(27, 14, '', 'instagram_1516524056911.jpg', 'normal', '', 'user', 0, '1516524056911'),
(28, 14, '', 'instagram_1516524098767.jpg', 'normal', '', 'user', 0, '1516524098767'),
(29, 14, '', 'instagram_1516524133694.jpg', 'normal', '', 'user', 0, '1516524133694'),
(30, 14, '', 'instagram_1516524190576.jpg', 'normal', '', 'user', 0, '1516524190576'),
(31, 15, '', 'instagram_1516524753923.jpg', 'normal', '', 'user', 0, '1516524753923'),
(32, 10, '', 'instagram_1516524981153.jpg', 'normal', '', 'user', 0, '1516524981153'),
(33, 10, '', 'instagram_1516525040077.jpg', 'normal', '', 'user', 0, '1516525040077'),
(34, 16, '', 'instagram_1516525129889.jpg', 'normal', '', 'user', 0, '1516525129889'),
(35, 17, '', 'instagram_1516525289046.jpg', 'normal', '', 'user', 0, '1516525289046'),
(36, 18, '', 'instagram_1516525555814.jpg', 'normal', '', 'user', 0, '1516525555814'),
(37, 18, '', 'instagram_1516525648412.jpg', 'normal', '', 'user', 0, '1516525648412'),
(38, 18, '', 'instagram_1516525703299.jpg', 'normal', '', 'user', 0, '1516525703299'),
(39, 19, '', 'instagram_1516527391527.jpg', 'normal', '', 'user', 0, '1516527391527'),
(40, 19, '', 'instagram_1516527403042.jpg', 'normal', '', 'user', 0, '1516527403042'),
(41, 20, '', 'instagram_1516527804372.jpg', 'normal', '', 'user', 0, '1516527804372'),
(43, 18, '', 'instagram_1516528062094.jpg', 'normal', '', 'user', 0, '1516528062094'),
(56, 24, 'nobita sleeping..', 'instagram_1518016562270.jpg', 'filter-helena', 'J-7, Senapati Bapat Marg, Central Government Staff Colony, Mahim, Mumbai, Maharashtra 400016, India', 'user', 0, '1518016562270'),
(57, 24, 'm', 'instagram_1518016704834.jpg', 'normal', '', 'user', 0, '1518016704834'),
(61, 27, '', 'instagram_1518018358758.jpg', 'normal', 'Progresive Building, 90 Feet Road, Dharavi, Mumbai, Maharashtra 400017, India', 'user', 0, '1518018358758'),
(63, 30, 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', 'instagram_1518510077635.jpg', 'normal', '', 'user', 0, '1518510077635'),
(69, 24, 'That''s a #nice place to #travel', 'instagram_1518854775824.jpg', 'normal', '', 'user', 0, '1518854775824'),
(70, 24, '#travel', 'instagram_1518854818666.jpg', 'normal', '', 'user', 0, '1518854818666'),
(71, 24, '#travel', 'instagram_1518857912246.jpg', 'normal', '', 'group', 11, '1518857912246'),
(88, 24, 'Hello, @ghalib @takkar #checkout', 'instagram_1518945386167.jpg', 'normal', '', 'user', 0, '1518945386167'),
(89, 24, 'hey @nobita, @doraemon #checkout, #dd #fgfg', 'instagram_1518972814710.jpg', 'filter-ashby', 'A-301, 90 Feet Road, Dharavi, Mumbai, Maharashtra 400017, India', 'user', 0, '1518972814710');

-- --------------------------------------------------------

--
-- Table structure for table `post_tags`
--

CREATE TABLE `post_tags` (
  `post_tag_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post_tags`
--

INSERT INTO `post_tags` (`post_tag_id`, `post_id`, `user`) VALUES
(17, 61, 24),
(18, 89, 18),
(19, 89, 28),
(20, 89, 27);

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
(298, 7, 24, '1523287634357');

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
(2, 24, 27, 30, '1518513536449');

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
(92, 24, 7, 56, '1518016586702'),
(93, 24, 19, 56, '1518016682241'),
(94, 27, 24, 61, '1518018368656'),
(96, 24, 7, 89, '1518972830118');

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
(1, 29, 'apple');

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
  `isOnline` enum('true','false') COLLATE utf8mb4_bin NOT NULL DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `firstname`, `surname`, `email`, `password`, `bio`, `joined`, `email_verified`, `account_type`, `instagram`, `twitter`, `facebook`, `github`, `website`, `phone`, `isOnline`) VALUES
(7, 'ghalib', 'Mirza', 'Ghalib', 'ghalib@gmail.com', '$2a$10$E3ZgkSwaa6rUopG1CBUm8OoCMKVqzSwv79bfuUrICV0eLOqTlqR/m', '', '1514718748562', 'yes', 'private', '', '', '', '', '', '', 'false'),
(8, 'coldplay', 'cold', 'play', 'coldplay@gmail.com', '$2a$10$zVPMDJKlOY00UnSlrLEUfuaeTwXkZ.VD4ixp.q1x2RjX/LbezoqPO', '', '1515918435853', 'no', 'public', '', '', '', '', '', '', 'false'),
(10, 'noddy', 'your', 'noddy', 'noddy@gmail.com', '$2a$10$/FlxKj904j7TnMo.9gJJTe5cwFakoJc4/w9kba3LeAdP0hTWGCzCG', '', '1516454412744', 'no', 'public', '', '', '', '', '', '', 'false'),
(11, 'nobita', 'nobita', 'nobi', 'nobita@gmail.com', '$2a$10$nzMI2G054StCufuo4fzkEOWhpwUWKqZwV67jbPqaqqSNDNnF5led2', '', '1516522466189', 'no', 'public', '', '', '', '', '', '', 'false'),
(12, 'pikachu', 'your', 'pikachu', 'pikachu@gmail.com', '$2a$10$j/buNE/iwJquKzzyBsOhLe4dEVVXKs56KTet8E4arAjcjsQ87BZt2', '', '1516522598741', 'no', 'public', '', '', '', '', '', '', 'false'),
(13, 'iamsrk', 'Shahrukh', 'Khan', 'iamsrk@gmail.com', '$2a$10$Xn99377.3Ns8.QoneTP4qeMuERyvNR2Ki86eRjpmHCsj01xvFoFIq', '', '1516523593107', 'no', 'public', '', '', '', '', '', '', 'false'),
(14, 'kinkade', 'Thomas', 'Kinkade', 'kinkade@gmail.com', '$2a$10$IvK3CBxFh/dnkWZtRMh9k.S2/WIdQbd6adF78Bb16.G.62nrSUgcG', '', '1516523852488', 'no', 'public', '', '', '', '', '', '', 'false'),
(15, 'suniyo', 'suniyo', 'honekawa', 'suniyo@gmail.com', '$2a$10$60TUnK2JiH8RoloKA/IdB.ZG07o.bc8FpHqu9Euc2kEXc28PslceS', '', '1516524667640', 'no', 'public', '', '', '', '', '', '', 'false'),
(16, 'zayn', 'Zayn', 'Malik', 'zayn@gmail.com', '$2a$10$ktjq/vo/8nBxlOnixyTpQuN6gyXc5vN4.rslSVRt4eM6vhq7ftaxS', '', '1516525072573', 'no', 'private', '', '', '', '', '', '', 'false'),
(17, 'nfak', 'Nusratfateh', 'Alikhan', 'nfak@gmail.com', '$2a$10$TAzl3pUYIs/HRb8LPhvZdOclk/TSfnmicUVgHEGyUwnUxm7j7Z.Ie', '', '1516525201164', 'no', 'public', '', '', '', '', '', '', 'false'),
(18, 'ragnar', 'Ragnar', 'Lothbrok', 'ragnar@gmail.com', '$2a$10$M7lx4wF.PUhAjSJVxb7bW.nk2G6zxeCjhXBnKTyFz3JNq8NQbQQ8m', '', '1516525343645', 'no', 'public', '', '', '', '', '', '', 'false'),
(19, 'jonsnow', 'jon_', 'snow', 'jonsnow@gmail.com', '$2a$10$9Nb4hFjgg.MKKLLTeXMuWehralT21UCoeWsPq3./VWMkUnu19JpzS', '', '1516527326858', 'no', 'public', '', '', '', '', '', '', 'false'),
(20, 'gian', 'Takeshi', 'Gauda', 'gian@gmail.com', '$2a$10$K3ijpio/4HIOKJhQ5yq3DOQ4IW5Oee4O5hwogEQtB/FBuNJRvd9T2', '', '1516527534985', 'no', 'public', '', '', '', '', '', '', 'false'),
(24, 'takkar', 'iam_', 'takkar', 'takkar@gmail.com', '$2a$10$m2CrL8Y/iJxXraNm2VsIcOqnJul3A.jo2JmFiMWv6McIxrQ4W5Wki', 'Hello #world', '1518016437193', 'no', 'private', '', '', '', '', '', '', 'false'),
(27, 'taylor_swift', 'taylor', 'swift', 'taylor_swift@gmail.com', '$2a$10$rnQRsp0iWCdV8b6AD24mJ.7rL5XQ31ejULlOQMVkBpjxD7RlRxqKK', '', '1518018283428', 'no', 'public', '', '', '', '', '', '', 'false'),
(28, 'selena', 'selena', 'gomez', 'selenagomez@gmail.com', '$2a$10$.ifdYlKQdt/acrXtn09NLuENJylSfZIJq2U4tqzZNqeRWaUG0nnQq', '', '1518018409165', 'no', 'public', '', '', '', '', '', '', 'false'),
(29, 'steve_jobs', 'steve', 'jobs', 'steve_jobs@gmail.com', '$2a$10$B05HNF3/pnK.8fU7kCJHpuaU5LpVxwao9Wmkn3Md2sAPc5GINiU6O', '', '1518018498672', 'no', 'public', '', '', '', '', '', '', 'false'),
(30, 'doraemon', 'iam_', 'doraemon', 'doraemon@gmail.com', '$2a$10$OjZg/mosNPOT297skkotUetzYL7mIEFDVxVPP2lsBAv4F0LSyK18m', '', '1518454660501', 'no', 'public', '', '', '', '', '', '', 'false');

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
  MODIFY `block_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `bookmarks`
--
ALTER TABLE `bookmarks`
  MODIFY `bkmrk_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;
--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `con_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `favourites`
--
ALTER TABLE `favourites`
  MODIFY `fav_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `follow_system`
--
ALTER TABLE `follow_system`
  MODIFY `follow_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=222;
--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `group_members`
--
ALTER TABLE `group_members`
  MODIFY `grp_member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
--
-- AUTO_INCREMENT for table `hashtags`
--
ALTER TABLE `hashtags`
  MODIFY `hashtag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notify_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=418;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;
--
-- AUTO_INCREMENT for table `post_tags`
--
ALTER TABLE `post_tags`
  MODIFY `post_tag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `profile_views`
--
ALTER TABLE `profile_views`
  MODIFY `view_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=299;
--
-- AUTO_INCREMENT for table `recommendations`
--
ALTER TABLE `recommendations`
  MODIFY `recommend_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `shares`
--
ALTER TABLE `shares`
  MODIFY `share_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;
--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `tag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

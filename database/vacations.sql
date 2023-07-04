-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 04, 2023 at 03:32 AM
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
-- Table structure for table `continents`
--

CREATE TABLE `continents` (
  `continentId` int(11) NOT NULL,
  `continentName` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `continents`
--

INSERT INTO `continents` (`continentId`, `continentName`) VALUES
(1, 'Africa'),
(2, 'Antarctica:'),
(3, 'Asia'),
(4, 'Europe'),
(5, 'North America'),
(6, 'South America'),
(7, 'Australia');

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
(4, 1),
(4, 3),
(4, 14),
(4, 13),
(2, 15),
(2, 12),
(5, 13),
(5, 14),
(5, 7),
(5, 19),
(5, 3),
(5, 9),
(5, 20),
(6, 20),
(6, 12),
(6, 5),
(6, 11),
(2, 19),
(6, 6),
(3, 21),
(3, 14),
(2, 14),
(2, 6),
(6, 19),
(6, 17),
(2, 21),
(2, 18),
(3, 6);

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
(1, 'ditza', 'hofman', 'ditza@gmail.com', '9f24f80fc1aa8beb75d540c33d112c8d6338028e3e86459b6df6ff9527ac13ee53d2b3c02d5b52e7366ea15d153b1226f4a93c316295641bbd7f9dcae4840981', 'Admin'),
(2, 'Tzvi', 'Hofman', 'tzvi@gmail.com', '262a368fe0380bf50c7ae86a52c10f4b65bd6bd39ddc7772b259f223f2bd21b18245fb2f62f150386ef720992c0b04573e9f5bdf19a6e66c3c77bb1ed24db5ca', 'User'),
(3, 'Nir', 'Barkat', 'nir@gmail.com', '95528b8f028cd41682bc13bc48f9d73bf78a35e17af6706d10b443a100950ed358a5ef86654259f62c4cb8cc5187fd4193bc971010daa1eb91a7439deae15a46', 'User'),
(4, 'Sheli', 'Yechimovich', 'sheli@gmail.com', '40c3a7bdff0a28124ec85903a4b84a4c745099bee00e85a2a0f6ba07099a3097e4f186666a4b633b8c9550266e87590b375c246a8b6971fa731e02034ce3b868', 'User'),
(5, 'Miri', 'Regev', 'miri@gmail.com', '40fcd469ec8379957eb624a367bf7518847fedecbb803d46930b37c020e36d3d704ddc81199e7011ee53e5123957a600be304098e30bb44e10348cb812aca869', 'User'),
(6, 'Sara', 'Netanyaho', 'sara@gmail.com', '4967d0711dbfb056912439670f102d2be404d233a29af070a81bab6a68888c41b55c8defb286c73fbe4919a1c624b381ae2cd5123321711adba3e59cec21356d', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacation`
--

CREATE TABLE `vacation` (
  `vacationId` int(11) NOT NULL,
  `continentId` int(11) NOT NULL,
  `destination` varchar(20) NOT NULL,
  `brief` varchar(500) NOT NULL,
  `description` varchar(1200) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `imageName` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacation`
--

INSERT INTO `vacation` (`vacationId`, `continentId`, `destination`, `brief`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 1, 'Cape Town', 'Cape Town offers a mesmerizing vacation experience with its stunning beaches, majestic mountains, and vibrant cultural attractions', 'Embark on an unforgettable vacation to Cape Town, a city that effortlessly combines natural beauty, cultural richness, and a vibrant cosmopolitan atmosphere. Nestled between the majestic Table Mountain and the azure waters of the Atlantic Ocean, Cape Town offers a plethora of experiences that will leave you enchanted.\r\n\r\nBegin your exploration by ascending Table Mountain, a world-renowned landmark that provides breathtaking panoramic views of the city, coastline, and surrounding landscapes. Marvel at the unique flora and fauna found on the mountain, and be captivated by the ever-changing interplay of light and shadow that paints the cityscape below.\r\n\r\nAs you descend from the heights of Table Mountain, immerse yourself in the rich history and diverse culture of Cape Town. Take a stroll through the colorful Bo-Kaap neighborhood, renowned for its vibrant houses and Cape Malay heritage. Explore the cobblestone streets of the Cape Town City Bowl, where colonial architecture coexists harmoniously with modern skyscrapers.\r\n\r\nIndulge your senses in the bustling markets and artisanal boutiques of the Victoria & Alfred Waterfront, a vibrant hub of shopping, dining, and entertainment. Enjoy ', '2023-07-31', '2023-08-04', 2000, '5b0c46ed-9601-4441-a703-9a6ff68fa59c.jpg'),
(2, 1, ' Tanzania', 'Experience the breathtaking beauty of Tanzania on your dream vacation, with its rich wildlife, pristine landscapes, and vibrant cultural heritage', 'Embark on a captivating adventure to Tanzania, a land of remarkable diversity and natural wonders. Nestled on the eastern coast of Africa, Tanzania offers a mesmerizing blend of breathtaking landscapes, vibrant wildlife, and rich cultural heritage. With its vast plains, pristine beaches, lush rainforests, and towering mountains, this enchanting destination caters to every traveler\'s desires.\r\n\r\nImmerse yourself in the world-famous Serengeti National Park, where the annual Great Migration unfolds, witnessing millions of wildebeests, zebras, and gazelles traversing the plains in search of greener pastures. Feel the exhilaration as you witness thrilling wildlife encounters up close, from mighty elephants and graceful giraffes to stealthy lions and elusive leopards. The awe-inspiring Ngorongoro Crater awaits, offering a unique opportunity to explore an ancient caldera teeming with diverse wildlife, while the iconic Mount Kilimanjaro beckons adventurous souls to conquer its majestic summit.\r\n\r\nFor beach lovers, Zanzibar\'s pristine shores and turquoise waters provide a tropical paradise to unwind and indulge in blissful relaxation. Explore the captivating Stone Town with its winding alle', '2023-08-14', '2023-08-17', 1000, 'df30b0c7-bf85-41df-8968-48ae26899dc5.jpg'),
(3, 1, 'Marrakech', 'A vibrant city known for its rich cultural heritage, bustling souks, stunning architecture, and the enchanting allure of the Sahara Desert nearby.', 'Experience the enchanting allure of Marrakech, a city that seamlessly blends ancient traditions with modern charm. Nestled in the heart of Morocco, Marrakech captivates visitors with its vibrant souks, intricate architecture, and a tapestry of scents, sounds, and flavors that ignite the senses.\r\n\r\nImmerse yourself in the mesmerizing world of the Medina, a UNESCO World Heritage site and the historic center of Marrakech. Lose yourself in a labyrinth of narrow alleyways, where each turn reveals hidden treasures. Explore the bustling marketplaces, known as souks, where artisans showcase their craftsmanship, offering a kaleidoscope of colorful textiles, handcrafted pottery, intricate metalwork, and aromatic spices.\r\n\r\nMarvel at the architectural wonders that adorn the city, with the iconic Koutoubia Mosque dominating the skyline. Admire the intricate details of the Bahia Palace, a masterpiece of Moroccan architecture, and wander through the serene Majorelle Garden, a botanical oasis that exudes tranquility amidst the vibrant city.\r\n\r\nIndulge in the sensory feast of Moroccan cuisine, where flavors from aromatic spices, succulent meats, and fragrant tagines transport you to a culinary par', '2023-07-03', '2023-07-06', 1500, 'e2f93944-2a37-4b2c-bf7b-08e95e6f7e9c.jpg'),
(4, 2, 'Antarctic Peninsula', 'The Antarctic Peninsula captivates adventurers and nature lovers with stunning landscapes, abundant wildlife, and thrilling activities.', 'The Antarctic Peninsula offers an extraordinary vacation experience, with its unparalleled combination of stunning travel sites, unique accommodations, and captivating attractions. As you embark on this once-in-a-lifetime journey, you\'ll be immersed in a world of natural wonders and incredible adventures.\r\n\r\n    Travel Sites: Prepare to be awestruck as you visit travel sites that showcase the sheer magnificence of Antarctica. Paradise Bay, with its towering glaciers and pristine ice cliffs, will leave you speechless. The Lemaire Channel, often referred to as the \"Kodak Gap,\" presents a photographic paradise with its dramatic mountains and narrow waterways. Additionally, the historic Port Lockroy offers a fascinating glimpse into Antarctica\'s past, as you explore the former British research station turned museum.\r\n\r\n    Hotels for Vacationers: Your accommodations in Antarctica will be like no other. While traditional hotels are not available, you\'ll have the opportunity to stay in research stations, expedition ships, or specialized eco-lodges designed to provide comfort and sustainability. Picture yourself on a luxurious expedition ship, enjoying well-appointed cabins, gourmet dinin', '2023-07-02', '2023-07-05', 1300, '79461197-e149-43f0-91bc-7ccc34515f6c.jpg'),
(5, 2, 'South Georgia Island', 'South Georgia Island beckons with its mesmerizing blend of rugged landscapes, prolific wildlife, and captivating historical sites, promising an unforgettable vacation experience', '    Travel Sites: South Georgia Island is a haven for nature enthusiasts and history buffs, boasting an array of captivating travel sites. Grytviken, a former whaling station turned historic site, offers a glimpse into the island\'s rich past, with a visit to the grave of renowned explorer Sir Ernest Shackleton. Salisbury Plain showcases awe-inspiring wildlife encounters, with sprawling colonies of king penguins blanketing the shores. And at St. Andrew\'s Bay, visitors can witness one of the largest colonies of elephant seals in the world, as well as an abundance of other seabirds and wildlife.\r\n\r\n    Hotel Recommendation: While accommodations on South Georgia Island are limited, one highly recommended option is the Grytviken House. This rustic yet charming guesthouse provides comfortable lodging with stunning views of the surrounding mountains and ocean. Guests can enjoy warm hospitality, delicious meals, and a cozy atmosphere, ensuring a memorable stay amidst the island\'s rugged beauty.\r\n\r\n    Travel Sites: Beyond Grytviken, Salisbury Plain, and St. Andrew\'s Bay, South Georgia Island offers a host of other remarkable travel sites. Gold Harbour, with its breathtaking scenery of towe', '2023-07-19', '2023-07-21', 800, '8df4f51d-c351-41a5-abe1-eb6d2a208669.jpg'),
(6, 2, 'Ross Sea', 'The Ross Sea in Antarctica offers a captivating vacation experience with stunning ice formations, historic huts, and unique wildlife in a pristine environment.', '    Travel Sites: The Ross Sea is a remote and pristine region of Antarctica that offers unparalleled beauty and wilderness. One of the main travel sites in the Ross Sea is the Ross Ice Shelf, a massive floating ice shelf that stretches for hundreds of kilometers. It is a sight to behold, with its striking blue ice formations and intricate patterns. Visitors can also explore historic huts used by early explorers like Robert Falcon Scott and Ernest Shackleton, such as Scott\'s Hut at Cape Evans and Shackleton\'s Hut at Cape Royds. These huts offer a glimpse into the challenging lives of early Antarctic explorers.\r\n\r\n    Hotel Recommendation: Given the remote and protected nature of the Ross Sea, traditional hotels are not available in the region. However, expedition ships that specialize in Antarctic exploration often serve as comfortable accommodations for visitors. These ships offer cozy cabins, dining facilities, and knowledgeable guides who provide insights into the area\'s unique geography and history. Staying on an expedition ship allows you to immerse yourself in the captivating landscapes of the Ross Sea while enjoying comfortable amenities on board.\r\n\r\n    Attractions: The Ros', '2023-09-24', '2023-09-26', 1200, 'deb37328-459f-4842-9dbe-8e13f52d0cd3.jpg'),
(7, 3, 'Bali, Indonesia', 'Bali, Indonesia, offers a captivating vacation experience with pristine beaches, vibrant culture, and breathtaking natural beauty.', 'Bali, often referred to as the \"Island of the Gods,\" is a captivating destination that enchants visitors with its stunning landscapes, vibrant culture, and warm hospitality. A vacation in Bali offers a diverse range of experiences, combining pristine beaches, lush rice terraces, ancient temples, and a thriving arts scene.\r\n\r\n    Pristine Beaches: Bali\'s idyllic beaches are a major draw for vacationers. From the popular shores of Kuta and Seminyak to the more secluded beaches of Nusa Dua and Uluwatu, there\'s a beach to suit every preference. Whether you\'re looking to relax on soft white sand, catch some waves while surfing, or dive into the crystal-clear waters to explore vibrant coral reefs, Bali\'s beaches offer a perfect blend of relaxation and adventure.\r\n\r\n    Cultural Delights: Bali\'s rich cultural heritage is evident throughout the island. Ubud, the cultural heart of Bali, is known for its traditional arts and crafts, including intricate wood carvings and vibrant paintings. Visitors can witness captivating traditional dance performances, explore ancient temples such as Uluwatu Temple and Tanah Lot, and partake in unique rituals and ceremonies. The warmth and friendliness of th', '2023-10-17', '2023-10-19', 950, '21a7cced-8eb0-46d2-a241-27dd6ce361e9.jpg'),
(8, 3, 'Tokyo, Japan', 'Tokyo, Japan, offers a captivating blend of tradition and innovation, making it an unforgettable destination for a vibrant vacation experience.', 'Tokyo, Japan, is an extraordinary metropolis that seamlessly combines ancient traditions with futuristic innovation. This bustling city captivates visitors with its vibrant energy, world-class cuisine, captivating cityscapes, and rich cultural heritage. Explore the bustling streets of Shibuya, witness the tranquility of Meiji Shrine, and immerse yourself in the traditional ambiance of Asakusa. From towering skyscrapers and neon-lit districts to serene gardens and historic temples, Tokyo offers a diverse range of experiences. Indulge in exquisite sushi, savor street food delights, and discover the city\'s unique fashion and pop culture scenes. Tokyo\'s blend of tradition, innovation, and warm hospitality creates an unforgettable vacation experience in one of the world\'s most fascinating cities.', '2023-07-26', '2023-07-30', 900, '754ea9f6-52cc-4369-923d-e6774c8896be.jpg'),
(9, 3, 'Bangkok, Thailand', 'Vibrant Bangkok beckons with street food delights, ornate temples, and a dynamic fusion of ancient traditions and modern city life.', 'Bangkok, the bustling capital of Thailand, is a vibrant and exhilarating destination that offers a dynamic blend of ancient traditions and modern city life. A vacation in Bangkok promises an immersive experience where visitors can indulge in delicious street food, explore ornate temples, navigate bustling markets, and witness the city\'s vibrant energy.\r\n\r\n    Street Food Delights: Bangkok is a food lover\'s paradise, known for its delectable street food offerings. From savoring the iconic Pad Thai to devouring succulent skewered meats at night markets, exploring the city\'s diverse culinary scene is a must. The vibrant street food stalls offer a variety of flavors, ranging from spicy and tangy to sweet and savory. Whether you\'re dining at the famous street food hubs of Yaowarat (Chinatown) or exploring the bustling stalls of Chatuchak Weekend Market, Bangkok is a gastronomic adventure waiting to be explored.\r\n\r\n    Ornate Temples: Bangkok is home to numerous ornate temples that showcase the city\'s rich cultural heritage. The stunning Grand Palace, with its intricate architecture and the revered Emerald Buddha, is a must-visit landmark. Wat Arun, also known as the Temple of Dawn, pres', '2023-09-11', '2023-09-14', 900, '690f546c-a634-476b-bd88-eeb1eacad67b.jpg'),
(10, 3, 'Jerusalem , Israel', 'Jerusalem, a city of profound historical and spiritual significance, offers a captivating vacation experience that immerses visitors in its rich heritage and cultural diversity.', 'Jerusalem, the ancient and spiritual capital of Israel, offers a truly extraordinary vacation experience that combines rich history, religious significance, and cultural diversity. With its stunning landmarks, sacred sites, and vibrant atmosphere, Jerusalem is a city that captures the hearts of travelers from around the world.\r\n\r\n    Historical Landmarks: Jerusalem is steeped in history, and its old city is a UNESCO World Heritage Site that encapsulates centuries of human civilization. Explore the narrow, winding streets of the Old City, where you\'ll discover iconic landmarks such as the Western Wall, the Church of the Holy Sepulchre, and the Al-Aqsa Mosque. Visit the Tower of David, a magnificent citadel that chronicles the city\'s past through interactive exhibits and breathtaking views. Jerusalem\'s historical landmarks offer a glimpse into the city\'s diverse and storied past.\r\n\r\n    Spiritual Significance: Jerusalem holds immense religious importance for Judaism, Christianity, and Islam, making it a revered destination for pilgrims and spiritual seekers. Experience the spiritual aura of the Western Wall, where visitors can witness people praying and leaving notes in the ancient s', '2023-07-11', '2023-07-14', 1200, 'b87ce472-8256-4497-ac89-a3873213e1a0.jpg'),
(11, 3, 'Dubai', 'Dubai offers a glamorous vacation experience with iconic landmarks, luxurious shopping, cultural gems, and a fusion of modernity and Arabian charm.', 'Dubai, a dazzling city in the United Arab Emirates, offers a luxurious and thrilling vacation experience that combines modernity, opulence, and Arabian charm. From awe-inspiring skyscrapers to pristine beaches, world-class shopping malls to cultural treasures, Dubai promises an unforgettable escape.\r\n\r\n    Iconic Landmarks: Dubai is renowned for its architectural marvels that redefine the limits of imagination. Visit the Burj Khalifa, the world\'s tallest building, and ascend to its observation deck for breathtaking panoramic views of the city. Explore the magnificent Palm Jumeirah, an artificial island shaped like a palm tree, and indulge in luxurious resorts and pristine beaches. Don\'t miss the iconic sail-shaped Burj Al Arab hotel, a symbol of luxury and opulence.\r\n\r\n    Exquisite Shopping and Entertainment: Dubai is a paradise for shopping enthusiasts. From traditional souks offering gold, spices, and textiles to extravagant shopping malls like The Dubai Mall, Mall of the Emirates, and Dubai Marina Mall, you\'ll find a wide range of international brands and designer boutiques. Enjoy tax-free shopping and experience the thrill of indoor skiing at Ski Dubai or explore the vibrant D', '2023-07-19', '2023-07-25', 2000, '50560bf4-fcba-4510-b8f1-6b898afa6a9e.jpg'),
(12, 4, ' Paris, France', 'Paris, France, the \"City of Love,\" enchants visitors with its iconic landmarks, exquisite cuisine, and a romantic atmosphere that is truly unforgettable.', 'Paris, the capital city of France, is a vibrant and enchanting destination that captivates visitors with its timeless beauty, rich history, and romantic ambiance. Known as the \"City of Love,\" Paris offers a plethora of iconic landmarks, world-class art and culture, exquisite cuisine, and charming neighborhoods to explore.\r\n\r\nThe Eiffel Tower stands tall as the symbol of Paris, offering breathtaking views of the city from its observation decks. The Louvre Museum, housed in a magnificent palace, showcases an extensive collection of art, including the famous Mona Lisa. Notre-Dame Cathedral, with its Gothic architecture, is a masterpiece that has stood the test of time.\r\n\r\nStrolling along the picturesque streets of Paris, you\'ll encounter charming neighborhoods like Montmartre, with its bohemian atmosphere and the iconic Sacré-Cœur Basilica. The Latin Quarter, known for its vibrant student life, offers cozy cafes, bookstores, and historical sites. The elegant Champs-Élysées boulevard is a shopper\'s paradise, lined with luxury boutiques and cafes.\r\n\r\nParis is renowned for its culinary delights, from freshly baked croissants to mouthwatering pastries and gourmet cuisine. Indulge in a cul', '2023-06-03', '2023-06-05', 830, '1f2b67fa-fa8f-4a7b-80ea-b7db66da66cc.jpg'),
(13, 4, 'Rome, Italy', 'Rome, Italy, the eternal city, invites visitors to immerse themselves in its ancient wonders, vibrant culture, and delectable cuisine, creating an unforgettable vacation experience.', 'Rome, the eternal city, is a captivating destination that seamlessly blends ancient history with modern charm, offering visitors a remarkable vacation experience. With iconic landmarks like the Colosseum, Vatican City, and the Roman Forum, as well as charming piazzas, delicious cuisine, and a vibrant atmosphere, Rome is a treasure trove of cultural and historical wonders.\r\n\r\nStep back in time as you explore the majestic Colosseum, marvel at the grandeur of the Roman Forum, and wander through the ancient ruins that tell stories of the mighty Roman Empire. Vatican City, the smallest independent state in the world, is home to St. Peter\'s Basilica and the Vatican Museums, where you can admire masterpieces like Michelangelo\'s Sistine Chapel.\r\n\r\nImmerse yourself in the city\'s enchanting atmosphere by wandering through picturesque neighborhoods like Trastevere, with its narrow cobblestone streets, colorful facades, and lively restaurants. Visit the iconic Trevi Fountain to toss a coin and make a wish, and enjoy the lively ambiance of the Spanish Steps and Piazza Navona.\r\n\r\nIndulge in the delectable flavors of Italian cuisine as you savor authentic pasta dishes, crispy Roman-style pizza, a', '2023-07-02', '2023-07-05', 1000, '1e3b756c-777b-4ca8-b88a-87a6c2fda839.jpg'),
(14, 4, ' Lucerne , Switzerla', 'Lucerne, Switzerland, with its stunning landscapes, historic charm, and serene lake, offers a captivating vacation experience that combines natural beauty with cultural richness.', 'Lucerne, Switzerland, is a mesmerizing destination that enchants visitors with its stunning landscapes, charming old town, and a perfect blend of natural beauty and cultural richness. Nestled amidst snow-capped mountains and crystal-clear lakes, Lucerne offers a picturesque setting for an unforgettable vacation experience.\r\n\r\nThe iconic Chapel Bridge, with its distinctive tower and beautiful paintings, is a symbol of Lucerne and a must-visit attraction. As you wander through the cobblestone streets of the well-preserved old town, you\'ll encounter colorful medieval buildings, quaint squares, and charming shops selling Swiss souvenirs.\r\n\r\nLake Lucerne, surrounded by towering mountains, is a breathtaking sight. Take a leisurely boat trip on the lake, marvel at the serene beauty of the landscape, and enjoy panoramic views of the surrounding Alps. You can also rent a paddleboat or kayak to explore the lake at your own pace.\r\n\r\nFor spectacular views of Lucerne and the surrounding area, take a trip up Mount Pilatus. Hop on the world\'s steepest cogwheel railway or ride the cable car to reach the summit, where you\'ll be rewarded with awe-inspiring vistas. On a clear day, you can even see as', '2024-01-23', '2024-01-26', 790, '27e91e9c-baf6-4091-ba7e-fbf5113e13f1.jpg'),
(15, 5, 'New York City, USA', 'New York City, USA, a vibrant metropolis of iconic landmarks, diverse culture, and limitless excitement, promises an unforgettable vacation experience.', 'New York City, USA, known as the \"City that Never Sleeps,\" is a captivating destination that offers a truly immersive and vibrant vacation experience. With its iconic skyline, bustling streets, and a rich cultural tapestry, New York City has something to offer for everyone.\r\n\r\nImmerse yourself in the energy of Times Square, with its dazzling billboards and bustling crowds, or take a leisurely stroll through the iconic Central Park, a peaceful oasis in the heart of the city. Explore world-class museums like the Metropolitan Museum of Art and the Museum of Modern Art, which house some of the most renowned art collections in the world.\r\n\r\nIndulge in a culinary journey through diverse neighborhoods like Chinatown, Little Italy, and Harlem, where you can savor authentic cuisine from around the world. From hot dogs and pretzels from street vendors to Michelin-starred restaurants, New York City is a food lover\'s paradise.\r\n\r\nShopaholics will delight in the array of options, from luxury brands on Fifth Avenue to unique boutiques in SoHo and trendy vintage shops in Williamsburg, Brooklyn. Take in the breathtaking views of the city from atop the Empire State Building or the observation deck ', '2023-08-27', '2023-08-31', 800, 'a001548a-5f82-4952-aa90-448e567016d7.jpg'),
(16, 5, 'Cancun, Mexico', 'Cancun, Mexico, a tropical paradise with pristine beaches, vibrant culture, and thrilling adventures, offers an unforgettable vacation experience.', 'Cancun, Mexico, located on the northeastern tip of the Yucatan Peninsula, is a world-renowned vacation destination that promises a perfect blend of natural beauty, cultural richness, and exciting adventures.\r\n\r\nOne of Cancun\'s main draws is its pristine beaches. With miles of powdery white sand and crystal-clear turquoise waters, Cancun\'s beaches are a paradise for sunbathing, swimming, and water activities. Whether you\'re looking for a lively atmosphere with beach bars and water sports or a secluded stretch of coastline for relaxation, Cancun offers options to suit every preference.\r\n\r\nBeyond the beaches, Cancun boasts an extraordinary underwater world. The Mesoamerican Barrier Reef, the second-largest coral reef system in the world, is a haven for snorkelers and divers. Explore vibrant coral formations, swim alongside tropical fish, and even encounter majestic sea turtles and colorful marine life.\r\n\r\nFor history and culture enthusiasts, Cancun is a gateway to ancient Mayan civilizations. Just a short drive away, you\'ll find iconic archaeological sites such as Tulum and Chichen Itza. Marvel at the well-preserved ruins of temples, pyramids, and palaces that offer a glimpse into the', '2023-09-24', '2023-09-27', 750, '78f38c4c-0ee2-47d3-8f4c-1c76e5a57046.jpg'),
(17, 5, 'Vancouver, Canada', 'Vancouver, Canada, a city of natural beauty and vibrant culture, offers an unforgettable vacation experience with stunning landscapes, diverse cuisine, and a welcoming atmosphere.', 'Vancouver, Canada, nestled between the majestic mountains and the Pacific Ocean, is a city of stunning natural beauty, vibrant urban life, and a welcoming multicultural atmosphere, making it a captivating destination for travelers.\r\n\r\nExplore the lush greenery of Stanley Park, where towering trees, scenic trails, and beautiful beaches await. Take in breathtaking panoramic views of the city from the top of Grouse Mountain or embark on a scenic drive along the Sea-to-Sky Highway to witness the awe-inspiring landscapes of Whistler and the surrounding area.\r\n\r\nVancouver\'s thriving food scene offers a diverse array of culinary delights. From fresh seafood at Granville Island Public Market to international flavors in vibrant neighborhoods like Gastown and Chinatown, there is something to satisfy every palate. Don\'t miss the opportunity to try poutine, a classic Canadian dish of fries topped with cheese curds and gravy.\r\n\r\nThe city is also a cultural hub, with a vibrant arts and entertainment scene. Visit the Vancouver Art Gallery, home to an impressive collection of contemporary and historic artworks, or catch a live performance at one of the many theaters and concert venues. Explore the', '2023-07-18', '2023-07-23', 1600, '0e4d6a96-8883-49fe-b7a8-5eaf5616c0c4.jpg'),
(18, 6, 'Rio de Janeiro,Brazi', 'Rio de Janeiro, Brazil, a city of stunning beaches, vibrant culture, and iconic landmarks, offers an unforgettable vacation experience that combines natural beauty with festive energy.', 'Rio de Janeiro, Brazil, known as the \"Cidade Maravilhosa\" (Marvelous City), is a vibrant and captivating destination that offers a unique blend of natural beauty, cultural richness, and festive energy. Nestled between lush mountains and stunning beaches, Rio de Janeiro is famous for its iconic landmarks, samba rhythms, and vibrant street life.\r\n\r\nThe city\'s most renowned attraction is the magnificent Christ the Redeemer statue, perched atop Corcovado Mountain. From this vantage point, visitors can enjoy breathtaking panoramic views of the city, including the stunning Copacabana and Ipanema beaches.\r\n\r\nSpeaking of beaches, Rio de Janeiro boasts some of the world\'s most beautiful coastlines. Whether it\'s sunbathing, playing beach volleyball, or indulging in water sports, the city\'s beaches offer endless opportunities for relaxation and fun. Join the locals in a game of footvolley or simply soak up the lively atmosphere while sipping on a refreshing caipirinha.\r\n\r\nCultural experiences abound in Rio de Janeiro, with its vibrant neighborhoods and annual events. Explore the historic streets of Santa Teresa, known for its bohemian charm and eclectic art scene. Visit the famous Selarón Ste', '2023-07-03', '2023-07-06', 800, '114b4e31-7e8a-44ff-91f8-5657f2032583.jpg'),
(19, 7, 'Sydney, Australia', 'Sydney is a vibrant and cosmopolitan city, known for its stunning harbor, iconic landmarks, and diverse culture.', 'Sydney is the largest city in Australia and serves as the capital of the state of New South Wales. It is a vibrant and cosmopolitan metropolis located on the southeastern coast of the country. Known for its stunning harbor, iconic landmarks, and diverse culture, Sydney is a popular destination for tourists and a thriving hub for business, education, and entertainment.\r\n\r\nOne of the city\'s most famous landmarks is the Sydney Opera House, a UNESCO World Heritage site renowned for its unique architecture. This architectural masterpiece is nestled along the picturesque Sydney Harbour, which is also home to the Sydney Harbour Bridge, another iconic symbol of the city. Visitors can enjoy panoramic views of the city and its stunning waterfront from the top of the bridge or take a leisurely cruise along the harbor to soak in its beauty.\r\n\r\nSydney\'s cityscape is a mix of modern skyscrapers, historic buildings, and charming neighborhoods. The central business district is bustling with activity, featuring high-end shopping precincts, thriving financial institutions, and a vibrant nightlife. The Rocks, a historic area near the harbor, offers a glimpse into Sydney\'s colonial past with its cobbl', '2023-06-04', '2023-06-09', 2210, 'cb8dae47-e69b-4a72-ab24-7c07fbf95b22.jpg'),
(20, 7, ' Great Barrier Reef', 'A vacation in the Great Barrier Reef offers a mesmerizing opportunity to explore the world\'s largest coral reef system, teeming with vibrant marine life and showcasing breathtaking natural beauty', 'A vacation in the Great Barrier Reef offers a truly extraordinary and unforgettable experience. Located off the northeastern coast of Australia, the Great Barrier Reef is the world\'s largest coral reef system, stretching over 2,300 kilometers (1,400 miles) and covering an area of approximately 344,400 square kilometers (133,000 square miles). This natural wonder is recognized as a UNESCO World Heritage site and is renowned for its breathtaking beauty, vibrant marine ecosystem, and unparalleled opportunities for adventure and exploration.\r\n\r\nOne of the main highlights of visiting the Great Barrier Reef is the chance to witness its vibrant and diverse coral reefs. Snorkeling or scuba diving in the crystal-clear waters allows you to immerse yourself in a kaleidoscope of colors, where you\'ll encounter an abundance of coral formations, from delicate branching corals to massive coral bommies. The reef teems with marine life, including over 1,500 species of fish, 30 species of whales and dolphins, and six species of sea turtles. Exploring this underwater paradise offers a unique opportunity to swim alongside tropical fish, spot majestic manta rays, encounter graceful sea turtles, and, if ', '2023-07-09', '2023-07-12', 890, '48c1ea22-c8b1-4661-a5c9-4a3ccb72ad7f.jpg'),
(21, 3, ' Haifa ,Israel', 'Haifa, a coastal city in northern Israel, offers a captivating vacation with stunning views, rich history, vibrant culture, and a delightful culinary scene.', 'A vacation in Haifa offers a unique and diverse experience. Haifa is a beautiful coastal city located in northern Israel, known for its stunning views, rich history, and vibrant culture.\r\n\r\nDuring your vacation in Haifa, you can explore the city\'s renowned attractions, such as the Baha\'i Gardens and Shrine, a UNESCO World Heritage Site that features breathtaking terraced gardens and a majestic shrine. The gardens offer a tranquil and picturesque setting, perfect for relaxation and contemplation.\r\n\r\nHaifa also boasts a vibrant culinary scene, offering a wide range of restaurants and cafes where you can indulge in delicious local cuisine. From fresh seafood dishes to traditional Middle Eastern delicacies, you\'ll find a variety of flavors to satisfy your taste buds.\r\n\r\nFor nature enthusiasts, Haifa offers beautiful beaches where you can soak up the sun, swim in the crystal-clear waters, or enjoy water sports activities. The Carmel Mountain range, located in Haifa, provides nature lovers with hiking trails and panoramic views of the city and the Mediterranean Sea.\r\n\r\nAdditionally, Haifa is home to several museums and cultural institutions, such as the Haifa Museum of Art and the Tikoti', '2023-07-02', '2023-07-05', 850, '6b0c076d-635e-4195-9d22-f2e0522d6fcb.jpg'),
(24, 3, 'Tiberias ,Israel', 'Tiberias in Israel offers a captivating vacation experience with its historical sites, spiritual significance, breathtaking landscapes, and delightful cuisine.', 'Tiberias offers a unique blend of relaxation, spirituality, and outdoor adventure. The city has a Mediterranean climate, with warm summers and mild winters, making it a pleasant destination throughout the year. The stunning views of the Sea of Galilee, also known as Lake Kinneret, provide a serene backdrop for a memorable vacation.\r\n\r\nOne of the main attractions of Tiberias is its historical significance. The city has a long and storied past, dating back to biblical times. Visitors can explore archaeological sites, such as the remains of ancient synagogues, Roman theaters, and the Tiberias Hot Springs, which have been in use for over 2,000 years. History enthusiasts can also visit the Tomb of Maimonides, the renowned Jewish philosopher and physician.\r\n\r\nTiberias is a place of great spiritual importance for various religions. It is considered one of the four holy cities in Judaism and is home to many ancient synagogues and study centers. Additionally, the region holds significance for Christians, as it is believed to be the place where Jesus performed miracles and delivered teachings. The Mount of Beatitudes and Capernaum, where Jesus is said to have lived and taught, are nearby att', '2023-07-04', '2023-07-06', 800, 'a4953307-7b54-497a-856a-ebff6a381ee6.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `continents`
--
ALTER TABLE `continents`
  ADD PRIMARY KEY (`continentId`);

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
  ADD PRIMARY KEY (`vacationId`),
  ADD KEY `continentId` (`continentId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `continents`
--
ALTER TABLE `continents`
  MODIFY `continentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vacation`
--
ALTER TABLE `vacation`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacation` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vacation`
--
ALTER TABLE `vacation`
  ADD CONSTRAINT `vacation_ibfk_1` FOREIGN KEY (`continentId`) REFERENCES `continents` (`continentId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

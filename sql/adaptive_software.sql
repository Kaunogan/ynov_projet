-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : mysql_host
-- Généré le : mar. 21 jan. 2020 à 11:08
-- Version du serveur :  5.7.29
-- Version de PHP : 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `adaptive_software`
--

-- --------------------------------------------------------

--
-- Structure de la table `connect`
--

CREATE TABLE `connect` (
  `id` int(11) NOT NULL,
  `id_connect_1` int(11) DEFAULT NULL,
  `id_connect_2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `connect`
--

INSERT INTO `connect` (`id`, `id_connect_1`, `id_connect_2`) VALUES
(1, 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `field`
--

CREATE TABLE `field` (
  `id` int(11) NOT NULL,
  `field` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `nom_table` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `field`
--

INSERT INTO `field` (`id`, `field`, `type`, `nom_table`) VALUES
(1, 'nom', 'string', 'client'),
(2, 'prenom', 'string', 'client'),
(3, 'prix', 'string', 'facture');

-- --------------------------------------------------------

--
-- Structure de la table `value`
--

CREATE TABLE `value` (
  `id` int(11) NOT NULL,
  `id_field` int(11) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `entity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `value`
--

INSERT INTO `value` (`id`, `id_field`, `value`, `entity`) VALUES
(1, 1, 'gumbau', 1),
(2, 2, 'elric', 1),
(3, 3, '30 euro', 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `connect`
--
ALTER TABLE `connect`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_connect_1_idx` (`id_connect_1`),
  ADD KEY `id_connect_2_idx` (`id_connect_2`);

--
-- Index pour la table `field`
--
ALTER TABLE `field`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `value`
--
ALTER TABLE `value`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_field_idx` (`id_field`),
  ADD KEY `entity_idx` (`entity`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `connect`
--
ALTER TABLE `connect`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `field`
--
ALTER TABLE `field`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `value`
--
ALTER TABLE `value`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `connect`
--
ALTER TABLE `connect`
  ADD CONSTRAINT `id_connect_1` FOREIGN KEY (`id_connect_1`) REFERENCES `value` (`entity`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_connect_2` FOREIGN KEY (`id_connect_2`) REFERENCES `value` (`entity`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `value`
--
ALTER TABLE `value`
  ADD CONSTRAINT `id_field` FOREIGN KEY (`id_field`) REFERENCES `field` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

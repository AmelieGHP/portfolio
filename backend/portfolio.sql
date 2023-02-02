-- MySQL Script generated by MySQL Workbench
-- Wed Feb  1 12:12:07 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema portfolio
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema portfolio
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `portfolio` DEFAULT CHARACTER SET utf8 ;
USE `portfolio` ;

-- -----------------------------------------------------
-- Table `portfolio`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NULL,
  `lastname` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(155) NULL,
  `userDescription` VARCHAR(500) NULL,
  `linkedin` VARCHAR(45) NULL,
  `github` VARCHAR(45) NULL,
  `picture` VARCHAR(155) NULL,
  PRIMARY KEY (`iduser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`project` (
  `idproject` INT NOT NULL AUTO_INCREMENT,
  `projectName` VARCHAR(45) NULL,
  `projectDescription` VARCHAR(500) NULL,
  `websiteLink` VARCHAR(155) NULL,
  `projectGithub` VARCHAR(155) NULL,
  `image1` VARCHAR(155) NULL,
  `image2` VARCHAR(155) NULL,
  `image3` VARCHAR(155) NULL,
  `user_iduser` INT NOT NULL,
  PRIMARY KEY (`idproject`, `user_iduser`),
  INDEX `fk_project_user1_idx` (`user_iduser` ASC) VISIBLE,
  CONSTRAINT `fk_project_user1`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `portfolio`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`techno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`techno` (
  `idtechno` INT NOT NULL AUTO_INCREMENT,
  `technoName` VARCHAR(45) NULL,
  `level` TINYINT NULL,
  `user_iduser` INT NOT NULL,
  PRIMARY KEY (`idtechno`, `user_iduser`),
  INDEX `fk_techno_user1_idx` (`user_iduser` ASC) VISIBLE,
  CONSTRAINT `fk_techno_user1`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `portfolio`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `portfolio`.`techno_has_project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio`.`techno_has_project` (
  `techno_idtechno` INT NOT NULL,
  `project_idproject` INT NOT NULL,
  PRIMARY KEY (`techno_idtechno`, `project_idproject`),
  INDEX `fk_techno_has_project_project1_idx` (`project_idproject` ASC) VISIBLE,
  INDEX `fk_techno_has_project_techno_idx` (`techno_idtechno` ASC) VISIBLE,
  CONSTRAINT `fk_techno_has_project_techno`
    FOREIGN KEY (`techno_idtechno`)
    REFERENCES `portfolio`.`techno` (`idtechno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_techno_has_project_project1`
    FOREIGN KEY (`project_idproject`)
    REFERENCES `portfolio`.`project` (`idproject`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;

INSERT INTO user(firstname, lastname, email, password, userDescription, linkedin, github, picture) VALUES
("Amélie", "Guilloux", "amelie.guilloux@hotmail.fr", "1234", "I was a midwife for 9 years. Now a web dev, always birthing new projects !", "https://www.linkedin.com/in/amelie-ghp", "https://github.com/AmelieGHP", "ID-carre.jpg");
INSERT INTO techno(technoName, level, user_iduser) VALUES
("JavaScript", 6, 1),
("HTML", 7, 1),
("CSS", 7, 1),
("ReactJS", 5, 1),
("React natif", 2, 1),
("SQL", 5, 1);
INSERT INTO project(projectName, projectDescription, websiteLink, projectGithub, image1, image2, image3, user_iduser) VALUES
("SPA Détentéo", "Premier projet de la formation à la Wild Code School : création d'un site vitrine, frontend, pour un client fictif. Projet réalisé en groupe, en deux semaines. Langages/technos utilisés : Javascript, HTML/CSS", "https://baptistecourtin.github.io/Projet1-SPA/pages/", "https://github.com/AmelieGHP/Projet1-SPA", "spa1.png", "spa2.png", "spa3.png",  1),
("Les FrenCheese","Deuxième projet de la formation à la Wild Code School : création d'un site full-stack, thème libre. Projet réalisé en groupe, en six semaines. Langages/technos utilisés : ReactJS, XML/CSS", "http://vps-d5babf40.vps.ovh.net:5003/", "https://github.com/AmelieGHP/Projet2-Cheese","cheese1.png", "cheese2.png", "cheese3.png", 1),
("Mariage","Projet perso : création d'un site informatif pour les invités de mon mariage. Projet frontend réalisé en une semaine. Langages/technos utilisés : ReactJS, XML/SCSS", "https://amelie-et-ferdinand.netlify.app/", "https://github.com/AmelieGHP/mariage","mariage1.png", "mariage2.png", "mariage3.png", 1),
("Black Mount","Projet 'hackathon', compétion réalisée en 48h, en groupe. Premier ex-eaquo sur une cinquantaine de groupes ! Sujet imposé : création d'un site de gestion de flotte de véhicules. Langages/technos utilisés : ReactJS, XML/SCSS", "https://stirring-conkies-65c984.netlify.app/", "https://github.com/AmelieGHP/Hackathon2","poney1.png", "poney2.png", "poney3.png", 1);


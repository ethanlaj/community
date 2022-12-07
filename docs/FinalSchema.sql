-- //////////////////////////   WARNING   //////////////////////////
-- This script will update and RESET the database.
-- All data stored in the database will be gone.
-- Ensure no valuable information is in the database before running
-- //////////////////////////   WARNING   //////////////////////////

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema emcsdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema emcsdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `emcsdb` DEFAULT CHARACTER SET utf8 ;
USE `emcsdb` ;

-- -----------------------------------------------------
-- Table `emcsdb`.`company`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emcsdb`.`company` ;

CREATE TABLE IF NOT EXISTS `emcsdb`.`company` (
  `companyID` INT NOT NULL AUTO_INCREMENT,
  `companyName` VARCHAR(75) NOT NULL,
  `etown_companyID` INT NULL,
  `address` VARCHAR(125) NULL,
  `address2` VARCHAR(125) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `zip` INT NULL,
  `phone` VARCHAR(35) NULL,
  `companyDomain` VARCHAR(250) NULL,
  `majorConcentrations` VARCHAR(120) NULL,
  `engagementLevel` VARCHAR(45) NULL,
  `etownPriorityPartner` TINYINT NULL,
  `interest0` TINYINT NULL,
  `interest1` TINYINT NULL,
  `interest2` TINYINT NULL,
  `interest3` TINYINT NULL,
  `interest4` TINYINT NULL,
  `interest5` TINYINT NULL,
  `notes` VARCHAR(500) NULL,
  PRIMARY KEY (`companyID`))
ENGINE = InnoDB
COMMENT = '	';


-- -----------------------------------------------------
-- Table `emcsdb`.`student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emcsdb`.`student` ;

CREATE TABLE IF NOT EXISTS `emcsdb`.`student` (
  `studentID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NULL,
  `phone` VARCHAR(25) NULL,
  `etownID` INT NULL,
  `gradYear` INT NULL,
  `alumni` TINYINT NULL,
  `volunteer` TINYINT NULL,
  `firstGen` TINYINT NULL,
  `gender` VARCHAR(45) NULL,
  `URM` TINYINT NULL,
  `department` VARCHAR(55) NULL,
  `primaryMajor` VARCHAR(45) NULL,
  `concentration` VARCHAR(65) NULL,
  `otherMajors` VARCHAR(150) NULL,
  `minors` VARCHAR(200) NULL,
  `currentEmployer` INT NULL,
  `positionTitle` VARCHAR(75) NULL,
  `notes` VARCHAR(500) NULL,
  PRIMARY KEY (`studentID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emcsdb`.`first_destination`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emcsdb`.`first_destination` ;

CREATE TABLE IF NOT EXISTS `emcsdb`.`first_destination` (
  `first_destinationID` INT NOT NULL AUTO_INCREMENT,
  `companyID` INT NULL,
  `studentID` INT NULL,
  `title` VARCHAR(45) NOT NULL,
  `location` VARCHAR(100) NULL,
  `salaryRange` VARCHAR(45) NULL,
  `offerDate` DATE NULL,
  `afterGraduation` VARCHAR(250) NULL,
  `emcsNetwork` TINYINT NULL,
  `internship` TINYINT NULL,
  `relationshipToMajor` INT NULL,
  `matchForCareerPath` INT NULL,
  `department` VARCHAR(45) NULL,
  `notes` VARCHAR(500) NULL,
  PRIMARY KEY (`first_destinationID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emcsdb`.`survey`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emcsdb`.`survey` ;

CREATE TABLE IF NOT EXISTS `emcsdb`.`survey` (
  `surveyID` INT NOT NULL AUTO_INCREMENT,
  `surveyType` VARCHAR(45) NULL,
  `submitDate` VARCHAR(45) NULL,
  `firstName` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `etownID` INT NULL,
  `gradDate` VARCHAR(20) NULL,
  `primaryMajor` VARCHAR(50) NULL,
  `concentration` VARCHAR(45) NULL,
  `classAssignment` VARCHAR(10) NULL,
  `workType` VARCHAR(25) NULL,
  `company` VARCHAR(30) NULL,
  `title` VARCHAR(20) NULL,
  `timeFrame` VARCHAR(40) NULL,
  `reason` VARCHAR(200) NULL,
  `careerPath` VARCHAR(10) NULL,
  `mode` VARCHAR(10) NULL,
  `rating` INT NULL,
  `wage` VARCHAR(25) NULL,
  `advisor` VARCHAR(150) NULL,
  `summerWorkType` VARCHAR(25) NULL,
  `summerCompany` VARCHAR(35) NULL,
  `summerTitle` VARCHAR(20) NULL,
  `summerReason` VARCHAR(200) NULL,
  `summerWage` VARCHAR(25) NULL,
  `summerAdvisor` VARCHAR(150) NULL,
  PRIMARY KEY (`surveyID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emcsdb`.`internship`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emcsdb`.`internship` ;

CREATE TABLE IF NOT EXISTS `emcsdb`.`internship` (
  `internshipID` INT NOT NULL AUTO_INCREMENT,
  `studentID` INT NULL,
  `companyID` INT NULL,
  `title` VARCHAR(75) NULL,
  `department` VARCHAR(75) NULL,
  `workBasedLearning` VARCHAR(45) NULL,
  `startDate` VARCHAR(45) NULL,
  `endDate` VARCHAR(45) NULL,
  `sle` VARCHAR(45) NULL,
  `careerPath` VARCHAR(45) NULL,
  `mode` VARCHAR(45) NULL,
  `rating` INT NULL,
  `wageRange` VARCHAR(45) NULL,
  `emcsNetwork` TINYINT NULL,
  `notes` VARCHAR(500) NULL,
  PRIMARY KEY (`internshipID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emcsdb`.`contact`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emcsdb`.`contact` ;

CREATE TABLE IF NOT EXISTS `emcsdb`.`contact` (
  `contactID` INT NOT NULL AUTO_INCREMENT,
  `companyID` INT NULL,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `alumni` TINYINT NULL,
  `jobTitle` VARCHAR(100) NULL,
  `contactType` VARCHAR(45) NULL,
  `email` VARCHAR(100) NULL,
  `phoneNumber` VARCHAR(35) NULL,
  `primaryContact` TINYINT NULL,
  `companyDomain` VARCHAR(45) NULL,
  `industry` VARCHAR(45) NULL,
  `notes` VARCHAR(500) NULL,
  PRIMARY KEY (`contactID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emcsdb`.`coaching`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emcsdb`.`coaching` ;

CREATE TABLE IF NOT EXISTS `emcsdb`.`coaching` (
  `coachingID` INT NOT NULL AUTO_INCREMENT,
  `studentID` INT NULL,
  `date` DATE NULL,
  `typeOfVisit` VARCHAR(45) NULL,
  `coursework` TINYINT NULL,
  `mode` VARCHAR(45) NULL,
  `reason` VARCHAR(65) NULL,
  `positionType` VARCHAR(45) NULL,
  `followUpTasks` VARCHAR(400) NULL,
  `deadline` DATE NULL,
  `notes` VARCHAR(500) NULL,
  PRIMARY KEY (`coachingID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emcsdb`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emcsdb`.`user` ;

CREATE TABLE IF NOT EXISTS `emcsdb`.`user` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NULL,
  `firstName` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `passwordHash` VARCHAR(512) NULL,
  `permissionLevel` INT NULL,
  PRIMARY KEY (`userID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emcsdb`.`meeting`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emcsdb`.`meeting` ;

CREATE TABLE IF NOT EXISTS `emcsdb`.`meeting` (
  `meetingID` INT NOT NULL AUTO_INCREMENT,
  `meetingType` VARCHAR(55) NULL,
  `date` DATE NULL,
  `companyID` INT NULL,
  `contactID` INT NULL,
  `etownContact` VARCHAR(90) NULL,
  `notes` VARCHAR(500) NULL,
  `tasks` VARCHAR(400) NULL,
  `taskDeadline` DATE NULL,
  PRIMARY KEY (`meetingID`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



-- Add test accounts into database. Try to not delete these when updating the schema or you will have to make new test accounts
INSERT INTO user (email, firstName, lastName, passwordHash, permissionLevel) VALUES ("root@root","Root","",sha2(CONCAT("SALT14PS",CONCAT("diffPass32768","PSSALT2")),512),10);
INSERT INTO user (email, firstName, lastName, passwordHash, permissionLevel) VALUES ("user@etown.edu","Test","User",sha2(CONCAT("SALT14PS",CONCAT("password","PSSALT2")),512),1);
INSERT INTO user (email, firstName, lastName, passwordHash, permissionLevel) VALUES ("reddign@etown.edu","Nancy","Reddig",sha2(CONCAT("SALT14PS",CONCAT("341mysqlEngineering","PSSALT2")),512),10);
INSERT INTO user (email, firstName, lastName, passwordHash, permissionLevel) VALUES ("zegerss@etown.edu","Stephanie","Zegers",sha2(CONCAT("SALT14PS",CONCAT("password","PSSALT2")),512),10);

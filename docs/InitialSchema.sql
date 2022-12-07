-- MySQL Script generated by MySQL Workbench
-- Wed Aug 24 20:54:57 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

-- -----------------------------------------------------
-- Schema emcsdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `emcsdb` DEFAULT CHARACTER SET utf8 ;
USE `emcsdb` ;

-- -----------------------------------------------------
-- Table `emcsdb`.`student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emcsdb`.`student` (
  `studentID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `gradYear` VARCHAR(45) NOT NULL,
  `alumni` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`studentID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emcsdb`.`company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emcsdb`.`company` (
  `companyID` INT NOT NULL AUTO_INCREMENT,
  `companyName` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(2) NULL,
  `zip` VARCHAR(12) NULL,
  `phone` VARCHAR(15) NULL,
  PRIMARY KEY (`companyID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emcsdb`.`contact`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emcsdb`.`contact` (
  `contactID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `workphone` VARCHAR(45) NULL,
  `cellphone` VARCHAR(45) NULL,
  `homephone` VARCHAR(45) NULL,
  `formerStudentID` VARCHAR(45) NULL,
  PRIMARY KEY (`contactID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emcsdb`.`job_opportunity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emcsdb`.`job_opportunity` (
  `jobID` INT NOT NULL AUTO_INCREMENT,
  `companyID` INT NOT NULL,
  `title` VARCHAR(100) NULL,
  `description` text NULL,
  `startdate` date NULL,
  `enddate` date NULL,
  `type` VARCHAR(15) NULL,
  `semester` VARCHAR(15) NULL,
  `studentID` INT NULL,
  PRIMARY KEY (`jobID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emcsdb`.`meeting`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emcsdb`.`meeting` (
  `meetingID` INT NOT NULL AUTO_INCREMENT,
  `meetingName` VARCHAR(45) NULL,
  `date` DATE NULL,
  `starttime` TIME NULL,
  `notes` TEXT NULL,
  `location` VARCHAR(45) NULL,
  PRIMARY KEY (`meetingID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emcsdb`.`meetingInvitees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emcsdb`.`meetingInvitees` (
  `inviteeID` INT NOT NULL AUTO_INCREMENT,
  `type` INT NULL,
  `contactID` INT NOT NULL,
  `studentID` INT NOT NULL,
  `meetingID` INT NOT NULL,
  PRIMARY KEY (`inviteeID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emcsdb`.`company_to_contact`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emcsdb`.`company_to_contact` (
  `recordID` INT NOT NULL AUTO_INCREMENT,
  `companyID` INT NOT NULL,
  `contactID` INT NOT NULL,
  PRIMARY KEY (`recordID`) 
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emcsdb`.`student_survey`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emcsdb`.`student_survey` (
  `surveyID` INT NOT NULL AUTO_INCREMENT,
  `interests` VARCHAR(45) NULL,
  `careerGoals` VARCHAR(45) NULL,
  `studentID` INT NOT NULL,
  PRIMARY KEY (`surveyID`))
ENGINE = InnoDB;
-- -------------------------------------------
-- Add student data
-- -------------------------------------------
INSERT INTO student (studentId,firstName,lastName,gradYear,alumni) values (123456,'Bruce',
'Beatty','2023',0);
INSERT INTO student (studentId,firstName,lastName,gradYear,alumni) values (56755,'Dihn',
'Tran','2024',0);
INSERT INTO student (studentId,firstName,lastName,gradYear,alumni) values (32347,'Mary',
'Martin','2005',1);
INSERT INTO student (studentId,firstName,lastName,gradYear,alumni) values (45612,'Catherine',
'Janke','2025',0);
INSERT INTO student (studentId,firstName,lastName,gradYear,alumni) values (61112,'Stephen',
'Butler','2023',0);
INSERT INTO student (studentId,firstName,lastName,gradYear,alumni) values (56756,'Steve',
'Stewart','2023',0);
INSERT INTO student (studentId,firstName,lastName,gradYear,alumni) values (65612,'Titus',
'Hammond','2024',0);


-- -------------------------------------------
-- Add company data
-- -------------------------------------------
INSERT INTO company (companyId,companyName,address,city,state,zip,phone) values (123,'Hershey Foods',
'123 Chocolate Ave','Hershey','PA','17081','717-777-7777');
INSERT INTO company (companyId,companyName,address,city,state,zip,phone) values (124,'Westfield Insurance',
'304 South Broad Street','Westfield','PA','17888','717-888-8888');

INSERT INTO company (companyId,companyName,address,city,state,zip,phone) values (125,'Carnegie Learning',
'7044 Dolbow Avenue','Pittsburgh','PA','17088','717-899-9988');
-- -------------------------------------------
-- Add contact data
-- -------------------------------------------
INSERT INTO contact (contactId,firstName,lastName,workphone,cellphone) values (12,'Mary',
'Martin','717-777-6677','517-678-7933');
INSERT INTO contact (contactId,firstName,lastName,workphone,cellphone) values (15,'Amal',
'Khan','877-475-0618','418-478-0239');

-- -------------------------------------------
-- Add contact to company data
-- -------------------------------------------
INSERT INTO contact_to_company (contactId,companyId) VALUES (12,124);
INSERT INTO contact_to_company (contactId,companyId) VALUES (15,125);

-- -------------------------------------------
-- Add job data
-- -------------------------------------------
INSERT INTO job_opportunity (jobId,title,description,startdate,enddate,type,semester,companyID,studentID) 
values (112,'Programmer Intern','Will work on large data sets and do some data mining.','2023-01-02','2023-04-25','Internship','Spring',125,NULL);

INSERT INTO job_opportunity (jobId,title,description,startdate,enddate,type,semester,companyID,studentID) 
values (113,'Data Analyst','Will analyze our rate data compared with outcomes over a 5 year period and predict future trends. This is a 6-month position that could become permanent.','2023-06-02','2023-12-02','Full Time','Summer',125,NULL);


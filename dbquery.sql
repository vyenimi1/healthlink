-- Create the database
CREATE DATABASE IF NOT EXISTS test;

-- Switch to the newly created database
USE test;

-- Create the 'hospital_account' table
CREATE TABLE IF NOT EXISTS hospital_account (
    h_id INT NOT NULL AUTO_INCREMENT,
    h_password VARCHAR(100) DEFAULT NULL,
    h_name VARCHAR(200) DEFAULT NULL,
    h_street VARCHAR(200) DEFAULT NULL,
    h_zip_code INT DEFAULT NULL,
    h_city VARCHAR(100) DEFAULT NULL,
    h_state VARCHAR(100) DEFAULT NULL,
    h_contact_number INT(20) DEFAULT NULL,
    h_email VARCHAR(100) DEFAULT NULL,
    h_website VARCHAR(200) DEFAULT NULL,
    h_lab_facility VARCHAR(100) DEFAULT NULL,
    h_insurance_acceptance VARCHAR(100) DEFAULT NULL,
    h_scanning_facility VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (`h_id`)
);

-- Insert sample data into 'hospital_account' table
-- First Insert
INSERT INTO hospital_account (h_password, h_name, h_street, h_zip_code, h_city, h_state, h_contact_number, h_email, h_website, h_lab_facility, h_insurance_acceptance, h_scanning_facility)
VALUES ('pass123', 'Sample Hospital', '123 Main St', 12345, 'Cityville', 'Stateville', 123455678, 'sample@email.com', 'www.samplehospital.com', 'Yes', 'No', 'Yes');

-- Second Insert
INSERT INTO hospital_account (h_password, h_name, h_street, h_zip_code, h_city, h_state, h_contact_number, h_email, h_website, h_lab_facility, h_insurance_acceptance, h_scanning_facility)
VALUES ('password456', 'Another Hospital', '456 Elm St', 67890, 'Townville', 'Stateville', 12467890, 'another@email.com', 'www.anotherhospital.com', 'No', 'Yes', 'No');


-- Create the 'doctor_details' table
CREATE TABLE IF NOT EXISTS doctor_details (
    doctor_id INT NOT NULL AUTO_INCREMENT,
    h_id INT DEFAULT NULL,
    first_name VARCHAR(100) DEFAULT NULL,
    last_name VARCHAR(100) DEFAULT NULL,
    gender VARCHAR(10) DEFAULT NULL,
    age INT DEFAULT NULL,
    specialization VARCHAR(100) DEFAULT NULL,
    contact_number VARCHAR(20) DEFAULT NULL,
    email_address VARCHAR(100) DEFAULT NULL,
    years_of_experience INT DEFAULT NULL,
    languages_known VARCHAR(200) DEFAULT NULL,
    consultation_hours VARCHAR(100) DEFAULT NULL,
    availability_days VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (`doctor_id`)
);

-- Insert sample data into 'doctor_details' table

-- Insert Doctor 1
INSERT INTO doctor_details (h_id, first_name, last_name, gender, age, specialization, contact_number, email_address, years_of_experience, languages_known, consultation_hours, availability_days)
VALUES (1, 'John', 'Doe', 'Male', 35, 'Cardiology', '12343', 'john@email.com', 10, 'English, Spanish', '9 AM - 5 PM', 'Mon, Wed, Fri');

-- Insert Doctor 2
INSERT INTO doctor_details (h_id, first_name, last_name, gender, age, specialization, contact_number, email_address, years_of_experience, languages_known, consultation_hours, availability_days)
VALUES (1, 'Jane', 'Smith', 'Female', 30, 'Dermatology', '98765', 'jane@email.com', 8, 'English', '10 AM - 6 PM', 'Tue, Thu, Sat');

-- Insert Doctor 3
INSERT INTO doctor_details (h_id, first_name, last_name, gender, age, specialization, contact_number, email_address, years_of_experience, languages_known, consultation_hours, availability_days)
VALUES (2, 'Michael', 'Johnson', 'Male', 42, 'Orthopedics', '65432', 'michael@email.com', 15, 'English, French', '8 AM - 4 PM', 'Mon, Wed');

-- Insert Doctor 4
INSERT INTO doctor_details (h_id, first_name, last_name, gender, age, specialization, contact_number, email_address, years_of_experience, languages_known, consultation_hours, availability_days)
VALUES (2, 'Emily', 'Williams', 'Female', 28, 'Pediatrics', '87654', 'emily@email.com', 5, 'English, Spanish', '9 AM - 1 PM', 'Tue, Fri');




-- Create the 'hospital_beds' table
CREATE TABLE IF NOT EXISTS hospital_beds (
    serial_num INT NOT NULL AUTO_INCREMENT,
    h_id INT DEFAULT NULL,
    h_regular_beds INT DEFAULT NULL,
    h_icu_beds INT DEFAULT NULL,
    h_pediatric_beds INT DEFAULT NULL,
    h_maternity_beds INT DEFAULT NULL,
    h_birthing_beds INT DEFAULT NULL,
    h_orthopedic_beds INT DEFAULT NULL,
    h_homecare_beds INT DEFAULT NULL,
    h_emergency_beds INT DEFAULT NULL,
    PRIMARY KEY (`serial_num`)
);

-- Insert sample data into 'hospital_beds' table

-- Insert data for Hospital ID 1
INSERT INTO hospital_beds (h_id, h_regular_beds, h_icu_beds, h_pediatric_beds, h_maternity_beds, h_birthing_beds, h_orthopedic_beds, h_homecare_beds, h_emergency_beds)
VALUES (1, 50, 10, 20, 15, 5, 10, 30, 5);

-- Insert data for Hospital ID 2
INSERT INTO hospital_beds (h_id, h_regular_beds, h_icu_beds, h_pediatric_beds, h_maternity_beds, h_birthing_beds, h_orthopedic_beds, h_homecare_beds, h_emergency_beds)
VALUES (2, 60, 12, 18, 10, 4, 15, 25, 7);



-- Create the 'hospital_beds_availabilty' table
CREATE TABLE IF NOT EXISTS hospital_beds_availabilty (
    serial_num INT NOT NULL AUTO_INCREMENT,
    h_id INT DEFAULT NULL,
    h_regular_beds_avail INT DEFAULT NULL,
    h_icu_beds_avail INT DEFAULT NULL,
    h_pediatric_beds_avail INT DEFAULT NULL,
    h_maternity_beds_avail INT DEFAULT NULL,
    h_birthing_beds_avail INT DEFAULT NULL,
    h_orthopedic_beds_avail INT DEFAULT NULL,
    h_homecare_beds_avail INT DEFAULT NULL,
    h_emergency_beds_avail INT DEFAULT NULL,
    PRIMARY KEY (`serial_num`)
);

-- Insert sample data into 'hospital_beds_availabilty' table

-- Insert data for Hospital ID 1
INSERT INTO hospital_beds_availabilty (h_id, h_regular_beds_avail, h_icu_beds_avail, h_pediatric_beds_avail, h_maternity_beds_avail, h_birthing_beds_avail, h_orthopedic_beds_avail, h_homecare_beds_avail, h_emergency_beds_avail)
VALUES (1, 35, 5, 15, 10, 3, 8, 25, 3);

-- Insert data for Hospital ID 2
INSERT INTO hospital_beds_availabilty (h_id, h_regular_beds_avail, h_icu_beds_avail, h_pediatric_beds_avail, h_maternity_beds_avail, h_birthing_beds_avail, h_orthopedic_beds_avail, h_homecare_beds_avail, h_emergency_beds_avail)
VALUES (2, 40, 8, 10, 8, 2, 12, 18, 5);



-- Create the 'general_public_user' table
CREATE TABLE IF NOT EXISTS general_public_user (
    user_id INT NOT NULL AUTO_INCREMENT,
    password VARCHAR(100) DEFAULT NULL,
    email_id VARCHAR(100) DEFAULT NULL,
    last_name VARCHAR(100) DEFAULT NULL,
    middle_name VARCHAR(100) DEFAULT NULL,
    first_name VARCHAR(100) DEFAULT NULL,
    contact_number INT(20) DEFAULT NULL,
    street_name VARCHAR(200) DEFAULT NULL,
    city VARCHAR(100) DEFAULT NULL,
    zip_code INT DEFAULT NULL,
    state VARCHAR(100) DEFAULT NULL,
    emergency_contact_name VARCHAR(200) DEFAULT NULL,
    emergency_contact_number INT(20) DEFAULT NULL,
    user_created_data datetime DEFAULT NULL,
    PRIMARY KEY (`user_id`)
);

-- Insert statements
INSERT INTO general_public_user (password, email_id, last_name, first_name, contact_number, street_name, city, zip_code, state, emergency_contact_name, emergency_contact_number)
VALUES ('password123', 'user1@email.com', 'Doe', 'John', 1234567890, '123 Main St', 'Cityville', 12345, 'Stateville', 'Jane Doe', 1876543210);

INSERT INTO general_public_user (password, email_id, last_name, first_name, contact_number, street_name, city, zip_code, state, emergency_contact_name, emergency_contact_number)
VALUES ('securepass', 'user2@email.com', 'Smith', 'Emma', 1876543210, '456 Elm St', 'Townville', 67890, 'Stateland', 'James Smith', 1234567889);

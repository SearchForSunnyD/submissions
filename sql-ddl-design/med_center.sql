-- ### **Part One: Medical Center**

-- Design the schema for a medical center.

-- - A medical center employs several doctors
-- - A doctors can see many patients
-- - A patient can be seen by many doctors
-- - During a visit, a patient may be diagnosed to have one or more diseases

-- Tables:
-- Doctors
-- Patients
-- Diseases

-- Linking Tables
-- Doctor-Patient
-- Patient-Disease

drop database if exists med_center;

create database med_center;

\c med_center

create table doctors
(
    id serial primary key,
    first_name text not null,
    last_name text not null
);

create table patients
(
    id serial primary key,
    first_name text not null,
    last_name text not null
);

create table diseases
(
    id serial primary key,
    disease_name text not null
);

create table diagnoses
(
    id serial primary key,
    patient_id INTEGER REFERENCES patients (id),
    disease_id INTEGER REFERENCES diseases (id)
);

create table attending
(
    id serial primary key,
    doctor_id INTEGER REFERENCES doctors (id),
    patient_id INTEGER REFERENCES patients (id)
);

insert into doctors (first_name, last_name)
values
('Gregory', 'House'),
('Meredith', 'Grey'),
('Victor', 'VonDoom'),
('Leonard', 'McCoy'),
('John', 'Dolittle'),
('Henry', 'Jekyll'),
('Harleen', 'Quinzel'),
('Temperance', 'Brennan'),
('Henry', 'Frankenstein'),
('Heinz', 'Doofenshmirtz');

insert into patients (first_name, last_name)
values
    ('John', 'McClane'),
    ('Ellen', 'Ripley'),
    ('Luke', 'Skywalker'),
    ('Frodo', 'Baggins'),
    ('Katniss', 'Everdeen'),
    ('Neo', 'Anderson'),
    ('Indiana', 'Jones'),
    ('Sarah', 'Connor'),
    ('Max', 'Rockatansky'),
    ('Bilbo', 'Baggins'),
    ('Trinity', 'Moss'),
    ('Arya', 'Stark'),
    ('Clarice', 'Starling'),
    ('Marty', 'McFly'),
    ('Jack', 'Sparrow'),
    ('Rick', 'Grimes'),
    ('Katara', 'Waterbender'),
    ('John', 'Wick'),
    ('Hannibal', 'Lecter'),
    ('Tyrion', 'Lannister'),
    ('Sarah', 'Manning'),
    ('Aragorn', 'Elessar'),
    ('Eowyn', 'Shieldmaiden'),
    ('Jack', 'Bauer'),
    ('Lara', 'Croft'),
    ('Daryl', 'Dixon'),
    ('Katara', 'Zuko'),
    ('Samwise', 'Gamgee'),
    ('Buffy', 'Summers'),
    ('Rip', 'Hunter');

insert into diseases (disease_name)
values
('Influenza'),
('Hypertension'),
('Diabetes'),
('Cancer'),
('Alzheimer''s Disease'),
('Arthritis'),
('Asthma'),
('Heart Disease'),
('Osteoporosis'),
('Migraine'),
('Obesity'),
('Parkinson''s Disease'),
('Rheumatoid Arthritis'),
('Chronic Kidney Disease'),
('Hepatitis'),
('Eczema'),
('Bronchitis'),
('Gout'),
('Celiac Disease'),
('Multiple Sclerosis'),
('Lupus'),
('Psoriasis'),
('Anemia'),
('Glaucoma'),
('Epilepsy'),
('Chronic Obstructive Pulmonary Disease (COPD)'),
('HIV/AIDS'),
('Fibromyalgia'),
('Thyroid Disorders'),
('Endometriosis');

insert into diagnoses (patient_id, disease_id)
values
(1, 17),
(1, 19),
(1, 6),
(2, 4),
(2, 1),
(2, 3),
(3, 12),
(3, 12),
(3, 1),
(4, 18),
(4, 10),
(4, 15),
(5, 23),
(5, 9),
(5, 11),
(6, 26),
(6, 6),
(6, 30),
(7, 8),
(7, 20),
(7, 26),
(8, 22),
(8, 11),
(8, 12),
(9, 28),
(9, 15),
(9, 7),
(10, 24),
(10, 23),
(10, 5),
(11, 22),
(11, 5),
(11, 10),
(12, 5),
(12, 2),
(12, 22),
(13, 6),
(13, 7),
(13, 11),
(14, 21),
(14, 29),
(14, 24),
(15, 13),
(15, 28),
(15, 29),
(16, 16),
(16, 23),
(16, 30),
(17, 20),
(17, 14),
(17, 19),
(18, 17),
(18, 25),
(18, 26),
(19, 21),
(19, 16),
(19, 19),
(20, 10),
(20, 8),
(20, 18),
(21, 24),
(21, 27),
(21, 30),
(22, 25),
(22, 13),
(22, 3),
(23, 9),
(23, 14),
(23, 7),
(24, 25),
(24, 2),
(24, 27),
(25, 28),
(25, 29),
(25, 21),
(26, 9),
(26, 27),
(26, 15),
(27, 14),
(27, 18),
(27, 4),
(28, 17),
(28, 1),
(28, 13),
(29, 2),
(29, 20),
(29, 16),
(30, 4),
(30, 3),
(30, 8);

insert into attending (doctor_id, patient_id)
values
(1, 9),
(1, 27),
(1, 17),
(1, 10),
(1, 24),
(1, 30),
(1, 8),
(1, 16),
(1, 26),
(2, 23),
(2, 11),
(2, 25),
(2, 20),
(2, 2),
(2, 29),
(2, 30),
(2, 15),
(2, 8),
(3, 13),
(3, 19),
(3, 3),
(3, 4),
(3, 5),
(3, 14),
(3, 28),
(3, 14),
(3, 29),
(4, 16),
(4, 7),
(4, 8),
(4, 9),
(4, 7),
(4, 5),
(4, 30),
(4, 18),
(4, 27),
(5, 4),
(5, 25),
(5, 26),
(5, 11),
(5, 28),
(5, 6),
(5, 28),
(5, 15),
(5, 1),
(6, 21),
(6, 20),
(6, 22),
(6, 17),
(6, 26),
(6, 11),
(6, 22),
(6, 18),
(6, 25),
(7, 3),
(7, 24),
(7, 1),
(7, 29),
(7, 12),
(7, 10),
(7, 23),
(7, 5),
(7, 6),
(8, 16),
(8, 10),
(8, 2),
(8, 23),
(8, 22),
(8, 20),
(8, 4),
(8, 21),
(8, 9),
(9, 13),
(9, 2),
(9, 12),
(9, 7),
(9, 19),
(9, 6),
(9, 3),
(9, 17),
(9, 21),
(10, 19),
(10, 24),
(10, 27),
(10, 1),
(10, 18),
(10, 12),
(10, 15),
(10, 13),
(10, 14);

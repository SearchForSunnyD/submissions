-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE galaxies
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE bodies
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    body_type text not null,
    orbital_period_in_years FLOAT NOT NULL,
    orbits_around INTEGER REFERENCES orbital_reference (id),
    galaxy INTEGER REFERENCES galaxies (id),
    moons INTEGER REFERENCES orbital_reference (id)
);

CREATE TABLE orbital_reference
(
    id SERIAL PRIMARY KEY,
    base_body INTEGER REFERENCES bodies (id),
    orbital_body INTEGER REFERENCES bodies (id)
);



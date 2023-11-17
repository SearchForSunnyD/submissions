-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE locale
(
    id SERIAL PRIMARY KEY,
    country TEXT NOT NULL,
    state_province TEXT,
    city TEXT NOT NULL
);

CREATE TABLE airlines
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
)

CREATE TABLE tickets
(
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    seat TEXT NOT NULL,
    departure TIMESTAMP NOT NULL,
    arrival TIMESTAMP NOT NULL,
    airline INTEGER REFERENCES airlines (id),
    departing INTEGER REFERENCES locale (id),
    destination INTEGER REFERENCES locale (id)
);

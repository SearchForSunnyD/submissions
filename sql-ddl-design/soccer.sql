-- ### **Part Three: Soccer League**

-- Design a schema for a simple sports league. Your schema should keep track of

-- - All of the teams in the league
-- - All of the goals scored by every player for each game
-- - All of the players in the league and their corresponding teams
-- - All of the referees who have been part of each game
-- - All of the matches played between teams
-- - All of the start and end dates for season that a league has
-- - The standings/rankings of each team in the league (This doesn’t have to be its own table if the data can be captured somehow).

-- ##

DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league

CREATE TABLE teams
(
    id SERIAL PRIMARY KEY,
    team_name TEXT NOT NULL;
)

CREATE TABLE players
(
    id SERIAL PRIMARY KEY,
    player_name TEXT NOT NULL,
    team_id INTEGER REFERENCES teams (id);
)

CREATE TABLE matches
(
    id SERIAL PRIMARY KEY,
    home_team_id INTEGER REFERENCES teams (id),
    away_team_id INTEGER REFERENCES teams (id);
)

CREATE TABLE referees
(
    id SERIAL PRIMARY KEY,
    referee_name TEXT NOT NULL;
)

CREATE TABLE match_referees
(
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches (id),
    referee_id INTEGER REFERENCES referees (id);
)

CREATE TABLE goals
(
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players (id),
    match_id INTEGER REFERENCES matches (id);
)

CREATE TABLE seasons
(
    id SERIAL PRIMARY KEY,
    season_start_date DATE,
    season_end_date DATE DEFAULT DATE_ADD(season_start_date, INTERVAL 6 WEEK);
)

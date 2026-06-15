CREATE DATABASE IF NOT EXISTS FUTDATA;
USE FUTDATA;



-- USERS

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(150) NOT NULL UNIQUE,
password_hash VARCHAR(255) NOT NULL,
type VARCHAR(50) DEFAULT 'user',
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
is_active TINYINT(1) DEFAULT 1,
last_access DATETIME NULL
);

-- TEAMS

CREATE TABLE teams (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL UNIQUE,
continent VARCHAR(50),
head_coach VARCHAR(100),
flag VARCHAR(255)
);

-- STADIUMS

CREATE TABLE stadiums (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
city VARCHAR(100),
country VARCHAR(100),
capacity INT,


CONSTRAINT unique_stadium
    UNIQUE (name, city)


);

-- PLAYERS

CREATE TABLE players (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
surname VARCHAR(100) NOT NULL,
age INT,
height DECIMAL(4,2),
weight DECIMAL(5,2),
position VARCHAR(50),
team_outside_the_world_cup VARCHAR(100),
date_of_debut DATE,
jersey_number INT,
goals INT DEFAULT 0,
assists INT DEFAULT 0,
matches_played INT DEFAULT 0,
photo VARCHAR(255),
team_id INT,


CONSTRAINT fk_players_team
    FOREIGN KEY (team_id)
    REFERENCES teams(id),

CONSTRAINT unique_player_team
    UNIQUE (name, surname, team_id)


);
-- MATCHES

CREATE TABLE matches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stage VARCHAR(50),
    home_team_id INT,
    away_team_id INT,
    home_score INT DEFAULT 0,
    away_score INT DEFAULT 0,
    match_date DATETIME,
    stadiums_id INT,
    checked TINYINT(1) DEFAULT 0,

    CONSTRAINT unique_match
        UNIQUE (home_team_id, away_team_id, match_date),

    FOREIGN KEY (home_team_id) REFERENCES teams(id),
    FOREIGN KEY (away_team_id) REFERENCES teams(id),
    FOREIGN KEY (stadiums_id) REFERENCES stadiums(id)
);
-- VIEW

CREATE VIEW vw_players AS
SELECT
p.id,
CONCAT(p.name, ' ', p.surname) AS player,
p.age,
p.position,
p.jersey_number,
p.goals,
p.assists,
p.matches_played,
t.name AS team
FROM players p
INNER JOIN teams t
ON p.team_id = t.id;

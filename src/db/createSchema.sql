DROP DATABASE CINEMAEXPRESS;
CREATE DATABASE IF NOT EXISTS CINEMAEXPRESS;
USE CINEMAEXPRESS;

CREATE TABLE IF NOT EXISTS USER(
	id VARCHAR(255),
    name VARCHAR(255),
    email VARCHAR(255),
    ph_num INT(10),
    dob DATE,
    passwd VARCHAR(255),
    gender enum('MALE', 'FEMALE'),
    PRIMARY KEY(user_id)
);

CREATE TABLE IF NOT EXISTS THEATER(
	the_id CHAR(5),
    name VARCHAR(255),
    city VARCHAR(10),
    address VARCHAR(255),
    PRIMARY KEY(the_id)
);

CREATE TABLE IF NOT EXISTS MOVIE(
	movie_id CHAR(5),
    poster BLOB,
    title VARCHAR(255),
    description TEXT,
    duration TIME,
    castl CHAR(5),
	agerating enum('U+','UA+','A+','S'),
    pubyear YEAR,
    rating FLOAT(2, 1),
    PRIMARY KEY(movie_id)
);

CREATE TABLE IF NOT EXISTS SCREEN(
	screen_id CHAR(5),
    the_id CHAR(5),
    resolution enum('4D', '3D', '2D'),
    PRIMARY KEY(screen_id, the_id),
    FOREIGN KEY(the_id) REFERENCES THEATER(the_id)
);

CREATE TABLE IF NOT EXISTS BOOKED_SEAT(
	seat_row CHAR(1),
	seat_col CHAR(2),
    screen_id CHAR(5),
    the_id CHAR(5),
	booked_time TIMESTAMP,
    PRIMARY KEY(seat_row, seat_col, screen_id, the_id),
    FOREIGN KEY(screen_id) REFERENCES SCREEN(screen_id),
    FOREIGN KEY(the_id) REFERENCES THEATER(the_id)
);

CREATE TABLE IF NOT EXISTS PAYMENTS(
	p_id CHAR(5),
    amount INT,
    method enum('CARD', 'UPI'),
    tran_id INT,
    book_id CHAR(5),
    PRIMARY KEY(p_id)
);

CREATE TABLE IF NOT EXISTS HOSTMOVIE(
	the_id CHAR(5),
    screen_id CHAR(5),
    movie_id CHAR(5),
    showtime CHAR(8),
    PRIMARY KEY(the_id, screen_id, movie_id, showtime)
);

CREATE TABLE IF NOT EXISTS BOOKING(
	book_id CHAR(5),
    movie_id CHAR(5),
	screen_id CHAR(5),
    the_id CHAR(5),
    user_id VARCHAR(255),
    showtime TIME,
    bookdate DATE,
    seats VARCHAR(255),
    PRIMARY KEY(book_id),
    FOREIGN KEY(screen_id) REFERENCES SCREEN(screen_id),
    FOREIGN KEY(the_id) REFERENCES THEATER(the_id),
    FOREIGN KEY(movie_id) REFERENCES MOVIE(movie_id),
    FOREIGN KEY(user_id) REFERENCES USER(user_id)
);

CREATE TABLE IF NOT EXISTS CASTS(
	cast_id CHAR(5),
    name VARCHAR(255),
    role enum('Director', 'Actor', 'Producer', 'Music Director', 'Editor'),
    photo BLOB,
    PRIMARY KEY(cast_id)
);

CREATE TABLE IF NOT EXISTS MOVIECAST(
	movie_id CHAR(5),
    cast_id CHAR(5),
    PRIMARY KEY(movie_id, cast_id),
    FOREIGN KEY(movie_id) REFERENCES MOVIE(movie_id),
    FOREIGN KEY(cast_id) REFERENCES CASTS(cast_id)
);

CREATE TABLE MOVIEGENRE(
	movie_id CHAR(5),
	genre_name CHAR(5),
    PRIMARY KEY(movie_id, genre_name),
    FOREIGN KEY(movie_id) REFERENCES MOVIE(movie_id)
);

CREATE TABLE MOVIELANG(
	movie_id CHAR(5),
    lang VARCHAR(10),
    PRIMARY KEY(movie_id, lang),
    FOREIGN KEY(movie_id) REFERENCES MOVIE(movie_id)
);

ALTER TABLE PAYMENTS ADD CONSTRAINT relateUser FOREIGN KEY(book_id) REFERENCES BOOKING(book_id);
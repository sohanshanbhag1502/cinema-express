-- CreateTable
CREATE TABLE `User` (
    `user_id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phNum` CHAR(10) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `passwd` VARCHAR(255) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Theater` (
    `the_id` CHAR(5) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `city` VARCHAR(10) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`the_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Movie` (
    `movie_id` CHAR(5) NOT NULL,
    `poster` BLOB NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `duration` TIME NOT NULL,
    `castl` CHAR(5) NOT NULL,
    `ageRating` ENUM('U+', 'UA+', 'A+', 'S') NOT NULL,
    `pubYear` YEAR NOT NULL,
    `rating` FLOAT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`movie_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Screen` (
    `screen_id` CHAR(5) NOT NULL,
    `the_id` CHAR(5) NOT NULL,
    `resolution` ENUM('4D', '3D', '2D') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`screen_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookedSeat` (
    `seatRow` CHAR(1) NOT NULL,
    `seatCol` CHAR(2) NOT NULL,
    `screen_id` CHAR(5) NOT NULL,
    `the_id` CHAR(5) NOT NULL,
    `bookedTime` TIMESTAMP NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`seatRow`, `seatCol`, `screen_id`, `the_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `p_id` CHAR(5) NOT NULL,
    `amount` INTEGER NOT NULL,
    `method` ENUM('CARD', 'UPI') NOT NULL,
    `tranId` INTEGER NOT NULL,
    `book_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`p_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HostMovie` (
    `the_id` CHAR(5) NOT NULL,
    `screen_id` CHAR(5) NOT NULL,
    `movie_id` CHAR(5) NOT NULL,
    `showtime` CHAR(8) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`the_id`, `screen_id`, `movie_id`, `showtime`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `book_id` CHAR(5) NOT NULL,
    `movie_id` CHAR(5) NOT NULL,
    `screen_id` CHAR(5) NOT NULL,
    `the_id` CHAR(5) NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `showtime` TIME NOT NULL,
    `bookdate` DATE NOT NULL,
    `seats` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cast` (
    `cast_id` CHAR(5) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `role` ENUM('Director', 'Actor', 'Producer', 'MusicDirector', 'Editor') NOT NULL,
    `photo` BLOB NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`cast_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovieCast` (
    `movie_id` CHAR(5) NOT NULL,
    `cast_id` CHAR(5) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`movie_id`, `cast_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovieGenre` (
    `movie_id` CHAR(5) NOT NULL,
    `genreName` CHAR(5) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`movie_id`, `genreName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovieLang` (
    `movie_id` CHAR(5) NOT NULL,
    `lang` VARCHAR(10) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`movie_id`, `lang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Screen` ADD CONSTRAINT `Screen_the_id_fkey` FOREIGN KEY (`the_id`) REFERENCES `Theater`(`the_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookedSeat` ADD CONSTRAINT `BookedSeat_screen_id_fkey` FOREIGN KEY (`screen_id`) REFERENCES `Screen`(`screen_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookedSeat` ADD CONSTRAINT `BookedSeat_the_id_fkey` FOREIGN KEY (`the_id`) REFERENCES `Theater`(`the_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Booking`(`book_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HostMovie` ADD CONSTRAINT `HostMovie_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movie`(`movie_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HostMovie` ADD CONSTRAINT `HostMovie_screen_id_fkey` FOREIGN KEY (`screen_id`) REFERENCES `Screen`(`screen_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HostMovie` ADD CONSTRAINT `HostMovie_the_id_fkey` FOREIGN KEY (`the_id`) REFERENCES `Theater`(`the_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movie`(`movie_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_screen_id_fkey` FOREIGN KEY (`screen_id`) REFERENCES `Screen`(`screen_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_the_id_fkey` FOREIGN KEY (`the_id`) REFERENCES `Theater`(`the_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieCast` ADD CONSTRAINT `MovieCast_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movie`(`movie_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieCast` ADD CONSTRAINT `MovieCast_cast_id_fkey` FOREIGN KEY (`cast_id`) REFERENCES `Cast`(`cast_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieGenre` ADD CONSTRAINT `MovieGenre_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movie`(`movie_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieLang` ADD CONSTRAINT `MovieLang_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movie`(`movie_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

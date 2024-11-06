/*
  Warnings:

  - You are about to alter the column `bookedTime` on the `bookedseat` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - The primary key for the `moviegenre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `genreName` on the `moviegenre` table. The data in that column could be lost. The data in that column will be cast from `Char(5)` to `Enum(EnumId(6))`.
  - The primary key for the `movielang` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `lang` on the `movielang` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `Enum(EnumId(7))`.

*/
-- AlterTable
ALTER TABLE `bookedseat` MODIFY `bookedTime` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `moviegenre` DROP PRIMARY KEY,
    MODIFY `genreName` ENUM('Comedy', 'Drama', 'Action', 'Thriller', 'Horror', 'Romance', 'SciFi', 'Fantasy', 'Adventure', 'Mystery', 'Crime', 'Documentary', 'History', 'Animation', 'Fiction', 'Biography') NOT NULL,
    ADD PRIMARY KEY (`movie_id`, `genreName`);

-- AlterTable
ALTER TABLE `movielang` DROP PRIMARY KEY,
    MODIFY `lang` ENUM('English', 'Hindi', 'Telugu', 'Kannada', 'Tamil', 'Malayalam', 'Marathi') NOT NULL,
    ADD PRIMARY KEY (`movie_id`, `lang`);

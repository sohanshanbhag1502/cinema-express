/*
  Warnings:

  - The primary key for the `bookedseat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `bookedTime` on the `bookedseat` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `bookedseat` DROP PRIMARY KEY,
    MODIFY `bookedTime` DATETIME NOT NULL,
    ADD PRIMARY KEY (`seatRow`, `seatCol`, `the_id`, `movie_id`, `bookedTime`);

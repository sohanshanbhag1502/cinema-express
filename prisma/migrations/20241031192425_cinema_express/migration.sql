/*
  Warnings:

  - The primary key for the `bookedseat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `movie_id` to the `BookedSeat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bookedseat` DROP PRIMARY KEY,
    ADD COLUMN `movie_id` CHAR(5) NOT NULL,
    MODIFY `bookedTime` DATETIME NOT NULL,
    ADD PRIMARY KEY (`seatRow`, `seatCol`, `screen_id`, `the_id`, `movie_id`, `bookedTime`);

-- AlterTable
ALTER TABLE `booking` MODIFY `showtime` CHAR(8) NOT NULL;

-- AddForeignKey
ALTER TABLE `BookedSeat` ADD CONSTRAINT `BookedSeat_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movie`(`movie_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

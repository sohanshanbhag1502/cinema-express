/*
  Warnings:

  - The primary key for the `bookedseat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `screen_id` on the `bookedseat` table. All the data in the column will be lost.
  - You are about to alter the column `bookedTime` on the `bookedseat` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `bookedseat` DROP FOREIGN KEY `BookedSeat_screen_id_fkey`;

-- AlterTable
ALTER TABLE `bookedseat` DROP PRIMARY KEY,
    DROP COLUMN `screen_id`,
    ADD COLUMN `screenScreenId` CHAR(5) NULL,
    MODIFY `bookedTime` DATETIME NOT NULL,
    ADD PRIMARY KEY (`seatRow`, `seatCol`, `the_id`, `movie_id`, `bookedTime`);

-- CreateTable
CREATE TABLE `MovieScreen` (
    `movie_id` CHAR(5) NOT NULL,
    `screen_id` CHAR(5) NOT NULL,
    `resolution` ENUM('4D', '3D', '2D') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`movie_id`, `screen_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookedSeat` ADD CONSTRAINT `BookedSeat_screenScreenId_fkey` FOREIGN KEY (`screenScreenId`) REFERENCES `Screen`(`screen_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieScreen` ADD CONSTRAINT `MovieScreen_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movie`(`movie_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieScreen` ADD CONSTRAINT `MovieScreen_screen_id_fkey` FOREIGN KEY (`screen_id`) REFERENCES `Screen`(`screen_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

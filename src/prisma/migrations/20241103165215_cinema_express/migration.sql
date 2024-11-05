/*
  Warnings:

  - The primary key for the `bookedseat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `bookedTime` on the `bookedseat` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `screenScreenId` on the `booking` table. All the data in the column will be lost.
  - Added the required column `screenId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_screenScreenId_fkey`;

-- AlterTable
ALTER TABLE `bookedseat` DROP PRIMARY KEY,
    MODIFY `bookedTime` DATETIME NOT NULL,
    ADD PRIMARY KEY (`seatRow`, `seatCol`, `the_id`, `movie_id`, `bookedTime`);

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `screenScreenId`,
    ADD COLUMN `screenId` CHAR(5) NOT NULL;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_screenId_fkey` FOREIGN KEY (`screenId`) REFERENCES `Screen`(`screen_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

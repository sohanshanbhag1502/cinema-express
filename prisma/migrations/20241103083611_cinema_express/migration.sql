/*
  Warnings:

  - The primary key for the `bookedseat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `screenScreenId` on the `bookedseat` table. All the data in the column will be lost.
  - You are about to alter the column `bookedTime` on the `bookedseat` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `screen_id` on the `booking` table. All the data in the column will be lost.
  - The primary key for the `payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `p_id` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `tranId` on the `payment` table. All the data in the column will be lost.
  - Added the required column `book_id` to the `BookedSeat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screenId` to the `BookedSeat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tran_id` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bookedseat` DROP FOREIGN KEY `BookedSeat_screenScreenId_fkey`;

-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_screen_id_fkey`;

-- AlterTable
ALTER TABLE `bookedseat` DROP PRIMARY KEY,
    DROP COLUMN `screenScreenId`,
    ADD COLUMN `book_id` CHAR(5) NOT NULL,
    ADD COLUMN `screenId` CHAR(5) NOT NULL,
    MODIFY `bookedTime` DATETIME NOT NULL,
    ADD PRIMARY KEY (`seatRow`, `seatCol`, `the_id`, `movie_id`, `bookedTime`);

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `screen_id`,
    ADD COLUMN `screenScreenId` CHAR(5) NULL,
    MODIFY `seats` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `payment` DROP PRIMARY KEY,
    DROP COLUMN `p_id`,
    DROP COLUMN `tranId`,
    ADD COLUMN `tran_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`tran_id`);

-- AddForeignKey
ALTER TABLE `BookedSeat` ADD CONSTRAINT `BookedSeat_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Booking`(`book_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookedSeat` ADD CONSTRAINT `BookedSeat_screenId_fkey` FOREIGN KEY (`screenId`) REFERENCES `Screen`(`screen_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_screenScreenId_fkey` FOREIGN KEY (`screenScreenId`) REFERENCES `Screen`(`screen_id`) ON DELETE SET NULL ON UPDATE CASCADE;

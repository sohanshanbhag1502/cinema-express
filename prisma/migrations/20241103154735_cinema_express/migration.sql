/*
  Warnings:

  - The primary key for the `bookedseat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `bookedTime` on the `bookedseat` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The values [CARD] on the enum `Payment_method` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `book_id` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(5)`.
  - Added the required column `biolink` to the `Cast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost` to the `HostMovie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_book_id_fkey`;

-- AlterTable
ALTER TABLE `bookedseat` DROP PRIMARY KEY,
    MODIFY `bookedTime` DATETIME NOT NULL,
    ADD PRIMARY KEY (`seatRow`, `seatCol`, `the_id`, `movie_id`, `bookedTime`);

-- AlterTable
ALTER TABLE `cast` ADD COLUMN `biolink` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `hostmovie` ADD COLUMN `cost` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `method` ENUM('UPI', 'Credit Card', 'Debit Card', 'Net Banking') NOT NULL,
    MODIFY `book_id` CHAR(5) NOT NULL;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Booking`(`book_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

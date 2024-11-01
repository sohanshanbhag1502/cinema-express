/*
  Warnings:

  - You are about to alter the column `bookedTime` on the `bookedseat` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `photo` on the `cast` table. All the data in the column will be lost.
  - You are about to drop the column `poster` on the `movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `bookedseat` MODIFY `bookedTime` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `cast` DROP COLUMN `photo`;

-- AlterTable
ALTER TABLE `movie` DROP COLUMN `poster`;

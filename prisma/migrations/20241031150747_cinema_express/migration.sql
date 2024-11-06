/*
  Warnings:

  - You are about to alter the column `bookedTime` on the `bookedseat` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `castl` on the `movie` table. All the data in the column will be lost.
  - Added the required column `ratingCount` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bookedseat` MODIFY `bookedTime` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `movie` DROP COLUMN `castl`,
    ADD COLUMN `ratingCount` INTEGER NOT NULL,
    MODIFY `duration` VARCHAR(10) NOT NULL;

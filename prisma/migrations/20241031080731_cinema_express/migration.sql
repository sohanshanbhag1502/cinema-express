/*
  Warnings:

  - You are about to alter the column `bookedTime` on the `bookedseat` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `bookedseat` MODIFY `bookedTime` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `dob` DATE NOT NULL;

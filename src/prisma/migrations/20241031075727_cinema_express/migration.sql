/*
  Warnings:

  - You are about to alter the column `bookedTime` on the `bookedseat` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - The values [MALE,FEMALE] on the enum `User_gender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `bookedseat` MODIFY `bookedTime` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `gender` ENUM('Male', 'Female') NOT NULL;

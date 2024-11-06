/*
  Warnings:

  - You are about to alter the column `bookedTime` on the `bookedseat` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `city` on the `theater` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `bookedseat` MODIFY `bookedTime` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `theater` MODIFY `city` ENUM('Bengaluru', 'Chennai', 'Chandigarh', 'Delhi', 'Hyderabad', 'Pune', 'Mumbai', 'Kochi', 'Trivandrum') NOT NULL;

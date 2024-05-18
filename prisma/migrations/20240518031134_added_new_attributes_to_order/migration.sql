-- AlterTable
ALTER TABLE `orders` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `isComplete` BOOLEAN NOT NULL DEFAULT false;

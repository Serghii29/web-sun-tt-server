-- AlterTable
ALTER TABLE `article` ADD COLUMN `category` VARCHAR(191) NULL,
    MODIFY `author` VARCHAR(191) NULL,
    MODIFY `title` VARCHAR(191) NULL,
    MODIFY `text` VARCHAR(191) NULL,
    MODIFY `time` VARCHAR(191) NULL;

ALTER TABLE `occupies` MODIFY COLUMN `start_time` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `occupies` MODIFY COLUMN `end_time` timestamp;
ALTER TABLE `occupies` RENAME COLUMN `vehicle_id` TO `vehicle_number`;--> statement-breakpoint
ALTER TABLE `occupies` DROP FOREIGN KEY `occupies_vehicle_id_vehicle_number_fk`;
--> statement-breakpoint
ALTER TABLE `occupies` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `occupies` ADD PRIMARY KEY(`vehicle_number`);--> statement-breakpoint
ALTER TABLE `occupies` ADD CONSTRAINT `occupies_vehicle_number_vehicle_number_fk` FOREIGN KEY (`vehicle_number`) REFERENCES `vehicle`(`number`) ON DELETE no action ON UPDATE no action;
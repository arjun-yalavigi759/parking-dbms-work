CREATE TABLE `occupies` (
	`vehicle_id` varchar(256) NOT NULL,
	`slot_id` int NOT NULL,
	`start_time` int NOT NULL,
	`end_time` int,
	CONSTRAINT `occupies_vehicle_id` PRIMARY KEY(`vehicle_id`)
);
--> statement-breakpoint
CREATE TABLE `parking_lot` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`address` varchar(256) NOT NULL,
	CONSTRAINT `parking_lot_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `parking_slot` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lot_id` int NOT NULL,
	`slot_id` int NOT NULL,
	CONSTRAINT `parking_slot_id` PRIMARY KEY(`id`),
	CONSTRAINT `parking_slot_lot_id_slot_id_unique` UNIQUE(`lot_id`,`slot_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`phone_num` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`password` varchar(256) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_phone_num_unique` UNIQUE(`phone_num`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `vehicle` (
	`number` varchar(256) NOT NULL,
	`type` enum('car','bike','truck') NOT NULL,
	`user_id` int NOT NULL,
	CONSTRAINT `vehicle_number` PRIMARY KEY(`number`)
);
--> statement-breakpoint
ALTER TABLE `occupies` ADD CONSTRAINT `occupies_vehicle_id_vehicle_number_fk` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle`(`number`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `occupies` ADD CONSTRAINT `occupies_slot_id_parking_slot_id_fk` FOREIGN KEY (`slot_id`) REFERENCES `parking_slot`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `parking_slot` ADD CONSTRAINT `parking_slot_lot_id_parking_lot_id_fk` FOREIGN KEY (`lot_id`) REFERENCES `parking_lot`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `vehicle` ADD CONSTRAINT `vehicle_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
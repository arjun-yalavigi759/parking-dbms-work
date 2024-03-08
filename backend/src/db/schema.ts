import { int, mysqlEnum, mysqlTable, timestamp, unique, varchar } from "drizzle-orm/mysql-core"

export const parkingLot = mysqlTable("parking_lot", {
    id: int("id")
        .primaryKey()
        .autoincrement(),
    name: varchar("name", { length: 256 })
        .notNull(),
    address: varchar("address", { length: 256 })
        .notNull(),
});

export const occupies = mysqlTable("occupies", {
    vehicleNumber: varchar("vehicle_number", { length: 256 })
        .primaryKey()
        .references(() => vehicle.number),
    slotId: int("slot_id")
        .references(() => parkingSlot.id)
        .notNull(),
    startTime: timestamp("start_time").defaultNow(),
    endTime: timestamp("end_time"),
})

export const parkingSlot = mysqlTable("parking_slot", {
    id: int("id")
        .primaryKey()
        .autoincrement(),
    lotId: int("lot_id")
        .references(() => parkingLot.id)
        .notNull(),
    slotNum: int("slot_id")
        .notNull(),
}, (table) => {
    return {
        unique: unique().on(table.lotId, table.slotNum),
    }
})

export const users = mysqlTable("users", {
    id: int("id")
        .primaryKey()
        .autoincrement(),
    name: varchar("name", { length: 256 })
        .notNull(),
    phoneNum: varchar("phone_num", { length: 256 })
        .notNull()
        .unique(),
    email: varchar("email", { length: 256 })
        .notNull()
        .unique(),
    password: varchar("password", { length: 256 })
        .notNull(),
})

export const vehicle = mysqlTable("vehicle", {
    number: varchar("number", { length: 256 })
        .primaryKey(),
    type: mysqlEnum("type", ["car", "bike", "truck"])
        .notNull(),
    userId: int("user_id")
        .references(() => users.id)
        .notNull(),
})
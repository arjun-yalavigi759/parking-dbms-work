import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { db } from './db/connection'
import { occupies, parkingLot, parkingSlot, users, vehicle } from './db/schema'
import { cors } from 'hono/cors'
import { and, eq, notInArray } from 'drizzle-orm'
import { MongoClient } from 'mongodb'

const app = new Hono()

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

client.connect().then(() => {
  console.log('Connected to MongoDB')
}).catch((e) => {
  console.error(e)
})

const mongoDB = client.db('parking')

const feedbackCollection = mongoDB.collection('feedback')

app.use('/*', cors())

app.post("/signup", async (ctx) => {
  try {
    const body = await ctx.req.json()

    await db.insert(users).values({
      name: body.name,
      phoneNum: body.phone,
      email: body.email,
      password: body.passwd,
    })

    ctx.status(201) // Created

    return ctx.json({ message: "User created successfully" })

  } catch (e) {
    console.error(e)
  }
})

app.get("/parking_lots", async (ctx) => {
  try {
    const parkingLots = await db.select({
      id: parkingLot.id,
      name: parkingLot.name,
    }).from(parkingLot)

    return ctx.json(parkingLots)

  } catch (e) {
    console.error(e)
  }
})

app.get("/empty_parking_slots/:lot_id", async (ctx) => {
  try {
    const emptySlots = await db.select({
      id: parkingSlot.id,
      slotNum: parkingSlot.slotNum,
    })
      .from(parkingSlot)
      .where(
        and(
          eq(parkingSlot.lotId, parseInt(ctx.req.param("lot_id"))),
          notInArray(parkingSlot.id, db.select({ id: occupies.slotId }).from(occupies))
        )
      )

    return ctx.json(emptySlots)

  } catch (e) {
    console.error(e)
  }
})

app.post("/park", async (ctx) => {
  try {
    const body = await ctx.req.json()

    const userId = await db.select({ id: users.id }).from(users).where(eq(users.phoneNum, body.phone))

    await db.transaction(async (tx) => {
      await tx.insert(vehicle).values({
        number: body.vehicleNumber,
        type: body.vehicleType,
        userId: userId[0].id,
      })

      await tx.insert(occupies).values({
        vehicleNumber: body.vehicleNumber,
        slotId: body.parkingSlotId,
      })
    })

    ctx.status(201)

    return ctx.json({ message: "Parked successfully" })

  } catch (e) {
    console.error(e)
  }
})

app.post("/take", async (ctx) => {
  try {
    const body = await ctx.req.json()

    const occupied = await db.select()
      .from(occupies)
      .where(eq(occupies.vehicleNumber, body.vehicleNumber))

    const seconds = (new Date().getTime() - occupied[0].startTime!.getTime()) / 1000

    await db.delete(occupies).where(eq(occupies.vehicleNumber, body.vehicleNumber))

    ctx.status(200)

    return ctx.json({
      message: "Vehicle taken successfully",
      durationInSeconds: seconds
    })

  } catch (e) {
    console.error(e)
  }
})

app.post("/feedback", async (ctx) => {
  try {
    const body = await ctx.req.json()

    await feedbackCollection.insertOne({
      phone: body.phone,
      rating: body.rating,
      feedback: body.feedback
    })

    return ctx.json({ message: "Feedback submitted successfully" })
  } catch (e) {
    console.error(e)
  }
})

app.notFound((c) => {
  return c.text('Custom 404 Message', 404)
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})

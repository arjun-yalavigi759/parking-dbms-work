import { RouteNames } from "@/constants/route_names"
import { Button } from "@/shadcn/components/ui/button"
import { Input } from "@/shadcn/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/components/ui/select"
import { Label } from "@radix-ui/react-label"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface ParkingLot {
    id: number
    name: string
}

interface ParkingSlot {
    id: number
    slotNum: number
}

type VehicleType = "car" | "bike" | "truck"

function ParkPage() {
    const navigate = useNavigate()

    const [phone, setPhone] = useState("")
    const [passwd, setPasswd] = useState("")
    const [vehicleNumber, setVehicleNumber] = useState("")
    const [vehicleType, setVehicleType] = useState<VehicleType | undefined>(undefined)

    const [parkingLots, setParkingLots] = useState<ParkingLot[]>([])
    const [selectedParkingLotId, setSelectedParkingLotId] = useState<number|null>(null)
    const [parkingSlots, setParkingSlots] = useState<ParkingSlot[]>([])
    const [selectedParkingSlotId, setSelectedParkingSlotId] = useState<number|null>(null)

    async function fetchParkingLots() {
        const res = await fetch("http://localhost:3000/parking_lots")
        const data: ParkingLot[] = await res.json()

        console.log(data)

        setParkingLots(data)
    }

    async function fetchParkingSlots(parkingLotId: number) {
        const res = await fetch(`http://localhost:3000/empty_parking_slots/${parkingLotId}`)
        const data: ParkingSlot[] = await res.json()
        setParkingSlots(data)
        setSelectedParkingSlotId(null)
    }

    async function handlePark() {
        await fetch("http://localhost:3000/park", {
            method: 'POST',
            body: JSON.stringify({ 
                phone, 
                passwd,
                vehicleNumber,
                vehicleType, 
                parkingSlotId: selectedParkingSlotId 
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        navigate(RouteNames.HOME)
    }

    useEffect(() => {
        fetchParkingLots()
    }, [])

    useEffect(() => {
        if (selectedParkingLotId) {
            fetchParkingSlots(selectedParkingLotId)
        }
    }, [selectedParkingLotId])

    return (
        <div className=" flex items-center justify-center h-[100vh]">
            <div className=" flex flex-col items-center gap-4">
                <p className=" text-2xl">Park</p>
                <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input placeholder="Phone Number" id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="passwd">Password</Label>
                    <Input placeholder="Password" id="passwd" type="password" value={passwd} onChange={e => setPasswd(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="parking_lot">Parking Lot</Label>
                    <Select onValueChange={e => setSelectedParkingLotId(parseInt(e))} value={selectedParkingLotId?.toString()}>
                        <SelectTrigger id="parking_lot" className="w-[180px]">
                            <SelectValue placeholder="Select a Parking Lot" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                parkingLots.length > 0 ? (
                                    parkingLots.map(parkingLot => (
                                        <SelectItem key={parkingLot.id} value={parkingLot.id.toString()}>{parkingLot.name}</SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="loading">Loading...</SelectItem>
                                )
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="parking_slot">Parking Slot</Label>
                    <Select onValueChange={e => setSelectedParkingSlotId(parseInt(e))} value={selectedParkingSlotId?.toString()}>
                        <SelectTrigger id="parking_slot" className="w-[180px]">
                            <SelectValue placeholder="Select a Parking Slot" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                selectedParkingLotId == null ? (
                                    <SelectItem value="select_parking_lot">Select a Parking Lot first</SelectItem>
                                ) : parkingSlots.length > 0 ? (
                                        parkingSlots.map(parkingSlot => (
                                            <SelectItem key={parkingSlot.id} value={parkingSlot.id.toString()}>{parkingSlot.slotNum}</SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="loading">Loading...</SelectItem>
                                    )
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="vehicle_number">Vehicle Number</Label>
                    <Input placeholder="Vehicle Number" id="vehicle_number" value={vehicleNumber} onChange={e => setVehicleNumber(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="vehicle_type">Vehicle Type</Label>
                    <Select onValueChange={e => setVehicleType(e as VehicleType)} value={vehicleType}>
                        <SelectTrigger id="vehicle_type" className="w-[180px]">
                            <SelectValue placeholder="Select a Vehicle Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="car">Car</SelectItem>
                            <SelectItem value="bike">Bike</SelectItem>
                            <SelectItem value="truck">Truck</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={handlePark}>Park</Button>
            </div>
        </div>
    )
}

export default ParkPage
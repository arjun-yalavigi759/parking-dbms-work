import { Button } from "@/shadcn/components/ui/button"
import { Input } from "@/shadcn/components/ui/input"
import { Label } from "@/shadcn/components/ui/label"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function TakePage() {
    const navigate = useNavigate()

    const [phone, setPhone] = useState("")
    const [passwd, setPasswd] = useState("")
    const [vehicleNumber, setVehicleNumber] = useState("")

    async function handleTake() {
        const res = await fetch("http://localhost:3000/take", {
            method: 'POST',
            body: JSON.stringify({ 
                phone, 
                passwd, 
                vehicleNumber 
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()
        const duration = Math.floor(data.durationInSeconds)

        navigate(`/bill/${duration}`)
    }

    return(
        <div className=" flex items-center justify-center h-[100vh]">
            <div className=" flex flex-col items-center gap-4">
                <p className=" text-2xl">Take</p>
                <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input placeholder="Phone Number" id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="passwd">Password</Label>
                    <Input placeholder="Password" id="passwd" type="password" value={passwd} onChange={e => setPasswd(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="vehicle_number">Vehicle Number</Label>
                    <Input placeholder="Vehicle Number" id="vehicle_number" value={vehicleNumber} onChange={e => setVehicleNumber(e.target.value)} />
                </div>
                <Button onClick={handleTake}>Take</Button>
            </div>
        </div>
    )
}

export default TakePage
import { RouteNames } from "@/constants/route_names"
import { Button } from "@/shadcn/components/ui/button"
import { Input } from "@/shadcn/components/ui/input"
import { Label } from "@/shadcn/components/ui/label"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SignupPage() {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [passwd, setPasswd] = useState('')

    async function handleSignup() {
        await fetch("http://localhost:3000/signup", {
            method: 'POST',
            body: JSON.stringify({ name, phone, email, passwd }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        navigate(RouteNames.HOME)
    }

    return (
        <div className=" flex items-center justify-center h-[100vh]">
            <div className=" flex flex-col items-center gap-4">
                <p className=" text-2xl">Signup</p>
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input placeholder="Name" id="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input placeholder="Phone Number" id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input placeholder="Email" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="passwd">Password</label>
                    <Input placeholder="Password" id="passwd" type="password" value={passwd} onChange={e => setPasswd(e.target.value)} />
                </div>

                <Button onClick={handleSignup}>Signup</Button>
            </div>
        </div>
    )
}

export default SignupPage
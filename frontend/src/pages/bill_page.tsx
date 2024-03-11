import qr from "@/assets/qr.png"
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { Textarea } from "@/shadcn/components/ui/textarea";
import { useState } from "react";
import { useParams } from "react-router-dom";

const price_per_minute = 10

function BillPage() {
    let { userPhone, duration } = useParams();

    const [rating, setRating] = useState("")
    const [feedback, setFeedback] = useState("")

    const handleFeedbackSubmit = () => {
        fetch("http://localhost:3000/feedback", {
            method: 'POST',
            body: JSON.stringify({ 
                phone: userPhone,
                rating: rating,
                feedback: feedback
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <div className=" flex flex-row items-center justify-around h-[100vh]">
            <div className=" flex flex-col items-center gap-4">
                <p className=" text-2xl">Bill Page</p>
                <img src={qr} alt="qr_code" />
                <p>Duration: {parseInt(duration!) / 60} mins</p>
                <p>Price to Pay : {parseInt(duration!) / 60 * price_per_minute} Rs</p>
            </div>
            <div className=" flex flex-col items-center gap-4">
                <p className=" text-2xl">Feedback</p>
                <Input placeholder="Enter rating (0-5)" type="number" min={0} max={5} value={rating} onChange={e => setRating(e.target.value)} />
                <Textarea placeholder="Enter your feedback" value={feedback} onChange={e => setFeedback(e.target.value)} />
                <Button onClick={handleFeedbackSubmit}>Submit</Button>
            </div>
        </div>
    )
}

export default BillPage
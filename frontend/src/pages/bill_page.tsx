import qr from "@/assets/qr.png"
import { useParams } from "react-router-dom";

const price_per_minute = 10

function BillPage() {
    let { duration } = useParams();

    return (
        <div className=" flex items-center justify-center h-[100vh]">
            <div className=" flex flex-col items-center gap-4">
                <p className=" text-2xl">Bill Page</p>
                <img src={qr} alt="qr_code" />
                <p>Duration: {parseInt(duration!) / 60} mins</p>
                <p>Price to Pay : {parseInt(duration!) / 60 * price_per_minute} Rs</p>
            </div>
        </div>
    )
}

export default BillPage
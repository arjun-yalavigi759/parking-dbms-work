import logo from "@/assets/parking_logo.png"
import { RouteNames } from "@/constants/route_names"
import { Button } from "@/shadcn/components/ui/button"
import { useNavigate } from "react-router-dom"

function HomePage() {
    const navigate = useNavigate()

    return (
        <div className=" flex flex-col items-center h-[100vh]">
            <div className=" flex flex-row items-center text-[2rem] gap-8">
                <img src={logo} alt="logo" className=" h-[3em]" />
                <p>Smart Parking System</p>
            </div>
            <div className=" flex-grow flex flex-row w-full items-center">
                <Section
                    titleText="New here? Signup"
                    buttonText="Signup"
                    onClick={() => {
                        navigate(RouteNames.SIGNUP)
                    }}
                />
                <Section
                    titleText="Park your vehicle"
                    buttonText="Park"
                    onClick={() => {
                        navigate(RouteNames.PARK)
                    }}
                />
                <Section
                    titleText="Take your vehicle"
                    buttonText="Take"
                    onClick={() => {
                        navigate(RouteNames.TAKE)
                    }}
                />
            </div>
        </div>
    )
}

interface SectionProps {
    titleText: string
    buttonText: string
    onClick?: () => void
}

function Section({ titleText, buttonText, onClick }: SectionProps) {
    return (
        <div className=" flex-grow flex flex-col items-center gap-4">
            <p className=" text-2xl">{titleText}</p>
            <Button onClick={onClick}>{buttonText}</Button>
        </div>
    )
}

export default HomePage
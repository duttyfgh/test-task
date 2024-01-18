import { Link } from "react-router-dom"


const Header = () => {
    return (
        <header className="h-[100px] w-[100%] flex justify-between bg-[#4266b5] items-center text-[#ffffff] px-12 fixed z-30">
            <Link to='/' className="font-bold text-[24px]">TEST TASK</Link>
        </header>
    )
}

export default Header
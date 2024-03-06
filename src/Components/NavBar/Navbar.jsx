import { MyLocation } from "../MyLocation/MyLocation"
import { SearchCity } from "../SearchCity/SearchCity"
import './navbar.css'

export const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <SearchCity />
                <MyLocation />
            </nav>
        </>
    )
}
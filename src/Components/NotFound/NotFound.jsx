import { Link } from "wouter"

export const NotFound = () => {
    return (
        <div className="not-found-div">
            <h2 className="not-found-title"></h2>
            <p>Oppps you are lost</p>
            <Link href={'/location'}> Volver al inicio </Link>
        </div>
    )
}
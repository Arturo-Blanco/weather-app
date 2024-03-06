import { Link } from "wouter"
import { Title } from "react-head"
import './notFound.css'


export const NotFound = () => {
    return (
        <>
            <Title>{'404 Not found'}</Title>
            <div className="error-container">
                <div className="error-title">404</div>
                <div className="not-found"> Page not found</div>
                <div className="error-message">It seems that the storm brought you to the wrong place</div>
                <div className="cloud">&#127783;</div>
                <Link className='home-link' to='/'> Back to home </Link>
            </div>
        </>
    )
}
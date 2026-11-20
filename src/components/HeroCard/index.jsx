import { Link } from 'react-router-dom'

function HeroCard({id, name, image}) {
    return (
        <div className="hero-card">
            <Link to={`hero${id}`}>
                <img src={image} alt={name} referrerPolicy='no-referrer' />
            </Link>
            <h3>{name}</h3>
        </div>
    )
}

export default HeroCard
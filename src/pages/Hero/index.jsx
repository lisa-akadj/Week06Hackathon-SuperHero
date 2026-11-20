import { useParams } from 'react-router-dom'

function Hero() {
    const { id } = useParams()

    return <h1>Hero {id}</h1>
}

export default Hero 
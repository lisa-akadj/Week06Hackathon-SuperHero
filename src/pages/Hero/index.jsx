import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { API_BASE } from '../../api'

function Hero() {
    const { id } = useParams()
    const [hero, setHero] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchHero() {
            try {
                const response = await fetch(`${API_BASE}/${id}`)
                if (!response.ok) {
                    throw new Error('Could not fetch hero')
                }
                const data = await response.json()
                if (data.response === 'error') {
                    throw new Error(data.error)
                }
                setHero(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchHero()
    }, [id])

    if (loading) {
        return <p>Loading hero...</p>
    }

    if (error) {
        return <p>Something went wrong: {error}</p>
    }

    return (
        <div>
            <h1>{hero.name}</h1>

            <div className="hero-page">
                <img src={hero.image.url} alt={hero.name} referrerPolicy="no-referrer" />

                <div>
                    <h2>Powerstats</h2>
                    <ul>
                        {Object.entries(hero.powerstats).map(([stat, value]) => (
                            <li key={stat}>
                                {stat}: {value}
                            </li>
                        ))}
                    </ul>
                    <h2>Connection</h2>
                    <p>
                        <strong>Group affiliation:</strong> {hero.connections['group-affiliation']}
                    </p>
                    <p>
                        <strong>Relatives:</strong> {hero.connections.relatives}
                    </p>
                </div>
            </div>
        </div>)
}

export default Hero 
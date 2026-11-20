import { useState, useEffect } from 'react'
import { API_BASE } from '../../api'
import HeroCard from '../../components/HeroCard'

const HERO_IDS = [502, 70, 644, 620, 346, 720, 149, 332, 659, 717, 107, 263, 38, 101, 213, 44, 55, 66, 77, 11, 22, 33, 88, 99, 100, 501, 500, 71, 645, 621, 347, 721, 150, 333, 660, 718, 108, 264, 39, 102, 214, 45, 56, 67, 78, 12, 23, 34, 89, 105, 103,]

async function fetchHero(id) {
    const response = await fetch(`${API_BASE}/${id}/image`)

    if (!response.ok) {
        throw new Error('Could not fetch heroes')
    }

    const data = await response.json()

    if (data.response === 'error') {
        throw new Error(data.error)
    }

    return data
}

function Home() {
    const [heroes, setHeroes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchHeroes() {
            try {
                const results = await Promise.allSettled(HERO_IDS.map(fetchHero))

                const successful = results
                    .filter((result) => result.status === 'fulfilled')
                    .map((result) => result.value)
                
                if (successful.length === 0) {
                    throw new Error('Could not load any heroes')
                }
                setHeroes(successful)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchHeroes()
    }, [])

    if (loading) {
        return <p>Loading heroes...</p>
    }
    if(error) {
        return <p>Something went wrong: {error}</p>
    }
    return (
        <div>
            <h1>Superheroes</h1>
            <div className="hero-list">
                {heroes.map((hero) => (
                    <HeroCard
                        key={hero.id}
                        id={hero.id}
                        name={hero.name}
                        image={hero.url}
                    />
                ))}
            </div>
        </div>)
}

export default Home
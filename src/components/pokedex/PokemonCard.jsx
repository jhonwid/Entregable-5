import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const pokeLinearGradiendts = {
    grass: "bg-gradient-to-t from-green-100 to-green-600",
    fire: "bg-gradient-to-t from-red-100 to-red-600",  
    water: "bg-gradient-to-t from-blue-300 to-blue-600",
    rock: "bg-gradient-to-t from-gray-300 to-gray-500",
    electric: "bg-gradient-to-t from-yellow-100 to-yellow-600",

    bug: "bg-gradient-to-t from-green-300 to-green-600",
    flying: "bg-gradient-to-t from-white-100 to-white-300",
    poison: "bg-gradient-to-t from-gray-300 to-gray-600",
    normal: "bg-gradient-to-t from-gray-300 to-gray-600",

    ground: "bg-gradient-to-t from-gray-300 to-gray-600",
    fairy: "bg-gradient-to-t from-gray-300 to-gray-600",
    fighting: "bg-gradient-to-t from-gray-300 to-gray-600",

    ghost: "bg-gradient-to-t from-gray-300 to-gray-600",
    steel: "bg-gradient-to-t from-gray-300 to-gray-600",
    psychic: "bg-gradient-to-t from-gray-300 to-gray-600",
    ice: "bg-gradient-to-t from-gray-300 to-gray-600",
    dragon: "bg-gradient-to-t from-gray-300 to-gray-600",
    dark: "bg-gradient-to-t from-gray-300 to-gray-600",
    fairy: "bg-gradient-to-t from-gray-300 to-gray-600",
    unknown: "bg-gradient-to-t from-gray-300 to-gray-600",
    shadow: "bg-gradient-to-t from-gray-300 to-gray-600"
}

const pokemonBorderColor = {
    grass: "rounded-md border-[5px] border-green-500",
    fire: "rounded-md border-[5px] border-red-500",  
    water: "rounded-md border-[5px] border-blue-500",
    rock: "rounded-md border-[5px] border-gray-500",
    electric: "rounded-md border-[5px] border-yellow-500",

    bug: "",
    flying: "",
    poison: "",
    normal: "",
    ground: "",
    fairy: "",
    fighting: "",
    ghost: "",
    steel: "",
    psychic: "",
    ice: "",
    dragon: "",
    dark: "",
    fairy: "",
    unknown: "",
    shadow: ""
}

const pokemonNameColor = {
    grass: "text-green-600",
    fire: "text-red-600",  
    water: "text-blue-600",
    electric: "text-yellow-600",
    rock: "text-gray-500",

    bug: "",
    flying: "",
    poison: "",
    normal: "",
    ground: "",
    fairy: "",
    fighting: "",
    ghost: "",
    steel: "",
    psychic: "",
    ice: "",
    dragon: "",
    dark: "",
    fairy: "",
    unknown: "",
    shadow: ""
}

const PokemonCard = ({pokemonUrl}) => {

    const [pokemon, setPokemon] = useState(null)

    const formatTypesPokemon = (types = []) => {
        const nameTypes = types.map((type) => type.type.name)
        const titleTypes = nameTypes.join(" / ")
        return titleTypes
    }

    useEffect(() => {
        axios.get(pokemonUrl)
            .then(({data}) => setPokemon(data))
            .catch((err)=> console.log(err))
    }, [])

  return (
    <Link to={`/pokedex/${pokemon?.name}`}>
        <section className= {`${pokemonBorderColor[pokemon?.types[0].type.name]} `}>
        {/*//? Seccion superior */}
        <section className={`relative h-40 ${pokeLinearGradiendts[pokemon?.types[0].type.name]} `}>
            <div className='absolute px-12 -bottom-14'>
                <img 
                className='rounded-sm'
                src={pokemon?.sprites.other["official-artwork"].front_default} 
                alt="{pokemon?.name}" />
            </div>
        </section>

        {/*//* Seccion inferior */}
        <section className='text-center'>
            <h3 className= {`mt-14 font-bold text-xl ${pokemonNameColor[pokemon?.types[0].type.name]} `}>{pokemon?.name}</h3>
            <h5 className='text-gray-700 text-base'>{formatTypesPokemon(pokemon?.types)}</h5>
            <span className='text-gray-500 text-xs'>Type</span>

            <hr/>

            <section className='px-10 gap-3 justify-center grid-cols-2 grid py-3'>
            {/*//TODO Generar lista de stats */}
            {pokemon?.stats.slice(0, 4).map((stat) => (
                <div key={stat.stat.url}>
                    <h6 className='text-gray-600 text-xs'>{stat.stat.name}</h6>
                    <span className={`font-bold ${pokemonNameColor[pokemon?.types[0].type.name]} `}>{stat.base_stat}</span>
                </div>
            ))}
            </section>
        </section>
        </section>
    </Link>
  )
}

export default PokemonCard
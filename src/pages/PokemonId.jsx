import { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const pokeLinearGradiendts = {
  grass: "bg-gradient-to-t from-green-600 to-green-200",
  fire: "bg-gradient-to-t from-red-600 to-red-200",  
  water: "bg-gradient-to-t from-blue-600 to-blue-200",
  rock: "bg-gradient-to-t from-gray-600 to-gray-200",
  electric: "bg-gradient-to-t from-yellow-600 to-yellow-200",

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

const PokemonId = () => {

  const [pokemon, setPokemon] = useState(null)

  const {pokemonName} = useParams()  

  {/* barra de progreso */}
  const percentProgresStat = (baseStat) => {
    const STAT_MAX = 255
    return `${(baseStat * 100) / 255}%`
  }

  useEffect (() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`

    axios
    .get(url)
    .then(({data}) => setPokemon(data))
    .catch((err) => console.log(err))
  }, [])

  return (
    <main>
      <Header />
<section className='px-10 py-14'>
    <section className='border-[3px] border-gray-400'>

      <section className={`justify-center items-center relative h-20 ${pokeLinearGradiendts[pokemon?.types[0].type.name]} `}>
        <div className='absolute px-12 -bottom-2'>
          <img 
          className='text-center'
          src={pokemon?.sprites.other["official-artwork"].front_default} 
          alt="{pokemon?.name}" />
        </div>
      </section>

    {/* Informacion detalle de pokemon */}
    <article>

    <section className='justify-center text-center px-9 py-3 '>
    <div className='py-3 gap-3 grid-cols-2'>
    <span className={`font-bold text-xl border-[1px] border-gray ${pokemonNameColor[pokemon?.types[0].type.name]} `}>#1</span>
    <h4 className= {`font-bold text-xl ${pokemonNameColor[pokemon?.types[0].type.name]} `}>{pokemon?.name}</h4>
    </div>


    <div className='gap-3 justify-center grid-cols-2 grid py3-'>
    <h4>peso</h4>
    <h4>altura</h4>
    <span>peso dato</span>
    <span>altura dato</span>
    </div>

    <div className='gap-3 justify-center grid-cols-2 grid py-3'>
    <h5>tipo</h5>
    <h5> habilidades</h5>
    <span>tipos </span>
    <span>habilidadaes</span>
    </div>
    </section>

    </article>

    <article>
    {/* stats */}
    <section className='px-10 py-5'>
      <div className='flex  items-center px-0'>
        <h4>Stats</h4>
        <img src="/images/Vector9svg.svg" alt="" /> 
        <img src="/images/Group232svg.svg" alt="" />
      </div>
    

    <section>
      {pokemon?.stats.map((stat) => (
        <article key={stat.stat.url}>
            <section className='flex justify-between'>
              <h5>{stat.stat.name}</h5>
              <span>{stat.base_stat}/150</span>
            </section>

              {/* barra de progreso */}
            <div className='bg-gray-100 h-8 rounded-sm overflow-hidden'>
              <div style={{width: percentProgresStat(stat.base_stat)}} className={`h-full bg-gradient-to-r from-yellow-300 to-yellow-500`}></div>
            </div>
        </article>
      ))}
    </section>
    </section>

    </article>

    </section>
</section>
      
    </main>
  )
}

export default PokemonId
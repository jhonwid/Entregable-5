// 47:45
import { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useSelector } from 'react-redux'
import axios from 'axios'
import PokemonList from '../components/pokedex/PokemonList'
import PokemonCard from '../components/pokedex/PokemonCard'


const Pokedex = () => {

  //? Array de pokemos antes de filtrar
  const [pokemons, setPokemons] = useState([])

  //! String para filtrar los pokemons por nombre
  const [namePokemon, setNamePokemon] = useState("")

  //* Arreglo de tipos de pokemons posibles
  const [types, setTypes] = useState([])

  //TODO Filtro de tipo, almacena el tipo actual del select
  const [currentType, setCurrentType] = useState("")

  //? Pagina actual
  const [currentPage, setCurrentPage] = useState(1)

  //? Estado global donde se almacena el nombre del usuario
  const nameTrainer = useSelector(store => store.nameTrainer)


  const pokemonByName = pokemons.filter((pokemon) => pokemon.name.includes(namePokemon.toLowerCase().trim()))

  const handleSubmit = (e) => {
    e.preventDefault()
    setNamePokemon(e.target.namePokemon.value)
  }

  const handleChangeType = (e) => {
    setCurrentType(e.target.value)
  }

  //* Cantidad de pokemons por paginas
  const paginationLogic = () => {
    const POKEMONS_PER_PAGE = 12

    //! Pokemons que se van a mostrar en la pagina actual
    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE
    const pokemonInPage = pokemonByName.slice(sliceStart, sliceEnd)

    //* Ultima Pagina
    const lastPage = Math.ceil(pokemonByName.length / POKEMONS_PER_PAGE) || 1

    //TODO Bloque actual
    const PAGES_PER_BLOCK = 5
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

    //? Paginas que se van a mostrar en el bloque actual
    const pagesInBlock = []
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1
    const maxPage = actualBlock * PAGES_PER_BLOCK
    for (let i = minPage; i <= maxPage; i++){
      if(i <= lastPage){
        pagesInBlock.push(i)
      }
    }
    return {pokemonInPage, lastPage, pagesInBlock}
  }
  const {lastPage, pagesInBlock, pokemonInPage} = paginationLogic()

  const handleClickPreviusPage = () => {
    const newCurrentPage = currentPage - 1
    if(newCurrentPage >= 1 ){
      setCurrentPage(newCurrentPage)
    }
  }
  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1
    if (newCurrentPage <= lastPage){
      setCurrentPage(newCurrentPage)
    }
  }

  useEffect(() => {
    if(!currentType){
      const URL = 'https://pokeapi.co/api/v2/pokemon?limit=1281'

    axios.get(URL)
    .then((res) => setPokemons(res.data.results))
    .catch((err) => console.log(err))
  }
  }, [currentType])

  useEffect(() => {
    const URL = 'https://pokeapi.co/api/v2/type'

    axios.get(URL)
    .then((res) => {
      const newTypes = res.data.results.map((type) => type.name)
      setTypes(newTypes)
    })
    // .then(({data}) => setTypes(data.results))
    .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if(currentType){
      const URL = `https://pokeapi.co/api/v2/type/${currentType}/`

      axios.get(URL)
      .then((res) => {
        const pokemonsByType = res.data.pokemon.map(
          (pokemon) => pokemon.pokemon
        )
        setPokemons(pokemonsByType)
      })
      // .then(({data}) => {
      //   const pokemonsByType = data.pokemon.map(pokemon => pokemon.pokemon)
      //   setPokemons(pokemonsByType)
      // })
      .catch((err) => console.log(err))
    }
  }, [currentType])

  useEffect(() => {
    setCurrentPage(1)
  }, [namePokemon, currentType])

  return (
   <section className='min-h-screen'>
    <Header />

      {/*//? seccion de filtors y saludo */}
      <section className='grid py-6 px-2'>
        <h3 className='text-red-600 font-bold'>Wellcome {nameTrainer}, <span className='text-black font-normal'> here you can your favorite pokemon</span></h3>
        <form className='flex gap-3 justify-center px-2 py-8' onSubmit={handleSubmit}>
          <div>
            <input className='bg-white border-[2px] border-gray-300 w-24 sm:max-w-[220px]' id="namePokemon" placeholder='Search your pokemon...' type="text" />
            <button className='bg-red-500 text-white border-[2px] border-red-500'>Search</button>
          </div>

          <select className='border-[2px] border-gray-300' onChange= {(e) => setCurrentType(e.target.value)}>
            <option value="">All</option>
              {types.map((type) => (
                <option className='capitalize' value={type} key={type}>
                  {type}
                </option>
              ))} 
          </select>
        </form>
      </section>

                {/*//TODO Seccion lista de pokemons */}
                {/* <section className='px-2 grid gap-6 grid-cols-[280px]'> */}
                <section className='ps-2 px-2 grid gap-6 grid-cols-[repeat(auto-fill,_234px)] justify-center max-w-[1024px] mx-auto my-6'>
                  {pokemonInPage.map((pokemon) => (
                    <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
                  ))}
                </section>
                {/* <PokemonList pokemons={pokemonByName}/> */}
                    {/*//* PAGINACION */}
                    <ul className='flex gap-3 justify-center py-4 pz-2 flex-wrap'>

                      {/*//? Primera pagina*/}
                      <li onClick={() => setCurrentPage(1)} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{"<<"}</li>
                      
                    {/*//? Pagina anterior */}
                      <li onClick={handleClickPreviusPage} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{"<"}</li>

                      {/*//TODO Lista de paginas */}
                      {
                        pagesInBlock.map(numberPage => <li onClick={() => setCurrentPage(numberPage)} className= {`p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer ${numberPage === currentPage && "bg-red-400"}`} key={numberPage}>{numberPage}</li>)
                      }

                      {/*//* pagina siguiente */}
                      <li onClick={handleClickNextPage} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{">"}</li>

                      {/*//! Ultima pagina */}
                      <li onClick={() => setCurrentPage(lastPage)} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{">>"}</li>
                    </ul>
   </section>
  )
}

export default Pokedex
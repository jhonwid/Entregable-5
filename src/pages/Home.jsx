import React from 'react'
import FooterHome from '../components/home/FooterHome'
import { useDispatch } from 'react-redux'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const nameTrainer = e.target.nameTrainer.value
        dispatch(setNameTrainer(nameTrainer))
        navigate("/pokedex")
    }   

  return (
    <main className='grid grid-rows-[1fr_auto] min-h-screen'>
        
        {/*//* Seccion superior */}
        <section className='flex justify-center items-center '>
            
            <div className='py-20 text-center'>
                <img src="/images/logo.png" alt="" />

                <h3 className='text-red-600 font-bold text-6xl'>Hello trainer!</h3>
            
                <p className='text-lg'>For start, give me your name</p>

                <form onSubmit={handleSubmit} className='px-2 py-8'>
                    <input className='h-[50px] px-2 bg-white border-[2px] border-gray-300' required id="nameTrainer" type="text" placeholder='Enter your name...'/>
                    <button className=' h-[50px] bg-red-500 text-white border-[2px] border-red-500'>Start!</button>
                </form>   
            </div>
        </section>

        {/*//* Seccion inferior */}
        <FooterHome />
    </main>
  )
}

export default Home
import React from 'react'

const Navbar = () => {

    const github = ()=>{
        window.open("https://github.com/", "_blank");
    }
    return (
        <nav className=' bg-slate-900 text-white'>
            <div className='md:mycontainer flex items-center justify-between md:px-12 px-8 w-full'>
                <div className="logo font-bold text-2xl transition duration-200 hover:scale-125 cursor-pointer">
                    <span className='text-emerald-500'>&lt;</span>
                    <span className='text-white'>Pass</span>
                    <span className='text-emerald-500 font-extrabold drop-shadow'>OP</span>
                    <span className='text-emerald-500'>/&gt;</span>
                </div>
                {/* <ul className='flex font-semibold text-xl'>
                    <a href="/"><li className='px-5 py-5 hover:scale-90 transition duration-300 hover:bg-green-600 cursor-pointer'>Home</li></a>
                    <a href="/about"><li className='px-5 py-5 hover:scale-90 transition duration-300 hover:bg-green-600 cursor-pointer'>About</li></a>
                    <a href="/contact"><li className='px-5 py-5 hover:scale-90 transition duration-300 hover:bg-green-600 cursor-pointer'>Contact</li></a>
                </ul> */}
                    <button className='flex text-white ring-1 ring-white bg-emerald-700 rounded-xl cursor-pointer h-12 items-center my-2 hover:bg-emerald-600 transition duration-200' onClick={github}>
                        <img src="/icons/github-mark-white.png" alt="Github logo" className='w-12 p-1' />
                        <span className='font-bold px-1 '>Github</span>
                    </button>
            </div>

        </nav>
    )
}

export default Navbar

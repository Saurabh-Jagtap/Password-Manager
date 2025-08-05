import React from 'react'
import LordiconReact from './LordIconReact'
import Passicon from './Passicon'
import Passofficon from './Passofficon'
import { useState, useRef, useEffect } from 'react'
import CopyIcon from './CopyIcon'
import EditIcon from './EditIcon'
import DeleteBoldIcon from './DeleteBoldIcon'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const [isVisible, setisVisible] = useState(false)
    const [showUsername, setshowUsername] = useState(false)
    const passwordRef = useRef()

    const getPasswords = async ()=>{
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
        console.log(passwords)    
    }

    useEffect(() => {
        getPasswords()
        
    }, [])

    const showPassword = () => {
        setisVisible(!isVisible)
        // const passwordValue = passwordRef.current.value
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length >= 2 && form.password.length > 3) {

            // If any such id exists in the db, delete it
            await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type":"application/json"}, body: JSON.stringify({id:form.id})})

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({...form,id: uuidv4()})})
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setForm({ site: "", username: "", password: "" })
            toast.success('Password Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else {
            toast.error('Unable to Save', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    const editPassword = (id) => {
        setForm({...passwordArray.filter(item => item.id === id)[0],id: id})
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const deletePassword = async (id) => {
        let c = confirm("Do you really want to delete?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type":"application/json"}, body: JSON.stringify({id})})
        }
        toast.success('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className=" md:mycontainer md:px-32 px-4 py-10 bg-green-50 min-h-[85vh]">
                <h1 className='text-3xl sm:text-4xl md:text-4xl font-bold text-center'>
                    <span className='text-emerald-500'>&lt;</span>
                    <span className='text-black'>Pass</span>
                    <span className='text-emerald-500 font-extrabold drop-shadow'>OP</span>
                    <span className='text-emerald-500'>/&gt;</span>
                </h1>
                <p className='text-green-900 text-center pb-4 md:pb-0'>Your own Password Manager</p>

                <div className='flex flex-col md:p-4 pr-5 md:pr-0 md:gap-8 gap-4 relative'>
                    <input onChange={handleChange} value={form.site} placeholder='Enter website URL' className='rounded-full border border-green-500 p-4 py-1' type="text" name='site' id='site' />
                    <div className='md:flex md:flex-row flex flex-col w-full justify-between md:gap-8 gap-4'>
                        <input onChange={handleChange} value={form.username} placeholder='Enter Username' className='rounded-full border border-green-500 md:w-full p-4 py-1' type="text" name='username' id='username' />
                        <div className="relative w-full">
                            <input
                                onChange={handleChange}
                                value={form.password}
                                ref={passwordRef}
                                placeholder='Enter Password'
                                className='rounded-full border border-green-500 w-full p-4 py-1 pr-10'
                                name='password'
                                id='password'
                                type={isVisible ? 'text' : 'password'}
                            />
                            <div
                                className="absolute right-3 top-5 transform -translate-y-1/2 cursor-pointer"
                                onClick={showPassword}
                            >
                                {isVisible ? <Passofficon size={25} /> : <Passicon size={25} />}
                            </div>
                        </div>


                    </div>

                    <button title='Click to save' className='flex justify-center items-center cursor-pointer font-semibold border border-emerald-900 bg-emerald-500 rounded-full gap-1 px-4 py-1 w-fit mx-auto transition duration-150 hover:bg-emerald-400 text-white' onClick={savePassword}>
                        <LordiconReact size={30} />
                        Save
                    </button>
                </div>

                <div className='passwords'>
                    <h2 className='py-4 text-2xl font-bold text-emerald-800'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {/* Toggle Username Button for mobile */}
                    <div className="sm:hidden flex justify-end mb-2">
                        <button
                            onClick={() => setshowUsername((prev) => !prev)}
                            className="text-sm bg-emerald-500 text-white px-3 py-1 rounded-full shadow transition-all duration-150"
                        >
                            {showUsername ? "Hide Username" : "Show Username"}
                        </button>
                    </div>

                    {passwordArray.length !== 0 && (
                        <div className="border-2 border-emerald-800 rounded-md shadow-md max-h-[210px] overflow-hidden">
                            <div className="overflow-y-auto max-h-[210px] scrollbar-hide group-hover:scrollbar-visible">
                                <table className="table-auto w-full border-separate border-spacing-0">
                                    <thead className="bg-emerald-800 text-white sticky top-0 z-10">
                                        <tr>
                                            <th className="py-3 px-4 border border-emerald-800 text-center">Site</th>
                                            <th
                                                className={`py-3 px-4 border border-emerald-800 text-center ${showUsername ? 'block' : 'hidden'
                                                    } sm:table-cell`}
                                            >
                                                Username
                                            </th>
                                            <th className="py-3 px-4 border border-emerald-800 text-center">Password</th>
                                            <th className="py-3 md:px-4 px-1 border border-emerald-800 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-emerald-50">
                                        {passwordArray.map((item, index) => (
                                            <tr key={index} className="hover:bg-emerald-100 transition-all">
                                                {/* Site */}
                                                <td className="py-3 px-4 border border-y-white md:max-w-[16vw] md:min-w-[15vw] min-w-[5vw]">
                                                    <div className="flex items-center justify-between md:gap-2">
                                                        <div className="overflow-hidden text-ellipsis whitespace-nowrap md:max-w-[14vw] max-w-[12vw]">
                                                            <a
                                                                href={item.site}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="hover:underline text-emerald-900"
                                                                title={item.site}
                                                            >
                                                                {item.site}
                                                            </a>
                                                        </div>
                                                        <CopyIcon text={item.site} />
                                                    </div>
                                                </td>

                                                {/* Username */}
                                                {/* Username */}
                                                <td
                                                    className={`py-3 px-4 border border-y-white md:max-w-[16vw] md:min-w-[15vw]  ${showUsername ? 'block' : 'hidden'
                                                        } sm:table-cell min-w-[5vw]`}
                                                >
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div className="overflow-hidden text-ellipsis whitespace-nowrap md:max-w-[14vw] max-w-[12vw]">
                                                            <a
                                                                href={item.username}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="hover:underline text-emerald-900"
                                                                title={item.username}
                                                            >
                                                                {item.username}
                                                            </a>
                                                        </div>
                                                        <CopyIcon text={item.username} />
                                                    </div>
                                                </td>


                                                {/* Password */}
                                                <td className="py-3 px-4 border border-y-white md:max-w-[16vw] md:min-w-[15vw]">
                                                    <div className="flex items-center justify-between md:gap-2">
                                                        <div className="overflow-hidden text-ellipsis whitespace-nowrap md:max-w-[14vw] max-w-[12vw]">
                                                            <a
                                                                href={item.password}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="hover:underline text-emerald-900 text-2xl"
                                                            >
                                                                {"*".repeat(item.password.length)}
                                                            </a>
                                                        </div>
                                                        <CopyIcon text={item.password} />
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                {/* EditIcon */}
                                                <td className="flex justify-center gap-1 py-3 md:px-4 border border-emerald-800 border-y-white md:min-w-[5vw] min-w-[2vw]">
                                                    <span className='cursor-pointer mx-1' onClick={() => editPassword(item.id)}>
                                                        <EditIcon />
                                                    </span>
                                                    {/* DeleteIcon */}
                                                    <span className='cursor-pointer mx-1' onClick={() => deletePassword(item.id)}>
                                                        <DeleteBoldIcon />
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Manager



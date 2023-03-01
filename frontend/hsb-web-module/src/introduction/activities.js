import NavBar from './component/navBar/navBar'
import { useState, useEffect } from 'react';
//import Api from "../services";
import Loading from "./component/loading"
import { Link } from 'react-router-dom'
import '../introduction/activities.css'

function Activities() {
    const [token, settoken] = useState(0)

    useEffect(() => {
        //Api.apiTokenAccesId(sessionStorage.getItem("tokenHsb")).then((res)=>{ settoken(res.data.data.id)})
        //console.log(token)
        settoken(664564564656)
        //console.log("pagian de prueba con token de verificacion +token)
        if (token === 0) {
            sessionStorage.removeItem("")
        }

    }, [token])



    return (
        (token === 0) ? <Loading /> :
            <div className="root">
                <NavBar />
                <h1 className='text-5xl font-bold py-4 rounded-t-xl text-center'>Administrative Activities</h1>
                <div className='grid md:grid-cols-4 grid-cols-2 gap-20 content-center mx-10 '>
                    <div className='border-3 border-slate-500 rounded-lg h-72 bg-slate-300 hover:translate-y-4 transition-all shadow-md shadow-slate-600'>
                        <Link className="w-full flex flex-col items-center justify-evenly h-full no-underline" to="/activities/humanResources/">
                            <img className='w-4/5 h-4/6 mx-auto' src='https://www.questionpro.com/userimages/site_media/portada-recursos-humanos.png' alt='a' />
                            <span className='font-bold text-xl no-underline text-slate-700 hover:text-slate-900'>Human Resources</span>
                        </Link>
                    </div>
                    <div className='border-3 border-slate-500 rounded-lg h-72 bg-slate-300 hover:translate-y-4 transition-all shadow-md shadow-slate-600'>
                        <Link className="w-full flex flex-col items-center justify-evenly h-full no-underline" to="/activities/expenses/">
                            <img className='w-4/5 h-4/6 mx-auto' src='https://www.bbva.com.ar/content/dam/public-web/argentina/images/Illustrations/micro-blue-loan-money-time.png.img.320.1562251534064.png' alt='a' />
                            <span className='font-bold text-xl no-underline text-slate-700 hover:text-slate-900'>Expenses</span>
                        </Link>
                    </div>
                    <div className='border-3 border-slate-500 rounded-lg h-72 bg-slate-300 hover:translate-y-4 transition-all shadow-md shadow-slate-600'>
                        <Link className="w-full flex flex-col items-center justify-evenly h-full no-underline" to="/activities/fixedAssets">
                            <img className='w-4/5 h-4/6 mx-auto' src='https://www.giitic.com/img/activos/activos_fijos_software_niif.png?pfdrid_c=true' alt='a' />
                            <span className='font-bold text-xl no-underline text-slate-700 hover:text-slate-900'>Fixed Assets</span>
                        </Link>
                    </div>
                    <div className='border-3 border-slate-500 rounded-lg h-72 bg-slate-300 hover:translate-y-4 transition-all shadow-md shadow-slate-600'>
                        <Link className="w-full flex flex-col items-center justify-evenly h-full no-underline" to="/activities/form">
                            <img className='w-4/5 h-4/6 mx-auto' src='https://pildoraslegales.files.wordpress.com/2021/07/adobestock_211934825.jpeg' alt='a' />
                            <span className='font-bold text-xl no-underline text-slate-700 hover:text-slate-900'>Electronic Docs</span>
                        </Link>
                    </div>
                </div>
            </div>
    );
}


export default Activities;
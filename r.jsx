import {BrowserRouter, Link, Route} from 'react-router-dom'


                            {/*  V5  */}
//paths
<BrowserRouter basename='/project'> {/*Para que funcione todo lo de rrd*/}

    <Route exact path="/home" component={home}/>

    <Route exact path="/activities" component={activities} />   {/*Props: Strict - Sensitive */}

</BrowserRouter>


//navegation                
const r = () => {
  return <>

        <div>
            <Link to="/home">Home</Link>  {/*Evita que la Póg se recargue*/}
        </div>

        <div>
            <Link to="/activities">Activities</Link>
        </div>

  </>
  
}

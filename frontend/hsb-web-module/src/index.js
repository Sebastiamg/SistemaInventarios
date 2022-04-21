import ReactDOM from "react-dom";
import "./index.css";
import InitRoot from "../src/introduction/root";
// import Activities from "../src/introduction/activities";
import "./routes";
import { useEffect, useState } from "react";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import NavBar from "./introduction/component/navBar/navBar";
import Container1Data from "./introduction/component/Containers/Container1Data";

const Activities = lazy(()=>import("../src/introduction/activities"))

function IntoTokenVerify() {
  const [token, settoken] = useState();

  useEffect(() => {
    settoken(sessionStorage.getItem("tokenHsb"));
  }, [token]);

  return token === null ? (<div className="root"> <InitRoot /> </div>) 
                        : (<div className="root">
                        <Suspense fallback="<../src/introduction/component/loading.js>">

                          <BrowserRouter>
                            <Switch>

                              <Route exact path="/activities" component={Activities} />
                                

                              <Route exact path="/activities/expenses">
                                <NavBar/>
                                <Container1Data />
                              </Route>

                              <Route exact path="/activities/fixedAssets">
                              <NavBar/>
                                <Container1Data />
                              </Route>
                              
                            </Switch>
                          </BrowserRouter>

                        </Suspense>

                        </div>);
}

// {/* <BrowserRouter>
// <Switch>
//   <Route exact path="/activities" >
//     <Activities/>
//   </Route>
// </Switch>
// </BrowserRouter> */}


ReactDOM.render(<IntoTokenVerify />, document.getElementById("root"));

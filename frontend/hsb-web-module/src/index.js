import ReactDOM from "react-dom";
import "./index.css";
import InitRoot from "../src/introduction/root";
// import Activities from "../src/introduction/activities";
import "./routes";
import { useEffect, useState } from "react";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import Container1Data from "./introduction/component/Containers/Container1Data";
import Menu from "./introduction/menu";
import Employees from "./introduction/component/Containers/employees";

const Activities = lazy(()=>import("../src/introduction/activities"))


function IntoTokenVerify() {
  const [token, settoken] = useState();

  useEffect(() => {
    settoken(sessionStorage.getItem("tokenHsb"));
  }, [token]);

  return token === null ? (<div className="root"> <InitRoot /> </div>) 
                        : (<div className="root">
                        <Suspense fallback="<../src/introduction/component/loading.js>">
                                            {/*Rect Router Dom V5*/}
                          <BrowserRouter basename="/build">
                            {/* <Switch> */}

                              <Route exact path="/activities/" component={Activities} />

                              <Route exact path="/activities/humanResources/" component={Employees} />
          
                              {/* menu */}
                              <Route exact path="/activities/fixedAssets/" component={Menu} />
                              <Route exact path="/activities/fixedAssets/electronicEquipment/" component={Container1Data} />
                              <Route exact path="/activities/fixedAssets/furnitures/" component={Container1Data} />
                            {/* </Switch> */}
                          </BrowserRouter>

                        </Suspense>

                        </div>);
      
};

ReactDOM.render(<IntoTokenVerify />, document.getElementById("root"));
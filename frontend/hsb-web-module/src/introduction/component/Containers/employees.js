import './Container1Data.css';
import React, { useState, useEffect } from "react";
import { Container, Modal, ModalBody, FormGroup, Form } from "reactstrap";

import NavBar from '../navBar/navBar';
import Api from "../../../services";

const Employees = () => {
  const [ocModal, setOCModal] = useState(false);
  const [userObj, setUserObj] = useState({ user: {} });

  const date = new Date().toJSON().substring(0, 10);
  const [vacation, setVacation] = useState({ startVacationDay: date, endVacationDay: date, days: 0 });
  const [permission, setPermission] = useState({ permissionDate: date, permissionDays: 0, reason: "" });

  // get all users
  useEffect(() => {
    getAllUsers();
  }, [])

  // get difference days
  useEffect(() => {
    let getDifference = getDifferenceVDays()
    setVacation(actualValues => ({
      ...actualValues,
      days: Number(getDifference.vacationsDays)
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vacation.endVacationDay, vacation.startVacationDay])

  function getAllUsers() {
    Api.getUsers()
      .then(res => {
        const users = res.map(user => {
          const userDetail = user.details.replace(/&quot;/g, '"');
          return { ...user, details: JSON.parse(userDetail) };
        })
        fillTable(users)
      })
      .catch(err => console.log(err))
  }

  // get diference vacations days
  function getDifferenceVDays(obj) {
    let startDay = new Date(!obj ? vacation.startVacationDay : obj[0]);
    let endDay = new Date(!obj ? vacation.endVacationDay : obj[1]);
    let diference = endDay.getTime() - startDay.getTime();
    let vacationsDays = diference / (1000 * 60 * 60 * 24);
    return {
      startDay: startDay,
      endDay: endDay,
      diference: diference,
      vacationsDays: vacationsDays + 1
    }
  }

  // fill table
  function fillTable(users) {
    document.querySelector("#tableUsers").innerHTML = "";
    users.forEach(user => {
      // creation of TR and details BTN
      const tr = document.createElement("TR");
      tr.classList.add("h-16", "border-b-2", "border-zinc-300")

      const btn = document.createElement("BUTTON");
      btn.textContent = "Details";
      btn.classList.add("bg-slate-500", "hover:bg-slate-600", "transition-all", "w-3/5", "border-2", "font-semibold", "py-1", "border-slate-600", "text-slate-100", "rounded-md", "details")
      btn.addEventListener("click", (e) => opeModal(e, user))

      // Create Td with info and insert into tr
      for (let i = 0; i < Object.keys(user).length + 1; i++) {
        const td = document.createElement("TD");
        // Check If user is active
        td.textContent = Object.values(user)[i] === "1" ? "Yes" : Object.values(user)[i];

        if (Object.keys(user)[i] === "details") {
          td.classList.add("hidden")
          td.textContent = JSON.stringify(user.details);
        } else if (i === Object.keys(user).length) {
          td.appendChild(btn);
          tr.insertAdjacentElement("afterbegin", td);
          continue
        }
        tr.appendChild(td);
      }

      // Add all table rows
      document.querySelector("#tableUsers").insertAdjacentElement("beforeend", tr);
    })
  }

  // Modal
  //Open / Close modal
  function opeModal(e, user) {
    setUserObj(userObj.user = {});
    setVacation(vacation => ({ ...vacation, startVacationDay: date, endVacationDay: date, days: 0 }))
    setPermission({ permissionDate: date, permissionDays: 0, reason: "" });
    setOCModal(true);
    setUserObj(userObj.user = {
      ...user,
      admissionDate: user.details.admissionDate,
      remainingDays: user.details.remainingDays,
      addedDays: user.details.addedDays,
      takenDays: user.details.takenDays,
      vacations: [...user.details.vacations],
      permissions: [...user.details.permissions],
      details: user.name
    });

    // fill all tables, vacations and permissions
    fillRows(e, userObj.user.vacations, "tableDates");
    fillRows(e, userObj.user.permissions, "tableDates2");

  }

  //-------------------------------------------------------------------------addTakenDays
  function addAndTakenDays(type, quantity) {
      if (type === "takenDays") {
        const newTakenDays = userObj.takenDays + quantity;
        setUserObj(userObj.takenDays = newTakenDays);
      } else if (type === "addedDays") {
        const newAdditionalDays = userObj.addedDays + quantity;
        setUserObj(userObj.addedDays = newAdditionalDays);
      }
  }

  // fill rows with every vacation/permision registered
  function fillRows(e, arrayObjects, tableName) {
    document.querySelectorAll(".dayDate").forEach(x => x.min = date);
    
    for (let i = 0; i < arrayObjects.length; i++) {
      addRows(e, tableName, Object.values(arrayObjects[i]))
    }
  }

  //HandleChange
  function handleChange(e, type) {
    switch (type) {
      case "startVacation":
      case "endVacation":
        handleVacations(e)
        break;
      case "permission":
        handlePermissions(e);
        break;
      case "additionalDaysBtn":
        handleRemainingDays(e)
        break;
      default:
        setUserObj(userObj.user = {
          ...userObj,
          [e.target.name]: e.target.value
        })
        break;
    }
  }

  // Handle Additional Days
  function handleRemainingDays(e, obj) {
    e.preventDefault()

    // Input value
    let additionalDaysInput = document.querySelector("#additionalDays");
    const additionalDays = Number(additionalDaysInput.value);
    // Get new additional days
    const newAdditionalDays = userObj.remainingDays + additionalDays;
    addAndTakenDays("addedDays", additionalDays);
    setUserObj(userObj.user = {
      ...userObj,
      remainingDays: newAdditionalDays
    })

    // set default value and disable input
    additionalDaysInput.value = 0;
    additionalDaysInput.setAttribute("disabled", true);
  }

  //get working days
  function getWorkingDays(startEndVacation) {
    // sab 5 : dom 6
    const getDifference = getDifferenceVDays(startEndVacation ? startEndVacation : null);

    let startDay = new Date(getDifference.startDay).getDay() + 1;

    let numVacationDays = [];
    for (let i = startDay, j = startDay; i < (startDay + getDifference.vacationsDays); i++) {
      if (i === 6 || i === 7) { 
        j = 1
        continue
      } else {
        numVacationDays.push(j)
        j++
      }
    }

    const vacationDays = userObj.remainingDays - numVacationDays.length
    // change Remaining Days
    if (!startEndVacation) {
      addAndTakenDays("takenDays", numVacationDays.length)

      setUserObj(userObj.user = {
        ...userObj,
        remainingDays: vacationDays
      });
    }
    return numVacationDays.length;
  }

  // Handle Vacations
  function handleVacations(e) {
    setVacation(actualValues => ({
      ...actualValues,
      [e.target.name]: e.target.value
    }))
    console.log(vacation)
  }

  // Add all table rows in different tables
  function addRows(e, tableName, mainObject) {
    e.preventDefault();
    // Disable button, no disable details button
    if (!e.target.classList.contains("details")) {
      e.target.setAttribute("disabled", true)
    }

    const table = document.querySelector(`#${tableName}`);

    const TR = document.createElement("TR");
    TR.classList.add("h-10")
    const btn = document.createElement("BUTTON");
    btn.textContent = "Delete";
    btn.classList.add("bg-slate-500", "hover:bg-slate-600", "transition-all", "w-4/5", "border-2", "py-1", "border-slate-600", "text-slate-100", "rounded-md", "flex", "justify-center", "items-center", "mx-auto", "my-2");
    btn.addEventListener("click", (e) => deleteRow(e, tableName, mainObject));
    TR.insertAdjacentElement("afterbegin", btn);

    const regx = /^(\d){1,3}$/;

    for (let i = 0; i < mainObject.length; i++) {
      const TD = document.createElement("TD");
      // console.log(regx.test(Number(mainObject[i])))
      if (tableName === "tableDates") {
        if (regx.test(mainObject[i])) {
            TD.textContent = getWorkingDays(mainObject);
            TR.insertAdjacentElement("beforeend", TD);
            continue
        }
      }
      TD.textContent = mainObject[i];
      
      // big text
      if (mainObject[mainObject.length - 1].length > 5) {
        TD.classList.add("truncate", "hover:text-clip", "transition-all")
        // console.log(mainObject[mainObject.length-1]);
      }

      TR.insertAdjacentElement("beforeend", TD);
    }
    table.insertAdjacentElement("beforeend", TR);

    // return to / ultil vacations and days with sat & sun
    let rowInfo = [...TR.childNodes].filter((x, index) => index !== 0).map(x => x.textContent);
    return rowInfo
  }

  // Delete row function
  function deleteRow(e, tableName, startEndVacation) {
    e.preventDefault()
    const row = e.target.parentElement
    row.remove()
    switch (tableName) {
      // tableDates as Vacation
      case "tableDates":
        const newVacationArr = userObj.user.vacations.filter(x => {
          return (
            x.startVacationDay !== startEndVacation[0] &&
            x.endVacationDay !== startEndVacation[1] &&
            x.days !== startEndVacation[2]
          )
        })

        const newRemainingDays = getWorkingDays(startEndVacation);
        setUserObj(actualValues => ({
          ...actualValues,
          remainingDays: userObj.user.remainingDays + newRemainingDays,
          vacations: newVacationArr,
        }));

        //Disable all delete buttons
        [...document.querySelector("#tableDates").children].forEach(x => x.children[0].setAttribute("disabled", true))

        break;

      // tableDates2 as Permission
      case "tableDates2":
        const newPermissionArr = userObj.user.permissions.filter(x => {
          return (
            x.permissionDate !== startEndVacation[0] &&
            x.permissionDays !== startEndVacation[1] &&
            x.reason !== startEndVacation[2]
          )
        })
        setUserObj(actualValues => ({
          ...actualValues,
          permissions: newPermissionArr
        }))
        break;
      default:
        break;
    }

    // console.log(row)
  }

  //Add dates
  function addDates(e) {
    const rowInfo = addRows(e, "tableDates", Object.values(vacation))

    // Get working days and reduce remaining days
    getWorkingDays();

    // Add new Vacation date
    setUserObj(actualValues => ({
      ...actualValues,
      vacations: [
        ...userObj.vacations,
        {
          startVacationDay: rowInfo[0],
          endVacationDay: rowInfo[1],
          days: rowInfo[2]
        }
      ]
    }))
    console.log(userObj.vacations)
  }

  //add permission row
  function addPermissions(e) {
    const rowInfo = addRows(e, "tableDates2", Object.values(permission))

    setUserObj(actualValues => ({
      ...actualValues,
      permissions: [
        ...userObj.permissions,
        {
          permissionDate: rowInfo[0],
          permissionDays: rowInfo[1],
          reason: rowInfo[2]
        }
      ]
    }))
  }

  // Handle Permissions
  function handlePermissions(e) {
    setPermission({
      ...permission,
      [e.target.name]: e.target.value
    })
  }

  // Update user function
  function finalEdit() {
    const updatedUserDetails = {
      admissionDate: userObj.admissionDate,
      remainingDays: userObj.remainingDays,
      vacations: [...userObj.vacations],
      addedDays: userObj.addedDays,
      takenDays: userObj.takenDays,
      permissions: [...userObj.permissions],
    };

    const updatedUser = {
      id: userObj.id,
      name: userObj.name,
      email: userObj.email,
      active: userObj.active,
      details: JSON.stringify(updatedUserDetails)
    };

    Api.apiUpdateUser(updatedUser)
      .then(res => {
        console.log(res)
        setOCModal(false);
        getAllUsers();
        console.log(userObj)
      })
      .catch(err => console.error(err))

      // console.log(userObj.vacations)
  }

  return (
    <>
      <NavBar />
      <div className='border-3 border-slate-500 rounded-xl mx-5 my-4 shadow-md shadow-slate-600'>
        <h1 className='text-5xl font-bold py-3 bg-slate-300 rounded-t-xl border-b-4 border-slate-400 text-center'>Users</h1>
        {/* <div>button</div> */}
        <div>
          <Container className='text-xl table-responsive'>
            <table className='table-auto w-full mb-4'>
              <thead className='border-b-2 border-slate-500'>
                <tr className='h-16'>
                  <th></th>
                  <th>Identification</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody id='tableUsers'>

              </tbody>
            </table>
          </Container>
        </div>
      </div>

      {/* modal */}
      <Modal isOpen={ocModal}>
        <div className='text-center bg-slate-700'>
          <h3 className='font-bold text-center text-2xl py-2 text-slate-200'>Edit User</h3>
        </div>
        {/* form */}
        <div className='bg-slate-200'>
          <ModalBody>
            <Form>
              {/* id/active */}
              <div className='flex flex-wrap justify-evenly items-start'>
                <FormGroup className='w-2/5 flex flex-col px-2 '>
                  <label className='font-bold mr-4'>Identification: </label>
                  <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' type="number" name='id' defaultValue={userObj.id} onChange={handleChange} />
                </FormGroup>

                <FormGroup className='w-2/5 flex flex-col px-2 '>
                  <label className='font-bold mr-4'>Name: </label>
                  <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' type="text" name='name' defaultValue={userObj.name} onChange={handleChange} />
                </FormGroup>
              </div>

              <div className='flex flex-wrap justify-evenly'>
                <FormGroup className='w-3/5 flex flex-col px-2 '>
                  <label className='font-bold mr-4'>Email: </label>
                  <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' type="text" name='email' defaultValue={userObj.email} onChange={handleChange} />
                </FormGroup>

                <FormGroup className='w-1/5 flex flex-col px-2 '>
                  <label className='font-bold mr-4'>Active: </label>
                  <select className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name='active' onChange={handleChange}>
                    {/* <option value="1" selected></option> */}
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </FormGroup>
              </div>

              <div className='flex flex-wrap px-4'>
                <FormGroup className='w-full flex flex-col px-3 '>
                  <label className='font-bold mr-4'>Date of admission: </label>
                  <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' type="date" name='admissionDate' defaultValue={userObj.admissionDate} onChange={handleChange} />
                </FormGroup>
              </div>
              {/* VACATIONS */}
              <div className='w-full flex flex-col px-4 my-2 '>
                <span className='w-full text-center font-bold text-xl py-2 text-slate-800 bg-slate-500 rounded-t-md hover:text-cyan-900 transition-all cursor-pointer' onClick={(e) => { e.preventDefault(); document.querySelector("#vacationsContainer").classList.toggle("hidden") }}>Vacations</span>
                <div className='grid grid-cols-5 bg-slate-300 rounded-b-md py-1' id='vacationsContainer'>
                  <FormGroup className='col-span-2 w-full flex flex-col pl-4 '>
                    <label className='font-bold mr-4'>From: </label>
                    <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none dayDate' type="date" name='startVacationDay' value={vacation.startVacationDay} onChange={(evt) => handleChange(evt, "startVacation")} />
                  </FormGroup>
                  <FormGroup className='col-span-2 w-full flex flex-col pl-4 '>
                    <label className='font-bold mr-4'>Until: </label>
                    <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none dayDate' type="date" name='endVacationDay' value={vacation.endVacationDay} onChange={(evt) => handleChange(evt, "endVacation")} />
                  </FormGroup>
                  <FormGroup className='col-span-1 w-full flex my-auto pr-3 font-semibold'>
                    <button className='bg-slate-500 hover:bg-slate-600 transition-all w-4/5 border-2 py-1 border-slate-600 mx-auto text-slate-100 rounded-md' onClick={addDates} id="addDateBtn">Add</button>
                  </FormGroup>
                  <FormGroup className='col-span-full w-full flex flex-col px-3'>
                    <table className='bg-slate-400 text-center'>
                      <thead className='bg-slate-500'>
                        <tr>
                          <th className='text-slte-500'><button onClick={(e) => { e.preventDefault(); document.querySelector("#tableDates").classList.toggle("hidden") }}>▼</button></th>
                          <th>From</th>
                          <th>Until</th>
                          <th>Days</th>
                        </tr>
                      </thead>
                      <tbody className='mx-2' id='tableDates'>
                        {/* vacations rows */}
                      </tbody>
                    </table>
                  </FormGroup>
                  {/* remaning Days */}
                  <FormGroup className='col-span-2 w-full flex flex-col px-3 '>
                    <label className='font-bold mr-4'>Remaining days: </label>
                    <input className='w-full border-2 p-1 border-slate-300 bg-slate-200 rounded-md outline-none' type="number" name='remainingDays' defaultValue={userObj.remainingDays} readOnly />
                  </FormGroup>
                  {/* Additional Days */}
                  <FormGroup className='col-span-2 w-full flex flex-col px-3 '>
                    <label className='font-bold mr-4'>Additional days: </label>
                    <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' type="number" name='additionalDays' defaultValue={0} min="1" max="10" id='additionalDays' />
                  </FormGroup>
                  <FormGroup className='col-span-1 w-full flex my-auto pr-3 font-semibold'>
                    <button className='bg-slate-500 hover:bg-slate-600 transition-all w-4/5 border-2 border-slate-600 mx-auto text-slate-100 rounded-md text-2xl' onClick={(e) => handleChange(e, "additionalDaysBtn")}>±</button>
                  </FormGroup>
                  {/* Added Days / taken day Vacations */}
                  <div className='w-full col-span-full grid grid-cols-4 bg-slate-400 rounded-t-md'>
                    <FormGroup className='col-span-2 w-full flex flex-col px-3 '>
                      <label className='font-bold mr-4'>Added days: </label>
                      <input className='w-full border-2 p-1 border-slate-300 bg-slate-200 rounded-md outline-none' type="number" defaultValue={userObj.addedDays} readOnly />
                    </FormGroup>
                    <FormGroup className='col-span-2 w-full flex flex-col px-3 '>
                      <label className='font-bold mr-4'>Taken days: </label>
                      <input className='w-full border-2 p-1 border-slate-300 bg-slate-200 rounded-md outline-none' type="number" defaultValue={userObj.takenDays} readOnly />
                    </FormGroup>
                  </div>
                </div>
              </div>
              {/* PERMISSIONS */}
              <div className='w-full flex flex-col px-4 my-2'>
                <span className='w-full text-center font-bold text-xl py-2 text-slate-800 bg-slate-500 rounded-t-md hover:text-cyan-900 transition-all cursor-pointer' onClick={(e) => { e.preventDefault(); document.querySelector("#permissionsContainer").classList.toggle("hidden") }}>Permissions</span>
                <div className='grid grid-cols-6 bg-slate-300 rounded-b-md py-1' id='permissionsContainer'>
                  <FormGroup className='col-span-2 w-full flex flex-col pl-4 '>
                    <label className='font-bold mr-4'>Permission: </label>
                    <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' type="date" name='permissionDate' value={permission.permissionDate} onChange={(e) => handleChange(e, "permission")} />
                  </FormGroup>
                  <FormGroup className='col-span-2 w-full flex flex-col pl-4 '>
                    <label className='font-bold mr-4'>Days: </label>
                    <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' type="number" name='permissionDays' defaultValue={0} min="1" max="30" onChange={(e) => handleChange(e, "permission")} />
                  </FormGroup>
                  <FormGroup className='col-span-2 w-full flex my-auto pr-2 font-semibold'>
                    <button className='bg-slate-500 hover:bg-slate-600 py-0.5 transition-all w-4/5 border-2 border-slate-600 mx-auto text-slate-100 rounded-md text-lg' onClick={addPermissions}>Add</button>
                  </FormGroup>
                  <FormGroup className='col-span-6 w-full flex flex-col pl-4 pr-5'>
                    <label className='font-bold mr-4'>Reason: </label>
                    <textarea className='w-full border-2 p-1 border-slate-400 rounded-md outline-none resize-none' name='reason' rows={2} value={permission.reason} onChange={(e) => handleChange(e, "permission")}></textarea>
                  </FormGroup>
                  <FormGroup className='col-span-full w-full flex flex-col px-3'>
                    <table className='table-fixed w-full text-center my-auto bg-slate-400'>
                      <thead className='bg-slate-500'>
                        <tr>
                          <th className='text-slte-500'><button onClick={(e) => { e.preventDefault(); document.querySelector("#tableDates2").classList.toggle("hidden") }}>▼</button></th>
                          <th>Date</th>
                          <th>Days</th>
                          <th>Reason</th>
                        </tr>
                      </thead>
                      <tbody className='mx-2' id='tableDates2'>
                        {/* permissions rows */}
                      </tbody>
                    </table>
                  </FormGroup>
                </div>
              </div>
            </Form>
          </ModalBody>

        </div>
        <div className='flex justify-evenly'>
          <button className='text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-500 hover:bg-slate-800' onClick={finalEdit}>Edit</button>
          <button className='text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-600 hover:bg-slate-800' onClick={() => setOCModal(false)}>Cancel</button>
        </div>
      </Modal>

    </>
  )
}

export default Employees;
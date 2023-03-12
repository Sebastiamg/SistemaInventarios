import './Container1Data.css';
import React, { useState, useEffect } from "react";
import { Container, Modal, ModalBody, FormGroup, Form } from "reactstrap";

import NavBar from '../navBar/navBar';
import Api from "../../../services";
import { HRExport } from '../exports/HRExport';

const Employees = () => {
  //update modal
  const [ocModal, setOCModal] = useState(false);

  //add modal
  const [ocModal2, setOcModal2] = useState(false);

  //current user
  const [userObj, setUserObj] = useState({ user: {} });

  //new user
  const [newUserObj, setNewUserObj] = useState({
    details: JSON.stringify({
      lastname: "",
      phone: 0,
      vacations: [],
      addedDays: 0,
      takenDays: 0,
      permissions: [],
      admissionDate: "",
      remainingDays: 11,
      // ----new-----

    }),
    id: "",
    name: "",
    email: "",
    password: "",
    active: 1
  })

  const date = new Date().toJSON().substring(0, 10);
  const [vacation, setVacation] = useState({ startVacationDay: date, endVacationDay: date, days: 0 });
  const [permission, setPermission] = useState({ permissionDate: date, permissionDays: 0, reason: "" });

  // get all users
  useEffect(() => {
    getAllUsers();
  }, [])

  // get difference days
  useEffect(() => {
    let getDifference = getDifferenceVDays();
    setVacation(actualValues => ({
      ...actualValues,
      days: Number(getDifference.vacationsDays)
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vacation.endVacationDay, vacation.startVacationDay])

  // get all user function
  function getAllUsers(userName) {
    Api.getUsers()
      .then(res => {
        let activeUsers = [];
        let inactiveUsers = [];

        res.data.map(user => {
          // change &quot; to "
          const userDetail = user.details.replace(/&quot;/g, '"');

          // new fixedUser
          const fixedUser = { ...user, details: JSON.parse(userDetail) };

          return user.active === "1" ? activeUsers.push(fixedUser) : inactiveUsers.push(fixedUser);
        })

        // find user with username or return all users
        if (userName) {
          let filteredUser = activeUsers.concat(inactiveUsers).filter(user => {
            return user.name.toUpperCase().match(userName.toUpperCase())
          })

          return fillTable(filteredUser);
        } else if (!userName) {
          const filteredUsers = activeUsers.concat(inactiveUsers);

          return fillTable(filteredUsers);
        }

      })
      .catch(err => console.log(err));
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
      tr.classList.add("h-16", "border-b-2", "border-zinc-300");

      const btn = document.createElement("BUTTON");
      btn.textContent = "Details";
      btn.classList.add("bg-slate-500", "hover:bg-slate-600", "transition-all", "w-3/5", "border-2", "font-semibold", "py-1", "border-slate-600", "text-slate-100", "rounded-md", "details")
      btn.addEventListener("click", (e) => openModal(e, user));

      // Create Td with info and insert into tr
      for (let i = 0; i < Object.keys(user).length + 1; i++) {

        const TD = document.createElement("TD");

        const statusMark = document.createElement("DIV");
        statusMark.classList.add("rounded-full", "w-4", "h-4", "mx-auto", "shadow-inner");
        // insert status mark
        TD.insertAdjacentElement('afterbegin', statusMark);

        switch (Object.values(user)[i]) {
          case "1":
            // TD.textContent = "Yes"
            statusMark.classList.add("bg-lime-700")
            break;
          case "0":
            // TD.textContent = "No"
            statusMark.classList.add("bg-red-700")
            break
          default:
            TD.textContent = Object.values(user)[i]
            break;
        }

        if (Object.keys(user)[i] === "details") {
          TD.classList.add("hidden")
          TD.textContent = JSON.stringify(user.details);
        } else if (i === Object.keys(user).length) {
          TD.appendChild(btn);
          tr.insertAdjacentElement("afterbegin", TD);
          continue
        }
        tr.appendChild(TD);
      }

      // Add all table rows
      document.querySelector("#tableUsers").insertAdjacentElement("beforeend", tr);
    })
  }

  // Modal
  //Open / Close modal
  function openModal(e, user) {
    setUserObj(userObj.user = {});
    setVacation(vacation => ({ ...vacation, startVacationDay: date, endVacationDay: date, days: 0 }))
    setPermission({ permissionDate: date, permissionDays: 0, reason: "" });
    setOCModal(true);
    setUserObj(userObj.user = {
      ...user,
      active: Number(user.active),
      admissionDate: user.details.admissionDate,
      remainingDays: user.details.remainingDays,
      addedDays: user.details.addedDays,
      takenDays: user.details.takenDays,
      vacations: [...user.details.vacations],
      permissions: [...user.details.permissions],
      phone: user.details.phone,
      lastname: user.details.lastname,
      details: user.name,

      // -----New----- //
      oldAditionalDays: user.details.oldAditionalDays,
      completeYearsWorked: user.details.completeYearsWorked
    });

    // fill all tables, vacations and permissions
    fillDatesInfoTable(e, userObj.user.vacations, "tableDates");
    fillDatesInfoTable(e, userObj.user.permissions, "tableDates2");

  }

  // Exist or not userObj.user
  const existOrNot = typeof userObj.user === "undefined";

  function addAndTakenDays(type, quantity, operation) {
    let userObject = !existOrNot ? userObj.user : userObj;

    if (type === "takenDays") {
      // console.log(userObj.takenDays)
      //cuado añado fecha
      const newTakenDays = operation === "substract" ?
        userObject.takenDays - quantity :
        userObject.takenDays + quantity;

      setUserObj(actualValues => ({
        ...actualValues,
        takenDays: newTakenDays
      }))
    } else if (type === "addedDays") {
      const newAdditionalDays = operation === "add" ?
        userObject.addedDays + quantity : null

      setUserObj(actualValues => ({
        ...actualValues,
        addedDays: newAdditionalDays
      }))
    }
  }

  // fill rows with every vacation/permision registered
  function fillDatesInfoTable(e, arrayObjects, tableName) {
    // document.querySelectorAll(".dayDate").forEach(x => x.min = date);

      for (let i = 0; i < arrayObjects.length; i++) {
      // If date is old don't show into table 
      const finalVacationDate = Object.values(arrayObjects[i])[1];
      const userInfo = getUserVacationInfo(finalVacationDate);
      if(userInfo.yearsResult < userInfo.completeYearsWorked) {
        continue
      }
      addRows(e, tableName, Object.values(arrayObjects[i]));
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
      case "active":
        handleActiveUser(e)
        break;
      case "admissionDate":
        handleAdmissionDate(e)
        break;
      default:
        setUserObj(actualValues => ({
          ...actualValues,
          [e.target.name]: e.target.value
        }))
        break;
    }
  }
  //Handle admission Date
  function handleAdmissionDate(e, operation) {
    e.preventDefault();
    const aditionalInfo = getUserVacationInfo();

    // check th operation type and reset values
    if (operation === "Reset") {
      resetVacations(aditionalInfo);
    }

  }

  function getUserVacationInfo(finalVacationDate) {
    let admissionDate = existOrNot ? userObj.admissionDate : userObj.user.admissionDate;

    // buscamos los dias adicionales a partir de la fecha de entrada (un año entero)
    const admsDate = new Date(admissionDate);
    const nowDate = new Date();

    // difference in miliseconds
    let diference = nowDate.getTime() - admsDate.getTime();

    // ---
    const newAdmsDate = new Date(diference);
    const yearZero = new Date("01-01-1970");

    // meses en la compania
    const monthsInCompany = (newAdmsDate.getFullYear() - yearZero.getFullYear()) * 12 + (newAdmsDate.getMonth() - yearZero.getMonth());

    // Valid years the employee has worked
    const completeYearsWorked = Math.floor(monthsInCompany / 12);

    // additional days is employee has worked a complete year
    let additionalDays = (Math.floor(monthsInCompany / 12) * 11);
    
    // Old aditional days, if the employee has worked more than one year
    let oldAditionalDays = additionalDays <= 0 || isNaN(additionalDays) || additionalDays.toString().length > 3 ? 
    0 : additionalDays;

    // obj with new additional days and complete years worked
    const newInfo = {
      oldAditionalDays: oldAditionalDays,
      completeYearsWorked: completeYearsWorked,
    }

    // finalVacationDate
    if (finalVacationDate) {
      // Final vacations
      let finalVacationdate = new Date(finalVacationDate);
      
      // Difference
      let differenceMsc = finalVacationdate.getTime() - admsDate.getTime();

      const newFinalVacDate = new Date(differenceMsc)

      const vacMonths = (newFinalVacDate.getFullYear() - yearZero.getFullYear()) * 12 + (newFinalVacDate.getMonth() - yearZero.getMonth());
      
      // result in years
      const yearsResult = Math.floor(vacMonths / 12);
      return {
        ...newInfo,
        yearsResult: yearsResult
      } 
    } else {
      return newInfo
    }
  }

  // reset vacations and remaining days if I set a new admission date 
  function resetVacations(aditionalInfo) {
    setUserObj(actualValues => ({
      ...actualValues,
      remainingDays: 11 + aditionalInfo.oldAditionalDays,
      takenDays: 0,
      addedDays: 0,
      //reset vacations
      vacations: [],
      // reset permissions
      permissions: [],
      ...aditionalInfo
    }))

    // Empty vacations and permissions tables
    document.getElementById("tableDates").innerHTML = "";
    document.getElementById("tableDates2").innerHTML = "";

  }

  //Handle active or not User
  function handleActiveUser(e) {
    const newActiveValue = userObj.active === 1 ? 0 : 1;
    setUserObj(defaultValues => ({
      ...defaultValues,
      active: newActiveValue
    }))
  }

  // Handle Additional Days
  function handleRemainingDays(e, obj) {
    e.preventDefault()
    // Input value
    let additionalDaysInput = document.querySelector("#additionalDays");
    const additionalDays = Number(additionalDaysInput.value);
    // Get new additional days
    const newAdditionalDays = userObj.remainingDays + additionalDays;
    addAndTakenDays("addedDays", additionalDays, "add");

    console.log(newAdditionalDays)
    setUserObj(actualValues => ({
      ...actualValues,
      remainingDays: newAdditionalDays
    }))

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

      setUserObj(actualValues => ({
        ...actualValues,
        remainingDays: vacationDays
      }))
    }
    return numVacationDays.length;
  }

  // Handle Vacations
  function handleVacations(e) {
    setVacation(actualValues => ({
      ...actualValues,
      [e.target.name]: e.target.value
    }))
  }

  // Add all table rows in different tables

  function addRows(e, tableName, mainObject) {
    e.preventDefault();
    // Disable button, no disable details button
    if (!e.target.classList.contains("details")) {
      e.target.setAttribute("disabled", true)
    }

    // Select table to add new row
    const table = document.querySelector(`#${tableName}`);

    // Create TR and insert button
    const TR = document.createElement("TR");
    TR.classList.add("h-10")
    const btn = document.createElement("BUTTON");
    btn.textContent = "Delete";
    btn.classList.add("bg-slate-500", "hover:bg-slate-600", "transition-all", "w-4/5", "border-2", "py-1", "border-slate-600", "text-slate-100", "rounded-md", "flex", "justify-center", "items-center", "mx-auto", "my-2");
    btn.addEventListener("click", (e) => deleteRow(e, tableName, mainObject));
    TR.insertAdjacentElement("afterbegin", btn);

    // Regex if value is a number with 1-3 digits
    const regx = /^(\d){1,3}$/;

    for (let i = 0; i < mainObject.length; i++) {
      const TD = document.createElement("TD");

      // check the table name and test the object with a number to return only working days
      if (tableName === "tableDates") {
        if (regx.test(mainObject[i])) {
          TD.textContent = getWorkingDays(mainObject);
          TR.insertAdjacentElement("beforeend", TD);
          continue
        }
      }

      TD.textContent = mainObject[i];

      // big text (-----Change-----)
      if (mainObject[mainObject.length - 1].length > 5) {
        TD.classList.add("truncate", "hover:text-clip", "transition-all")
        // console.log(mainObject[mainObject.length-1]);
      }

      // Insert TR ento TD
      TR.insertAdjacentElement("beforeend", TD);
    }

    // Insert tr into table
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

    //Modify main user Object if userObj.user exist
    let userObject = !existOrNot ? userObj.user : userObj;

    switch (tableName) {
      // tableDates as Vacation
      case "tableDates":
        // filter vacations array 
        const newVacationArr = userObject.vacations.filter(x => {
          return (
            x.startVacationDay !== startEndVacation[0] &&
            x.endVacationDay !== startEndVacation[1] &&
            x.days !== startEndVacation[2]
          )
        })

        const workingDays = getWorkingDays(startEndVacation);
        const newRemainingDays = userObject.remainingDays + workingDays;

        setUserObj(actualValues => ({
          ...actualValues,
          remainingDays: newRemainingDays,
          vacations: newVacationArr,
        }));

        //Disable all delete buttons
        [...document.querySelector("#tableDates").children].forEach(x => x.children[0].setAttribute("disabled", true))

        //Change taken days (substract) aqui
        addAndTakenDays("takenDays", workingDays, "substract")

        break;

      // tableDates2 as Permission
      case "tableDates2":
        const newPermissionArr = userObject.permissions.filter(x => {
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

  //handleSearch
  function handleSearch(e) {
    getAllUsers(e.target.value.trim())
  }

  function closeModal() {
    setOCModal(false);
    document.querySelector("#search").value = "";
    setUserObj({});
  }

  //dd new User 
  function openAddModal() {
    setOcModal2(true)
  }

  const regexs = {
    id: /^\d{7}$/,
    name: /^[a-zA-ZÀ-ÿ\s]{3,15}$/,
    email: /^[a-zA-Z0-9_.-]+@(\w{3,20})(\.[a-zA-Z]{2,5}){1,2}$/i,
    password: /^.{6,15}$/,
  };

  function handleUserChange(e) {
    //inputContainer
    const inputContainer = document.querySelector(`#user${e.target.name}`);
    const inputValidation = regexs[`${e.target.name}`].test(e.target.value);

    // input classes
    inputContainer.classList.remove("border-slate-400");
    inputContainer.classList.toggle("border-lime-900", inputValidation);
    inputContainer.classList.toggle("border-rose-700", !inputValidation);

    inputContainer.lastChild.innerHTML = "";
    const statusIcon = document.createElement("I");
    statusIcon.classList.add("fa-solid");

    inputContainer.lastChild.insertAdjacentElement("afterbegin", statusIcon);

    // if input value is correct fill State
    if (inputValidation) {
      statusIcon.classList.add("fa-circle-check", "text-green-700");
      setNewUserObj(actualValues => ({
        ...actualValues,
        [e.target.name]: e.target.value.trim()
      }))
    } else {
      statusIcon.classList.add("fa-circle-xmark", "text-red-700");
      setNewUserObj(actualValues => ({
        ...actualValues,
        [e.target.name]: ""
      }))
    }
  }

  function createSuper() {
    const newUser = newUserObj;
    const validation = Object.values(newUser).map(value => value === "").some(x => x === true);
    if (validation) {
      console.log("LLena bien todos los campos")
    } else {
      Api.apiSigiUp(newUser).then(res => {
        console.log(res);
        setOcModal2(false);
        getAllUsers();
      }).catch(err => console.error(err))
    }
  }

  // Update user function
  function finalEdit() {
    const updatedUserDetails = {
      lastname: userObj.lastname,
      phone: userObj.phone,
      admissionDate: userObj.admissionDate,
      remainingDays: userObj.remainingDays,
      vacations: [...userObj.vacations],
      addedDays: userObj.addedDays,
      takenDays: userObj.takenDays,
      permissions: [...userObj.permissions],

      // ----New---- //
      // oldAditionalDays: userObj.oldAditionalDays,
      // completeYearsWorked: userObj.completeYearsWorked
    };

    const updatedUser = {
      id: userObj.id,
      name: userObj.name,
      email: userObj.email,
      active: userObj.active,
      details: JSON.stringify(updatedUserDetails)
    };

    // empty the search input
    document.querySelector("#search").value = "";

    Api.apiUpdateUser(updatedUser)
      .then(res => {
        console.log(res)
        setOCModal(false);
        getAllUsers();
      })
      .catch(err => console.error(err))

    // console.log({
    //   addmisionDate: userObj.admissionDate,
    //   remDays: userObj.remainingDays,
    //   additionalYearsToFillNewVacDates: userObj.oldAditionalDays,
    //   completeYearsWorked: userObj.completeYearsWorked,

    //   userVacations: userObj.vacations
    // })
    console.log(userObj.vacations)
  }

  return (
    <>
      <NavBar />
      <div className='border-3 border-slate-500 rounded-xl mx-5 my-4 shadow-md shadow-slate-600'>
        <h1 className='text-4xl font-bold py-3 bg-slate-300 rounded-t-xl border-b-4 border-slate-400 text-center'>Users</h1>
        <div>
          {/* search and add user */}
          <div className='w-full flex justify-end font-semibold'>
            <div className='w-fit border-2 border-slate-400 rounded-md px-1 mx-3 flex items-center text-slate-700'>
              <input type="search" className='rounded-md outline-none' id='search' placeholder='Find user' onChange={handleSearch} />
              <i className="border-l-2 px-2 fa-solid fa-magnifying-glass"></i>
            </div>
            <button className='mx-3 border-2 border-slate-600 p-1 rounded-md bg-slate-500 hover:bg-slate-600 text-slate-50' onClick={openAddModal}>Add User</button>
          </div>
          <Container className='text-xl table-responsive'>
            <table className='w-full mb-4 text-center table-fixed'>
              <thead className='w-full border-b-2 border-slate-500'>
                <tr className='h-16 w-full'>
                  <th className='w-1/5'>▼</th>
                  <th className='w-1/5'>Identification</th>
                  <th className='w-1/5'>Name</th>
                  <th className='w-1/5'>Email</th>
                  <th className='w-1/5'>Active</th>
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
                  <label className='font-bold mr-4'>Phone: </label>
                  <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' type="number" name='phone' defaultValue={userObj.phone} onChange={handleChange} />
                </FormGroup>
              </div>

              <div className='flex flex-wrap justify-evenly items-start'>
                <FormGroup className='w-2/5 flex flex-col px-2 '>
                  <label className='font-bold mr-4'>Name: </label>
                  <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' type="text" name='name' defaultValue={userObj.name} onChange={handleChange} />
                </FormGroup>

                <FormGroup className='w-2/5 flex flex-col px-2 '>
                  <label className='font-bold mr-4'>Surname: </label>
                  <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' type="text" name='lastname' defaultValue={userObj.lastname} onChange={handleChange} />
                </FormGroup>
              </div>

              <div className='flex flex-wrap justify-evenly'>
                <FormGroup className='w-3/5 flex flex-col px-2 '>
                  <label className='font-bold mr-4'>Email: </label>
                  <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' type="text" name='email' defaultValue={userObj.email} onChange={handleChange} />
                </FormGroup>

                <FormGroup className='w-1/5 flex flex-col px-2 justify-start '>
                  <label className='font-bold text-center '>Active: </label>
                  <input className='mx-auto w-2/5 h-full outline-none bg-red-800' type="checkbox" name='active' onClick={(e) => handleChange(e, "active")} defaultChecked={userObj.active} />
                </FormGroup>
              </div>

              <div className='flex flex-wrap px-4 justify-evenly w-full'>
                <FormGroup className='w-3/6 flex flex-col px-3 '>
                  <label className='font-bold mr-4'>Date of admission: </label>
                  <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' type="date" name='admissionDate' defaultValue={userObj.admissionDate} onChange={handleChange} />
                </FormGroup>
                <FormGroup className='col-span-1 w-3/6 flex my-auto pr-3 font-semibold'>
                  <button className='bg-slate-500 hover:bg-slate-600 transition-all w-4/5 border-2 py-1 border-slate-600 mx-auto text-slate-100 rounded-md' onClick={(e) => handleAdmissionDate(e, "Reset")}>Set admsn date</button>
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

                    {/* Export Button */}
                    {
                      Array.isArray(userObj.vacations) && userObj.vacations.length ? (
                        <HRExport
                          userName={`${userObj.name} ${userObj.lastname}`}
                          userObject={userObj}
                          columns={
                            [
                              { header: "Start vacation", key: "startVacationDay", width: 15 },
                              { header: "End vacation", key: "endVacationDay", width: 15 },
                              { header: "Days", key: "days", width: 15 },
                              // { header: "Added Days", key: "addedDays", width: 15},
                              // { header: "Taken Days", key: "takenDays", width: 15}
                            ]
                          }
                        />) : null
                    }

                    {/* Vacations table */}
                    <table className='bg-slate-400 text-center table-fixed'>
                      <thead className='bg-slate-500 w-full'>
                        <tr className='w-full'>
                          <th className='text-slte-500 w-1/4'><button onClick={(e) => { e.preventDefault(); document.querySelector("#tableDates").classList.toggle("hidden") }}>▼</button></th>
                          <th className='w-1/4'>From</th>
                          <th className='w-1/4'>Until</th>
                          <th className='w-1/4'>Days</th>
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
          <button className='text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-600 hover:bg-slate-800' onClick={closeModal}>Cancel</button>
        </div>
      </Modal>

      {/* ADD user modal */}
      <Modal isOpen={ocModal2}>
        <div className='text-center bg-slate-700'>
          <h3 className='font-bold text-center text-2xl py-2 text-slate-200'>Create User</h3>
        </div>
        <div className='bg-slate-200'>
          <ModalBody>
            <Form>
              <div className='flex flex-wrap justify-evenly items-start'>
                <FormGroup className='w-1/2 flex flex-col px-2 '>
                  <label className='font-bold mr-4'>Identification: </label>
                  <div className='flex w-full items-center justify-between border-2 p-1 border-slate-400 rounded-md bg-white' id="userid">
                    <input className='w-5/6 outline-none' type="number" name='id' onChange={handleUserChange} />
                    <div></div>
                  </div>
                </FormGroup>

                <FormGroup className='w-1/2 flex flex-col px-2 '>
                  <label className='font-bold mr-4'>Name: </label>
                  <div className='flex w-full items-center justify-between border-2 p-1 border-slate-400 rounded-md bg-white' id="username">
                    <input className='w-5/6 outline-none' type="text" name='name' onChange={handleUserChange} />
                    <div></div>
                  </div>
                </FormGroup>
              </div>
              <div className='flex flex-wrap justify-evenly items-start'>
                <FormGroup className='w-full flex flex-col px-2 '>
                  <label className='font-bold mr-4'>Email: </label>
                  <div className='flex w-full items-center justify-between border-2 p-1 border-slate-400 rounded-md bg-white' id="useremail">
                    <input className='w-5/6 outline-none' type="email" name='email' onChange={handleUserChange} />
                    <div></div>
                  </div>
                </FormGroup>

                <FormGroup className='w-full flex flex-col px-2 '>
                  <label className='font-bold mr-4'>Password: </label>
                  <div className='flex w-full items-center justify-between border-2 p-1 border-slate-400 rounded-md bg-white' id="userpassword">
                    <input className='w-5/6 outline-none' type="text" name='password' onChange={handleUserChange} />
                    <div></div>
                  </div>
                </FormGroup>
              </div>
            </Form>
          </ModalBody>
        </div>
        <div className='flex justify-evenly'>
          <button className='text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-500 hover:bg-slate-800' onClick={createSuper}>Create</button>
          <button className='text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-600 hover:bg-slate-800' onClick={() => setOcModal2(false)}>Cancel</button>
        </div>
      </Modal>
    </>
  )
}

export default Employees;
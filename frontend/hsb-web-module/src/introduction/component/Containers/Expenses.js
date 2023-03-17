import './Container1Data.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect} from "react";
import {Table,Container,Modal,ModalHeader,ModalBody,FormGroup} from "reactstrap";
import NavBar from '../navBar/navBar';
import Api from "../../../services";
import * as ExcelJS from "exceljs";

const Expenses = () => {
  let dataExpenses = [];
  let dataUsers = [];
  let result=[];
  const [data, setData] = useState(dataExpenses);
  const [datas, setDatas] = useState(dataUsers);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalInsert, setModalInsert] = useState(false);
  const [form, setForm] = useState({item: "" ,name: "" ,brand: "" ,acquisition_date: "" ,statusD: "" ,value: "" ,supplier: "" , responsible: "", observation: ""})
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("ASC");
  const [mesSeleccionado, setMesSeleccionado] = useState("");
  

  const getDatas = async () => {
    const itemse = await Api.fun3();
    if(typeof(itemse) == "undefined"){
      // console.log("sin datos disponibles")
      return null;
    } else {

        itemse.map( elm => {
          const detailse = JSON.parse(elm["details"].replace(/&quot;/g, '"'));
          const iteme =  {
                  id: elm.id,
                  name: elm.name,
                  email: elm.email,
                  active: elm.active,
                  lastname: detailse.lastname
              }
              return dataUsers.push(iteme)
        })
      };
  };
  getDatas();

  const getData = async () => {
    const items = await Api.fun2();
    if(typeof(items) == "undefined"){
      return null;
    } else {
        const url = window.location.href;
        const expenses = "/expenses/";

        const allItems = items.map( elm => {
            const details = JSON.parse(elm["assetDetails"].replace(/&quot;/g, '"'));
            const item =  {
                  item: Number(parseInt(elm.id)),
                  name: elm.assetName,
                  acquisition_date: elm.assetPurchaseDate,
                  statusD: elm.assetActive,
                  brand: details.brand,
                  value: details.value,
                  supplier: details.supplier,
                  responsible: details.responsible,
                  observation: details.observation,
                  itemType: details.itemType
                }
                return item;          
        })
        
        if (url.includes(expenses)) {
          const expenses = allItems.filter(x => x.itemType === "expenses");
          expenses.forEach( x => dataExpenses.push(x))
        }
      };
  };
  useEffect(() => {
    getData();
  }, []);

  const searcher = (e) =>{
    setSearch(e.target.value)
    console.log(e.target.value)
  }
  if(!search){
    result=data
  }else{
    result=data.filter((datos) =>
    datos.name.toLowerCase().includes(search.toLocaleLowerCase())

    )
  }
  
  const sorting = (col) => {
    if (order == "ASC"){
      const sorted = [...data].sort((a,b) =>
      a[col].toLowerCase() > b[col].toLowerCase() ? 1: -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a,b) =>
      a[col].toLowerCase() < b[col].toLowerCase() ? 1: -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  }

  const handleChangeM = (event) => {
    setMesSeleccionado(event.target.value);
  };

  const filteredData = data.filter(
    (dato) => dato.acquisition_date.slice(5, 7) === mesSeleccionado
  );
  
  /*
  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Datos");

    // Definir las columnas de la hoja de cálculo
    worksheet.columns = [
      { header: "name", key: "name", width: 10 },
      //{ header: "brand", key: "brand", width: 30 },
      //{ header: "Correo electrónico", key: "email", width: 30 },
    ];

    // Añadir los datos a la hoja de cálculo
    /*this.state.data.forEach((dato) => {
      worksheet.addRow({
        //id: dato.id,
        name: dato.name,
        //email: dato.email,

      });
    });

    // Descargar el archivo Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "datos.xlsx";
      a.click();
    });
  };*/

  const createExcel = async () => {
    // Obtener los datos de la API
    const items = await Api.fun2();
    
    // Crear un nuevo libro de Excel y agregar una nueva hoja
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Datos');
    
    // Agregar encabezados de columna a la hoja
    worksheet.columns = [
      { header: 'ID', key: 'id' },
      { header: 'Name', key: 'name' },
      { header: 'Adquisition Date', key: 'acquisition_date'},
      { header: 'Status', key: 'statusD' },
      { header: 'Brand', key: 'brand' },
      { header: 'Value', key: 'value' },
      { header: 'Supplier', key: 'supplier' },
      { header: 'Responsible', key: 'responsible' },
      { header: 'Observation', key: 'observation' },
    ];
  
    // Agregar datos a la hoja de Excel
    const urls = window.location.href;
    const expenses = "/expenses/";
    const dataExpenses = [];
  
    const allItems = items.map((elm) => {
      const details = JSON.parse(elm["assetDetails"].replace(/&quot;/g, '"'));
      const item = {
        id: parseInt(elm.id),
        name: elm.assetName,
        acquisition_date: elm.assetPurchaseDate,
        brand: details.brand,
        value: details.value,
        supplier: details.supplier,
        responsible: details.responsible,
        statusD: elm.assetActive === "1" ? "Using" : "Discarded",
        observation: details.observation,
        itemType: details.itemType,
      };
      return item;
    });
  
    if (urls.includes(expenses)) {
      const expenses = allItems.filter((x) => x.itemType === "expenses");
      expenses.forEach((x) => dataExpenses.push(x));
    }
  
    // Agregar los datos a la hoja de Excel
    worksheet.addRows(dataExpenses);

    // Agregar bordes a cada celda
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment={ horizontal: 'center' }
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
      });
    });

    worksheet.columns.forEach((column) => {
      column.width = column.header.length < 18 ? 18 : column.header.length;
    });

    const activeItems = items.filter((elm) => elm.assetActive === "1");

    // Sumar los valores de "value" de los elementos filtrados
    const totalValue = activeItems.reduce((acc, elm) => {
      const details = JSON.parse(elm.assetDetails.replace(/&quot;/g, '"'));
      return acc + parseFloat(details.value);
    }, 0);

    worksheet.addRow([]);
    worksheet.addRow(['Total value:', totalValue]);

    // Guardar el libro de Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Expenses.xlsx';
    link.click();
  };

  const calculateTotal = () => {
    return data.reduce((total, dato) => total + parseFloat(dato.value), 0);
  };
   
  const showModalUpdate = (dato) => {
    setForm(dato);
    setModalUpdate(true);
  };
  const closeModalUpdate = () => setModalUpdate(false);
  const showModalInsert = () => setModalInsert(true);
  const closeModalInsert = () => setModalInsert(false);
  const edit = (dato) => {
  
  var counter = 0;
  var array = data;
  
  array.map( items => {
    if (dato.item === items.item) {
      array[counter].brand = dato.brand;
      array[counter].name = dato.name;
      array[counter].acquisition_date = dato.acquisition_date;
      array[counter].value = dato.value;
      array[counter].supplier = dato.supplier;
      array[counter].responsible = dato.responsible;
      array[counter].observation = dato.observation;
      array[counter].statusD = dato.statusD;
    //console.log(array[counter])
    Api.apiUpdate(array[counter]);
    }
    counter++;
    return null
  });
  setData(array);
  setModalUpdate(false)
  };
  const url = window.location.href.toString();
  const insert = () => {
  let newValue = form
        newValue.item = parseInt(newValue.item + newValue.brand.length + newValue.value.length + Math.floor(Math.random()*1000));
        
        url.includes("/expenses/") ? 
        newValue["itemType"] = "expenses" : console.log("...")

        console.log(newValue);

        Api.apiCreate(newValue);
        setData([...dataExpenses, newValue]);
        setModalInsert(false)
  };
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  };

  return(<>
    <NavBar/>
    <div className='border-3 border-slate-500 rounded-xl mx-5 my-4 shadow-md shadow-slate-600'>
      <h1 className='text-5xl font-bold py-3 bg-slate-300 rounded-t-xl border-b-4 border-slate-400 text-center'>Expenses</h1>
      <div>
          <div className='w-full flex justify-end font-semibold'>
            <div className='w-fit border-2 border-slate-400 rounded-md px-1 mx-3 flex items-center text-slate-700'>
              <input type="search" className='rounded-md outline-none' id='search' placeholder='Search Expenses'  onChange={searcher} value={search} />
              <i className="border-l-2 px-2 fa-solid fa-magnifying-glass"></i>
            </div>
            <button className='mx-3 border-2 border-slate-600 p-1 rounded-md bg-slate-500 hover:bg-slate-600 text-slate-50 px-3 py-2' onClick={() => createExcel()}>Export</button> 
            <button className='mx-3 border-2 border-slate-600 p-1 rounded-md bg-slate-500 hover:bg-slate-600 text-slate-50 px-3 py-2' onClick={() => showModalInsert()}>Add Expense</button>
          </div>
      </div>
      <Container className='text-xl table-responsive'>
        <Table className='w-full mb-4 text-center table-fixed'>
          <thead className='w-full border-b-2 border-slate-500'>
            <tr className='h-16 w-full'>
              <th>▼</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Adquisition Date</th>
              <th>Value</th>
              <th>Supplier</th>
              <th>Responsible</th>
              <th onClick={()=>sorting("statusD")}>State ↕</th>
            </tr>
          </thead>
          <tbody>
            {result.map( (dato) => ( 
              <tr key={dato.item}>
                <th><button class="bg-slate-500 hover:bg-slate-600 transition-all w-3/5 border-2 font-semibold py-1 border-slate-600 text-slate-100 rounded-md" onClick={() => showModalUpdate(dato)}>Details</button></th>
               
                <td>{dato.name}</td>
                <td>{dato.brand}</td>
                <td>{dato.acquisition_date}</td>
                <td>{dato.value}</td>
                <td>{dato.supplier}</td>
                <td>{dato.responsible}</td>
                <td>{dato.statusD === "1" ? "Using" : "Discarded"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Container className='text-xl table-responsive'>
      <div className='border-3 border-slate-500 rounded-xl mx-5 my-4 shadow-md shadow-slate-60'>
      <Table className='w-full mb-4 text-center table-fixed'>
          <tbody>
              <tr >
                <th>Total for month</th>
                <td>
                  <select value={mesSeleccionado} onChange={handleChangeM}
                  class="select outline-blue-500 w-50 max-w-xs border-2 p-1 border-slate-400 rounded-md">
                    <option key={calculateTotal} select>Select month</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </td>
                <td>{filteredData.reduce((total, dato) => total + parseFloat(dato.value), 0)}</td>
              </tr>
          </tbody>
        </Table>

        
      </div>
      </Container>
      <Modal isOpen={modalUpdate}>
          <ModalHeader className='text-center bg-slate-700'>
            <h3 className='font-bold text-center text-2xl py-2 text-slate-200'>Edit Register</h3>
          </ModalHeader>
          <div className='bg-slate-200 pr-10 pl-10'>
          <ModalBody >
            <FormGroup className='font-bold mr-4 '>
              <label className='font-bold mr-4'>Name: </label>
              <input  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none'  name="name" type="text" onChange={handleChange} value={form.name} />
            </FormGroup>
            <FormGroup>
              <label className='font-bold mr-4'> Brand: </label>
              <input  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none'  name="brand" type="text" onChange={handleChange} value={form.brand} />
            </FormGroup>
            <FormGroup>
              <label className='font-bold mr-4'>Acquisition date: </label>
              <input  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="acquisition_date" type="date" onChange={handleChange} value={form.acquisition_date}/>
            </FormGroup>
            <FormGroup>
              <label className='font-bold mr-4'>Value: </label>
              <input  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="value" type="text" onChange={handleChange} value={form.value}/>
            </FormGroup>
            <FormGroup>
              <label className='font-bold mr-4'>Supplier: </label>
              <input  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none'  name="supplier" type="text" onChange={handleChange} value={form.supplier}/>
            </FormGroup>
            <FormGroup>
              <label className='font-bold mr-4'>Status: </label>
              <select class="select outline-blue-500 w-full max-w-xs border-2 p-1 border-slate-400 rounded-md" name="statusD" onChange={handleChange} value={form.statusD}>
                <option value="0">Discarded</option>
                <option value="1">Using</option>
              </select>
            </FormGroup>  
            <FormGroup>
              <label className='font-bold mr-4'>Responsible: </label>
              <select class="select outline-blue-500 w-full border-2 p-1 border-slate-400 rounded-md" name="responsible" onChange={handleChange} value={form.responsible}>
                {datas.map( (datou) => ( 
                  <option key={datou.id} value={datou.name }>{datou.name} {datou.lastname}</option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <label className='font-bold mr-4'>Observation: </label>
              <textarea  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none resize-none' name="observation" type="text" onChange={handleChange} value={form.observation}/>
            </FormGroup>          
          </ModalBody>
          </div>
            <div className='flex justify-evenly'>
            <button className='text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-500 hover:bg-slate-800' onClick={() => edit(form)}>Edit</button>
            <button className='text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-600 hover:bg-slate-800' color="danger" onClick={() => closeModalUpdate()}>Cancel</button>
            </div>
      </Modal>
      <Modal isOpen={modalInsert}>
          <ModalHeader className='text-center bg-slate-700'>
           <h3 className='font-bold text-center text-2xl py-2 text-slate-200'>Insert Item</h3>
          </ModalHeader>
          <div className='bg-slate-200 pr-10 pl-10'> 
          <ModalBody>
            <FormGroup>
              <label className='font-bold mr-4'>Name: </label>
              <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="name" type="text" onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
              <label className='font-bold mr-4'>Brand: </label>
              <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="brand" type="text" onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
              <label className='font-bold mr-4'>Acquisition date: </label>
              <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="acquisition_date" type="date" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label className='font-bold mr-4'>Value: </label>
              <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="value" type="numbe" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label className='font-bold mr-4'>Supplier: </label>
              <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="supplier" type="text" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label className='font-bold mr-4'>Status: </label>
              <select class="select outline-blue-500 w-full max-w-xs border-2 p-1 border-slate-400 rounded-md" name="statusD" onChange={handleChange}>
                <option disabled selected>Select state</option>
                <option value="0">Discarded</option>
                <option value="1">Using</option>
              </select>
            </FormGroup> 
            <FormGroup>
              <label className='font-bold mr-4'>Responsible: </label>
              <select class="select outline-blue-500 w-full file:border-2 p-1 border-slate-400 rounded-md" name="responsible" onChange={handleChange}>
              <option disabled selected>Select responsible</option>
                {datas.map( (datou) => ( 
                  <option key={datou.id} value={datou.name}>{datou.name} {datou.lastname}</option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <label className='font-bold mr-4'>Observation: </label>
              <textarea  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none resize-none' name="observation" type="text" onChange={handleChange}/>
            </FormGroup>
          </ModalBody>
          </div>
          <div className='flex justify-evenly'>
            <button className='text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-500 hover:bg-slate-800' onClick={() => insert()} > Insert </button>
            <button className='text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-600 hover:bg-slate-800' color="danger" onClick={() => closeModalInsert()} > Cancel </button>
          </div>
      </Modal>
      </div>
  </>)
}
export default Expenses;
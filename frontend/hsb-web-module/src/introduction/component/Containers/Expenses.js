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
  let dataCatalog=[];
  const [datac, setDatac] = useState(dataCatalog);
  const [data, setData] = useState(dataExpenses);
  const [datas] = useState(dataUsers);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalInsert, setModalInsert] = useState(false);
  const [form, setForm] = useState({item: "" ,name: "" ,brand: "" ,acquisition_date: "" ,statusD: "" ,value: "" ,supplier: "" , responsible: "", observation: ""})
  const [formData, setFormData] = useState({catalogName: '', id: '' });
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("ASC");
  const [total, setTotal] = useState(0);
  const [month, setMonth] = useState('');
  const [successMessage, setSuccessMessage] = useState([dataExpenses]);
  
  const getCatalog = async () => {
    const itemsc = await Api.apiGetCatalog();
    if(typeof(itemsc) == "undefined"){
      // console.log("sin datos disponibles")
      return null;
    } else {

      itemsc.map( elm => {
          const itemc =  {
                  id: elm.id,
                  catalogName: elm.catalogName,
              }
              return dataCatalog.push(itemc)
        })
      };
  };
  getCatalog();

  const getDatas = async () => {
    const itemse = await Api.apiGetUser();
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
    const items = await Api.apiGetItem();
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
                  description: details.description,
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
  getData();

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
    if (order === "ASC"){
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

  const createExcel = async () => {
    // Obtener los datos de la API
    const items = await Api.apiGetItem();
    
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

    // Guardar el libro de Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Expenses.xlsx';
    link.click();
  };

  const handleKeyPress = (event) => {
    // Obtener el valor del carácter ingresado
    const charCode = event.which ? event.which : event.keyCode;
    const char = String.fromCharCode(charCode);

    // Validar que el carácter ingresado es un número
    if (!/^\d+$/.test(char)) {
      event.preventDefault();
    }
  }

  const calculateTotal = () => {
    let sum = 0;
    data.forEach(dato => {
      if (dato.statusD === '1' && (month === '' || dato.acquisition_date.includes(month))) {
        sum += parseFloat(dato.value);
      }
    });
    setTotal(sum);
  };

  useEffect(() => {
    calculateTotal();
  }, [month, data]);

  const handleSelectChange = (event) => {
    setMonth(event.target.value);
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
      array[counter].description = dato.description;
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
        setModalInsert(false);
        setSuccessMessage('Successfully created');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
        
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
            <button className='mx-3 border-2 border-slate-600 p-1 rounded-md bg-slate-500 hover:bg-slate-600 text-slate-50 px-3 py-2' onClick={() => createExcel()}><svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20"><path d="M9.878,18.122a3,3,0,0,0,4.244,0l3.211-3.211A1,1,0,0,0,15.919,13.5l-2.926,2.927L13,1a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1l-.009,15.408L8.081,13.5a1,1,0,0,0-1.414,1.415Z"/><path d="M23,16h0a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V17a1,1,0,0,0-1-1H1a1,1,0,0,0-1,1v4a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V17A1,1,0,0,0,23,16Z"/></svg></button> 
            <button className='mx-3 border-2 border-slate-600 p-1 rounded-md bg-slate-500 hover:bg-slate-600 text-slate-50 px-3 py-2' onClick={() => showModalInsert()}>+</button>
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

      {/* <Container className='text-xl table-responsive'>
        <Table className='w-full mb-4 text-center table-fixed'>
          <thead className='w-full border-b-2 border-slate-500'>
            <tr className='h-16 w-full'>
              <th>▼</th>
              <th>item</th>
              <th>catalgo</th>
            </tr>
            </thead>
          <tbody>
            {datac.map( (datoc) => ( 
              <tr key={datoc.itemc}>
                <th><button class="bg-slate-500 hover:bg-slate-600 transition-all w-3/5 border-2 font-semibold py-1 border-slate-600 text-slate-100 rounded-md">Details</button></th>
               
                <td>{datoc.id}</td>
                <td>{datoc.catalogName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container> */}
      <Container className='text-xl table-responsive'>
      <div className='border-3 border-slate-500 rounded-xl mx-5 my-4 shadow-md shadow-slate-60'>
        <Table className='w-full mb-4 text-center table-fixed'>
          <tbody>
              <tr >
                <th>Total for month</th>
                <td>
                  <select value={month} onChange={handleSelectChange}
                  class="select outline-blue-500 w-50 max-w-xs border-2 p-1 border-slate-400 rounded-md">
                    <option selected value="">All month</option>
                    <option value="2023-01">January</option>
                    <option value="2023-02">February</option>
                    <option value="2023-03">March</option>
                    <option value="2023-04">April</option>
                    <option value="2023-05">May</option>
                    <option value="2023-06">June</option>
                    <option value="2023-07">July</option>
                    <option value="2023-08">August</option>
                    <option value="2023-09">September</option>
                    <option value="2023-10">October</option>
                    <option value="2023-11">November</option>
                    <option value="2023-12">December</option>
                  </select>
                </td>
                <td>{total}</td>
              </tr>
          </tbody>
        </Table>
      </div>
      {successMessage && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: 'limegreen', color: 'white', padding: '10px', borderRadius: '5px' }}>
          {successMessage}
        </div>
      )}
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
{/*               <input  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none'  name="brand" type="text" onChange={handleChange} value={form.brand} />
 */}            
 <select class="select outline-blue-500 w-full border-2 p-1 border-slate-400 rounded-md" name="brand" onChange={handleChange} value={form.brand}>
                {datac.map( (datoc) => ( 
                  <option key={datoc.id} value={datoc.catalogName}>{datoc.catalogName}</option>
                ))}
              </select>
 </FormGroup>
            <FormGroup>
              <label className='font-bold mr-4'>Acquisition date: </label>
              <input  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="acquisition_date" type="date" onChange={handleChange} value={form.acquisition_date}/>
            </FormGroup>
            <FormGroup>
              <label className='font-bold mr-4'>Value: </label>
              <input  onKeyPress={handleKeyPress} className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="value" type="text" onChange={handleChange} value={form.value}/>
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
            <FormGroup>
              <label className='font-bold mr-4'>Description: </label>
              <textarea  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none resize-none' name="description" type="text" onChange={handleChange} value={form.description}/>
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
              <select class="select outline-blue-500 w-full file:border-2 p-1 border-slate-400 rounded-md" name="brand" onChange={handleChange}>
              <option disabled selected>Select brand</option>
                {datac.map( (datoc) => ( 
                  <option key={datoc.id} value={datoc.catalogName}>{datoc.catalogName}</option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <label className='font-bold mr-4'>Acquisition date: </label>
              <input className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="acquisition_date" type="date" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label className='font-bold mr-4'>Value: </label>
              <input onKeyPress={handleKeyPress} className='w-full border-2 p-1 border-slate-400 rounded-md outline-none' name="value" type="numbe" onChange={handleChange} />
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
            <FormGroup>
              <label className='font-bold mr-4'>Description: </label>
              <textarea  className='w-full border-2 p-1 border-slate-400 rounded-md outline-none resize-none' name="description" type="text" onChange={handleChange}/>
            </FormGroup>
          </ModalBody>
          </div>
          <div className='flex justify-evenly'>
            <button className='text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-500 hover:bg-slate-800' onClick={() => insert()}> Insert </button>
            <button className='text-2xl font-bold text-slate-300 w-1/2 py-1 bg-slate-600 hover:bg-slate-800' color="danger" onClick={() => closeModalInsert()} > Cancel </button>
          </div>
      </Modal>
      </div>
  </>)
}
export default Expenses;
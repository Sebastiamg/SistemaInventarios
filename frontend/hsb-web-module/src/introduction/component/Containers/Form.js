import NavBar from '../navBar/navBar';
import './Container1Data.css'
import React from 'react'
import {liquidacionCompra, accessCode} from './Formato';
import Api from '../../../services';

const jsonConverter = (e) => {
    e.preventDefault();
    const formato = liquidacionCompra;
    const lcForm = document.querySelectorAll("#lcForm")

    // Info tributaria 0 - 10.
    for (let i = 0; i < 11; i++) {
        formato.infoTributaria[lcForm[0][i].id] = lcForm[0][i].value;
    }

    //Info liquidacion de compra / totales sin Impuestos 11 - 18.
    for (let i = 0; i < 16; i++) {
        formato.infoLiquidacionCompra[lcForm[0][i+11].id] = lcForm[0][i+11].value;
    }

    // Totales con Impuestos 25 - 30
    for (let i = 0; i < 5; i++) {
        formato.infoLiquidacionCompra.totalConImpuestos.totalImpuesto[lcForm[0][i+25].id] = lcForm[0][i+25].value
    }

    // 31 - 32
    for (let i = 0; i < 2; i++) {
        formato.infoLiquidacionCompra[lcForm[0][i+31].id] = lcForm[0][i+31].value
    }

    //Detalles 38 - 52.
    formato.detalles = []
    let allItems = document.querySelectorAll("#itemsTable #tbody")[0].children;
    for (let i = 0; i < allItems.length; i++) {
        let itemDetalle = {"detalle": {}}

        for (let j = 0; j < allItems[i].children.length-1; j++) {
            const node = allItems[i].children[j+1];
            itemDetalle.detalle[`${node.className}`] = node.textContent;  
        }
        formato.detalles.push(itemDetalle);
    }

    // Pagos 33 - 36
    formato.infoLiquidacionCompra.pagos = []
    let allItems2 = document.querySelectorAll("#itemsTable2 #tbody1")[0].children;
    for (let i = 0; i < allItems2.length; i++) {
        let payment = {"pago": {}}

        for (let j = 0; j < allItems2[i].children.length; j++) {
            const node = allItems2[i].children[j];
            payment.pago[`${node.className}`] = node.textContent;  
        }
        formato.infoLiquidacionCompra.pagos.push(payment);
    }

    // Reembolso 53 - 62
    for (let i = 0; i < 10; i++) {
        formato.reembolsos.reembolsoDetalle[lcForm[0][i+53].id] = lcForm[0][i+53].value
    }

    //Detalle Impuestos 63 - 67
    for (let i = 0; i < 5; i++) {
        formato.reembolsos.reembolsoDetalle.detalleImpuestos.detalleImpuesto[lcForm[0][i+63].id] = lcForm[0][i+63].value;
    }

    //Máquina fiscal 68 - 70
    for (let i = 0; i < 3; i++) {
        formato.maquinaFiscal[lcForm[0][i+68].id] = lcForm[0][i+68].value     
    }

    Api.apiLiquidacionCompra(formato)
    // return console.log(formato)
}

// handle value (accesCode)
function handleChange(e){
    const lcForm = document.querySelectorAll("#lcForm")
    const parameters = [3, lcForm[0][4].value, lcForm[0][0].value, "001001", "000000001" ];
    lcForm[0][9].value = accessCode(parameters[0],  parameters[1], parameters[2], parameters[3], parameters[4]);
}

function handleTotal(e) {
    const lcForm = document.querySelectorAll("#lcForm")
    // 41 - 42 - 44      des: 43 +1
    if (lcForm[0][44].value) {
        let porcentaje = lcForm[0][44].value / 100;

        lcForm[0][45].value = ((lcForm[0][42].value * lcForm[0][43].value) - ((lcForm[0][42].value * lcForm[0][43].value) * porcentaje)).toFixed(2)
    } else {
        lcForm[0][45].value = (lcForm[0][42].value * lcForm[0][43].value).toFixed(2);
    }

    //50 - 51 base y valor +1
    lcForm[0][51].value = lcForm[0][45].value;
    lcForm[0][52].value = ((lcForm[0][43].value * lcForm[0][50].value) / 100).toFixed(2)
}  


//Add detail (item) 37 - 45
function AddDetail() {
    const lcForm = document.querySelectorAll("#lcForm");
    const itemsTable = document.querySelector("#itemsTable").children[1];

    if(lcForm[0][38].value === "" || lcForm[0][40].value === "" || lcForm[0][42].value === "" || lcForm[0][43].value === "" || lcForm[0][45].value === "" ) {
        console.log("LLENA TODOS LOS CAMPOS")
    } else { 
    const row = `
    <tr>  
        <th scope="col"><button type="button" class="btn btn-danger">X</button></th>
        <td scope="col" class="${lcForm[0][38].id}" >${lcForm[0][38].value}</td>      
        <td scope="col" class="${lcForm[0][39].id}"  style="display: none">${lcForm[0][39].value}</td>     
        <td scope="col" class="${lcForm[0][40].id}" >${lcForm[0][40].value}</td>      
        <td scope="col" class="${lcForm[0][41].id}"  style="display: none">${lcForm[0][41].value}</td>     
        <td scope="col" class="${lcForm[0][42].id}" >${lcForm[0][42].value}</td>      
        <td scope="col" class="${lcForm[0][43].id}" >${lcForm[0][43].value}</td> 
        <td scope="col" class="${lcForm[0][44].id}"  style="display: none">${lcForm[0][44].value}</td>     
        <td scope="col" class="${lcForm[0][45].id}" >${lcForm[0][45].value}</td>      
        <td scope="col" class="${lcForm[0][46].id}" >${lcForm[0][46].value}</td>
        <td scope="col" class="${lcForm[0][48].id}"  style="display: none">${lcForm[0][48].value}</td>     
        <td scope="col" class="${lcForm[0][49].id}"  style="display: none">${lcForm[0][49].value}</td>     
        <td scope="col" class="${lcForm[0][50].id}"  style="display: none">${lcForm[0][50].value}</td>     
        <td scope="col" class="${lcForm[0][51].id}"  style="display: none">${lcForm[0][51].value}</td>     
        <td scope="col" class="${lcForm[0][52].id}"  style="display: none">${lcForm[0][52].value}</td>     
    </tr>`
    itemsTable.innerHTML += row
    for (let i = 0; i < 9; i++) {
        lcForm[0][i+38].value = "";lcForm[0][51].value = "";lcForm[0][52].value = "";
    }
    }
    document.querySelectorAll(".btn-danger").forEach(x => x.addEventListener("click", removeItem));

    //Totales sin Impuestos 19 - 24
    const base = [...document.querySelectorAll("#itemsTable #tbody")[0].children]
    let totalNoImpuestos = base.map(x => parseFloat((x.children[13].textContent))).reduce((total, actual) => total + actual, 0);
    let totalDescuentos = base.map(x => parseInt(x.children[7].textContent)).reduce((total, actual) => total + actual, 0);
    lcForm[0][19].value = Number(totalNoImpuestos)
    lcForm[0][20].value = Number(totalDescuentos)   
    console.log(totalNoImpuestos)

}

function AddPayment() {
    console.log("Hola Luna");
    // 33 - 36
    const lcForm = document.querySelectorAll("#lcForm");
    const itemsTable = document.querySelector("#itemsTable2").children[1];

    if(lcForm[0][33].value === "" || lcForm[0][34].value === "" || lcForm[0][35].value === "") {
        console.log("LLENA TODOS LOS CAMPOS")
    } else { 
    const row = `
    <tr>  
        <th scope="col"><a class="btn btn-danger">X</a></th>
        <td scope="col" class="${lcForm[0][33].id}" >${lcForm[0][33].value}</td>      
        <td scope="col" class="${lcForm[0][34].id}" >${lcForm[0][34].value}</td>     
        <td scope="col" class="${lcForm[0][35].id}" >${lcForm[0][35].value}</td>      
        <td scope="col" class="${lcForm[0][36].id}" >${lcForm[0][36].value}</td>
    </tr>`
    itemsTable.innerHTML += row;
    document.querySelectorAll(".btn-danger").forEach(x => x.addEventListener("click", removeItem));

    for (let i = 0; i < 3; i++) {
        lcForm[0][i+34].value = "";
    }
} 
}

//Delete item
function removeItem (e) {
    this.parentElement.parentElement.remove();

    const lcForm = document.querySelectorAll("#lcForm");
    const base = [...document.querySelectorAll("#itemsTable #tbody")[0].children];
    let totalNoImpuestos = base.map(x => parseFloat((x.children[13].textContent))).reduce((total, actual) => total + actual, 0);
    let totalDescuentos = base.map(x => parseFloat(x.children[7].textContent)).reduce((total, actual) => total + actual, 0);
    lcForm[0][19].value = Number(totalNoImpuestos);
    lcForm[0][20].value = Number(totalDescuentos);
}


const Form = () => {
    // console.log(lcForm)
  return (<>
    <NavBar/>
        <h1>Liquidacion de compra</h1>
        <div >
            <form id="lcForm">
                <div className='infTributaria father'> {/* div 1 */}
                    <h3 className='titulo'>Información Tributaria</h3>
                    <label htmlFor="ambiente" className='form-label col '>Ambiente: <select id="ambiente" className='form-select' onChange={handleChange} >
                            <option value="1">Pruebas</option>
                            <option value="2">Producción</option>
                        </select></label>
                    <label htmlFor="tipoEmision" className='form-label col'>Tipo de Emisión: <select id="tipoEmision" className='form-select'>
                            <option value="1">Normal</option>
                        </select></label> 
                    <label htmlFor="razonSocial" className='form-label col'>Razón Social: <input type="text" id="razonSocial" className='form-control' maxLength={300}/></label> 
                    <label htmlFor="nombreComercial" className='form-label col'>Nombre Comercial: <input type="text" id="nombreComercial" className='form-control'/></label>
                    <label htmlFor="ruc" className='form-label col'>Ruc: <input type="number" id="ruc" className='form-control' onChange={handleChange}/></label>
                    <label htmlFor="codDoc" className='form-label col'>Cod Doc: <input type="number" id="codDoc" className='form-control'/></label>
                    <label htmlFor="estab" className='form-label col'>Estab: <input type="number" id="estab" className='form-control'/></label>
                    <label htmlFor="ptoEmi" className='form-label col'>PtoEmisión: <input type="number" id="ptoEmi" className='form-control'/></label>
                    <label htmlFor="secuencial" className='form-label col'>Secuencial: <input type="number" id="secuencial" className='form-control'/></label>
                    <label htmlFor="claveAcceso" className='form-label col'>Clave de Acceso: <input type="number" id="claveAcceso" readOnly className='form-control'/></label>
                    <label htmlFor="dirMatriz" className='form-label col'>DirMatriz: <input type="text" id="dirMatriz" className='form-control'/></label>
                    
                </div>
                <div className='infLiqCompra father'> {/* div 2 */}
                    <div className='liqCompra'>
                        <h3 className='titulo'>Informacion de Liquidacion de compra</h3>

                        <label htmlFor="fechaEmision" className='form-label col'>Fecha de Emision: <input type="date" id="fechaEmision" className='form-control'/></label>
                        <label htmlFor="dirEstablecimiento" className='form-label col'>Direccón Establecimiento: <input type="text" id="dirEstablecimiento" className='form-control'/></label>
                        <label htmlFor="contribuyenteEspecial" className='form-label col'>Contribuyente Especial: <input type="text" id="contribuyenteEspecial" className='form-control'/></label>
                        <label htmlFor="obligadoContabilidad" className='form-label col'>Obligado a llevar contabilidad: <select id="obligadoContabilidad" className='form-select'>
                                <option value="si">SI</option>
                                <option value="no">NO</option>
                            </select></label>
                        <label htmlFor="tipoIdentificacionProveedor" className='form-label col'>Tipo identificación del Proveedor: <select id="tipoIdentificacionProveedor" className='form-select'>
                            <option value="04">RUC</option>
                            <option value="05">CEDULA</option>
                            <option value="06">PASAPORTE</option>
                            <option value="07">VENTA A CONSUMIDOR FINAL*</option>
                            <option value="08">IDENTIFICACION DEL EXTERIOR*</option>
                        </select></label>
                        <label htmlFor="razonSocialProveedor" className='form-label col'>Razón social del proveedor: <input type="text" id="razonSocialProveedor" className='form-control'/></label>
                        <label htmlFor="identificacionProveedor" className='form-label col'>Identificación del proveedor: <input type="text" id="identificacionProveedor" className='form-control'/></label>
                        <label htmlFor="direccionProveedor" className='form-label col'>Dirección del proveedor: <input type="text" id="direccionProveedor" className='form-control'/></label>
                    </div>

                    {/* totales */}
                    <div className='totales'>
                    <h3 className='titulo'>Totales sin impuestos </h3>
                        <label htmlFor="totalSinImpuestos" className='form-label col'>Total sin impuestos: <input type="number" id="totalSinImpuestos" className='form-control' readOnly/></label>
                        <label htmlFor="totalDescuento" className='form-label col'>Total descuento: <input type="number" id="totalDescuento" className='form-control' readOnly/></label>
                        <label htmlFor="codDocReembolso" className='form-label col'>Código reembolso: <input type="number" id="codDocReembolso" className='form-control'/></label>
                        <label htmlFor="totalComprobantesReembolso" className='form-label col'>Total comprobantes reembolso: <input type="number" id="totalComprobantesReembolso" className='form-control'/></label>
                        <label htmlFor="totalBaseImponibleReembolso" className='form-label col'>Total base imponible reembolso: <input type="number" id="totalBaseImponibleReembolso" className='form-control'/></label>
                        <label htmlFor="totalImpuestoReembolso" className='form-label col'>Total impuestos reembolso: <input type="number" id="totalImpuestoReembolso" className='form-control'/></label>
                        {/* total con impuestos */}
                        <h3 className='titulo'>Totales con impuestos </h3>
                        <label htmlFor="codigo" className='form-label col'>Código: <select id="codigo" className='form-select'>
                                <option value="2" selected>IVA</option>
                                <option value="3">ICE</option>
                                <option value="5">IRBPNR</option>
                            </select></label>
                        <label htmlFor="codigoPorcentaje" className='form-label col'>Código porcentaje: <select id="codigoPorcentaje" className='form-select'>
                                {/* <option value="" selected></option> */}
                                <option value="0">0%</option>
                                <option value="2" selected>12%</option>
                                <option value="3">14%</option>
                                <option value="6">No Objeto de Impuesto</option>
                                <option value="7">Exento de IVA</option>
                                <option value="8">IVA diferenciado</option>
                            </select></label>
                        <label htmlFor="descuentoAdicional" className='form-label col'>Descuento adicional: <input type="number" id="descuentoAdicional" className='form-control'/></label>
                        <label htmlFor="baseImponible" className='form-label col'>Base imponible: <input type="number" id="baseImponible" className='form-control' readOnly/></label> {/* BASE IMPONIBLE */}
                        <label htmlFor="tarifa" className='form-label col'>Tarifa: <input type="number" id="tarifa" className='form-control' value={12}/></label>
                        <label htmlFor="valor" className='form-label col'>Valor: <input type="number" id="valor" className='form-control' readOnly/></label>
                        <label htmlFor="importeTotal" className='form-label col'>Importe Total: <input type="number" id="importeTotal" className='form-control'/></label>
                        <label htmlFor="moneda" className='form-label col'>Moneda: <input type="text" id="moneda" className='form-control'/></label>
                        
                        <div id="pagos">
                            <h3 className='titulo'>Pago </h3>
                            <label htmlFor="formaPago" className='form-label col'>Forma Pago: <select type="number" id="formaPago" className='form-select'>
                                    <option value="" selected></option>
                                    <option value="01">Sin utilizacion del sistema financiero</option>
                                    <option value="15">Compensación de deudas</option>
                                    <option value="16">Tarjeta de débito</option>
                                    <option value="17">Dinero electrónico</option>
                                    <option value="18">Tarjeta de prepago</option>
                                    <option value="19">Tarjeta de Crédito</option>
                                    <option value="20">Otros con utilización del sistema financiero</option>
                                    <option value="21">Endoso de títulos</option>
                                </select></label>
                            <label htmlFor="total" className='form-label col'>Total: <input type="number" id="total" className='form-control'/></label>
                            <label htmlFor="plazo" className='form-label col'>Plazo: <input type="number" id="plazo" className='form-control'/></label>
                            <label id="xd" htmlFor="unidadTiempo" className='form-label col'>Unidad Tiempo: <input type="text" id="unidadTiempo" className='form-control'/></label>
                                {/* Add Payment */}
                            <button type="button" class="btn btn-success" onClick={AddPayment}>Agregar</button>

                            <div id='tabla-items'>
                                <table className='table table-responsive-sm w-100' id="itemsTable2">
                                    <thead className='table-dark'>
                                        <tr>
                                            <th scope='col'></th>
                                            <th scope='col'>Forma Pago</th>
                                            <th scope='col'>Total</th>
                                            <th scope='col'>Plazo</th>
                                            <th scope='col'>Unidad Tiempo</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody1">
                                        {/* All items ---------------------------------------*/}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='detalles-father'>   {/* div 3 */}
                    {/* detalles */}
                    <div className='detalles'>
                        <div id='formDetalles'>
                            <h3 className='titulo' >Detalles</h3>
                            <label htmlFor="codigoPrincipal" className='form-label col'>Código Principal: <input type="text" id="codigoPrincipal" className='form-control'/></label>
                            <label htmlFor="codigoAuxiliar" className='form-label col'>Código Auxiliar: <input type="text" id="codigoAuxiliar" className='form-control'/></label>
                            <label htmlFor="descripcion" className='form-label col'>Descripción: <input type="text" id="descripcion" className='form-control'/></label>
                            <label htmlFor="unidadMedida" className='form-label col'>Unidad medida: <input type="text" id="unidadMedida" className='form-control'/></label>
                            <label htmlFor="cantidad" className='form-label col'>Cantidad: <input type="number" id="cantidad" className='form-control' onChange={handleTotal} defaultValue={1} /></label>
                            <label htmlFor="precioUnitario" className='form-label col'>Precio unitario: <input type="number" id="precioUnitario" className='form-control' onChange={handleTotal}/></label>  {/* PREICO UNITARIO */}
                            <label htmlFor="descuento" className='form-label col'>Descuento %: <input type="number" id="descuento" className='form-control' onChange={handleTotal}/></label>
                            <label htmlFor="precioTotalSinImpuesto" className='form-label col'>Precio total sin impuestos: <input type="text" readOnly id="precioTotalSinImpuesto" className='form-control'/></label>

                            <div id="detallesAdicionales">
                                <label htmlFor="detAdicional" className='form-label col'>Detalle Adicional: <textarea type="text" id="detAdicional" className='form-control' rows="2"></textarea></label>
                            </div>
                            
                            <button type="button" class="btn btn-success" onClick={AddDetail}>Agregar</button>
                            {/* impuestos */}
                            <div id="impuestos">
                                <h3 className='titulo'>Impuestos</h3>
                                <label className='form-label col'>Código: <select id="codigo" className='form-select'>
                                        <option value="2">IVA</option>
                                        <option value="3">ICE</option>
                                        <option value="5">IRBPNR</option>
                                    </select></label>
                                <label htmlFor='codigoPorcentaje' className='form-label col'>Código Porcentaje: <select type="number" id="codigoPorcentaje" className='form-select'>
                                        {/* <option value="" selected></option> */}
                                        <option value="0">0%</option>
                                        <option value="2" selected>12%</option>
                                        <option value="3">14%</option>
                                        <option value="6">No Objeto de Impuesto</option>
                                        <option value="7">Exento de IVA</option>
                                        <option value="8">IVA diferenciado</option>
                                    </select></label>
                                <label htmlFor='tarifa' className='form-label col'>Tarifa: <input type="number" id="tarifa" className='form-control' defaultValue="12"/></label>
                                <label htmlFor='baseImponible' className='form-label col'>Base Imponible: <input type="number" id="baseImponible" className='form-control' readOnly/></label>
                                <label htmlFor='valor' className='form-label col'>Valor: <input type="number" id="valor" className='form-control' readOnly/></label>
                            </div>
                            {/* Tabla items */}
                            <div id='tabla-items'>
                                <table className='table table-responsive-sm w-100' id="itemsTable">
                                    <thead className='table-dark'>
                                        <tr>
                                            <th scope='col'></th>
                                            <th scope='col'>cod. Principal</th>
                                            <th scope='col'>Descripción</th>
                                            <th scope='col'>Cantidad</th>
                                            <th scope='col'>Precio unitario</th>
                                            <th scope='col'>Total sin impuestos</th>
                                            <th scope='col'>Detalle adicional</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody">
                                        {/* All items */}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div id='reembolsos'>
                        <div id="reembolsoDetalle">
                            <h3 className='titulo'>Reembolsos</h3>
                            <label htmlFor='tipoIdentificacionProveedorReembolso' className='form-label col'>Tipo identificación proveedor reembolso: <select id="tipoIdentificacionProveedorReembolso" className='form-select'>
                                    <option value="" selected></option>
                                    <option value="04">RUC</option>
                                    <option value="05">CEDULA</option>
                                    <option value="06">PASAPORTE</option>
                                    <option value="07">VENTA A CONSUMIDOR FINAL*</option>
                                    <option value="08">IDENTIFICACION DEL EXTERIOR*</option>
                                </select></label>
                            <label htmlFor='identificacionProveedorReembolso' className='form-label col'>Identificación proveedor reembolso: <input type="number" id="identificacionProveedorReembolso" className='form-control'/></label>
                            <label htmlFor='codPaisPagoProveedorReembolso' className='form-label col'>Cod pais pago proveedor reembolso: <input type="number" id="codPaisPagoProveedorReembolso" className='form-control'/></label>
                            <label htmlFor='tipoProveedorReembolso' className='form-label col'>Tipoproveedor reembolso: <select id="tipoProveedorReembolso" className='form-select'>
                                    <option value="" selected></option>
                                    <option value="01">Persona Natural</option>
                                    <option value="02">Sociedad</option>
                                </select></label>
                            <label htmlFor='codDocReembolso' className='form-label col'>Cod doc reembolso: <input type="number" id="codDocReembolso" className='form-control'/></label>
                            <label htmlFor='estabDocReembolso' className='form-label col'>Estab doc reembolso: <input type="number" id="estabDocReembolso" className='form-control'/></label>
                            <label htmlFor='ptoEmiDocReembolso' className='form-label col'>Pto emi doc reembolso: <input type="number" id="ptoEmiDocReembolso" className='form-control'/></label>
                            <label htmlFor='secuencialDocReembolso' className='form-label col'>Secuencial doc reembolso: <input type="number" id="secuencialDocReembolso" className='form-control'/></label>
                            <label htmlFor='fechaEmisionDocReembolso' className='form-label col'>Fecha emisión doc reembolso: <input type="date" id="fechaEmisionDocReembolso" className='form-control'/></label>
                            <label htmlFor='numeroautorizacionDocReemb' className='form-label col'>Núm autorización doc reembolso: <input type="dat" id="numeroautorizacionDocReemb" className='form-control'/></label>

                            <div class='detalleImpuestos'>
                                <h3 className='titulo'>Detalle Impuestos</h3>
                                <label htmlFor="codigo" className='form-label col'>Código: <input type="number" id="codigo" className='form-control'/></label>
                                <label htmlFor="codigoPorcentaje" className='form-label col'>Código Porcentaje: <select id="codigoPorcentaje" className='form-select'>
                                        <option value="" selected></option>
                                        <option value="0">0%</option>
                                        <option value="2">12%</option>
                                        <option value="3">14%</option>
                                        <option value="6">No Objeto de Impuesto</option>
                                        <option value="7">Exento de IVA</option>
                                        <option value="8">IVA diferenciado</option>
                                    </select>
                                </label>
                                <label htmlFor="tarifa" className='form-label col'>Tarifa: <input type="number" id="tarifa" className='form-control'/></label>
                                <label htmlFor="baseImponibleReemboslo" className='form-label col'>Base Imponible Reemboslo: <input type="number" id="baseImponibleReembolso" className='form-control'/></label>
                                <label htmlFor="impuestoReembolso" className='form-label col'>ImpuestoReembolso: <input type="number" id="impuestoReembolso" className='form-control'/></label>
                            </div>
                            
                        </div>
                    </div>
                    <div className='maquinaFiscal'>
                        <h3 className='titulo'>Maquina Fiscal</h3>
                        <label htmlFor="marca" className='form-label col'>Marca: <input type="text" id="marca" className='form-control'/></label>
                        <label htmlFor="modelo" className='form-label col'>Modelo: <input type="text" id="modelo" className='form-control'/></label>
                        <label htmlFor="serie" className='form-label col'>Serie: <input type="text" id="serie" className='form-control'/></label>
                    </div>
                    {/* <div className='infoAdicional'>
                            
                    </div> */}
                </div>
                <input type="submit" name="submitButton" id="submit" value="enviar" style={{position: "fixed", top: "50px"}} onClick={jsonConverter} />
            </form>
            
        </div>
    </>
  )
}

export default Form;
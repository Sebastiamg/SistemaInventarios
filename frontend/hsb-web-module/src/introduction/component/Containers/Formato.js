const liquidacionCompra = {
      "infoTributaria": { 
        "ambiente": "",  
        "tipoEmision": "", 
        "razonSocial": "", 
        "nombreComercial": "", 
        "ruc": "", 
        "claveAcceso": "", 
        "codDoc": "",
        "estab": "", 
        "ptoEmi": "",
        "secuencial": "",
        "dirMatriz": ""
      },
      "infoLiquidacionCompra": {
        "fechaEmision": "",
        "dirEstablecimiento": "",
        "contribuyenteEspecial": "",
        "obligadoContabilidad": "",
        "tipoIdentificacionProveedor": "",
        "razonSocialProveedor": "",
        "identificacionProveedor": "",
        "direccionProveedor": "",
        
        "totalSinImpuestos": "",
        "totalDescuento": "",
        "codDocReembolso": "",
        "totalComprobantesReembolso": "",
        "totalBaseImponibleReembolso": "",
        "totalImpuestoReembolso": "",
        "totalConImpuestos": [ 
          {"totalImpuesto": { 
            "codigo": "",
            "codigoPorcentaje": "",
            "descuentoAdicional": "",
            "baseImponible": "",
            "tarifa": "",
            "valor": ""
          }}
        ],

        "importeTotal": "",
        "moneda": "",
        "pagos": [  
            {"pago": {
            "formaPago": "",
            "total": "",
            "plazo": "",
            "unidadTiempo": ""
          }
        }
      ]
      },
      // detalle
      "detalles":[
        {"detalle": {   
          "codigoPrincipal": "",   
          "codigoAuxiliar": "", 
          "descripcion": "", 
          "unidadMedida": "",
          "cantidad": "",
          "precioUnitario": "",
          "descuento": "", 
          "precioTotalSinImpuesto": "",
          "detallesAdicionales": {  
            "detAdicional": ["",""]
          },
          "impuestos": [    
            {"impuesto": { 
              "codigo": "",
              "codigoPorcentaje": "",
              "tarifa": "",
              "baseImponible": "", 
              "valor": ""
            }}
          ]
        }

      }
    ],

      "reembolsos": {
        "reembolsoDetalle": {
          "tipoIdentificacionProveedorReembolso": "",
          "identificacionProveedorReembolso": "",
          "codPaisPagoProveedorReembolso": "", 
          "tipoProveedorReembolso": "",
          "codDocReembolso": "", 
          "estabDocReembolso": "", 
          "ptoEmiDocReembolso": "",
          "secuencialDocReembolso": "",
          "fechaEmisionDocReembolso": "",
          "numeroautorizacionDocReemb": "",
          "detalleImpuestos": {
            "detalleImpuesto": {
              "codigo": "",
              "codigoPorcentaje": "",
              "tarifa": "",
              "baseImponibleReembolso": "",
              "impuestoReembolso": ""
            }
          }
        }
      },
      "maquinaFiscal": {
        "marca": "", 
        "modelo": "",
        "serie": ""
      },
      "infoAdicional": {
        "campoAdicional": [
          "campoAdicional0",
          "campoAdicional1"
        ]
      }
    };

  // function Generación de clave de acceso
  const accessCode = function(TipoC = 3, numRuc = "0000000000000", ambiente = 1, numSerie = "001001", numComp = "000000001"){
      //Fecha - 8
      const date = new Date();
      let today;
      date.getMonth() < 10 ?
      today = `${date.getDate()}0${date.getMonth() + 1}${date.getFullYear()}`:
      today = `${date.getDate()}${date.getMonth()}${date.getFullYear()}`
      //Tipo de Comprobante - 2 - default 03
      const tipoComprobante = TipoC.toString().padStart(2,0);
      //Número Ruc - 13 
      const ruc = numRuc.toString();
      //Tipo Ambiente - 1(Pruebas) 2(Produccion)
      const tipoAmbiente = ambiente.toString();
      //Serie - 6
      const serie = numSerie.toString().padStart(6,0);
      //Número de Comprobante - 9}
      const numeroComprobante = numComp.toString().padStart(9,0);
      //Código numérico - 8
      let codigoNumerico = "";
      for (let i = 1; i < 9; i++) {
      codigoNumerico += parseInt(Math.random()*9).toString();
      }
      //Tipo de Emision - 1 - default 1
      const tipoEmision = "1";
      //Final Acces Code
      const code = today+tipoComprobante+ruc+tipoAmbiente+serie+numeroComprobante+codigoNumerico+tipoEmision;
  
      // const pruebas = "031220140117223322590011000000000000000000000352"
      let reverseCode = code.trim().split("").reverse().map(x => parseInt(x));
      let total;
      for(let i = 0, j = 2, k = 0; i < reverseCode.length; i++){
          k += reverseCode[i] * j;
          j += 1;
          // eslint-disable-next-line no-self-assign
          j === 8 ? j = 2 : j = j;
          total = k;
      }
      total = 11 - (total % 11)
      // eslint-disable-next-line no-self-assign
      total === 10 ? total = 1 : total = total;
      // eslint-disable-next-line no-self-assign
      total === 11 ? total = 0 : total = total;
      let accesCode = code + total.toString()
  
      return accesCode;
  }

export { liquidacionCompra, accessCode };
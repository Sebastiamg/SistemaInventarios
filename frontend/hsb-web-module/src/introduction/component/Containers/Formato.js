const liquidacionCompra = {
      "infoTributaria": { 
        "ambiente": "", //bien  
        "tipoEmision": "",  //bien
        "razonSocial": "",  //bien
        "nombreComercial": "",  //bien
        "ruc": "",  //bien
        "claveAcceso": "",  //bien
        "codDoc": "", //bien
        "estab": "",  //bien
        "ptoEmi": "", //bien
        "secuencial": "", //bien
        "dirMatriz": "" //bien
      },
      "infoLiquidacionCompra": {
        "fechaEmision": "", //bien
        "dirEstablecimiento": "", //bien
        "contribuyenteEspecial": "",  //bien
        "obligadoContabilidad": "", //bien
        "tipoIdentificacionProveedor": "",  //bien
        "razonSocialProveedor": "", //bien
        "identificacionProveedor": "",  //bien
        "direccionProveedor": "", //bien
        
        "totalSinImpuestos": "",
        "totalDescuento": "",
        "codDocReembolso": "",
        "totalComprobantesReembolso": "",
        "totalBaseImponibleReembolso": "",
        "totalImpuestoReembolso": "",
        "totalConImpuestos": [ 
          {"totalImpuesto": { //----------
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
            {"pago": { //........
            "formaPago": "",//bien
            "total": "",//bien
            "plazo": "",//bien
            "unidadTiempo": ""//bien
          }
        }
      ]
      },
      // detalle
      "detalles":[
        {"detalle":{    
          "codigoPrincipal": "",  //bien  
          "codigoAuxiliar": "", //bien 
          "descripcion": "",  //bien
          "unidadMedida": "", //bien
          "cantidad": "", //bien
          "precioUnitario": "", //bien
          "descuento": "",  //bien
          "precioTotalSinImpuesto": "", //bien
          "detallesAdicionales": {  //.... 
            "detAdicional": ["",""] //bien
          },
          "impuestos": {  //....  
            "impuesto": { //....
              "codigo": "", //bien
              "codigoPorcentaje": "", //bien
              "tarifa": "", //bien
              "baseImponible": "",  //bien
              "valor": "" //bien
            }
          }
        }

      }
    ],

      "reembolsos": {
        "reembolsoDetalle": {
          "tipoIdentificacionProveedorReembolso": "", //Bien
          "identificacionProveedorReembolso": "", //Bien
          "codPaisPagoProveedorReembolso": "",  //Bien
          "tipoProveedorReembolso": "", //Bien
          "codDocReembolso": "",  //Bien
          "estabDocReembolso": "",  //Bien
          "ptoEmiDocReembolso": "", //Bien
          "secuencialDocReembolso": "", //Bien
          "fechaEmisionDocReembolso": "", //Bien
          "numeroautorizacionDocReemb": "", //Bien
          "detalleImpuestos": {
            "detalleImpuesto": {
              "codigo": "", //Bien
              "codigoPorcentaje": "", //Bien
              "tarifa": "", //Bien
              "baseImponibleReembolso": "", //Bien
              "impuestoReembolso": "" //Bien
            }
          }
        }
      },
      "maquinaFiscal": {
        "marca": "",  //Bien
        "modelo": "", //Bien
        "serie": "" //Bien
      },
      "infoAdicional": {
        "campoAdicional": [
          "campoAdicional0",
          "campoAdicional1"
        ]
      }
    };

  const accessCode = function(TipoC = 3, numRuc = "0000000000000", ambiente = 1, numSerie = "001001", numComp = "000000001"){ //03 - Form - 001001 - form/default
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
          j === 8 ? j = 2 : j = j;
          total = k;
      }
      total = 11 - (total % 11)
      total === 10 ? total = 1 : total = total;
      total === 11 ? total = 0 : total = total;
      let accesCode = code + total.toString()
  
      return accesCode;
  }

export { liquidacionCompra, accessCode };
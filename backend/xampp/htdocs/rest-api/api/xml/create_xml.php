<?php
//LEER
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD']; 
if ($method == "OPTIONS") {   
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header("HTTP/1.1 200 OK");
die();
}

$liquidacionCompraJ = file_get_contents("php://input");
$decodedJson = json_decode($liquidacionCompraJ, true );

//print_r($decodedJson);

foreach ($decodedJson['detalles'] as $detalle) {
    /* print_r ($detalle); */
    //validacion detalles
    $cantidad = $detalle['detalle']['cantidad'];
    /* print_r($cantidad ); */
    $precioUnitario = $detalle['detalle']['precioUnitario'];
    /*  print_r( $precioUnitario); */
    $descuento = $detalle['detalle']['descuento'];
    /* print_r( $descuento); */
    $precioTotalSinImpuesto = $detalle['detalle']['precioTotalSinImpuesto']; 
    //formulas
    /* print_r( $precioTotalSinImpuesto) */ 
    $validacionTotalSinImpuesto =($cantidad * $precioUnitario * (100 - floatval($descuento))) / 100;
    /*  print_r($validacionTotalSinImpuesto); */
    if ($validacionTotalSinImpuesto == $precioTotalSinImpuesto) {
    } else {
        print_r("Validacion Incorrecta Por favor Corrija \n\n\n");
    }
};
    foreach ($detalle['impuestos'] as $impuesto) {
    //validacion impuestos
    $tarifa = $impuesto['impuestos']['tarifa'];
    $baseImponible = $impuesto['impuestos']['baseImponible'];
    $valor = $impuesto['impuestos']['valor'];
    //formulas
    $valorFinal = ($baseImponible * $tarifa) / 100;
    $valorFinal = round($valorFinal, 2);
    if ($valorFinal == $valor) {
    } else {
        echo 'Valores finales Incorrectos' . $valor . ' ' . $valorFinal;
    }
    if ($baseImponible == $validacionTotalSinImpuesto) {
    } else {
        echo "Validacion 2 Incorrecta \"CORRIJA\" \n";
    }
}
    //importe Total
    $info = $decodedJson ['infoLiquidacionCompra'] -> importeTotal;
    echo $info;
    $total1 =  $decodedJson ['infoLiquidacionCompra'] -> totalConImpuestos;

    foreach ($total1  as  $value) {
        $total2 = $value -> totalImpuesto -> valor;
        /* echo $total2 ; */
    }

    $total3 = $decodedJson ['infoLiquidacionCompra'] -> totalSinImpuestos;
    /* echo $total3; */

    $total4 = $total2 + $total3;
    echo $total4;

    if($info == $total4 ){
    }else{
        echo "Importe total Incorrecto";
    }

$liquidacionCompra = simplexml_load_file('LiquidacionCompra_V1.1.0.xml');

$liquidacionCompra -> infoTributaria -> ambiente = $decodedJson ["infoTributaria"]["ambiente"];
$liquidacionCompra -> infoTributaria -> tipoEmision =$decodedJson ["infoTributaria"]["tipoEmision"];
$liquidacionCompra -> infoTributaria -> razonSocial = $decodedJson ["infoTributaria"]["razonSocial"];
$liquidacionCompra -> infoTributaria -> nombreComercial = $decodedJson ["infoTributaria"]["nombreComercial"];
$liquidacionCompra -> infoTributaria -> ruc = $decodedJson ["infoTributaria"]["ruc"];
$liquidacionCompra -> infoTributaria -> claveAcceso = $decodedJson ["infoTributaria"]["claveAcceso"];
$liquidacionCompra -> infoTributaria -> codDoc = $decodedJson ["infoTributaria"]["codDoc"];
$liquidacionCompra -> infoTributaria -> estab = $decodedJson ["infoTributaria"]["estab"];
$liquidacionCompra -> infoTributaria -> ptoEmi = $decodedJson ["infoTributaria"]["ptoEmi"];
$liquidacionCompra -> infoTributaria -> secuencial = $decodedJson ["infoTributaria"]["secuencial"];
$liquidacionCompra -> infoTributaria -> dirMatriz = $decodedJson ["infoTributaria"]["dirMatriz"];
$liquidacionCompra -> infoTributaria -> agenteRetencion = "No";
$liquidacionCompra -> infoTributaria -> contribuyenteRimpe =  "No";

$liquidacionCompra -> infoLiquidacionCompra -> fechaEmision = $decodedJson ["infoLiquidacionCompra"]["fechaEmision"];
$liquidacionCompra -> infoLiquidacionCompra -> dirEstablecimiento = $decodedJson ["infoLiquidacionCompra"]["dirEstablecimiento"];
$liquidacionCompra -> infoLiquidacionCompra -> contribuyenteEspecial = $decodedJson ["infoLiquidacionCompra"]["contribuyenteEspecial"];
$liquidacionCompra -> infoLiquidacionCompra -> obligadoContabilidad = $decodedJson ["infoLiquidacionCompra"]["obligadoContabilidad"];
$liquidacionCompra -> infoLiquidacionCompra -> tipoIdentificacionProveedor = $decodedJson ["infoLiquidacionCompra"]["tipoIdentificacionProveedor"];
$liquidacionCompra -> infoLiquidacionCompra -> identificacionProveedor = $decodedJson ["infoLiquidacionCompra"]["identificacionProveedor"];
$liquidacionCompra -> infoLiquidacionCompra -> razonSocialProveedor = $decodedJson ["infoLiquidacionCompra"]["razonSocialProveedor"];
$liquidacionCompra -> infoLiquidacionCompra -> direccionProveedor = $decodedJson ["infoLiquidacionCompra"]["direccionProveedor"];
$liquidacionCompra -> infoLiquidacionCompra -> totalSinImpuestos = $decodedJson ["infoLiquidacionCompra"]["totalSinImpuestos"];
$liquidacionCompra -> infoLiquidacionCompra -> totalDescuento = $decodedJson ["infoLiquidacionCompra"]["totalDescuento"];
$liquidacionCompra -> infoLiquidacionCompra -> codDocReembolso = $decodedJson ["infoLiquidacionCompra"]["codDocReembolso"];
$liquidacionCompra -> infoLiquidacionCompra -> totalComprobantesReembolso = $decodedJson ["infoLiquidacionCompra"]["totalComprobantesReembolso"];
$liquidacionCompra -> infoLiquidacionCompra -> totalBaseImponibleReembolso = $decodedJson ["infoLiquidacionCompra"]["totalBaseImponibleReembolso"];
$liquidacionCompra -> infoLiquidacionCompra -> totalImpuestoReembolso = $decodedJson ["infoLiquidacionCompra"]["totalImpuestoReembolso"];

$liquidacionCompra -> infoLiquidacionCompra -> totalConImpuestos -> totalImpuesto -> codigo = $decodedJson ["infoLiquidacionCompra"]["totalConImpuestos"][0]["totalImpuesto"]["codigo"];
$liquidacionCompra -> infoLiquidacionCompra -> totalConImpuestos -> totalImpuesto ->codigoPorcentaje = $decodedJson ["infoLiquidacionCompra"]["totalConImpuestos"][0]["totalImpuesto"]["codigoPorcentaje"];
$liquidacionCompra -> infoLiquidacionCompra -> totalConImpuestos -> totalImpuesto ->descuentoAdicional = $decodedJson ["infoLiquidacionCompra"]["totalConImpuestos"][0]["totalImpuesto"]["descuentoAdicional"];
$liquidacionCompra -> infoLiquidacionCompra -> totalConImpuestos -> totalImpuesto ->baseImponible = $decodedJson ["infoLiquidacionCompra"]["totalConImpuestos"][0]["totalImpuesto"]["baseImponible"];
$liquidacionCompra -> infoLiquidacionCompra -> totalConImpuestos -> totalImpuesto ->tarifa = $decodedJson ["infoLiquidacionCompra"]["totalConImpuestos"][0]["totalImpuesto"]["tarifa"];
$liquidacionCompra -> infoLiquidacionCompra -> totalConImpuestos -> totalImpuesto ->valor = $decodedJson ["infoLiquidacionCompra"]["totalConImpuestos"][0]["totalImpuesto"]["valor"];

$liquidacionCompra -> infoLiquidacionCompra -> importeTotal = $decodedJson ["infoLiquidacionCompra"]["importeTotal"];
$liquidacionCompra -> infoLiquidacionCompra -> moneda = $decodedJson ["infoLiquidacionCompra"]["moneda"];

foreach($decodedJson ["infoLiquidacionCompra"]["pagos"] as $pagosAux){
    $pagos = $liquidacionCompra -> infoLiquidacionCompra -> pagos ->addChild('pago');
    $pagos->addChild('formaPago', $pagosAux["pago"]["formaPago"]);
    $pagos->addChild('total', $pagosAux["pago"]["total"]);
	$pagos->addChild('plazo', $pagosAux["pago"]["plazo"]);
	$pagos->addChild('unidadTiempo', $pagosAux["pago"]["unidadTiempo"]);
}

foreach($decodedJson ["detalles"] as $detallesAux){

    $detalles = $liquidacionCompra -> detalles -> addChild('detalle');
    $detalles->addChild('codigoPrincipal', $detallesAux["detalle"]["codigoPrincipal"]);
    $detalles->addChild('codigoAuxiliar', $detallesAux["detalle"]["codigoAuxiliar"]);
	$detalles->addChild('descripcion', $detallesAux["detalle"]["descripcion"]);
	$detalles->addChild('unidadMedida', $detallesAux["detalle"]["unidadMedida"]);
    $detalles->addChild('cantidad', $detallesAux["detalle"]["cantidad"]);
    $detalles->addChild('precioUnitario', $detallesAux["detalle"]["precioUnitario"]);
	$detalles->addChild('precioSinSubsidio', $detallesAux["detalle"]["precioSinSubsidio"]);
	$detalles->addChild('descuento', $detallesAux["detalle"]["descuento"]);
    $detalles->addChild('precioTotalSinImpuesto', $detallesAux["detalle"]["precioTotalSinImpuesto"]);
	$detalles->addChild('detAdicional', $detallesAux["detalle"]["detAdicional"]);
}

$liquidacionCompra -> reembolsos -> reembolsoDetalle -> tipoIdentificacionProveedorReembolso = $decodedJson ["reembolsos"]["reembolsoDetalle"]["tipoIdentificacionProveedorReembolso"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->identificacionProveedorReembolso = $decodedJson ["reembolsos"]["reembolsoDetalle"]["identificacionProveedorReembolso"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->codPaisPagoProveedorReembolso = $decodedJson ["reembolsos"]["reembolsoDetalle"]["codPaisPagoProveedorReembolso"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->tipoProveedorReembolso = $decodedJson ["reembolsos"]["reembolsoDetalle"]["tipoProveedorReembolso"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->codDocReembolso = $decodedJson ["reembolsos"]["reembolsoDetalle"]["codDocReembolso"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->estabDocReembolso = $decodedJson ["reembolsos"]["reembolsoDetalle"]["estabDocReembolso"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->ptoEmiDocReembolso = $decodedJson ["reembolsos"]["reembolsoDetalle"]["ptoEmiDocReembolso"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->secuencialDocReembolso = $decodedJson ["reembolsos"]["reembolsoDetalle"]["secuencialDocReembolso"];

$liquidacionCompra -> reembolsos -> reembolsoDetalle ->fechaEmisionDocReembolso = $decodedJson ["reembolsos"]["reembolsoDetalle"]["detalleImpuestos"]["detalleImpuesto"]["fechaEmisionDocReembolso"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->numeroautorizacionDocReemb = $decodedJson ["reembolsos"]["reembolsoDetalle"]["detalleImpuestos"]["detalleImpuesto"]["numeroautorizacionDocReemb"];

$liquidacionCompra -> reembolsos -> reembolsoDetalle -> detalleImpuestos -> detalleImpuesto -> codigo = $decodedJson ["reembolsos"]["reembolsoDetalle"]["detalleImpuestos"]["detalleImpuesto"]["codigo"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle -> detalleImpuestos -> detalleImpuesto -> codigoPorcentaje = $decodedJson ["reembolsos"]["reembolsoDetalle"]["detalleImpuestos"]["detalleImpuesto"]["codigoPorcentaje"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle -> detalleImpuestos -> detalleImpuesto -> tarifa = $decodedJson ["reembolsos"]["reembolsoDetalle"]["detalleImpuestos"]["detalleImpuesto"]["tarifa"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle -> detalleImpuestos -> detalleImpuesto -> baseImponibleReembolso = $decodedJson ["maquinaFiscal"]["baseImponibleReembolso"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle -> detalleImpuestos -> detalleImpuesto -> impuestoReembolso = $decodedJson ["maquinaFiscal"]["impuestoReembolso"];

$liquidacionCompra -> tipoNegociable = $decodedJson ["tipoNegociable"];

$liquidacionCompra -> maquinaFiscal ->marca = $decodedJson ["maquinaFiscal"]["marca"];
$liquidacionCompra -> maquinaFiscal ->modelo = $decodedJson ["maquinaFiscal"]["modelo"];
$liquidacionCompra -> maquinaFiscal ->serie = $decodedJson ["maquinaFiscal"]["serie"];

$ruc=$decodedJson ["infoTributaria"]["ruc"];
print_r($liquidacionCompra);

$liquidacionCompra -> asXML($ruc.'.xml');



?>
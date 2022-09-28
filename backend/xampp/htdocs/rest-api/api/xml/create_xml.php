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

//$data = json_decode(file_get_contents("php://input")); 



$liquidacionCompraJ = file_get_contents("php://input");
$decodedJson = json_decode($liquidacionCompraJ, true );

print_r($decodedJson);

//echo $decodedJson ["liquidacionCompra"]["id"];

//echo $decodedJson ["liquidacionCompra"]["infoTributaria"]["ambiente"];


$liquidacionCompra = simplexml_load_file('LiquidacionCompra_V1.1.0.xml');
//Se aplica el de leer xml para traer los primero datos que estan en liquidacion compa: xml, xsl, etc
$liquidacionCompra -> infoTributaria -> ambiente = $decodedJson ["infoTributaria"]["ambiente"];
$liquidacionCompra -> infoTributaria -> tipoEmision =$decodedJson ["infoTributaria"]["tipoEmision"];
$liquidacionCompra -> infoTributaria -> razonSocial = $decodedJson ["infoTributaria"]["razonSocial"];
$liquidacionCompra -> infoTributaria -> ruc = $decodedJson ["infoTributaria"]["ruc"];
$liquidacionCompra -> infoTributaria -> claveAcceso = $decodedJson ["infoTributaria"]["claveAcceso"];
$liquidacionCompra -> infoTributaria -> codDoc = $decodedJson ["infoTributaria"]["codDoc"];
$liquidacionCompra -> infoTributaria -> estab = $decodedJson ["infoTributaria"]["estab"];
$liquidacionCompra -> infoTributaria -> ptoEmi = $decodedJson ["infoTributaria"]["ptoEmi"];
$liquidacionCompra -> infoTributaria -> secuencial = $decodedJson ["infoTributaria"]["secuencial"];
$liquidacionCompra -> infoTributaria -> dirMatriz = $decodedJson ["infoTributaria"]["dirMatriz"];
$liquidacionCompra -> infoTributaria -> agenteRetencion = $decodedJson ["infoTributaria"]["agenteRetencion"];
$liquidacionCompra -> infoTributaria -> contribuyenteRimpe = $decodedJson ["infoTributaria"]["contribuyenteRimpe"];

$liquidacionCompra -> infoLiquidacionCompra -> fechaEmision = $decodedJson ["infoLiquidacionCompra"]["fechaEmision"];
$liquidacionCompra -> infoLiquidacionCompra -> dirEstablecimiento = $decodedJson ["infoLiquidacionCompra"]["dirEstablecimiento"];
$liquidacionCompra -> infoLiquidacionCompra -> contribuyenteEspecial = $decodedJson ["infoLiquidacionCompra"]["contribuyenteEspecial"];
$liquidacionCompra -> infoLiquidacionCompra -> obligadoContabilidad = $decodedJson ["infoLiquidacionCompra"]["obligadoContabilidad"];
$liquidacionCompra -> infoLiquidacionCompra -> tipoIdentificacionProveedor = $decodedJson ["infoLiquidacionCompra"]["tipoIdentificacionProveedor"];
$liquidacionCompra -> infoLiquidacionCompra -> razonSocialProveedor = $decodedJson ["infoLiquidacionCompra"]["razonSocialProveedor"];
$liquidacionCompra -> infoLiquidacionCompra -> direccionProveedor = $decodedJson ["infoLiquidacionCompra"]["direccionProveedor"];
$liquidacionCompra -> infoLiquidacionCompra -> totalSinImpuestos = $decodedJson ["infoLiquidacionCompra"]["totalSinImpuestos"];
$liquidacionCompra -> infoLiquidacionCompra -> totalDescuento = $decodedJson ["infoLiquidacionCompra"]["totalDescuento"];
$liquidacionCompra -> infoLiquidacionCompra -> codDocReembolso = $decodedJson ["infoLiquidacionCompra"]["codDocReembolso"];
$liquidacionCompra -> infoLiquidacionCompra -> totalComprobantesReembolso = $decodedJson ["infoLiquidacionCompra"]["totalComprobantesReembolso"];
$liquidacionCompra -> infoLiquidacionCompra -> totalBaseImponibleReembolso = $decodedJson ["infoLiquidacionCompra"]["totalBaseImponibleReembolso"];
$liquidacionCompra -> infoLiquidacionCompra -> totalImpuestoReembolso = $decodedJson ["infoLiquidacionCompra"]["totalImpuestoReembolso"];

$liquidacionCompra -> totalConImpuestos -> totalImpuesto -> codigo = $decodedJson ["totalConImpuestos"]["codigo"];
$liquidacionCompra -> totalConImpuestos -> totalImpuesto ->codigoPorcentaje = $decodedJson ["totalConImpuestos"]["codigoPorcentaje"];
$liquidacionCompra -> totalConImpuestos -> totalImpuesto ->descuentoAdicional = $decodedJson ["totalConImpuestos"]["descuentoAdicional"];
$liquidacionCompra -> totalConImpuestos -> totalImpuesto ->baseImponible = $decodedJson ["totalConImpuestos"]["baseImponible"];
$liquidacionCompra -> totalConImpuestos -> totalImpuesto ->tarifa = $decodedJson ["totalConImpuestos"]["tarifa"];
$liquidacionCompra -> totalConImpuestos -> totalImpuesto ->valor = $decodedJson ["totalConImpuestos"]["valor"];
$liquidacionCompra -> totalConImpuestos -> totalImpuesto ->importeTotal = $decodedJson ["totalConImpuestos"]["importeTotal"];
$liquidacionCompra -> totalConImpuestos -> totalImpuesto ->moneda = $decodedJson ["totalConImpuestos"]["moneda"];

$liquidacionCompra -> pagos -> pago -> formaPago = $decodedJson ["pagos"]["pago"]["formaPago"];
$liquidacionCompra -> pagos -> pago ->total = $decodedJson ["pagos"]["pago"]["total"];
$liquidacionCompra -> pagos -> pago ->plazo = $decodedJson ["pagos"]["pago"]["plazo"];
$liquidacionCompra -> pagos -> pago ->unidadTiempo = $decodedJson ["pagos"]["pago"]["unidadTiempo"];

$liquidacionCompra -> detalles -> detalle -> codigoPrincipal = $decodedJson ["detalles"]["detalle"]["codigoPrincipal"];
$liquidacionCompra -> detalles -> detalle ->codigoAuxiliar = $decodedJson ["detalles"]["detalle"]["codigoAuxiliar"];
$liquidacionCompra -> detalles -> detalle ->descripcion = $decodedJson ["detalles"]["detalle"]["descripcion"];
$liquidacionCompra -> detalles -> detalle ->unidadMedida = $decodedJson ["detalles"]["detalle"]["unidadMedida"];
$liquidacionCompra -> detalles -> detalle ->cantidad = $decodedJson ["detalles"]["detalle"]["cantidad"];
$liquidacionCompra -> detalles -> detalle ->precioUnitario = $decodedJson ["detalles"]["detalle"]["precioUnitario"];
$liquidacionCompra -> detalles -> detalle ->precioSinSubsidio = $decodedJson ["detalles"]["detalle"]["precioSinSubsidio"];
$liquidacionCompra -> detalles -> detalle ->descuento = $decodedJson ["detalles"]["detalle"]["descuento"];
$liquidacionCompra -> detalles -> detalle ->precioTotalSinImpuesto = $decodedJson ["detalles"]["detalle"]["precioTotalSinImpuesto"];

$liquidacionCompra -> detallesAdicionales -> detAdicional = $decodedJson ["detallesAdicionales"]["detAdicional"];

$liquidacionCompra -> impuestos -> impuesto ->codigo = $decodedJson ["impuestos"]["impuesto"]["codigo"];
$liquidacionCompra -> impuestos -> impuesto ->codigoPorcentaje = $decodedJson ["impuestos"]["impuesto"]["codigoPorcentaje"];
$liquidacionCompra -> impuestos -> impuesto ->tarifa = $decodedJson ["impuestos"]["impuesto"]["tarifa"];
$liquidacionCompra -> impuestos -> impuesto ->baseImponible = $decodedJson ["impuestos"]["impuesto"]["baseImponible"];
$liquidacionCompra -> impuestos -> impuesto ->valor = $decodedJson ["impuestos"]["impuesto"]["valor"];


$liquidacionCompra -> reembolsos -> reembolsoDetalle -> tipoIdentificacionProveedorReembolso = $decodedJson ["reembolsos"]["reembolsoDetalle"]["tipoIdentificacionProveedorReembolso"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->identificacionProveedorReembolso = $decodedJson ["reembolsos"]["reembolsoDetalle"]["identificacionProveedorReembolso"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->codPaisPagoProveedorReembolso = $decodedJson ["reembolsos"]["reembolsoDetalle"]["codPaisPagoProveedorReembolso"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->tipoProveedorReembolso = $decodedJson ["reembolsos"]["reembolsoDetalle"]["tipoProveedorReembolso"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->codDocReembolso = $decodedJson ["reembolsos"]["reembolsoDetalle"]["codDocReembolso"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->estabDocReembolso = $decodedJson ["reembolsos"]["reembolsoDetalle"]["estabDocReembolso"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->ptoEmiDocReembolso = $decodedJson ["reembolsos"]["reembolsoDetalle"]["ptoEmiDocReembolso"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->secuencialDocReembolso = $decodedJson ["reembolsos"]["reembolsoDetalle"]["secuencialDocReembolso"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->fechaEmisionDocReembolso = $decodedJson ["reembolsos"]["reembolsoDetalle"]["fechaEmisionDocReembolso"];
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->numeroautorizacionDocReemb = $decodedJson ["reembolsos"]["reembolsoDetalle"]["numeroautorizacionDocReemb"];

$liquidacionCompra -> detalleImpuestos -> detalleImpuesto -> codigo = $decodedJson ["detalleImpuestos"]["detalleImpuesto"]["codigo"];
$liquidacionCompra -> detalleImpuestos -> detalleImpuesto ->codigoPorcentaje = $decodedJson ["detalleImpuestos"]["detalleImpuesto"]["codigoPorcentaje"];
$liquidacionCompra -> detalleImpuestos -> detalleImpuesto ->tarifa = $decodedJson ["detalleImpuestos"]["detalleImpuesto"]["tarifa"];
$liquidacionCompra -> detalleImpuestos -> detalleImpuesto ->baseImponibleReembolso = $decodedJson ["detalleImpuestos"]["detalleImpuesto"]["baseImponibleReembolso"];
$liquidacionCompra -> detalleImpuestos -> detalleImpuesto ->impuestoReembolso = $decodedJson ["detalleImpuestos"]["detalleImpuesto"]["impuestoReembolso"];

$liquidacionCompra -> tipoNegociable -> correo = $decodedJson ["tipoNegociable"]["correo"];

$liquidacionCompra -> maquinaFiscal ->marca = $decodedJson ["maquinaFiscal"]["marca"];
$liquidacionCompra -> maquinaFiscal ->modelo = $decodedJson ["maquinaFiscal"]["modelo"];
$liquidacionCompra -> maquinaFiscal ->serie = $decodedJson ["maquinaFiscal"]["serie"];
$ruc=$decodedJson ["infoTributaria"]["ruc"];
print_r($liquidacionCompra);

$liquidacionCompra -> asXML($ruc.'.xml');



?>
<?php
$liquidacionCompra = simplexml_load_file('documentosxml/LiquidacionCompra_V1.1.0.xml');

$liquidacionCompra -> infoTributaria -> ambiente = "ambiente";
$liquidacionCompra -> infoTributaria -> tipoEmision = "dfv";
$liquidacionCompra -> infoTributaria -> razonSocial = "njh";
$liquidacionCompra -> infoTributaria -> ruc = "yhn";
$liquidacionCompra -> infoTributaria -> claveAcceso = "eyhn";
$liquidacionCompra -> infoTributaria -> codDoc = "ghng";
$liquidacionCompra -> infoTributaria -> estab = "efgbn";
$liquidacionCompra -> infoTributaria -> ptoEmi = "Fgbfbg";
$liquidacionCompra -> infoTributaria -> secuencial = "fbgfgb";
$liquidacionCompra -> infoTributaria -> dirMatriz = "eFGbn";
$liquidacionCompra -> infoTributaria -> agenteRetencion = "fgbfbfgn";
$liquidacionCompra -> infoTributaria -> contribuyenteRimpe = "fgbfgbfgbn";

$liquidacionCompra -> infoLiquidacionCompra -> fechaEmision = "a";
$liquidacionCompra -> infoLiquidacionCompra -> dirEstablecimiento = "dfv";
$liquidacionCompra -> infoLiquidacionCompra -> contribuyenteEspecial = "njh";
$liquidacionCompra -> infoLiquidacionCompra -> obligadoContabilidad = "yhn";
$liquidacionCompra -> infoLiquidacionCompra -> tipoIdentificacionProveedor = "eyhn";
$liquidacionCompra -> infoLiquidacionCompra -> razonSocialProveedor = "ghng";
$liquidacionCompra -> infoLiquidacionCompra -> identificacionProveedor = "efgbn";
$liquidacionCompra -> infoLiquidacionCompra -> direccionProveedor = "Fgbfbg";
$liquidacionCompra -> infoLiquidacionCompra -> totalSinImpuestos = "fbgfgb";
$liquidacionCompra -> infoLiquidacionCompra -> totalDescuento = "eFGbn";
$liquidacionCompra -> infoLiquidacionCompra -> codDocReembolso = "fgbfbfgn";
$liquidacionCompra -> infoLiquidacionCompra -> totalComprobantesReembolso = "fgbfgbfgbn";
$liquidacionCompra -> infoLiquidacionCompra -> totalBaseImponibleReembolso = "fgbfgbfgbn";
$liquidacionCompra -> infoLiquidacionCompra -> totalImpuestoReembolso = "fgbfgbfgbn";

$liquidacionCompra -> totalConImpuestos -> totalImpuesto -> codigo = "dfv";
$liquidacionCompra -> totalConImpuestos -> totalImpuesto ->codigoPorcentaje = "njh";
$liquidacionCompra -> totalConImpuestos -> totalImpuesto ->descuentoAdicional = "yhn";
$liquidacionCompra -> totalConImpuestos -> totalImpuesto ->baseImponible = "eyhn";
$liquidacionCompra -> totalConImpuestos -> totalImpuesto ->tarifa = "ghng";
$liquidacionCompra -> totalConImpuestos -> totalImpuesto ->valor = "efgbn";
$liquidacionCompra -> totalConImpuestos -> totalImpuesto ->importeTotal = "ghng";
$liquidacionCompra -> totalConImpuestos -> totalImpuesto ->moneda = "efgbn";

$liquidacionCompra -> pagos -> pago -> formaPago = "dfv";
$liquidacionCompra -> pagos -> pago ->total = "njh";
$liquidacionCompra -> pagos -> pago ->plazo = "yhn";
$liquidacionCompra -> pagos -> pago ->unidadTiempo = "eyhn";

$liquidacionCompra -> detalles -> detalle -> codigoPrincipal = "dfv";
$liquidacionCompra -> detalles -> detalle ->codigoAuxiliar = "njh";
$liquidacionCompra -> detalles -> detalle ->descripcion = "yhn";
$liquidacionCompra -> detalles -> detalle ->unidadMedida = "eyhn";
$liquidacionCompra -> detalles -> detalle ->cantidad = "ghng";
$liquidacionCompra -> detalles -> detalle ->precioUnitario = "efgbn";
$liquidacionCompra -> detalles -> detalle ->precioSinSubsidio = "ghng";
$liquidacionCompra -> detalles -> detalle ->descuento = "efgbn";
$liquidacionCompra -> detalles -> detalle ->precioTotalSinImpuesto = "efgbn";

$liquidacionCompra -> detallesAdicionales -> detAdicional = "efgbn";

$liquidacionCompra -> impuestos -> impuesto ->codigo = "dfv";
$liquidacionCompra -> impuestos -> impuesto ->codigoPorcentaje = "njh";
$liquidacionCompra -> impuestos -> impuesto ->tarifa = "yhn";
$liquidacionCompra -> impuestos -> impuesto ->baseImponible = "eyhn";
$liquidacionCompra -> impuestos -> impuesto ->valor = "ghng";


$liquidacionCompra -> reembolsos -> reembolsoDetalle -> tipoIdentificacionProveedorReembolso = "dfv";
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->identificacionProveedorReembolso = "njh";
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->codPaisPagoProveedorReembolso = "yhn";
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->tipoProveedorReembolso = "eyhn";
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->codDocReembolso = "ghng";
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->estabDocReembolso = "efgbn";
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->ptoEmiDocReembolso = "ghng";
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->secuencialDocReembolso = "efgbn";
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->fechaEmisionDocReembolso = "efgbn";
$liquidacionCompra -> reembolsos -> reembolsoDetalle ->numeroautorizacionDocReemb = "efgbn";

$liquidacionCompra -> detalleImpuestos -> detalleImpuesto -> codigo = "dfv";
$liquidacionCompra -> detalleImpuestos -> detalleImpuesto ->codigoPorcentaje = "njh";
$liquidacionCompra -> detalleImpuestos -> detalleImpuesto ->tarifa = "yhn";
$liquidacionCompra -> detalleImpuestos -> detalleImpuesto ->baseImponibleReembolso = "eyhn";
$liquidacionCompra -> detalleImpuestos -> detalleImpuesto ->impuestoReembolso = "ghng";

$liquidacionCompra -> tipoNegociable -> correo = "ghng";

$liquidacionCompra -> maquinaFiscal ->marca = "ghng";
$liquidacionCompra -> maquinaFiscal ->modelo = "ghng";
$liquidacionCompra -> maquinaFiscal ->serie = "ghng";

/* $liquidacionCompra -> infoAdicional -> campoAdicional = $cammpoAdicional; */



print_r($liquidacionCompra);

$liquidacionCompra -> asXML('prueba8.xml');



?>
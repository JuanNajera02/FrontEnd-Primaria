export interface Movimiento{
  fecha: string;
  tipoMovimiento: "INGRESO" | "EGRESO",
  persona:string,
  concepto:string,
  importe:number,
  motivo:string
  clasificacion:string,
  idClasificacion:string
}

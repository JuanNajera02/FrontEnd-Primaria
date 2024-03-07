
export interface AddMovimientoReq{
  tipoMovimiento: "INGRESO" | "EGRESO",
  persona:string,
  concepto:string,
  importe:number,
  motivo:string
  fecha:string,
  idEscuela:number
  idClasificacion:number
  idUsuario:number
}

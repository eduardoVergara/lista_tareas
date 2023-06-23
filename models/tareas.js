const Tarea = require("./tarea");
require('colors');

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id=''){
    if (this._listado[id]) {
      delete this._listado[id]
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach(tarea => {
        this._listado[tarea.id]=tarea;    
    });
    
  }

  crearTarea(des = "") {
    const tarea = new Tarea(des);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto(){
    this.listadoArr.forEach((tarea,index)=>{
      console.log(`${(index+1).toString().green} ${tarea.desc} :: ${(tarea.completadoEn? 'Completado'.green:'Pendiente'.red)}`);
    }); 
  }

  listarPendientesCompletadas( completadas = true ){
    let index = 0;
    this.listadoArr.forEach((tarea)=>{
      const {completadoEn}=tarea;
      if (!completadas && completadoEn===null) {
      console.log(`${(index+=1).toString().green} ${tarea.desc} :: ${(tarea.completadoEn? 'Completado'.green:'Pendiente'.red)}`);
      }
      if( completadas && completadoEn!==null ){
        console.log(`${(index+=1).toString().green} ${tarea.desc} :: ${(tarea.completadoEn.green)}`);
      }
      
    }); 
  }

  toogleCompletadas(ids=[]){
    ids.forEach(id => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach(tarea =>{
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn=null;
      }
    } )
  }
}

module.exports = Tareas;

require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput,listadoTareasBorar,confirmar,mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


console.clear();


const main = async ()=>{

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }
    //await pausa();
    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
            break;

            case '2':
                tareas.listadoCompleto();
            break;
            
            case '3':
                tareas.listarPendientesCompletadas(true);
            break;

            case '4':
                tareas.listarPendientesCompletadas(false);
            break;

            case '5':
                const ids=await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toogleCompletadas(ids);
            break;
            
            case '6':
                const id = await listadoTareasBorar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Esta seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
            break;

        }

        guardarDB(tareas.listadoArr);
        await pausa();

    } while (opt !=='0');
    
}

main();
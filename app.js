const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirm, showCheckList } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

require('colors')

const main = async () => {
	let opc = ''
	const tareas = new Tareas()
	const tareasDB = leerDB()
	if (tareasDB) {
		tareas.cargarTareasDesdeElArray(tareasDB)
	}
	/* await pausa() */
	do {
		// Esta funcion imprime el menu y devuelve la opcion seleccionada
		opc = await inquirerMenu()
		/* console.log({ opc }) */
		switch (opc) {
			case '1':
				// crear tarea
				const desc = await leerInput('Descpripcion: ')
				tareas.crearTarea(desc)
				break;
			case '2':
				// listar todas las tareas
				tareas.listadoCompleto()
				break;
			case '3':
				// listar tareas completadas
				tareas.listarPendientesCompletadas(true)
				break;
			case '4':
				// listar tareas pendientes
				tareas.listarPendientesCompletadas(false)
				break;
			case '5':
				// listar tareas pendientes
				const ids = await showCheckList(tareas.listadoArr)
				tareas.toggleCompletadas(ids)
				break;
			case '6':
				// borrar tareas
				const id = await listadoTareasBorrar(tareas.listadoArr)
				if (id !== '4') {
					const ok = await confirm('¿Estas seguro?')
					if (ok) {
						tareas.borrarTarea(id)
						console.log('Tarea borrada correctamente')
					}
				}
				break;
		}
		guardarDB(tareas.listadoArr)
		await pausa()
	} while (opc !== '0' || '7');

}

main()
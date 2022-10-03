const inquirer = require('inquirer')
require('colors')

const stop = [
	{
		type: 'input',
		name: 'pausa',
		message: `Presione ${'ENTER'.green} para continuar`,
		/* choices: [{ value: 'ENTER', name: 'Continua?' }] */
	}
]

const preguntas = [
	{
		type: 'list',
		name: 'opcion',
		message: '¿Que desea hacer?',
		choices: [
			{
				value: '1',
				name: `${'1.'.gray} Crear tarea`
			},
			{
				value: '2',
				name: `${'2.'.gray} Listar tarea(s)`
			},
			{
				value: '3',
				name: `${'3.'.gray} Listar tarea(s) completada(s)`
			},
			{
				value: '4',
				name: `${'4.'.gray} Listar tarea(s) pendiente(s)`
			},
			{
				value: '5',
				name: `${'5.'.gray} Completar tarea(s)`
			},
			{
				value: '6',
				name: `${'6.'.gray} Borrar tarea(s)`
			},
			{
				value: '0',
				name: `${'7.'.gray} Salir`
			},
		]
	}
]

const inquirerMenu = async () => {
	console.clear()
	console.log('==============================='.green)
	console.log(`${'= <> Seleccione una opcion <>'.white} =`.green)
	console.log('===============================\n'.green)
	const { opcion } = await inquirer.prompt(preguntas)
	return opcion

}

const pausa = async () => {
	/* console.clear() */
	console.log('\n')
	const { pausa } = await inquirer.prompt(stop)
	return pausa
}

const leerInput = async (message) => {
	const question = [
		{
			type: 'input',
			name: 'desc',
			message: message,
			validate(value) {
				if (value.length === 0) {
					return 'Por favor ingrese un valor'
				}
				return true
			}
		}
	]
	const { desc } = await inquirer.prompt(question)
	return desc
}

const listadoTareasBorrar = async (tareas = []) => {
	const choices = tareas.map((tarea, i) => {
		const idx = `${i + 1}.`.gray
		return {
			value: tarea.id,
			name: `${idx} ${tarea.desc}`
		}
	})
	choices.push({
		value: '4',
		name: '4. '.gray + '< CANCELAR >'
	})
	const preguntas = [
		{
			type: 'list',
			name: 'id',
			message: 'borrar',
			choices
		}
	]
	const { id } = await inquirer.prompt(preguntas)
	return id
}

const showCheckList = async (tareas = []) => {
	const choices = tareas.map((tarea, i) => {
		const idx = `${i + 1}.`.gray
		return {
			value: tarea.id,
			name: `${idx} ${tarea.desc}`,
			checked: (tarea.completadoEn) ? true : false
		}
	})
	const question = [
		{
			type: 'checkbox',
			name: 'ids',
			message: 'Seleccione',
			choices
		}
	]
	const { ids } = await inquirer.prompt(question)
	return ids
}

const confirm = async (message) => {
	const question = [
		{
			type: 'confirm',
			name: 'ok',
			message
		}
	]
	const { ok } = await inquirer.prompt(question)
	return ok
}

module.exports = {
	inquirerMenu,
	pausa,
	leerInput,
	listadoTareasBorrar,
	confirm,
	showCheckList
}

// --------НЕОБХОДИМО СДЕЛАТЬ В index.js------------
//В index.js импортировать 
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import someReducer from './reducers';

// далее необходимо создать хранилище 
let store = createStore(someReducer)

// И далее при рендере обернуть компонент App  в Provider 
{
	<Provider store = {store}>
		<App />
	</Provider>
}

// --------------- ACTIONS ------------------------
//Далее планируем какие действия будет обслуживать наше хранилице и 
//пишем файл action.js который будет содержать генераторы действий
//Генератор события должен возвращать объект со свойсвом type 
//и всей информаций необходимой для решгистрации action

export function addTodo(text) {
	return { 
		type: 'ADD_TODO', 
		text 
	}
}

//--------------- REDUCERS ----------------------------
//Далее на основании созданных action сохдаем необходимое колличество
// reducer функций которые будут непосредственно изменять state приложения

// Можно задать начальное состояние приложения константой initialState
const initialState = {
	visibilityFilter: 'SHOW_ALL',
	todos: []
  }

// Пример одиночного reducer
const singleReducer = (state = initialState, action) => {
	switch (action.type){
		case 'ADD_ITEM':
			return [
				...state,
				createItem(action.text)
			]
		case 'RM_LAST_ITEM':
			return state.slice(0,-1)
		case 'SOME_CASE':
			return Object.assign({}, state, {
				visibilityFilter: action.filter
			  })//Нельзя изменять входные данные, нужно на их основании создавать новый объект состояния и возвразать его
		default :
			return state // обязательно возвращает неизмененный state по умолчанию
	}
}

// Также хорошей практикой является раздедление редюсеров\
// Каждая отделатьная функция отвечает за свою часть хранилища
import { combineReducers } from 'redux'

function handalesPart1 (localState = localInitialState, action){
	switch (action.type){
		case 'CASE_1':
			return state1
		default:
			return state
	}
}

function handalesPart2 (localState = localInitialState, action){
	switch (action.type){
		case 'CASE_2':
			return state1
		default:
			return state
	}
}

export default mainReducer = combineReducers({
	part1 : handalesPart1,
	part2 : handalesPart2
})


// ---------------- CONNECT ------------------------------
import { connect } from 'react-redux';
export default connect(mapStateToProps, mapDispatchToProps)(BaseComponent);
//Экспортирует по умолчанию компонент подлюченный к хранилищу
//Что бы connect работал store должен быть импортирован как переменная из файла хранилища, что не надо делать,
// Или объявлен в компоненте Provider
// MapStateToProps функция которая берет данные из хранилища и преврашает из в props элемента
// у нее есть один рбязательный аргумент state который явлеятся состоянием всего хранилища на данный момент
// MapStateToProps вызыватся каждый раз при изменении состояния хранилища
const mapStateToProps = function(state) {
	return {
	  profile: state.user.profile,
	  loggedIn: state.auth.loggedIn
	}
  }
// mapDispatchToProps - объект содержащий в себе функции которые будут восприняты как генераторы действий. 
// каждая функция в объекте будет обёрнута в вызов метода хранилища dispatch(), что позволит вызывать его напрямую. Получившийся в результате объект с генераторами действий, dispatchProps, будет объединён со свойствами компонента.
import { connect } from 'react-redux';
import { updateComment, deleteComment } from './actions'; //Имопртиртирум actions которые используем
// Действия, представленные свойствами компонента, вызываются напрямую
const editComment = () => props.updatePostComment(id, content);
const removeComment = () => props.deletePostComment(id);

const mapDispatchToProps = {
	updatePostComment: updateComment,
	deletePostComment: deleteComment
  }




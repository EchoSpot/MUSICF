/**
 *insertArray()将值插入数组
 *array为需要插入的数组，value为需要插入的值，
 *comparefunc 为比较的函数，
 *maxLength为数组的最大长度 
 */

function insertArray(array,value,comparefunc,maxLength){
	let index =array.findIndex(comparefunc);
	if(index===0){
		return 
	}else if(index>0){
		array.splice(index,1) //先删除数组
	}
	array.unshift(value);
	if(maxLength && array.length>maxLength){
		array.pop();
	}

}
/**
 * [saveSearch() 保存点击记录]
 * @param  {string} value [插入的值]
 * @return {array}       [保存后的数组]
 */
const SEARCH_KEY='__search__';
const MAX_LENGTH=15;
export function saveSearch(value){
    let array=new Array();
	let oldHistory=window.localStorage.getItem(SEARCH_KEY);
	if(oldHistory){
		array=JSON.parse(oldHistory);
		insertArray(array,value,(item)=>{
			return value===item
		},MAX_LENGTH)

	}else{
		array.unshift(value)
	}
	window.localStorage.setItem(SEARCH_KEY,JSON.stringify(array));
	return array;

}

/**
 *获取历史记录，在vuex中显示
 * @return {[type]} [description]
 */
export function getSearch(){
	let history=window.localStorage.getItem(SEARCH_KEY);
	if(history){
		return JSON.parse(history);
	}else{
		return new Array()
	}

}
/**
 * 删除一条历史记录
 */
export function deleteOneSearch(index){
	let array=JSON.parse(window.localStorage.getItem(SEARCH_KEY));
	array.splice(index,1);
	window.localStorage.setItem(SEARCH_KEY,JSON.stringify(array));
	return array;

}

/**
 * 删除所有搜索记录
 */
export function deleteAllSearch(){
	window.localStorage.removeItem(SEARCH_KEY);
	return [];
}
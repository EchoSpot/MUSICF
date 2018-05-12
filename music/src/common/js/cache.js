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
	array=JSON.parse(oldHistory);
	if(array.length){	
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


/**
 * 存储播放记录(由于换了地址暂时无法测试)
 */

const PLAY_KEY='__play__';  
const PLAY_MAX_LEN = 200;
export function savePlay(song){
	let oldPlayHistory =localStorage.getItem(PLAY_KEY);
	if(!oldPlayHistory){
		oldPlayHistory=[];
	}else{
		oldPlayHistory=JSON.parse(oldPlayHistory);
	}
	insertArray(oldPlayHistory,song,(item) => {
		return item.mid===song.mid

	},PLAY_MAX_LEN);
    localStorage.setItem(PLAY_KEY,JSON.stringify(oldPlayHistory));
	return oldPlayHistory;
}

export function getPlayHistory(){
	let playhistory=JSON.parse(localStorage.getItem(PLAY_KEY));
	return playhistory;
}


/**
 * 我喜欢的歌曲
 */

const FAVORITE_KEY='__favorite__';
export function saveFavorite(song){
	song.lyric='';
	let array=localStorage.getItem(FAVORITE_KEY);
	if(!array){
		array=new Array();
	}else{
		array=JSON.parse(array);
	}
	insertArray(array,song,(item)=>{
		return item.id === song.id;
	});
	localStorage.setItem(FAVORITE_KEY,JSON.stringify(array));
	return array;

}
export function removeFavorite(song){
	let array=JSON.parse(localStorage.getItem(FAVORITE_KEY));
	if(array.length){
		let index=array.findIndex((item)=>{
			return item.id === song.id;
		})
		array.splice(index,1);
		localStorage.setItem(FAVORITE_KEY,JSON.stringify(array));
		return array;

	}else{
		throw new Error('收藏队列为空。程序出错了');
	}
}

export function loadFavorite(){
	let array=localStorage.getItem(FAVORITE_KEY);
	return array ? JSON.parse(array) : [];
}
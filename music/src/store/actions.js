import * as types from './mutation-types'
import {saveSearch} from 'common/js/cache'
export const selectPlay=function({commit,state},{list,index}){
	commit(types.SET_SEQUENCE_LIST,list)
	commit(types.SET_PLAYLIST,list)
	commit(types.SET_CURRENT_INDEX,index)
	commit(types.SET_FULL_SCREEN,true)
	commit(types.SET_PLAYING_STATE,true)
}
//添加歌曲 在搜索页面使用
export const insertSong=function({commit,state},song){
	let playlist=[...state.playList]; //splice会改变原数组，所以备份数组
	let currentIndex=state.currentIndex;

	let place=++currentIndex;

	playlist.splice(place,0,song);

	commit(types.SET_FULL_SCREEN,true);
	commit(types.SET_PLAYLIST,playlist);
	commit(types.SET_CURRENT_INDEX,place);
	commit(types.SET_PLAYING_STATE,true)


}
export const saveSearchHistory=function({commit},search){
	console.log(search);
	let array=saveSearch(search);
	commit(types.SET_SEARCH_HISTORY,array);

}
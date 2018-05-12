import * as types from './mutation-types'
import {saveSearch,deleteOneSearch,deleteAllSearch,savePlay,saveFavorite,removeFavorite} from 'common/js/cache'

export const selectPlay=function({commit,state},{list,index}){
	commit(types.SET_SEQUENCE_LIST,list)
	commit(types.SET_PLAYLIST,list)
	commit(types.SET_CURRENT_INDEX,index)
	commit(types.SET_FULL_SCREEN,true)
	commit(types.SET_PLAYING_STATE,true)
}
//添加歌曲 在搜索页面,add-song使用
export const insertSong=function({commit,state},song){
	let playlist=[...state.playList]; //splice会改变原数组，所以备份数组
	let currentIndex=state.currentIndex;

	let place=++currentIndex;
	let oldIndex=playlist.findIndex((item,index)=>{
		return item.id === song.id 
	});
	playlist.splice(place,0,song);
	
	if(oldIndex !== -1){
		//如果在插入的位置的前面的话
		if(oldIndex < place){
			playlist.splice(oldIndex,1)
			place--;
		}else{  //如果插入的位置在后面的话
			playlist.splice(oldIndex+1,1)
		}
		
	}

	commit(types.SET_FULL_SCREEN,true);
	commit(types.SET_PLAYLIST,playlist);
	commit(types.SET_CURRENT_INDEX,place);
	commit(types.SET_PLAYING_STATE,true)


}
export const saveSearchHistory=function({commit},search){
	commit(types.SET_SEARCH_HISTORY,saveSearch(search));

}
export const deleteOneSearchHistory=function({commit},index){
	commit(types.SET_SEARCH_HISTORY,deleteOneSearch(index));
}

export const deleteAllSearchHistory=function({commit}){
	commit(types.SET_SEARCH_HISTORY,deleteAllSearch())
}
//playlist组件使用
export const deleteSong=function({commit,state},index){
	let playList=state.playList.concat();
	let currentIndex=state.currentIndex;
	playList.splice(index,1);
	if(currentIndex>index || currentIndex == playList.length){
		currentIndex--;
	}
	commit(types.SET_PLAYLIST,playList);
	commit(types.SET_CURRENT_INDEX,currentIndex);
	if(!playList.length){
		commit(types.SET_PLAYING_STATE,false);
		commit(types.SET_CURRENT_INDEX,-1);
	}
	// else{
	// 	commit(types.SET_PLAYING_STATE,true);
	// }
}
//playlist组件 清空列表
export const clearPlayList=function({commit}){
	commit(types.SET_PLAYLIST,[]);
	conmit(types.SET_CURRENT_INDEX,-1);
	commit(types.SET_PLAYING_STATE,false);
}
//播放历史 在add-song组件使用
export const  savePlayHistory = function({commit},song){
	commit(types.SET_PLAY_HISTORY,savePlay(song));
	
}

//我喜欢的歌曲
export const saveMusicFavorite=function({commit},song){
	commit(types.SET_FAVORITE_LIST,saveFavorite(song));
}
export const removeMusicFavorite=function({commit},song){
	commit(types.SET_FAVORITE_LIST,removeFavorite(song));
}



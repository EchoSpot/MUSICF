import {playMode} from 'common/js/config.js'
import {getSearch,getPlayHistory,loadFavorite} from 'common/js/cache'
const state={
	singer:{},
	playing:false,
	fullScreen:false,
	playList:[],
	sequenceList:[],
	mode:playMode.sequence,
	currentIndex: -1,
	
	disc:{}, //recommend页面
	topList:{},  //rank页面
	searchHistory:getSearch(), //搜素历史
	playHistory:getPlayHistory(), //播放历史,add-song页面
	favoriteList:loadFavorite(), //收藏列表

	
}
export default state
import {playMode} from 'common/js/config.js'
import {getSearch} from 'common/js/cache'
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
	


}
export default state
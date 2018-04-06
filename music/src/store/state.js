import {playMode} from 'common/js/config.js'

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
	searchHistory:[], //搜素历史
	


}
export default state
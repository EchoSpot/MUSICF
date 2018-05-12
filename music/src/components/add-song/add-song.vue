<template>
	<transition name='slider'>
		<div class="add-song" v-show='showFlag' @click.stop>
			<div class="header">
				<h1 class="title">添加歌曲到列表</h1>
				<div class="close" @click='hide'>
					<i class="icon-close"></i>
				</div>
			</div>			
			<div class="search-box-wrapper">
				<search-box 
				@query='queryChange'
				ref='search'>					
				</search-box>
			</div>
			<div class="shortcut" v-show='!query'>
				<switches @itemClick='currentIndexChange'></switches>
				<!-- 最近播放 -->
				<div class="recently"  v-show='!switchIndex'>
					<scroll :data='playHistory' ref='playscroll' class='recentlyScroll'>
						<song-list :list='playHistory' @select='ItemSelect'></song-list>
					</scroll>					
				</div>
				<div class="history" v-show='switchIndex'>
					<scroll :data='searchHistory' ref='searchscroll'  class='historyScroll'>
						<search-list @searchHistoryItemSelected='searchItemSelected'></search-list>
					</scroll>
				</div>
			</div>
			<div class="search-result" v-show='query'>
				<suggest 
					:query='query' 
					@selectItem='suggestItemSelect'
					@scrollStart='suggestScrollStart'>						
				</suggest>
			</div>
			<top-tip ref='toptip'>
				<div class="tip-title"  >
					<i class="icon-ok"></i>
					<span class="text">一首歌曲已经添加到播放队列</span>
				</div>
			</top-tip>
		</div>
		
	</transition>
</template>
<script>
import SearchBox from 'base/search-box/search-box'
import Suggest from 'components/suggest/suggest'
import {mapActions,mapGetters} from 'vuex'
import Switches from 'base/switches/switches'
import SearchList from 'base/search-list/search-list'
import SongList from 'base/song-list/song-list'
import Scroll from 'base/scroll/scroll'
import topTip from 'base/top-tip/top-tip'
export default{
	data(){
		return {
			showFlag:false,
			query:'',
			switchIndex:0,
		}
	},
	computed:{
		...mapGetters([
			'playHistory',
			'searchHistory',
		])
	},
	methods:{
		show(){
			this.showFlag=true;
			setTimeout(()=>{
				if(this.currentIndex == 0){
					this.$refs.playscroll.refresh();
				}else{
					this.$refs.searchscroll.refresh();
				}
				
			}, 20);			
		},
		hide(){
			this.showFlag=false;
		},
		queryChange(query){
			this.query=query;
		},
		//搜索词点击
		suggestItemSelect(){ 
			this.saveSearchHistory(this.query);
			this.$refs.toptip.show();
		},
		suggestScrollStart(){  //滚动前，放下键盘
			this.$refs.search.blur();
		},
		currentIndexChange(index){
			this.switchIndex=index;
		},
		//播放历史点击
		ItemSelect(item,index){
			this.insertSong(item);
			this.$refs.toptip.show();
		},
		//搜索历史点击
		searchItemSelected(item){
			this.$refs.search.setQuery(item);
			this.$refs.toptip.show();
		},
		scrollRefresh(newValue){
			let srcoll;
			if(parseInt(newValue)){
				scroll=this.$refs.searchscroll;			
			}else{
				scroll=this.$refs.playscroll;
			}
			setTimeout(()=>{
				scroll.refresh();
			},20);
		},
		...mapActions([
			'saveSearchHistory',
			'insertSong'
		]),

	},
	components:{
		SearchBox,
		Suggest,
		Switches,
		SearchList,
		Scroll,
		SongList,
		topTip,
	},
	watch:{
		switchIndex(newValue){
			this.scrollRefresh(newValue);
		}

	},
}
	
</script>
<style lang="scss">
@import '~common/css/variable';
@import '~common/css/mixin';
.add-song{
	position: fixed;
	left:0;
	top:0;
	bottom:0;
	right:0;
	z-index:202;
	background-color:$color-background;
	&.slider-enter-active,
	&.slider-leave-active{
		transition:all .5s;
	}
	&.slider-enter,
	&.slider-leave-to{
		transform: translate(100%, 0);
	}
	.header{
		position: relative;
		height: 44px;
		line-height: 44px;
		text-align: center;
		.title{
			font-size: $font-size-large;
			color: $color-text;

		}
		.close{
			position: absolute;
			top:0;
			right:8px ;
			.icon-close{
				display: block;
				padding: 12px;
				font-size: 20px;
				color: $color-theme;
			}
		}

	}
	.search-box-wrapper{
      margin: 20px
	}
	.shortcut{		
		margin:20px auto;
		.recently,.history{
			position: absolute;
			top: 156px;
			bottom:0;
			width: 100%;
			overflow:hidden;
		}
		.recently{			
			.recentlyScroll{
				height: 100%;
				overflow:hidden;
			}
		}
		.history{
			text-align: left;
			.historyScroll{
				margin:0 20px;
				height: 100%;
				overflow: hidden;
			}
		}

	}
	.search-result{
		position: absolute;
		top:110px;
		bottom:0;
		left:0;
		right: 0;
		overflow: hidden;

	}


}
	
</style>
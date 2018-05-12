<template>
	<transition name='slide'>
		<div class="user-center">
			<div class="back">
				<i class="icon-back" @click='back'></i>
			</div>
			<div class="switches-wrapper">
				<switches :switches='switchTitle'
				@itemClick='switchChange'></switches>
			</div>
			<div class="play-btn" ref='playBtn' @click='random'>
				<i class="icon-play"></i>
				<span class="text">随机播放全部</span>				
			</div>					
			<div class="list-wrapper" ref='listWrapper'>
				<scroll :data='favoriteList' 
						ref="favoriteList" 
						v-show='currtentIndex === 0' 						
						class="list-scroll">
					<div class="list-inner">
						<song-list :list='favoriteList' @select="itemSelect"></song-list>
					</div>					
				</scroll>
				<scroll :data='playHistory'					
					ref="historyList" 
					v-show="currtentIndex === 1"
					class="list-scroll">
					<div class="list-inner">
						<song-list :list='playHistory' @select="itemSelect"></song-list>
					</div>					
				</scroll>
			</div>
		</div>
	</transition>
	
</template>
<script>
import Switches from 'base/switches/switches'
import {mapGetters} from 'vuex'
import SongList from 'base/song-list/song-list'
import Scroll from 'base/scroll/scroll'
import {playlistMixin}  from 'common/js/mixin'
import {mapActions} from 'vuex'
import Song from 'common/js/song'
import {getRandomInt} from 'common/js/util'

export default{
	mixins:[playlistMixin],
	data(){
		return{
			switchTitle:[
				{name:'我喜欢的'},
				{name:'最近听的'}
			],
			currtentIndex:0,

		}
		

	},
	computed:{
		...mapGetters([
			'favoriteList',
			'playHistory',
		]),

	},
	methods:{
		back(){
			this.$router.back();
		},
		random(){
			
			let list =this.currtentIndex === 0 ? this.favoriteList : this.playHistory;
			let index=getRandomInt(0,list.length);
			this.selectPlay({
				list:list,
				index
			})

		},
		switchChange(index){
			this.currtentIndex=index;
			setTimeout(()=>{
				this.$refs.favoriteList.refresh();
				this.$refs.historyList.refresh();
			},20)
			
		},
		handlePlaylist(){
			this.$refs.listWrapper.style.bottom=this.playList.length> 0 ? '60px' : 0;
		},
		itemSelect(item){
			this.insertSong(new Song(item));
		},
		...mapActions([
			'insertSong',
			'selectPlay'
		])

	},
	components:{
		Switches,
		SongList,
		Scroll,

	}
}
	
</script>
<style lang='scss'>
@import '~common/css/variable';
@import '~common/css/mixin';
.user-center{
	position: fixed;
	top:0;
	bottom:0;
	width: 100%;
	background-color: $color-background;
	&.slide-enter-active,&.slide-leave-active{
		transition: all  .3s;
	}
	&.slide-enter,&.slide-leave-to{
		transform: translate(100%, 0);
	}
	.back{
		position: absolute;
		top:0;
		left:6px;
		.icon-back{
			display: block;
			padding:10px;
			font-size: $font-size-large-x;
			color: $color-theme;

		}
	}
	.switches-wrapper{
		margin:10px 0 30px 0;
	}
	.play-btn{
		box-sizing: border-box;
		width: 135px;
		padding:7px 0;
		margin:0 auto;
		text-align: center;
		border:1px solid $color-text-l;
		color:$color-text-l;
		border-radius: 100px;
		font-size:0;
		.icon-play{
			display: inline-block;
			vertical-align: middle;
			margin-right: 6px;
			font-size: $font-size-medium-x;

		}
		.text{
			display: inline-block;
			vertical-align: middle;
			font-size: $font-size-small;
		}

	}
	.list-wrapper{
		position: absolute;
		top:110px;
		bottom:0;
		width: 100%;
		.list-scroll{
			height: 100%;
			overflow:hidden;
			.list-inner{
				padding:10px 10px;
			}

		}
	}
	.no-result-wrapper{
		position: absolute;
		width: 100%;
		top:50%;
		transform: translate(0, -50%);
	}
}

	
</style>

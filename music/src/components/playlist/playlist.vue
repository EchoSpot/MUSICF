<template>
	<transition name='list-fade'>
		<div class="playlist" v-show='showFlag' @click='hide'>
			<div class="list-wrap" @click.stop>
				<div class="list-header">
					<h1 class="title">
						<i class="icon" :class='iconMode' @click='changeMode'></i>	
						<span class="text" v-text='modeText'></span>
						<span class="clear" @click='showConfirm'>
							<i class="icon-clear"></i>
						</span>
					</h1>					
				</div>
				<scroll :data='playList' class="list-content" ref='scroll' :refreshDelay='refreshDelay'>
					<div>
						<transition-group tag='ul' name='list'>
							<li  
								v-for='(item,index) in playList' 
								class="item" 
								:key='index'
								@click='selectItem(item,index)'
								ref="playlistItem">
								<i :class="{'icon-play':index===currentIndex}" class="play"></i>
								<span class="text">{{item.name}}</span>
								<span class="like" @click.stop='toggleFavorite(item)'>
									<i :class="getIconFavorite(item)"></i>
								</span>
								<span class="delete" @click.stop='deleteOne(item,index)'>
									<i class="icon-delete"></i>
								</span>
							</li>						
						</transition-group>
					</div>
				</scroll>
				<div class="list-operate" @click.stop='openAddSong'>
					<div class="add">
						<i class="icon-add"></i>
						<span class="text">添加歌曲到队列</span>
					</div>					
				</div>
				<div class="list-close" @click='hide'>
					<span>关闭</span>
				</div>
			</div>
			<confirm text='确认清空播放列表吗' ref='confirm' @btnConfirm='clearAll'></confirm>
			<add-song ref='addSong'></add-song>
		</div>
	</transition>
	
</template>
<script>
import {mapGetters,mapMutations,mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import Scroll from 'base/scroll/scroll'
import Confirm from 'base/confirm/confirm'
import AddSong from 'components/add-song/add-song'
export default{
	data(){
		return{
			showFlag:false,
			refreshDelay: 320,
		}

	},
    computed:{
    	...mapGetters([
    		'mode',
    		'playList',
    		'currentIndex',
    		'playing',
			'favoriteList',
    	]),
    	iconMode(){
    		return this.mode === playMode.sequence ? 'icon-sequence' : this.mode ===playMode.loop ? 'icon-loop' :'icon-random'
    	},
    	modeText(){
    		switch(this.mode){
    			case playMode.sequence:
    				return '顺序播放';
    			case playMode.random:
    				return '随机播放';
    			case playMode.loop:
    				return '循环播放'
    		}

		},

    },
	methods:{
		...mapMutations({
			setMode:'SET_PLAY_MODE',
			setCurrentIndex:'SET_CURRENT_INDEX',
			setPlaying:'SET_PLAYING_STATE',
		}),
		...mapActions([
			'deleteSong',
			'clearPlayList',
			'saveMusicFavorite',
			'removeMusicFavorite'
    	]),
		show(){
			this.showFlag=true;
			setTimeout(()=>{
				this.$refs.scroll.refresh(); //不加这句不会滚动
				if(this.playList.length>7  && this.currentIndex>3){
					this.$refs.scroll.scrollToElement(this.$refs.playlistItem[this.currentIndex-3],300);
				}		
			}, 20);

			
		},
		hide(){
			this.showFlag=false;
		},
		changeMode(){
			let index=this.mode;
			let mode=++index%3;
			this.setMode(mode)
		},
		selectItem(item,index){
			this.setCurrentIndex(index);
			if(!this.playing){
				this.setPlaying(true);
			}


		},
		toggleFavorite(item){
			let flag=this.isFavorite(item);
			if(flag){
				this.removeMusicFavorite(item);
			}else{
				this.saveMusicFavorite(item);
			}

		},
		deleteOne(item,index){
			this.deleteSong(index);
			if(!this.playList.length){
				this.hide();
			}
		},
		getIconFavorite(song){
			let flag=this.isFavorite(song);
			return flag ? 'icon-favorite' :'icon-not-favorite';
		},
		isFavorite(song){
			let list=this.favoriteList.slice();
			let index=list.findIndex((item)=>{
				return item.id === song.id;

			});
			return index>-1;
		},
		showConfirm(){
			this.$refs.confirm.show();
		},
		clearAll(){
			this.hide();
			this.clearPlayList(); //mapActions
		},
		openAddSong(){
			this.$refs.addSong.show();

		},
		
	},
	components:{
		Scroll,
		Confirm,
		AddSong,

	}

}
	
</script>
<style lang="scss">
@import '~common/css/variable';
@import '~common/css/mixin';
.playlist{
	position: fixed;
	top:0;
	left:0;
	right:0;
	bottom:0;
	z-index:300;
	.list-wrap{
		position: absolute;
		bottom:0;
		left:0;
		width:100%;
		background-color: $color-highlight-background;
		.list-header{
			padding:20px 30px 10px  20px;
			.title{
				display:flex;
				align-items:center;
				text-align:left;
				.icon{
					margin-right:30px;
					font-size: 30px;
					color: $color-theme-d;
				}
				.text{
					flex:1;
					font-size: $font-size-medium;
					color: $color-text-l;
				}
				.clear{
					@include  extend-click;
					.icon-clear{
						font-size: $font-size-medium;
						color: $color-text-d;
					}
				}
			}

		}
		.list-content{
			max-height:280px;
			overflow:hidden;
			text-align:left;
			.item{
				display: flex;
				align-items:center;
				height:40px;
				line-height:40px;
				padding:0 30px 0 20px;
				&.list-enter-active,
				&.list-leave-active{
					transition: all .3s;
				}
				&.list-enter,&.list-leave-to{
					height:0;
					opacity: 0;
				}
				.play{
					flex:0 0 20px;
					width:20px;
					&.icon-play{		
						font-size: $font-size-small;
						color: $color-theme-d;
					}
				}				
				.text{
					flex:1;
					@include no-wrap;
					font-size: $font-size-medium;
					color: $color-text-d;
				}
				.like{
					margin-right:15px;
					font-size: $font-size-small;
					color: $color-theme;
					@include extend-click;
					.icon-favorite{
						color: $color-sub-theme;						
					}
					.icon-not-favorite{
						color:$color-sub-theme;
					}
				
				}
				.delete{
					@include extend-click;
					.icon-delete{
						font-size: $font-size-small;
						color: $color-theme;						
					}
				}							
			}
			
		}
		.list-operate{
			width:140px;
			margin:20px auto 30px auto;
			.add{
				padding:8px 16px 10px;
				border:1px solid $color-text-l;
				border-radius:100px;
				color: $color-text-l;
				.icon-add{
					font-size:$font-size-small-s;
					vertical-align: middle;
				}
				.text{
					font-size:$font-size-small;
					vertical-align: middle;
					
				}
			}
		}
		.list-close{
			text-align:center;
			line-height:50px;
			background:$color-background;
			font-size:$font-size-medium-x;
			color:$color-text-l;
		}


	}

}
.list-fade-enter-active,
.list-fade-leave-active{
	transition:opacity .5s;
	.list-wrap{
		transition: all .5s;
	}
}
.list-fade-enter,
.list-fade-leave-to{
	opacity: 0;
	.list-wrap{
		transform:translate3d(0,100%,0)
	}
}
	
</style>
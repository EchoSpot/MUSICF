<template>
	<div class="player" v-show='playList.length>0'>
		<transition name="normal"
					@enter='enter'
					@after-enter="afterEnter"
					@leave="leave"
					@after-leave="afterLeave">
			<div class="normal-player" v-show='fullScreen'>
				<div class="background">
					<img :src="currentSong.image" alt="图片" width="100%" height="100%">
				</div>
				<div class="top">
					<div class="back" @click='back'>
						<i class="icon-back"></i>
					</div>
					<h1 class="title" v-html="currentSong.name"></h1>
					<h2 class="subtitle" v-html='currentSong.singer'></h2>
				</div>
				<div class="middle">
					<div class="middle-l">
						<div class="cd-wrapper" ref="cdWrapper">
							<div class="cd" ref='cd' :class='isRotate'>
								<img :src="currentSong.image" alt="tupain">
							</div>
						</div>
					</div>
				</div>
				<div class="bottom">
					<!-- <div class="dot-wrapper">
						<span class="dot"></span>
						<span class="dot"></span>
					</div> -->

					<!-- 进度条 -->
					<div class="progress-wrapper">
						<span class="time time-l">{{format(currentTime)}}</span>
						<div class="progress-bar-wrapper">
							<progress-bar 
								:percent='percent'
								@percentChange='percentChange'
								@progressClick='progressClick'
							></progress-bar>
						</div>						
						<span class="time time-r">{{format(currentSong.duration)}}</span>					
					</div>
					<!-- 播放、暂停、前进、后退、收藏 -->
					<div class="operators">
						<div class="icon i-left" @click='changeMode'>
							<i :class="modeIcon"></i>
						</div>
						<div class="icon i-left" @click='prev' :class='disableCls'>
							<i class="icon-prev"></i>
						</div>	
						<div class="icon i-center"  :class='disableCls'>
							<i  @click="togglePlaying" :class='playIcon'></i>
						</div>
						<div class="icon  i-right" @click='next' :class='disableCls'>
							<i class="icon-next"></i>
						</div>
						<div class="icon i-right">
							<i class="icon icon-not-favorite"></i>
						</div> 
					</div>
				</div>
			</div>
		</transition>
		<transition name="mini">
			<div class="mini-player" v-show='!fullScreen' @click="open">		
				<div class="icon" :class='isRotate'>
					<img :src="currentSong.image" width="40" height="40">
				</div>
				<div class="text">
					<h2 class="name" v-html='currentSong.name'></h2>
					<p class="desc"  v-html='currentSong.singer'></p>
				</div>
				<div class="control" @click.stop='togglePlaying'>					
					<progress-circle 
						:width='progressCircleWidth' 
						:percent='percent'
					>
						<i class="icon-mini" :class='playIconMini'></i>
					</progress-circle>
				</div>
				<div class="control">
					<i class="icon-playlist"></i>
				</div>					
			</div>
		</transition>
		<audio :src='currentSong.url' ref='audio' 
				@timeupdate='timeUpdate'
				@ended='aduioEnd'
				@canplay='canplay'
				@error='error'></audio>
	</div>
</template>
<script>
import { mapGetters,mapMutations } from 'vuex'
import animations  from 'create-keyframe-animation'
import { prefixStyle } from 'common/js/dom'
import progressBar from 'base/progress-bar/progress-bar'
import progressCircle from 'base/progress-circle/progress-circle'
import {playMode} from 'common/js/config'
import {getRandomInt}  from 'common/js/util'
const  transform=prefixStyle('transform');
	export default{
		data(){
			return {
				currentTime:0,
				songReady:false,
				progressCircleWidth:32,
				randomModeTime:0,
			}
		},
		computed:{
			...mapGetters([
				'fullScreen',
				'playList',
				'sequenceList',
				'currentSong',
				'playing',
				'currentIndex',
				'mode',
			]),
			//进度百分比
			percent(){
				return this.currentTime/this.currentSong.duration;
			},
			playIcon(){
				return this.playing?'icon-pause':'icon-play'

			},
			playIconMini(){
				return this.playing?'icon-pause-mini':'icon-play-mini'
			},
			isRotate(){
				return this.playing?'rotate':'rotate rotateStop'
			},
			disableCls(){
				return this.songReady?'':'disable'
			},
			modeIcon(){
				const mode=this.mode;
				switch(mode){
					case playMode.sequence:
						return 'icon-sequence';
					case playMode.loop:
						return 'icon-loop'
					case playMode.random:
					    return 'icon-random'
				}
			},
			
		},
		methods:{
			...mapMutations({
				setFullScreen:'SET_FULL_SCREEN',
				setPlayingState:'SET_PLAYING_STATE',
				setCurrentIndex:'SET_CURRENT_INDEX',
				setPlayMode:'SET_PLAY_MODE',
				setPlayList:'SET_PLAYLIST',
			}),
			back(){
				this.setFullScreen(false);

			},
			open(){
				this.setFullScreen(true);
			},
			// //enter，afterEnter,leave,after-leave 都是动画函数 小cd到大cd
			enter(el,done){
				const {x,y,scale}=this._getPosAndScale();
				// let animation={
				// 	0:{
				// 		transform:`translate(${x}px,${y}px) scale(${scale})`

				// 	},
				// 	60:{
				// 		transform:`translate(0,0) scale(1.1)`

				// 	},
				// 	100:{
				// 		transform:`translate(0,0) scale(1)`

				// 	}
				// }
				// animations.registerAnimation({
				// 	name:'move',
				// 	animation,
				// 	presets:{
				// 		duration:500,
				// 		easing:'liner'

				// 	}

				// });
				// animations.runAnimation(this.$refs.cdWrapper,'move',done)

				let cdWrapper=this.$refs.cdWrapper;
				cdWrapper.style.transition='all .5s';
				cdWrapper.style[transform]=`translate(0,0) scale(1)`;
				cdWrapper.addEventListener('transitionend',done)


			},
			afterEnter(){
				// animations.unregisterAnimation('move');
				// this.$refs.cdWrapper.style.animation='';
				let cdWrapper=this.$refs.cdWrapper;
				cdWrapper.style.transition='';
				cdWrapper.style[transform]='';

			},
			leave(el,done){
				let cdWrapper=this.$refs.cdWrapper;
				cdWrapper.style.transition='all .5s';
				const {x,y,scale}=this._getPosAndScale();
				cdWrapper.style[transform]=`translate(${x}px,${y}px) scale(${scale})`;
				cdWrapper.addEventListener('transitionend',done)
			
			},
			afterLeave(){
				let cdWrapper=this.$refs.cdWrapper;
				cdWrapper.style.transition='';
				cdWrapper.style[transform]='';

			},
			//切换播放
			togglePlaying(){
				this.setPlayingState(!this.playing);
			},
			//切换播放模式图标
			changeMode(){
				let modeType=(this.mode+1)%3;
				this.setPlayMode(modeType);		
			},			
			next(){
				if(!this.songReady){
					return 
				}
				this.currentTime=0;

				let index=-1;
				if(this.mode === playMode.sequence){
					index=this.currentIndex +1;
					if(index===this.playList.length){
						index=0;
					}

				}else if(this.mode === playMode.random){
					index=getRandomInt(0,this.playList.length-1);
					while(index === this.currentIndex){
						index=getRandomInt(0,this.playList.length-1);
					}

				}
								
				this.setCurrentIndex(index);
                //如果暂停的时候，切换下一首可以播放
				if(!this.playing){
					this.togglePlaying();
				}
				this.songReady=false;

			},
			prev(){
				if(!this.songReady){
					return 
				}
				this.currentTime=0;
				let index=-1;	
				if(this.mode === playMode.sequence){
					index=this.currentIndex-1;
					if(index===0){
						index=this.playList.length-1;
					}
					
				}else if(this.mode === playMode.random){
					index=getRandomInt(0,this.playList.length-1);
					while(index === this.currentIndex){
						index=getRandomInt(0,this.playList.length-1);
					}
				}
				this.setCurrentIndex(index);
				if(!this.playing){
					this.togglePlaying();
				}

				this.songReady=false;

			},
			loop(){
				this.$refs.audio.currentTime=0;
				this.$refs.audio.play();
			},
			aduioEnd(){
				if(this.mode == playMode.loop){
					this.loop();
				}else{
					this.next();
				}				
			},
			canplay(){
				this.songReady=true;
			},
			error(){
				this.songReady=true;
			},
			format(time){
				time= time | 0;
				let min=time/60 | 0;
				let sec=time%60 | 0;
				return `${this._pad(min)}:${this._pad(sec)}`
			},
			//设置时间更改
			timeUpdate(e){
				this.currentTime=e.target.currentTime;			
			},
			//进度条
			percentChange(percent){
				let currentTime=percent*this.currentSong.duration;
				this.currentTime=currentTime;
				this.$refs.audio.currentTime=currentTime;
			},
			//进度条
			progressClick(percent){
				let currentTime=percent*this.currentSong.duration;
				this.currentTime=currentTime;
				this.$refs.audio.currentTime=currentTime;
			},
			//动画 获取函数初始位置  小cd到大cd
			_getPosAndScale(){
				//小cd
				const targetWidth=40;
				const paddingLeft=40;
				const paddingBottom=30;
				//大cd
				const width=window.innerWidth*0.8;
				const h=window.innerHeight*0.4;

				//缩放比例
				const scale=targetWidth/width;
				//两点之间X轴的距离
				const x=-(window.innerWidth/2-paddingLeft);
				//两点之间Y轴的距离
				const y=window.innerHeight-paddingBottom-h;
				return {
					x,
					y,
					scale
				}
			},
			_pad(num,n=2){
				let len=num.toString().length;
				while(len<n){
					num='0'+num;
					len++;
				}
				return num;
			}

		},
		watch:{
			currentSong(newSong,oldSong){
				console.log(`this is currentSong${newSong}`);
				// console.log(newSong.getLyric(newSong.id));
				
				if(!newSong.id){
					return
				}
				if(newSong.id === oldSong.id){
					return
				}							
				const audio=this.$refs.audio;	
				this.$nextTick(() =>{
					if(this.playing){
						audio.play();
					}					
				});
			},
			playing(newVal,oldVal){		
			    const audio=this.$refs.audio;	
				this.$nextTick(()=>{
					newVal ? audio.play() : audio.pause();
				})
			},

		},
		components:{
			progressBar,
			progressCircle,
		},

	}
</script>
<style lang="scss">
@import '~common/css/variable';
@import '~common/css/mixin';
	.player{
		.normal-player{
			position: fixed;
			left:0;
			top:0;
			right:0;
			bottom:0;
			background:$color-background;
			.background{
				position: absolute;
				left:0;
				top:0;
				width:100%;
				height:100%;
				z-index:-1;
				opacity:0.6;
				filter:blur(20px);
			}
			.top{
				.back{
					position: absolute;
					width:30px;
					padding:10px;
					font-size: $font-size-large-x;
					color:$color-theme;
					transform:rotate(-90deg);
				}
				.title{
					width:70%;
					margin:0 auto;
					line-height:40px;
					text-align:center;
					@include no-wrap;
					font-size:$font-size-large-x;
					color:$color-theme;
				}
				.subtitle{
					width:100%;
					line-height:20px;
					text-align:center;
					font-size:$font-size-medium;
					color:$color-text;
				}
			}
			.middle{
				position: absolute;
				top:40%;
				left:50%;
				width:100%;
				transform:translate(-50%,-50%);
				.middle-l{
					width:100%;
					.cd-wrapper{
						width:80%;
						margin:0 auto;						
					}
					.cd{
						width:100%;
						height:100%;
						border-radius:50%;
						box-sizing: border-box;
						border:10px solid rgba(255,255,255,0.1);
						img{
							width:100%;
							height:100%;
							border-radius:50%;
						}
						&.rotate{
							animation: rotate 18s linear infinite;

						}
						&.rotateStop{
							animation-play-state:paused;
						}

					}

				}
			}
			.bottom{
				position: absolute;
				width:100%;
				bottom:50px;
				.progress-wrapper{
					display:flex;
					align-items:center;
					width:96%;
					margin:0 auto;
					padding:10px 0;
					.time{
						display:block;
						width:40px;
						flex:0 0 40px;
						text-align:center;
						padding:0 15px;
						color: $color-text;
						font-size: $font-size-small;
					}
					.progress-bar-wrapper{
						flex:1;
					}
				}
				.operators{
					display:flex;
					align-items:center;
					.icon{
						flex:1;
						color: $color-theme;
						font-size:30px;
						&.disable{
							color: $color-theme-d;
						}
						&.icon-favorite{
							color: $color-sub-theme;
						}
						&.i-center{
							padding:0 20px;
							font-size:40px;
						}
					}
				}
			}
		}
		.mini-player{
			display:flex;
			align-items:center;
			position: fixed;
			bottom:0;
			left:0;
			width:100%;
			height:60px;
			background-color: $color-highlight-background;
			.icon{
				flex:0 0 40px;
				width:40px;
				padding:0 16px 0 20px;
				img{
					width:40px;
					height:40px;
					border-radius: 50%;
				}
				&.rotate{
					animation: rotate 10s linear infinite;
				}
				&.rotateStop{
					animation-play-state:paused;
				}
				&disable{
					color: $color-theme-d;

				}
			}
			.text{
				flex:1;
				height:42px;
				line-height: 20px;
				text-align:left;
				.name{
					margin-bottom:2px;
					font-size: $font-size-medium;
					color: $color-text;
					@include no-wrap;
				}
				.desc{
					font-size: $font-size-small;
					color: $color-text-d;
					@include no-wrap;
				}

			}
			.control{
				position: relative;
				flex:0 0 30px;
				width:30px;
				padding:0 10px;
				.icon-playlist{
					font-size: 30px;
					color: $color-theme-d;
				}
				.icon-play-mini,.icon-pause-mini{
					font-size:30px;
					color:$color-theme-d;
				}
				.icon-mini{
					position: absolute;
					left:0;
					top:0;

				}
			}


		}


	}


	.normal-enter-active,
	.normal-leave-active
	{
		transition: all .5s;
		.top,.bottom{
			transition: all .5s cubic-bezier(0.86, 0.18, 0.82, 1.32);
		}
	}
	.normal-enter,.normal-leave-to{
		opacity:0;
		.top{
			tranform: translate(0,-100px);
		}
		.bottom{
			transfrom: translate3d(0,100px);
		}
	}
	.mini-enter-active,
	.mini-leave-active{
		transition: opacity .5s;
	}
	.mini-enter,.mini-leave-to{
		opacity:0;

	}
	@keyframes rotate{
		0%{
			transform:rotate(0deg);
		}
		100%{
			transform:rotate(360deg);

		}


	}
</style>
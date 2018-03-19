<template>
	<div class="music-list">
		<div class="back" @click='back'>
			<i class="icon-back"></i>
		</div>
		<h1 class="title" v-html='name'></h1>
		<div class="bg-image" :style='bgStyle' ref='image'>
			<div class="filter"></div>
			<div class="play-wrap" ref='playWrap'>
				<div class="playBtn" v-show="data.length>0">
					<i class="icon-play"></i>	
					<span class="text">随机播放全部</span>	
				</div>
			</div>
		</div>
		<div class="bg-layer" ref='layer'></div>
		<scroll  
			:data='data'
			class="song-list-scroll"
			ref="list"
			:listenScroll='listenScroll'
			:probeType='probeType'
			@scroll='scroll'
		>
			<div class="song-list-wrapper">
				<song-list :list='data' @select='selectItem'></song-list>
			</div>
			<div v-show='!data.length' class="loading-wrapper">
				<loading></loading>				
			</div>
		</scroll>
	</div>
</template>
<script>
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import SongList from '@/base/song-list/song-list'
import {prefixStyle} from '@/common/js/dom'
import {mapActions} from 'vuex'
	const RESERVED_HEIGHT=40;

	const transform =prefixStyle('transform')
	export default{		
		props:{
			data:{
				type:Array,
				default:null
			},
			name:{
				type:String,
				default:''
			},
			image:{
				type:String,
				default:''
			}
		},
		data(){
			return{
				//传递给scroll的数据
				listenScroll:true,
				probeType:3,
				//监听scrollY
				scrollY:0
			}
		},	
		mounted(){
			//定位歌单在图片下面
			let ImageClientHeight=this.$refs.image.clientHeight;
			this.imageHeight=ImageClientHeight;

			this.$refs.list.$el.style.top=`${ImageClientHeight}px`;
			//图片滚动到顶部所剩的最低高度
			this.minTop=RESERVED_HEIGHT-ImageClientHeight;
		},
		methods:{
			back(){
				this.$router.back();
			},
			selectItem(item,index){
				this.selectPlay({
					list:this.data,
					index
				})
			},
			//滚动监听
			scroll(pos){
				this.scrollY=pos.y;
			},
			...mapActions([
				'selectPlay'

			])
		},
		computed:{
			//背景图片
			bgStyle() {
				return `background-image:url(${this.image})`
			}
		},
		watch:{
			scrollY(newVal){
				let zIndex=203;
				let scale=1;
				let translateY=Math.max(this.minTop,newVal); 
				const layer=this.$refs.layer;				
				const bgImage=this.$refs.image;
				const playWrap=this.$refs.playWrap;
				layer.style.top=`${translateY}px`;

				const percent=Math.abs(newVal / this.imageHeight);
				if(newVal>0){
					scale=1+percent;
					zIndex=203
				}
				
				//当滚动到最上面，还在滚动时
				if(newVal < this.minTop){
					// bgImage.style.height=`${RESERVED_HEIGHT}px`;
					// bgImage.style.paddingTop=0;
					zIndex=203;
					bgImage.style.paddingTop=`${RESERVED_HEIGHT}px`;
					playWrap.style.display='none';
				}else{
					//当滚动回来的时候；
					zIndex=200;
					bgImage.style.paddingTop='70%';
					// bgImage.style.height=0;
					playWrap.style.display='';

				}
				bgImage.style.zIndex=zIndex;
				bgImage.style[transform]=`scale(${scale})`;							

			}
		},
		components:{
			Scroll,
			Loading,
			SongList
		}

	}
</script>
<style lang="scss">
@import '~common/css/variable';
@import '~common/css/mixin';
	.music-list{
		position:fixed;
		left:0;
		top:0;
		bottom:0;
		right:0;
		z-index:200;
		background-color:$color-background;
		.back{
			position: absolute;
			top:0;
			left:6px;
			z-index:220;
			.icon-back{
				display:block;
				padding:10px;
				font-size: $font-size-large-x;
				color:$color-theme;
			}

		}
		.title{
			position: absolute;
			left:0;
			top:0;
			z-index:210;
			width:100%;
			text-align:center;
			height:40px;
			line-height:40px;
			font-size: $font-size-large;
			color: $color-text;
		}

		.bg-image{
			position: relative;
			width:100%;
			height:0;
			padding-top:70%;
			background-size:cover;
			overflow:hidden;
			z-index:200; 
			transform-origin:top;
			//计算z-index
			.filter{
				position: absolute;
				left:0;
				top:0;
				width:100%;
				height:100%;
				background-color: rgba(7,17,27,0.4);
				overflow:hidden;
			}
			.play-wrap{
				position: absolute;
				bottom:20px;
				z-index:210;
				width:100%;
				.playBtn{
					width:135px;
					padding:7px 0 9px 0;
					margin:0 auto;
					border-radius:100px;
					border:1px solid $color-theme;
					color: $color-theme;
					.icon-play{
						vertical-align: middle;
						font-size: $font-size-medium-x;
					}
					.text{
						vertical-align: middle;
						font-size: $font-size-small;

					}

				}


			}

		}
		.bg-layer{
			position: relative;
			height:100%;
			background: $color-background;	
			z-index:201;	

		}
		.song-list-scroll{
			position: absolute;
			//mounted 计算 top 值
			left:0;
			bottom:0;
			right:0;
			z-index:202;
			.song-list-wrapper{

			}
			.loading-wrapper{
				height:100%;
				display:flex;
				align-items:center;
			}

		}


	}
</style>
<template>
	<scroll :data="data" 
			class="scroll-wrap" 
			ref="scroll" 
			:probeType="probeType"
			:listenScroll="listenScroll"
			@scroll="scroll">
		<div>
			<div class="listview" v-for="item in data" ref="itemGroup" :key="item.id">
				<div class="title" v-text="item.title" ref="title"></div>
				<ul class="singerList">
					<li v-for="singer in item.list" class="singeritem" @click="selectItem(singer)" :key="singer.mid">
						<div class="avater">
							<img v-lazy="singer.avater" alt="avater" width="50" height="50">
						</div>
						<div class="text">
							<p class="name">{{singer.name}}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<ul class="keyList" 
			@touchstart.stop.prevent="sliderTouchStart" 
			@touchmove.stop.prevent="sliderTouchMove"
			@touchend.stop
			>
			<li class="key-item" 
				v-for="(item,index) in data"
				:class="{active:index === currentIndex}"
				:data-index='index'	
				:key="index"			
			>
				{{item.title.substr(0,1)}}
			</li>
		</ul>
		<div class="list-fixed" v-show="fixedTitle" ref="toptitle">
			<h1 class="fixed-title">{{fixedTitle}}</h1>			
		</div>
		<div class="loading-container" v-show="!data.length">
			<loading></loading>
		</div>

	</scroll>
</template>
<script>
	import Scroll from 'base/scroll/scroll'
	import {getData} from 'common/js/dom'
	import Loading from 'base/loading/loading'

	const sliderWidth=18;
	const TITLE_HEIGHT=30;
	export default{
		created(){
			this.touch={},
			this.probeType=3,
			this.listenScroll=true,
			this.hasListHeightFlag=false			
		},
		props:{
			data:{
				type:Array,
				default:null
			}
		},
		data(){
			return{
				currentIndex:0,
				scrollY:-1,
				listHeight:[],
				touchIndex:0,
				diff:-1
			}

		},
		watch:{
			data(){
				this.$nextTick(()=>{
					this._calculate();
					this.hasListHeightFlag =true;

				});			
			},
			scrollY(newY){
				if(newY>=0){
					this.currentIndex=0;
					return
				}
				const listHeight=this.listHeight;	
				for (let i = 0; i < listHeight.length-1 ; i++) {
					let height1=listHeight[i];
					let height2=listHeight[i+1];
					if( -newY>=height1  && -newY<height2){
						this.currentIndex=i;
						this.diff=height2+newY;
						return
					}
				}
				this.currentIndex=listHeight.length -2;

			},
			diff(newVal){
				let fixedtop=(newVal>0 && newVal< TITLE_HEIGHT) ? newVal- TITLE_HEIGHT :0;
				if(this.fixedtop === fixedtop){
					return
				}
				this.fixedtop=fixedtop;
				this.$refs.toptitle.style.transform=`translate3d(0,${fixedtop}px,0)`;
			}
		},
		methods:{
			refresh(){
				this.$refs.scroll.refresh();

			},
			//侧边滑动
			sliderTouchStart(e){
				//获取点击的元素
				let currentIndex = getData(e.target,'index');
				this.touchIndex=currentIndex;
				//记录第一次点击的位置
				this.touch.y1=e.touches[0].pageY;
				//歌手滚动到相应位置
				this._scrollToElement(parseInt(currentIndex));


			},
			sliderTouchMove(e){
				this.touch.y2=e.touches[0].pageY;
				let delta=this.touch.y2-this.touch.y1;
				let num=Math.floor(delta/sliderWidth);
				this._scrollToElement(parseInt(this.touchIndex)+num);
				
			},
			_scrollToElement(index){
				if(index<0){
					index=0;
				}else if(index>this.listHeight.length-2){
					index=this.listHeight.length-2;
				}

				this.scrollY=-this.listHeight[index];
				this.$refs.scroll.scrollToElement(this.$refs.itemGroup[index],0)

			},
			scroll(pos){
				this.scrollY=pos.y;	
			},
			selectItem(item){
				this.$emit('selectItem',item);

			},
			//计算各项列表高度
			_calculate(){
				let height=0;
				this.listHeight=[];
				this.listHeight.push(height);
				const itemGroup=this.$refs.itemGroup;
				for (let i = 0; i < itemGroup.length; i++) {
					height+=itemGroup[i].clientHeight;
					this.listHeight.push(height);
				}
			}

		},
		computed:{

			fixedTitle() {
				if(this.scrollY>0){
					return
				}				
				return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
			}

		},
		components:{
			Scroll,
			Loading
		}
	}
</script>
<style lang="scss">
@import '~common/css/variable';
	.scroll-wrap{
		position: relative;
		height:100%;
		overflow:hidden;
		background: $color-background;
		.listview{
			.title{
				height:30px;
				line-height:30px;
				padding-left:20px;
				text-align:left;
				font-size: $font-size-small;
				color: $color-text-l;
				background: $color-highlight-background;
			}
			.singerList{
				padding-bottom:20px;
				.singeritem{
					display:flex;
					align-items:center;
					padding:20px 0 0 30px;
					.avater{
						flex:0 0 50px;						
						img{
							width:50px;
							height:50px;
							border-radius:50%;
						}
					}
					.name{
						margin-left:20px;
						color: $color-text-l;
						font-size: $font-size-medium;
					}
				}
			}
		}
		.keyList{
			position:fixed;
			right:0;
			top:50%;
			transform:translateY(-50%);
			z-index:20;
			background: $color-background-d;
			
			.key-item{
				padding:3px;
				font-size: $font-size-small;
				touch-action:none;
				&.active{
					color: $color-theme;

				}

			}

		}
		.list-fixed{
			position: absolute;
			top:0;
			left:0;
			width:100%;
			.fixed-title{
				height:30px;
				line-height:30px;
				padding-left:20px;
				background-color:$color-highlight-background;
				color: $color-text-l;
				font-size:$font-size-small;
				text-align:left;
			}

		}
		.loading-container{
			position: absolute;
			width:100%;
			top:50%;
			transform:translateY(-50%);

		}
	}
</style>
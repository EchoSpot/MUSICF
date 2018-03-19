<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot></slot>
		</div>
		<div class="dots">
			<span class="dot"  
			v-for="(item,index) in dots"
			:class="{active:currentPageIndex===index}"
			></span>
		</div>
	</div>
</template>
<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom.js'
export default {
	data(){
		return {
			dots:[],
			currentPageIndex:0
		}
	},
	props:{
		loop:{
			type:Boolean,
			default:true
		},
		autoPlay:{
			type:Boolean,
			default:true
		},
		interval:{
			type:Number,
			default:4000
		}
	},
	mounted(){
		this.$nextTick(() => {
		    this._setSliderWidth();
		    this._initDots();
		    this.initSlider();
		    if(this.autoPlay){
		    	this._play();  
		    }

		});

		window.addEventListener('resize',() => {
			if(!this.slider){
				return
			}
			this._setSliderWidth(true);
			this.slider.refresh();
		})
	},
	methods:{
		_setSliderWidth(isResize){
			//设置slider-item的class以及外层的宽度
			this.children=this.$refs.sliderGroup.children;
			let oneWidth=this.$refs.slider.clientWidth;
			for (var i = 0; i < this.children.length; i++) {
				addClass(this.children[i],'slider-item');	
				this.children[i].style.width=oneWidth+'px';					
			}
			let width=this.children.length*oneWidth;
			if(this.loop && !isResize){
				width+=oneWidth*2;
			}
			this.$refs.sliderGroup.style.width=width+'px';
		},
		_initDots(){
			let length=this.children.length;
			this.dots=new Array(length);
		},
		initSlider(){
			this.slider=new BScroll(this.$refs.slider,{
				scrollX:true,
				scrollY:false,
				momentum:false,
				snap:true,
				snapLoop:this.loop,
				snapSpeed:400
			});
			//滑动 点也跟着动
			this.slider.on('scrollEnd',() => {
				let pageIndex=this.slider.getCurrentPage().pageX;
				if(this.loop){
					pageIndex-=1;
				};
				this.currentPageIndex=pageIndex;
				
				if(this.autoPlay){
					clearTimeout(this.timer);
					this._play()		
				}
			})
			

		},
		_play(){
			let pageIndex=this.currentPageIndex+1;
			if(this.loop){
				pageIndex+=1;
			}
			this.timer=setTimeout(() =>{
				this.slider.goToPage(pageIndex,0,400);
				
			}, this.interval);

		}


	},
	destroyed(){
		clearTimeout(this.timer);
	}
}
	
</script>
<style lang="scss">
@import '~src/common/css/variable';
.slider{
	min-height:1px;
	position: relative;
	.slider-group{
		overflow:hidden;
		white-space:nowrap;
		.slider-item{
			float:left;
			box-sizing:border-box;
			a{
				display: block;
				width:100%;
				overflow:hidden;
			}
			img{
				display: block;
				width:100%;
			}

		}
		
	}
	.dots{
		position: absolute;
		right:0;
		left:0;
		bottom:12px;
		text-align:center;
		.dot{
			display: inline-block;
			width: 8px;
			height: 8px;
			border-radius:50%;
			margin:0 2px;
			background-color: $color-text-l;
			&.active{
				background-color: $color-text-ll;
			}
		}
	}
	
	
}
	
</style>
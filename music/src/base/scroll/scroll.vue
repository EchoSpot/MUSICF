<template>
	<div class="wrapper" ref="wrapper">
		<slot></slot>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	export default{
		props:{
			//滚动监听模式
			probeType: {
			  type: Number,
			  default: 1
			},
			click: {
			  type: Boolean,
			  default: true
			},
			data:{
				type:Array,
				default:null
			},
			//是否监听滚动
			listenScroll:{
				type:Boolean,
				default:false
			},
			//是否在下拉到最后的时候触发事假
			pullup:{
				type:Boolean,
				default:false
			},
			//在滚动之前
			beforeScroll:{
				type:Boolean,
				default:false
			},
			//延迟时间，用在有动画效果的时间上
			refreshDelay:{
				type:Number,
				default:20
			}
		},
		mounted() {
			this.$nextTick(() => {				
				this._initScroll();
			})
		},
		methods:{
			_initScroll(){
				if(!this.$refs.wrapper){
					return
				}

				this.scroll=new BScroll(this.$refs.wrapper,{
					probeType:this.probeType,
					click:this.click
				});

				//外部派发滚动事件
				if(this.listenScroll){
					let _this=this;
					this.scroll.on('scroll',(pos)=>{
						_this.$emit('scroll',pos)
					})

				};
				//在拉到接近底部的时候，触发事件.运用于suggest.vue的下拉刷新
				if(this.pullup){
					this.scroll.on('scrollEnd',() => {
						if(this.scroll.y <= (this.scroll.maxScrollY+50)){
							this.$emit('scrollToEnd');
						}
					})
				};
				//在滚动之前，运用在suggest.vue 判断聚焦的时候使键盘放下
				if(this.beforeScroll){
					this.scroll.on('beforeScrollStart',()=>{
						this.$emit('beforeScroll')
					})
				}


			},
			enable(){
				this.scroll && this.scroll.enable()
			},
			disable(){
				this.scroll && this.scroll.disable()
			},
			refresh(){
				this.scroll && this.scroll.refresh()
			},
			scrollTo(){
				this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
			},
			scrollToElement(){
				this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
			}

		},
		watch:{
			data(){
				setTimeout(() => {
					this.refresh()
				},this.refreshDelay)			
			}
		}


	}
</script>
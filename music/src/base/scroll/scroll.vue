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
				//在拉到接近底部的时候，触发事件
				if(this.pullup){
					this.scroll.on('scrollEnd',() => {
						if(this.scroll.y <= (this.scroll.maxScrollY+50)){
							this.$emit('scrollToEnd');
						}
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
				},20)			
			}
		}


	}
</script>
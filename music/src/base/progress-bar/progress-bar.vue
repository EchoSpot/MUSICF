<template>
	<div class="progress-bar" ref='progressBar' >
		<div class="bar-inner" @click='progressClick'>
			<div class="progress" ref='progress'></div>
			<div class="progress-btn-wrapper" ref='progressBtn'>
				<div class="progress-btn" 
					@touchstart.stop='touchstart'
					@touchmove.stop='touchmove'
					@touchend.stop='touchend'
					>						
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		created(){
			this.touch={};
		},
		props:{
			percent:{
				type:Number,
				default:0
			}
		},
		methods:{
			touchstart(e){
				this.touch.initiated=true; //标志位是否触碰并且设置优先级
				this.touch.startX=e.touches[0].pageX;	
				this.touch.left=this.$refs.progress.clientWidth;			
			},
			touchmove(e){
				if(!this.touch.initiated){
					return 
				}
				let deltaX=e.touches[0].pageX-this.touch.startX;
				let w=Math.min(this.$refs.progressBar.clientWidth,
								Math.max(deltaX+this.touch.left,0));
                this._offset(w);
			},
			touchend(){
				this.modifyPercent();
				this.touch.initiated=false;
				
			},
			progressClick(e){
				const progressBar=this.$refs.progressBar;
				const left=e.pageX-progressBar.getBoundingClientRect().left;				
				let percent=left/progressBar.clientWidth;
				this.$emit('progressClick',percent);

			},
			//拖动结束的时候，将拖到的百分比派发出去
			modifyPercent(){
				let width=this.$refs.progress.clientWidth;
				let percent=width/this.$refs.progressBar.clientWidth;
				this.$emit('percentChange',percent);

			},
			_offset(offsetWidth){
				this.$refs.progress.style.width=`${offsetWidth}px`;
				this.$refs.progressBtn.style.left=`${offsetWidth}px`;
			},

		},
		watch:{
			//改变进度条 ，传递进来百分比。
			percent(newPercent){
				if(newPercent>=0 && !this.touch.initiated){
					let progressBar=this.$refs.progressBar;
					let wPercent=progressBar.clientWidth*newPercent;
					this.$refs.progress.style.width=wPercent+'px';
					this.$refs.progressBtn.style.left=newPercent*100+'%';

				}
				
			},
			
		}

	}
</script>
<style lang="scss">
@import '~common/css/variable';
	.progress-bar{	
		height:30px;
		.bar-inner{
			position: relative;
			top:13px;
			left:0;
			height:4px;
			background-color: rgba(0,0,0,0.3);	
			.progress{
				position: absolute;
				// left:0;
				// width:50%;//
				//通过动态计算width,计算精度条长度
				height:100%;
				background-color:$color-theme;

			}		
			.progress-btn-wrapper{
				position: absolute;
				top:-6px;
				//通过动态计算left 来确定 球的位置
				left:0;
				width:100%;	
				// left:-8px;
				// top:-13px;
				// width:30px;
				// height:30px;		
				.progress-btn{
					// position:relative;
					// top:7px;
					// left:7px;

					width:16px;
					height:16px;
					border-radius:50%;
					background-color:$color-theme;
					transform:translateX(-6px);
				}

			}
			
		}
	}
</style>
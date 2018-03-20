<template>
	<div class="progress-bar" ref='progressBar'>
		<div class="bar-inner">
			<div class="progress"></div>
			<div class="progress-btn-wrapper">
				<div class="progress-btn" 
					@touchstart='touchstart'
					@touchmove='touchmove'
					@touchend='touchend'
					>						
				</div>
			</div>
		</div>
	</div>
</template>
<script>

	export default{
		data(){
			return {
				touches:{},
				precent:0,

			}
		},
		methods:{
			touchstart(e){
				console.log('1111');
				let touches=e.touches[0];
				this.touches[x1]=touches.pageX;				
			},
			touchmove(e){
				let touches=e.touches[0];
				let x2=touches.clientX;
				let diff=x2-this.touches[x1];
				let width=this.$refs.progressBar.clientWidth;
				this.precent=diff/width;

				console.log('move');

			},
			touchend(){
				console.log('end');
				this.$emit('touchend',this.precent);

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
				left:50%;
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
				}

			}
			
		}
	}
</style>
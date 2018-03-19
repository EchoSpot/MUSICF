<template>
	<div class="progress-bar">
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
		methods:{
			touchstart(e){
				console.log('1111');
				let touches=e.touches[0];
				let x1=touches.clientX;
				console.log(x1);

			},
			touchmove(e){
				let touches=e.touches[0];
				console.log(touches.clientY);
				console.log('move');

			},
			touchend(){
				console.log('end');

			}

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
				left:0;
				width:50%;//
				//通过动态计算width,计算精度条长度
				height:4px;
				background-color:$color-theme;

			}		
			.progress-btn-wrapper{
				position: absolute;
				top:-6px;
				//通过动态计算left 来确定 球的位置
				left:50%;
				width:100%;			
				.progress-btn{								
					width:16px;
					height:16px;
					border-radius:50%;
					background-color:$color-theme;
				}

			}
			
		}
	}
</style>
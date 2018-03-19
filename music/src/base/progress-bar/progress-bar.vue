<template>
	<div class="progress-bar">
		<div class="bar-inner">
			<div class="progress"></div>
			<div class="progress-btn-wrapper">
				<div class="progress-btn"></div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
@import '~common/css/variable'
	.progress-bar{		
		height:30px;
		.bar-inner{
			position: relative;
			left:0;
			background-color:$color-theme;
			.progress-btn-wrapper{
				position: absolute;
				left:-8px;
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
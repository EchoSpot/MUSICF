<template>
	<div class="progress-circle" :width='width' :height='width'>
		<svg version="1.1" viewBox='0 0 100 100'>
			<circle cx='50' cy='50' r='50' fill='transparent' class='circle-background'/>
			<circle cx='50' cy='50' r='48' fill='transparent' 
				class='progress-bar' 
				:stroke-dasharray='dashArray' 
				:stroke-dashoffset='dashOffset'/>
		</svg>
        <slot></slot>		
	</div>
</template>
<script>
	export default{
		props:{
			width:{
				type:Number,
				default:100,
			},
			percent:{
				type:Number,
				default:0,
			}
		},
		data(){
			return{
				dashArray:Math.PI*100,
			}

		},
		computed:{
			dashOffset(){
				return (1 - this.percent)* this.dashArray;
			}

		},

	}
</script>
<style lang="scss" scoped>
@import '~common/css/variable';
	.progress-circle{
		position: relative;
		circle{			
			transform-origin:center;
			stroke-width:8px;
			&.circle-background{				
				transform:scale(0.9);
				stroke:$color-theme-d;
			}
			&.progress-bar{
				transform:scale(0.9) rotate(-90deg);
				stroke:$color-theme;
			}

		}
		
	}
</style>
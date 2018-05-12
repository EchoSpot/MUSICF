<template>
	<transition name='drop'>
		<div class="top-tip" v-show='showFlag' @click.stop='hide'>
			<slot></slot>
		</div>
	</transition>
</template>
<script>
export default{
	data(){
		return{
			showFlag:false,
		}
	},
	methods:{
		show(){
			this.showFlag=true;
			clearTimeout(this.timer);
			this.timer=setTimeout(()=>{
				this.hide();
			}, 2000);
		},
		hide(){
			this.showFlag=false;
		}
	}

}
	
</script>
<style lang="scss">
@import '~common/css/variable';
.top-tip{
	position: fixed;
	top:0;
	width: 100%;
	height: 40px;
	line-height: 40px;
	z-index:500;
	background-color: $color-dialog-background;
	&.drop-enter-active,&.drop-leave-active{
		transition:all .5s;
	}
	&.drop-enter,&.drop-leave-to{
		transform:translate(0,-100%);
	}
}
	
</style>
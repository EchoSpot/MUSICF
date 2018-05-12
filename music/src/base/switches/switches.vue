<template>
	<ul class="switches" @click.stop>
		<li class="switch-item" 
		v-for='(item,index) in switches'
		@click='itemClick(index)'
		:class='{"active":index === currentIndex}'>
			<span>{{item.name}}</span>
		</li>
	</ul>
</template>
<script>
	export default{
		props:{
			switches:{
				type:Array,
				default:() => {
					return [
						{name:'最近播放'},				
						{name:'搜索历史'}
					];
				}				
			}
		},
		data(){
			return {
				currentIndex:0,
			}
		},
		methods:{
			itemClick(index){
				this.currentIndex=index;
				this.$emit('itemClick',index);
			}
		}
	}
</script>
<style lang="scss">
@import '~common/css/variable';
.switches{
	display: flex;
	align-items:center;
	width: 240px;
	margin:0 auto;
	border: 1px solid $color-highlight-background;
	border-radius:5px;
	.switch-item{
		flex:1;
		padding:8px;
		font-size: $font-size-medium;
		color: $color-text-d;
		&.active{
		  background: $color-highlight-background;
		  color: $color-text;
		}

	}
}
	
</style>
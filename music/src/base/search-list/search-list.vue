<template>
	<div class="search-list">
		<transition-group name='list' tag='ul'>
			<li class="search-item" 
				:key='item' 
				v-for='(item,index) in searchHistory' 
				@click='itemSelect(item)'>
				<span class="text">{{item}}</span>
				<span class="icon"  @click.stop='deleteOne(index)'>
					<i class="icon-delete"></i>
				</span>
			</li>
		</transition-group>
	</div>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex'
	export default{
		computed:{
			...mapGetters([
				'searchHistory'
			])
		},
		methods:{
			...mapActions([
				'deleteOneSearchHistory'

			]),
			itemSelect(item){
				this.$emit('searchHistoryItemSelected',item)
			},
			deleteOne(index){
				this.deleteOneSearchHistory(index);

			}
		}
	}
</script>
<style lang="scss">
@import '~common/css/variable';
@import '~common/css/mixin';
	.search-list{
		.search-item{
			display: flex;
			align-items:center;
			height: 40px;
			overflow:hidden;
			&.list-enter-active,
			&.list-leave-active{
				transition:all .5s;
			}
			&.list-enter,&.list-leave-to{
				height:0;
				opacity:0;
			}
			.text{
				flex:1;
				color:$color-text-l;
			}
			.icon{
				@include extend-click;
				.icon-delete{
					font-size:$font-size-small;
					color:$color-text;
				}
			}

		}
		


	}
</style>
<template>
	<div class="search-box">
		<span class="icon-search"></span>
		<div class="search-input">
			<input type="text" name="" v-model='query' :placeholder='placeholder' ref='searchInput'>
		</div>		
		<span class="icon-dismiss" v-show='query' @click='clear'></span>
	</div>	
</template>
<script>
import {debounce} from 'common/js/util'
	export default{
		props:{
			placeholder:{
				type:String,
				default:'搜索歌曲、歌手'
			}
		},
		created(){
			this.$watch('query',debounce((newQuery)=>{
				this.$emit('query',newQuery)
			},200));

		},
		data(){
			return {
				query:'',
			}
		},
		methods:{
			clear(){
				this.query='';
				this.$emit('clear');
			},
			setQuery(query){
				this.query=query;
			},
			blur(){
				this.$refs.searchInput.blur();
			},
		},


	}
</script>
<style lang="scss">
@import '~common/css/variable';
	.search-box{
		display: flex;
		width:100%;
		height:40px;
		box-sizing: border-box;
		align-items:center;
		padding:0 6px;
		background: $color-highlight-background;
		border-radius:6px;
		.icon-search{
			flex: 0 0 20px;
			width:20px;
			font-size:24px;
			color:$color-background;

		}
		.search-input {
			flex:1;
			margin:0 5px;
			input{
				width:100%;
				line-height:20px;
				background: $color-highlight-background;				
				color: $color-text;
				font-size: $font-size-medium;
				&::placeholder{
					color:$color-text-d;
				}
			}
		}
		.icon-dismiss{
			flex: 0 0 20px;
			width:20px;
			font-size: 16px;
      		color: $color-background;

		}




	}
</style>
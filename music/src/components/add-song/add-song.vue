<template>
	<transition name='slider'>
		<div class="add-song" v-show='showFlag' @click.stop>
			<div class="header">
				<h1 class="title">添加歌曲到列表</h1>
				<div class="close" @click='hide'>
					<i class="icon-close"></i>
				</div>
			</div>			
			<div class="search-box-wrapper">
				<search-box 
				@query='queryChange'
				ref='search'>					
				</search-box>
			</div>
			<div class="shortcut" v-show='!query'>
				<switches 
				@itemClick='currentIndexChange'>					
				</switches>
				<!-- 最近播放 -->
				<div class="recently"  v-show='!switchIndex'>
					111
				</div>
				<!-- 历史记录 -->
				<div class="history" v-show='switchIndex'>
					<search-list></search-list>
				</div>
			</div>
			<div class="search-result" v-show='query'>
				<suggest 
					:query='query' 
					@selectItem='suggestItemSelect'
					@scrollStart='suggestScrollStart'>						
				</suggest>
			</div>
		</div>
		
	</transition>
</template>
<script>
import SearchBox from 'base/search-box/search-box'
import Suggest from 'components/suggest/suggest'
import {mapActions} from 'vuex'
import Switches from 'base/switches/switches'
import SearchList from 'base/search-list/search-list'
export default{
	data(){
		return {
			showFlag:false,
			query:'',
			switchIndex:0,
		}
	},
	methods:{
		show(){
			this.showFlag=true;
		},
		hide(){
			this.showFlag=false;
		},
		queryChange(query){
			this.query=query;

		},
		suggestItemSelect(){ //点击搜索词
			this.saveSearchHistory(this.query);
		},
		suggestScrollStart(){  //滚动前，放下键盘
			this.$refs.search.blur();
		},
		currentIndexChange(index){
			this.switchIndex=index;
		},
		...mapActions([
			'saveSearchHistory',

		]),
	},
	components:{
		SearchBox,
		Suggest,
		Switches,
		SearchList,
	}
}
	
</script>
<style lang="scss">
@import '~common/css/variable';
@import '~common/css/mixin';
.add-song{
	position: fixed;
	left:0;
	top:0;
	bottom:0;
	right:0;
	z-index:202;
	background-color:$color-background;
	&.slider-enter-active,
	&.slider-leave-active{
		transition:all .5s;
	}
	&.slider-enter,
	&.slider-leave-to{
		transform: translate(100%, 0);
	}
	.header{
		position: relative;
		height: 44px;
		line-height: 44px;
		text-align: center;
		.title{
			font-size: $font-size-large;
			color: $color-text;

		}
		.close{
			position: absolute;
			top:0;
			right:8px ;
			.icon-close{
				display: block;
				padding: 12px;
				font-size: 20px;
				color: $color-theme;
			}
		}

	}
	.search-box-wrapper{
      margin: 20px
	}
	.shortcut{
		margin:20px auto;
		.history{
			// width: 100%;
			margin:0 20px;
			text-align: left;
		}
	}
	.search-result{
		position: absolute;
		top:110px;
		bottom:0;
		left:0;
		right: 0;
		overflow: hidden;

	}


}
	
</style>
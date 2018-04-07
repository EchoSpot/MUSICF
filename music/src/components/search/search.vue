<template>
	<div  id="search">
		<div class="search-box-wrap">
			<search-box ref='searchBox' @query='searchQuery'></search-box>
		</div>
		<div class="shortcutWrap" v-show='!query'>
			<scroll :data='searchHistory'>
				<div class="hotKey">
					<h1 class="title">热门搜索</h1>
					<ul>
						<li v-for='item in hotKey' @click='valueSearch(item.k)' class="item">
							<span>{{item.k}}</span>
						</li>
					</ul>		
				</div>
				<div class="search-history" v-show='searchHistory.length'>
					<h1 class="title clearfix">
						<span class="text fl">搜索历史</span>
						<span class="icon fr" @click='cleraAll'>
							<i class="icon-clear"></i>
						</span>
					</h1>
					<search-list @searchHistoryItemSelected='valueSearch'></search-list>
				</div>	
			</scroll>		
		</div>		
		<div class="search-result" v-show='query' ref='result'>
			<suggest 
			:query='query' 
			:showSinger='showSinger' 
			@selectItem='suggestItemSelect'
			@scrollStart='keyBoardDown'></suggest>
		</div>
		<confirm ref='confirm' @btnConfirm='confirm'></confirm>
		<router-view></router-view>
	</div>	
</template>
<script >
import SearchBox from 'base/search-box/search-box'
import {getHotKey} from 'api/search'
import {playlistMixin} from 'common/js/mixin'
import {ERR_OK} from 'api/config'
import Suggest from 'components/suggest/suggest'
import {mapActions,mapGetters} from 'vuex'
import SearchList from 'base/search-list/search-list'
import Scroll from 'base/scroll/scroll'
import Confirm from 'base/confirm/confirm'
	export default{
		mixins:[playlistMixin],
		created(){
			this._getHotKey();

		},
		data(){
			return {
				hotKey:[],
				query:'',
				showSinger:true, //传递给suggest.veu的props
			}

		},
		computed:{
			...mapGetters([
				'searchHistory'
			])

		},
		methods:{
			...mapActions([
				'saveSearchHistory',
				'deleteAllSearchHistory'
			]),
			handlePlaylist(playlist){
				const bottom=playlist.length>0?'60px':0;
				this.$refs.result.style.bottom=bottom;
			},
			//热门搜索点击的时候
			valueSearch(value){
				this.$refs.searchBox.setQuery(value);
			},
			// searchBox输入值改变的时候，emit函数
			searchQuery(queryString){
				this.query=queryString;
				
			},
			//Suggest组件，点击搜索结果的时候
			suggestItemSelect(data){
				if(data.type === 'singer'){
					this.$router.push({
						path:`/search/${data.mid}`
					})
				}
				this.saveSearchHistory(this.query);		
			},
			//清除历史记录
			cleraAll(){
				this.$refs.confirm.show();
			},
			//点击确认按钮后，确认
			confirm(){
				this.deleteAllSearchHistory();

			},
			//开始滚动
			keyBoardDown(){
				this.$refs.searchBox.blur();

			},
			_getHotKey(){
				getHotKey().then((res)=>{
					if(res.code===ERR_OK){
						this.hotKey=res.data.hotkey.slice(0,10);
					}
				})
			},			
		},
		components:{
			SearchBox,
			Suggest,
			SearchList,
			Scroll,
			Confirm,

		}
	}
	
</script>
<style lang="scss">
@import '~common/css/variable';
@import '~common/css/mixin';
	#search{
		.search-box-wrap{
			margin:20px;

		}
		.shortcutWrap{
			.hotKey{
				margin:0 20px 20px 20px;
				text-align:left;
				.title{					
					margin-bottom:16px;
					font-size:$font-size-medium;
					color:$color-text-l;
				}
				.item{
					display: inline-block;
					padding:5px 10px;
					margin:5px;
					border-radius: 4px;
					background: $color-highlight-background;
					font-size: $font-size-medium;
					color: $color-text-d;
				}
			}
			.search-history{
				position: relative;
				margin:0 20px;
				text-align:left;
				.title{
					margin-bottom: 20px;
					font-size: $font-size-medium;
					color: $color-text-l;
				}
				.icon{
					@include extend-click;
					.icon-clear{						
						font-size:$font-size-medium;
						color:$color-text-d;
					}
				}				
				
			}
		}
		.search-result{
			position: fixed;
			width:100%;
			top:144px;
			bottom:0;

		}

	}
</style>
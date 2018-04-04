<template>
	<scroll  class="search-suggest"
			 ref='suggestScroll'
	         :data='list'
	         :pullup='pullup' 
	         @scrollToEnd='searchMore'>
		<ul class="suggest-list">
			<li v-for='item in list' class="suggest-item" @click='suggestItemClick(item)'>				
				<div class="icon">
					<i :class='getIconCls(item)'></i>
				</div>
				<div class="name">
					<p class="text" v-html='getText(item)'></p>
				</div>
			</li>
			<loading title="" v-show='hasMore'></loading>
		</ul>
		<div class="no-result-wrapper" v-show='!this.hasMore && !list.length'>
			 抱歉，暂无搜索结果
		</div>
	</scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import {search} from 'api/search'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import Loading from 'base/loading/loading'
import {mapMutations,mapActions}  from 'vuex'
import Singer from 'common/js/singer'

	const TYPE_SINGER='singer'
	export default{
		props:{
			query:{
				type:String,
				default:'',
			},
			//zhida 是否显示歌手
			showSinger:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				list:[],
				perpage:30, //每页数量
				page:1, //页码
				pullup:true, //betterScroll是否监听滚动到末尾的事件 
				hasMore:false, //数据是否加载完
			}
		},
		methods:{
			...mapMutations({
				setSinger:'SET_SINGER'
			}),
			...mapActions([
				'insertSong',

			]),			
			//search内容变更，首次查询获取 数据
			querySearch(newQuery){
                this.hasMore=true;
                this.page=1;
                this.$refs.suggestScroll.scrollTo(0,0);
				search(newQuery,this.page,this.showSinger,this.perpage).then((res)=>{
					console.log(res);
					if(res.code===ERR_OK){
						this.list=this._normalizeData(res.data);
						this._checkMore(res.data); //判断是否还有数据，
					}
					
				});

			},
			getText(item){
				if(item.type && item.type===TYPE_SINGER){
					return item.singername
				}else{
					return item.name +"  -  "+item.singer
				}

			},
            //根据type 返回图标
			getIconCls(item){
				if(item.type && item.type===TYPE_SINGER){
					return 'icon-mine'
				}else{
					return 'icon-music';
				}		

			},
			//滚到底部的时候，加载更多
			searchMore(){
				if(!this.hasMore){
					return 
				}
				this.page++;
				search(this.query,this.page,false,this.perpage).then((res)=>{
					if(res.code===ERR_OK){
						this.list=this.list.concat(this._normalizeData(res.data));
						this._checkMore(res.data);
					}					
				});
				
			},
			suggestItemClick(item){
				
				//如果点击歌手的话
				if(item.type===TYPE_SINGER){
				     let singer=new Singer({
				     	id:item.singerid,
				     	mid:item.singermid,
				     	name:item.singername
				     });									     					
					this.setSinger(singer);
					let data=Object.assign({},singer,{
						type:TYPE_SINGER
					})
					this.$emit('selectItem',data)	

				}else{ //如果点击的是歌曲的话
					console.log(item);
					this.insertSong(item);


				}
				

			},
			//检查是否还有下一页
			_checkMore(data){
				const song =data.song;
				//如果请求的数据为空 || 或者数据不够30
				if(!song.list.length  || song.list.length<this.perpage){
					this.hasMore=false;
				}

			},
			_normalizeData(data){
				var ret=[];
				if(data.zhida && data.zhida.singerid){
					ret.push({...data.zhida,...{type:TYPE_SINGER}});

				}
				if(data.song && data.song.list){
					data.song.list.forEach((item)=>{
						ret.push(createSong(item));
					})
					
				}
				return ret;
				
			},

		},
		watch:{
			query(newQuery){
				this.querySearch(newQuery);			
			},			
		},
		components:{
			Scroll,
			Loading
		}
	}
	
</script>
<style lang="scss">
@import '~common/css/variable';
	.search-suggest{
		position: relative;
		text-align:left;
		height:100%;
		overflow:hidden;
		.suggest-list{
			padding:0 30px;
			.suggest-item{
				padding-bottom:20px;
				display: flex;
				align-items:center;
				.icon{
					flex: 0 0 30px;
					width:30px;
					text-align:center;
					.icon-mine,.icon-music{
						font-size:14px;
						color:$color-text-d;
					}
					// [class^='icon-']{
					// 	color:red;

					// }
					
				}
				.name{
					flex:1;
					font-size: $font-size-medium;
					color: $color-text-d;
				}

			}

		}
		.no-result-wrapper{
			position: absolute;
			top:50%;
			left:50%;
			transform:translate(-50%,-50%);

		}

	}
	
</style>
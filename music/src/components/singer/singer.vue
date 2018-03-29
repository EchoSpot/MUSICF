<template>
	<div class="singer" ref='singer'>
		<list-view :data="singer" @selectItem="selectSinger" ref='list'></list-view>
		<router-view></router-view>
	</div>
</template>
<script>
	import {getSinger} from 'api/singer'
	import {ERR_OK} from 'api/config'
	import Singer from 'common/js/singer'
	import ListView from 'base/listview/listview'
	import {mapMutations} from 'vuex'
	import {playlistMixin} from 'common/js/mixin'

	const HOT_NAME ='热门'
	const HOT_SINGER_LEN=10

	export default{
		mixins:[playlistMixin],
		data(){
			return {
				singer:[]
			}
		},
		created(){
			this._getSingerList()
		},
		methods:{
			//Mxin
			handlePlaylist(playlist){
				const bottom =playlist.length>0 ?'60px':0;
				this.$refs.singer.style.bottom=bottom;
				this.$refs.list.refresh();
			},
			selectSinger(singer){
				console.log(singer);
				this.$router.push({
					path:`/singer/${singer.mid}`

				})
				this.setSinger(singer)

			},
			_getSingerList(){
				getSinger().then((res)=>{
					if(res.code === ERR_OK){
						this.singer=this._normalizeSinger(res.data.list);
					}					
				})
			},
			_normalizeSinger(list){
				//将歌手数据分类
				let map = {
					hot:{
						title:HOT_NAME,
						list:[]
					}
				};
				list.forEach((item,index) => {
					if(index < HOT_SINGER_LEN){

						map.hot.list.push(new Singer({
							id:item.Fsinger_id,
							name:item.Fsinger_name,
							mid:item.Fsinger_mid

						}))
					}
					var key=item.Findex;
					if(!map[key]){
						map[key]={
							title:key,
							list:[]
						}
					}
					map[key].list.push(new Singer({
						id:item.Fsinger_id,
						name:item.Fsinger_name,
						mid:item.Fsinger_mid
					}))
				})
				//将歌手数据排序
				let hot=[];
				let ret=[];

				for(let item in map){
					if(item === 'hot'){
						hot.push(map[item]);
						continue;
					}
					var reg=/[a-zA-z]/i;
					if(reg.test(item)){
						ret.push(map[item])
					}
				}
				ret.sort((a,b) => {
					return a.title.charCodeAt(0)-b.title.charCodeAt(0);
				})
				return hot.concat(ret);
			},
			...mapMutations({
				setSinger:'SET_SINGER'

			})		

		},
		components:{
			ListView

		}

	}
</script>
<style lang="scss" scoped>
@import '~common/css/variable';
	.singer{
		position: fixed;
		top:$topHeight;
		bottom:0;
		width:100%;

	}
</style>
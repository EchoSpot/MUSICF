<template>
	<transition name='slider'>
		<div class="toplist" >
			<music-list :name='title' :image='Image' :data='list' :rank='rank'></music-list>
		</div>
	</transition>
	
</template>
<script>
	import MusicList from 'components/music-list/music-list'
	import {getTopList} from 'api/rank'
	import {ERR_OK} from 'api/config'
	import {mapGetters} from 'vuex'
	import {createSong} from 'common/js/song'
	export default{
		created(){
			this._getTopList();
			this.rank=true


		},
		data(){
			return {
				list:[],
			}

		},
		computed:{
			...mapGetters([
				'topList'				
			]),
			title(){
				return this.topList.topTitle;
			},
			Image(){
				return this.topList.picUrl;
			}


		},
		methods:{
			_getTopList(){
				if(!this.topList.id){
					return this.$router.push('/rank');
				}
				getTopList(this.topList.id).then((res)=>{
					if(res.code===ERR_OK){
						this.list=this._normalizeSongs(res.songlist);
					}
				}).catch((e)=>{
					console.warn(e);
				})
			},
			_normalizeSongs(list){
				let ret=[];
				list.forEach((item)=>{
					if(item.data.songid){
						ret.push(createSong(item.data));
					}
					
				});
				return ret;
			}

		},
		components:{
			MusicList

		}
	}
</script>
<style lang="scss">
	.toplist{
		position: fixed;
		top:0;
		bottom:0;
		left:0;
		right:0;
		background-color: red;
	}
	.slider-enter-active,.slider-leave-active{
		transition:all .5s;
	}
	.slider-enter,.slider-leave-to{
		transform:translate(100%,0);
	}
</style>
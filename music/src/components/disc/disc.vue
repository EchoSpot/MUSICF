<template>
	<transition name='slider'>
    	<music-list :name='title' :image='image' :data='cdlist'></music-list>		
	</transition>
</template>
<script>
	import MusicList from 'components/music-list/music-list'
	import {mapGetters} from 'vuex'
	import {getCDList} from 'api/recommend'
	import {ERR_OK} from 'api/config'
	import {createSong} from 'common/js/song'
	export default{
		created(){
			this._getCDList();

		},
		data(){
			return {
				cdlist:[],
			}

		},
		computed:{
			...mapGetters([
				'disc'
			]),
			title(){
				return this.disc.dissname;
			},
			image(){
				return this.disc.imgurl;
			}


		},
		components:{
			MusicList

		},
		methods:{
			_getCDList(){
				//如果直接进入页面，跳转到父页面
				if(!this.disc){
					this.$router.push('/recommend');
				}
				getCDList(this.disc.dissid).then((res)=>{
					console.log(res);
					if(res.code===ERR_OK){
						this.cdlist=this._normalizeSong(res.cdlist[0].songlist)
					}				

				})

			},
			_normalizeSong(list){
				let ret=[];
				list.forEach((item)=>{
					if(item.songid && item.albummid){
						ret.push(createSong(item))
					}
				})
				return ret

			},
		}
	}
</script>
<style lang="scss">
 .slider-enter-active,
 .slider-leave-active{
 	transition:all .5s;
 }
 .slider-enter,.slider-leave-to{
 	transform:translate(100%,0);
 }
		
</style>
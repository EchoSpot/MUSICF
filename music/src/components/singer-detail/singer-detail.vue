<template>
	<transition name="slider">
		<music-list :data='songs'
		:name="title" 
		:image='image'>
		</music-list>
	</transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from '@/api/singer'
import {ERR_OK} from '@/api/config'
import {createSong} from '@/common/js/song'

import MusicList from '@/components/music-list/music-list'
export default{	
	created(){
		this._getDeatil();
		console.log(this.singer);
	},
	data(){
		return {
			songs:[]

		}
	},
	computed:{
		...mapGetters([
			'singer'
		]),
		title(){
			return this.singer.name;
		},
		image(){
			return this.singer.avater;

		}
	},
	
	methods:{
		_getDeatil(){
			if(!this.singer.mid){
				this.$router.push('/singer');
				return
			}
			getSingerDetail(this.singer.mid).then((res)=>{
				if(res.code === ERR_OK){
					console.log(res.data);
					this.songs=this._normalizeSongs(res.data.list);
					console.log(this.songs);
				}
			});
		},
		_normalizeSongs(list){			
			let ret=[];
			list.forEach((item)=>{
				let {musicData} = item;
				if(musicData.songid && musicData.albumid){
					ret.push(createSong(musicData));
				}
			})
			return ret
			
		}

	},
	components:{
		MusicList
	}

}
	
</script>
<style lang="scss">
@import '~common/css/variable';

.slider-enter-active,
.slider-leave-active{
	transition:all .5s;
}
.slider-enter,
.slider-leave-to{
	transform:translate3d(100%,0,0);

}
	
</style>
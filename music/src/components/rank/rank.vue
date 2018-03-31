<template>
	<div class="rank" ref='rank'>
		<scroll :data='topList' class='topList' ref='topListScroll'>
			<ul class="wrap">
				<li v-for='item in topList' @click='itemSelect(item)' class="item">
					<div class="icon">
						<img v-lazy="item.picUrl" width='100' height='100'>
					</div>
					<div class="songList" >
						<p class="song" v-for='(song,index) in item.songList'>
							<span>{{index + 1 }}.</span>
							<span>{{song.songname}}-{{song.singername}}</span>
						</p>
					</div>
				</li>
			</ul>
			<div class="loading-container" v-show='!topList.length'>
				<loading></loading>
			</div>
		</scroll>	
		<router-view></router-view>
	</div>
	
</template>
<script>
import {getRank} from 'api/rank'
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'
import {playlistMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'
import Loading from 'base/loading/loading'

	export default{
		mixins:[playlistMixin],
		created(){
			this._getRank();
		},
		data(){
			return {
				topList:[]
			}

		},
		methods:{
			...mapMutations({
				setTopList:'SET_TOP_LIST',
			}),
			handlePlaylist(playlist){
				const bottom=playlist.length>0?'60px':0;
				this.$refs.rank.style.bottom=bottom;
				this.$refs.topListScroll.refresh();

			},
			itemSelect(item){
				this.$router.push({
          			path: `/rank/${item.id}`
        		})
				this.setTopList(item);

				console.log(item);

			},
			_getRank(){
				getRank().then((res)=>{
					if(res.code===ERR_OK){
						this.topList=res.data.topList;
					}
				});

			},
			
		},
		components:{
			Scroll,
			Loading,

		}

	}
</script>
<style lang="scss">
@import '~common/css/variable';
@import '~common/css/mixin';

	.rank{
		position: fixed;
		top:$topHeight;
		bottom:0;
		width:100%;
		.topList{
			height:100%;
			overflow:hidden;
			li.item{
				display:flex;
				margin:0 20px;
				padding-top:20px;
				height:100px;
				.icon{
					flex:0 0 100px;
					width:100px;
					img{
						width:100px;
						height:100px;

					}
				}
				.songList{
					flex:1;
					width:100%;
					height:100px;
					text-align:left;
					padding: 0 20px;
					background: $color-highlight-background;
					.song{
						width:100%;
						line-height:26px;
						color: $color-text-d;
						font-size: $font-size-small;
						@include no-wrap;
						&:first-child{
							padding-top:12px;
						}

					}
				}
				&:last-child{
					padding-bottom:20px;
				}
			}
		}
		.loading-container{
			position: absolute;
			top:50%;
			left:50%;
			transform:translate(-50%,-50%);

		}

	}
</style>
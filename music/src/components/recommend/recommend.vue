<template>
	<div class="recommend">
		<scroll :data="discList" class="slider-wrapper" ref="scroll">
			<div>
				<div class="recommend-content" v-if="slider.length" >
					<slider>
						<div  v-for="item in slider">
							<a :href="item.linkUrl">
								<img :src="item.picUrl" class="needsclick">
							</a>
						</div>
					</slider>
				</div>			
				<div class="recommend-list" >
					<h1 class="list-title">热门歌单推荐</h1>
					<div class="remd_ul clearfix">
						<a href="#" class="remd_li"  v-for="item in discList.slice(0,3)">
							<div class="remd_img">
								<img v-lazy="item.imgurl" @load="loadImage">
							</div>
							<span class="icon-music" v-html="listenNum(item.listennum)"></span>
							<p v-html="item.dissname" class="remd_text"></p>		
						</a>
					</div>
					<div class="remd_ul clearfix">
						<a href="#" class="remd_li"  v-for="item in discList.slice(3,6)">
							<div class="remd_img">
								<img v-lazy="item.imgurl" >
							</div>
							<span  class="icon-music" v-html="listenNum(item.listennum)"></span>
							<p v-html="item.dissname" class="remd_text"></p>		
						</a>
					</div>
					<ul class="list">
						<li class="item" v-for="item in discList" @click="selectItem(item)">
							<div class="icon">
								<img v-lazy="item.imgurl" alt="tupia" width="60px" >
							</div>
							<div class="text">
								<h2 class="name" v-html='item.creator.name'></h2>
								<p  class="desc ellipsis" v-html='item.dissname'></p>
							</div>							
						</li>						
					</ul>
				</div>
			</div>
			<div class="loading-wrap" v-show="!discList.length">
				<loading ></loading>
			</div>	
		</scroll>	
	</div>	
</template>
<script >
	import  {getRecommend,getDiscList} from 'api/recommend.js'
	import  {ERR_OK} from 'api/config'
	import  Slider  from '@/base/slider/slider' 
	import  Scroll from '@/base/scroll/scroll'
	import  Loading from '@/base/loading/loading'
	export default{
		created () {
			this._getRecommend();
			this._getDiscList()
		},
		data() {
			return {
				slider:[],
				discList:[],
			}
		},
		methods:{
			_getRecommend() {
				getRecommend().then((res) => {
					if(res.code === ERR_OK ){						
						console.log(res.data);
						this.slider=res.data.slider;					
					}
				})
			},
			_getDiscList(){
				getDiscList().then((res)=>{	
                //修改好loading bug 后去掉延迟
				if(res.code === ERR_OK){
					this.discList=res.data.list;
					console.log(this.discList.slice(0,3));
				}				
													
				})
			},
			listenNum(num){
				let result=(num/10000).toFixed(1);
				return num>=100000?result+'万':num;
			},
			selectItem(item){
				// item.encrypt_uin
			},
			//保证图片资源撑开了高度，不影响better-scroll撑开高度
			loadImage(){
				if(!this.checkLoaded){
					this.$refs.scroll.refresh();
					this.checkLoaded=true;
				}

			}
		},

		components:{
			Slider,
			Scroll,
			Loading

		}

	}


</script>
<style lang="scss">
@import '~common/css/variable.scss';
.recommend{
	position: fixed;
	width:100%;
	top:$topHeight;
	bottom:0;
	.slider-wrapper{
		position: relative;
		height:100%;
		overflow:hidden;
	}
	.recommend-list{
		.list-title{
			height:50px;
			line-height:50px;
			text-align:center;
			font-size:$font-size-medium;
			color:$color-theme;
		}
		.remd_ul{
			padding-bottom:16px;
			.remd_li{
				display:block;
				float: left;
				width:33.33%;
				box-sizing:border-box;
				position: relative;
				&:first-child{
					padding-right: 2px;
				}
				&:nth-child(2){
					padding:0 1px;
				}
				&:last-child{
					padding-left: 2px;

				}
				.remd_img{
					img{
						width:100%;
					}
				}
				.remd_text{
					display:-webkit-box;
					-webkit-box-orient:vertical;
					-webkit-line-clamp:2;
					overflow:hidden;					
					padding: 6px 2px 0 6px;
					line-height: 1.2;
					font-size: 13px;
					text-align:left;
				}
				.icon-music{
					position: absolute;
					right:5px;
					top:2px;
					font-size:12px;
					color:#fff;				
				}
			}

		}
		.list{
			.item{
				display:flex;
				box-sizing:border-box;
				align-items:center;
				width:100%;
				padding:10px;
				.icon{
					flex:0 0 60px;
					width:60px;
					padding:0 20px 0 10px;
				}
				.text{
					display: flex;
					flex-direction: column;
					justify-content: center;
					flex: 1;
					line-height: 20px;
					overflow: hidden;
					text-align:left;
					font-size: $font-size-medium;
					.name{
						color:$color-text;
						margin-bottom:10px;
					}
					.desc{
						color: $color-text-d;

					}
				}

			}

		}
		


	}
	.loading-wrap{
		position: absolute;
		top:50%;
		transform:translateY(-50%);		
		width:100%;
	}
	

}
	
</style>
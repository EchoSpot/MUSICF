<template>
	<div class="song-list">
		<ul>
			<li v-for='(song,index) in list' class="item" @click='selectItem(song,index)'>
				<div class="ifrank" v-show='rank'>
					<span :class='getRankCls(index)'>{{getRankText(index)}}</span>				
				</div>
				<div class="content">
					<h1 class="name">{{song.name}}</h1>
					<p class="desc">{{getDesc(song)}}</p>
				</div>				
			</li>
		</ul>
	</div>
</template>
<script >
	export default{
		props:{
			list:{
				type:Array,
				default:[]

			},
			rank:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			//展示描述信息
			getDesc(song){
				return `${song.singer} . ${song.album}`;
			},
			selectItem(item,index){
				this.$emit('select',item,index);
			},
			getRankCls(index){
				if(index<=2){
					return `icon icon${index}`
				}else{
					return 'text'
				}

			},
			getRankText(index){
				if(index<=2){
					return 
				}else{
					return index+1;
				}
			}
		}

	}
</script>
<style lang="scss">
@import '~common/css/variable';
@import '~common/css/mixin';
	.song-list{
		padding:10px 20px 0 20px;		
		.item{
			display:flex;
			align-items:center;
			box-sizing:border-box;
			height: 64px;
			font-size:$font-size-medium;
			.ifrank{
				width:30px;
				padding-right:10px;
				.icon{
					display: inline-block;
					width:25px;
					height:25px;
					background-size:25px 24px;					
					&.icon0{
						@include bg-image(first)
					}
					&.icon1{
						@include bg-image(second)
					}
					&.icon2{
						@include bg-image(third)
					}
				}
				.text{
					color: $color-theme;
					font-size: $font-size-large;
				}
			}
			.content{
				flex:1;
				line-height: 20px;
				text-align:left;
				padding:10px 0;
				.name{
					 color: $color-text;
					 @include no-wrap;

				}
				.desc{
					width:100%;
					height:20px;
					color: $color-text-d;
					@include no-wrap;


				}
			}
		}

	}
</style>

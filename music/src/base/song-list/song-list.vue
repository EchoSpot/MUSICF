<template>
	<div class="song-list">
		<ul>
			<li v-for='(song,index) in list' class="item" @click='selectItem(song,index)'>
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

			}
		},
		methods:{
			//展示描述信息
			getDesc(song){
				return `${song.singer} . ${song.album}`;
			},
			selectItem(item,index){
				this.$emit('select',item,index);
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
			.content{
				display:1;
				line-height: 20px;
				text-align:left;
				padding:10px 0;
				.name{
					 color: $color-text;
					 @include no-wrap;

				}
				.desc{
					color: $color-text-d;
					@inclue no-wrap;

				}
			}
		}

	}
</style>

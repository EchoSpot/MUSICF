<template>
	<div class="confirm" v-show='showFlag'>
		<div class="confirm-wrap">
			<div class="confirm-content">
				<p class="text">{{text}}</p>
				<div class="operate">
					<div class="operate-btn btn-cancel"  @click='cancel'>{{cancelBtnText}}</div>
					<div class="operate-btn btn-confirm" @click='confirm'>{{confirmBtnText}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script >
 export default{
 	props:{
 		text:{
 			type:String,
 			default:'确认清空历史记录吗'
 		},
 		confirmBtnText:{
 			type:String,
 			default:'确认'
 		},
 		cancelBtnText:{
 			type:String,
 			default:'取消'
 		}
 	},
 	data(){
 		return {
 			showFlag:false
 		}
 	},
 	methods:{
 		show(){
 			this.showFlag=true
 		},
 		hide(){
 			this.showFlag=false
 		},
 		cancel(){
 			this.hide();
 		},
 		confirm(){
 			this.hide();
 			this.$emit('btnConfirm')
 		}

 	}

}	
</script>
<style lang="scss">
@import '~common/css/variable';
.confirm{
	position: fixed;
	top:0;
	left:0;
	right:0;
	bottom:0;
	z-index:999;
	background-color:$color-background-d ;
	.confirm-wrap{
		position: absolute;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
		.confirm-content{
			width:270px;
			border-radius:13px;
			background-color: $color-highlight-background;
			.text{
				padding:19px 15px;
				line-height: 22px;
				text-align: center;
				font-size: $font-size-large;
				color: $color-text-l;
			}
			.operate{
				display: flex;
				align-items:center;
				.operate-btn{
					height: 22px;
					line-height: 22px;
					flex:1;
					color: $color-text-d;
				}


			}
		}
	}

}

	
</style>
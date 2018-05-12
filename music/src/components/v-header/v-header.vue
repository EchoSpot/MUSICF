<template>
	<header class="head">
		<div class="text">Music Play</div>
		<router-link to='/user' class='mine' tag='div'>
			<i class="icon-mine"></i>
		</router-link>

	</header>
	</template>
<script type="text/ecmascript-6">
	
</script>
<style lang="scss" scoped>
@import '~common/css/variable';
.head{
	position: relative;
	padding-top:10px;
	height:20px;
	text-align:center;
	font-size:0;
	.text{
		display: inline-block;
		font-size:$font-size-large;
		vertical-align: top;	
	}
	.mine{
		position: absolute;
		top: 0;
		right: 0;
		.icon-mine{
			display: block;
			padding:12px;
			font-size:20px;
			color:$color-theme;

		}

	}
}

	
</style>
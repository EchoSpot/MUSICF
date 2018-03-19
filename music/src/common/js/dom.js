export function addClass(el,className){
	if(hasClass(el,className)){
		return 
	}else{
		el.className =el.className="" ? className :el.className+" "+className;
	}

}

export function hasClass(el,className){
	var reg=new RegExp('(^|\\s)'+className+'($|\\s)','ig');
	return reg.test(el.className);
}

export function getData(el,name,val){
	const str='data-'+name;
	if(val){
		return el.setAttribute(str,val);
	}else{
		return el.getAttribute(str)
	}

}

let elementStyle=document.createElement('div').style


//判断是什么浏览器
let  vendor=(() => {
	let transformNames={
		webkit:'webkitTransform',
		Moz:'MozTransform',
		O:'OTransform',
		ms:'msTransform',
		standard:'transform'
	}
	for(let key in transformNames){
		if(elementStyle[transformNames[key]] !== undefined){
			return key
		}

	}
	return false
})()

//相应浏览器增加前缀
export function prefixStyle(style){
	if(!vendor){
		return false
	}
	if(vendor === 'standard'){
		return style
	}
	return vendor+style.charAt(0).toUpperCase()+style.substr(1)
}
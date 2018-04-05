export function getRandomInt(min,max){
	return Math.floor(Math.random()*(max-min+1)+min);
}

export function debounce(func,delay){
	let timer;
	//...args 为func的函数中的值
	return function(...args){
		if(timer){
			clearTimeout(timer);
		}	
		timer=setTimeout(() =>{
			func.apply(this,args);

		},delay);
	}
}
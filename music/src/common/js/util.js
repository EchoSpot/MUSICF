function _getRandomInt(min,max){
	return Math.floor(Math.random()*(max-min+1)+min);
}

export function shuffle(arr){
	for (let i = 0; i < arr.length; i++) {
        const index=_getRandomInt(i,arr.lenth-1);
        const temp=arr[i];
		arr[i]=arr[index];
		arr[index]=temp;
    }

}
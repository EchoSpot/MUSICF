import originJSONP from 'jsonp'

export default function jsonp(url,data,option){
	return new Promise((resolve,reject) => {
		url += (url.indexOf('?')<0)?'?':'&'+param(data);
		originJSONP(url,option,(err,data) => {
			if(!err){
				resolve(data)
			}else{
				reject(err)
			}
		})

	})
}
function param(data){
	let path=''
	for(var param in data){
		let value=data[param] !== undefined ? data[param] :''
		path += '&'+param+'='+encodeURIComponent(value)				
	}
	return path ? path.substr(1) : ''

}
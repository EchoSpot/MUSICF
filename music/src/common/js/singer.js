export default class Singer{
	constructor({id,mid,name}){
		this.id = id
		this.name = name
		this.mid = mid 
		this.avater = `http://y.gtimg.cn/music/photo_new/T001R150x150M000${mid}.jpg?max_age=2592000`
	}
}
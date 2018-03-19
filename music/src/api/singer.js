import jsonp from 'common/js/jsonp'
import {commonParams,options} from 'api/config.js'
import axios from 'axios'

export function getSingerDetail(mid){
	let url='/api/getSingerDetail';
	const data=Object.assign({},commonParams,{
			g_tk: 5381,
			hostUin: 0,
			format: 'jsonp',
			platform: 'yqq',
			needNewCode: 0,
			singermid: mid,
			order: 'listen',
			begin: 0,
			num: 30,
			songstatus: 1
	})
	return axios.get(url,{
		params:data
	}).then((res) => {
		return Promise.resolve(res.data)
	})

}

export function getSinger(){
	let url='/api/getSinger';
	const data=Object.assign({},commonParams,{
		channel:'singer',
		page:'list',
		key:'all_all_all',
		pagesize:100,
		pagenum:1,
		g_tk:5381,
		loginUin:0,
		hostUin:0,
		format:'json',
		needNewCode:0
	})
	return axios.get(url,{
		params:data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}

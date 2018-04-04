import jsonp from 'common/js/jsonp.js'
import {commonParams,options} from 'api/config.js'
import axios from 'axios'

export function getHotKey(){
	const url='https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
	const data=Object.assign({},commonParams,{
		g_tk: 5381,
		format: 'json',
		platform: 'h5',
		needNewCode: 1,
	})

	return jsonp(url,data,options);
}



export function search(queryString,page,zhida,perpage){
	const url='/api/getSearch';
	const data=Object.assign({},commonParams,{
		w:queryString,
		perpage:perpage,
		n: perpage,
		p: page,
		catZhida: zhida ? 1: 0,
		g_tk: 5381,
		format: 'json',
		platform: 'h5',
		needNewCode: 1,		
		zhidaqu: 1,		
		t: 0,
		flag: 1,
		ie: 'utf-8',
		sem: 1,
		aggr: 0,
		
		remoteplace: 'txt.mqq.all',
	})
	return axios.get(url,{
		params:data
	}).then((res)=>{
		return Promise.resolve(res.data)
	});
}


import jsonp from 'common/js/jsonp'
import {commonParams,options} from 'api/config'
import axios from 'axios'

export function getRank(){
	const url='https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';

	const data=Object.assign({},commonParams,{
		g_tk: 5381,
		format: 'json',
		platform: 'h5',
		needNewCode: 1,
	})

    return jsonp(url,data,options)

}
export function  getTopList(id){
	const url='/api/getTopList';
	const data=Object.assign({},commonParams,{
		g_tk: 5381,
		format: 'json',
		platform: 'h5',
		needNewCode: 1,
		tpl: 3,
		page: 'detail',
		type: 'top',
		topid: id,
	});
	return axios.get(url,{
		params:data
	}).then((res)=>{
		return Promise.resolve(res.data);
	})
}

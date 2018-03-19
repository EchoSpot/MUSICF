import jsonp from 'common/js/jsonp.js'
import {commonParams,options} from 'api/config.js'
import axios from 'axios'

export function getRecommend(){
	var url="https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
	const data=Object.assign({},commonParams,{
		uin:0,
		platform:'h5',
		needNewCode:1,
		g_tk:5381,
		format: 'jsonp',
		_:1519740067338
	})
	return jsonp(url,data,options)

}
export function getDiscList() {
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
	  g_tk:1579442191,
    platform:'yqq',
    format: 'json',
    hostUin:0,
    sin:0,
    ein:29,
    sortId:5,
    needNewCode:0,
    categoryId:10000000,
    rnd: Math.random(),
    picmid:1
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

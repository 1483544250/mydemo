import axios from 'axios'
const host = 'https://wx.shikehuyu.com'

export default function request (data) {
  return axios({
    method: data.method,
    url: `${host}/${data.url}`,
    params: data.params,
    data: data.data
  }).then((res) => {
    return res.data
  })
}

// import request from "./request";
// export async function sendPostRequest(params) {
//   return request(`api/musicRankingsDetails?type=1`, {
//     method: 'POST',
//     data: params,
//   }).then(response => {    
//     console.log(response,'response');
//     if (response && response.errors)
//       response.errors.map(({ message: msg }) => alert(msg));
//     else if (response && !response.errors) {
//       return response;
//     }
//   });
// }
import axios from 'axios';
export function sendPostRequest() {
  axios.post('https://api.apiopen.top/musicRankingsDetails?type=1').then(
    response => {
      console.log('成功了', response.data);
    },
    error => { console.log('失败了', error); }
  )
}


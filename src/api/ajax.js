import axios from './ajaxConfig';


function ajax () {}


ajax.prototype.post = function (url, data = {}, loading = true, headers = {}) {

  return new Promise((resolve, reject) => {

    axios.post(url, data, {headers}).then(res => {

      return resolve(res.data);
      
    }).catch(err => {
      
      return resolve(err);
    });
  })

}

export default new ajax();


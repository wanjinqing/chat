import axios from './ajaxConfig';


function ajax () {}


ajax.prototype.post = function (url, data = {}, loading = true, headers = {}) {

  return new Promise((resolve, reject) => {

    EventVue.$emit('loading', true);

    axios.post(url, data, {headers}).then(res => {

      EventVue.$emit('loading', false);

      return resolve(res.data);
      
    }).catch(err => {

      EventVue.$emit('loading', false);
      
      return resolve(err);
    });
  })

}

export default new ajax();


import {APP_BASE_URL} from './ApiContants';
import axiosInstance from './ServerAxios';

 
export default  async function callApi(url, method,data=null,queryParams=null,  freeApi=false, isFileUpload=false) {

  let finalURL = APP_BASE_URL+url
        let added = false;
        if(queryParams !== null) {
          for(let key in queryParams) {
              if(added && key !=="k") {
                finalURL += '&'
                finalURL = finalURL + key + '=' +queryParams[key]
              } else if(key !=="k") {
                added = true;
                finalURL += '?'
                finalURL = finalURL + key + '=' +queryParams[key]
              }
      
          }    
        }
        
        const headers = {
          Accept : 'application/json',
          'Content-Type':  isFileUpload  ? "multipart/form-data" : 'application/json' ,
          enctype : ''
        }

        if(! freeApi) {
            // let userToken = cookies.get('token');
            let userToken = localStorage.getItem('token');
            headers.Authorization= "Bearer "+userToken;
        }

        return axiosInstance({
          // Endpoint to send files
          url: finalURL,
          method: method,
          headers: headers,
          data: isFileUpload ? data : JSON.stringify(data),
        });
          
      }
import { TIMEOUT_SEC } from "./counfing";
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject( new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const AJAX=async function(URL,dataup=''){
try{
   const fechApi = dataup!==''
     ? fetch(URL, {
               method:"POST",
               headers:{
                 "Content-Type":"application/json"
               },
               body:JSON.stringify(dataup)
       })
     : fetch(URL);
const api_ford = await Promise.race([fechApi, timeout(TIMEOUT_SEC)]);
const data = await api_ford.json();
    console.log(data)
    if (!api_ford.ok) throw new Error (`${json.message} ${api_ford.status}`);
    console.log('sdhsh')
    return data
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
}
// export const getJson = async function (url) {
//   try {
//     console.log(url);
//     const fechApi = fetch(url);
//     const api_ford = await Promise.race([fechApi, timeout(TIMEOUT_SEC)]);
//     const data = await api_ford.json();
//     if (!api_ford.ok) throw new Error(`${json.message} ${api_ford.status}`);
//     return data;
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// };

// export const sendJSON = async function (url,UploadDeta) {
//   try {
//     console.log(url)
//     const fechApi= fetch(url,{
//       method:"POST",
//       headers:{
//         "Content-Type":"application/json"
//       },
//       body:JSON.stringify(UploadDeta)
//     })
//     const api_ford = await Promise.race([fechApi, timeout(TIMEOUT_SEC)]);
//     const data = await api_ford.json();
//     if (!api_ford.ok) throw new Error (`${json.message} ${api_ford.status}`);
//     return data
//   } catch (error) {
//     console.log(error)
//     throw new Error(error);
//   }
// };
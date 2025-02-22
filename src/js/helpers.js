//!tệp này sẽ gom code sử dụng lại nhiều lần trong project

import { TIMEOUT_SECOND } from './config';

//? sử dụng để giới hạn thời gian chờ của một Promise, giúp xử lý trường hợp request mất quá nhiều thời gian để phản hồi.
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request tool too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//call api
export const getJSON = async function (url) {
  try {
    //?Chay song song fetch và timeout, lấy kết quả đầu tiên trả về
    const res = await Promise.race([
      fetch(url), //Goi APi
      timeout(TIMEOUT_SECOND),
    ]); //Gioi han thoi gian cho

    const data = await res.json();
    if (!res.ok) {
      throw Error(`${res.status} ${data.message}`);
    }
    return data;
  } catch (e) {
    throw e;
  }
};

//!tệp này sẽ gom code sử dụng lại nhiều lần trong project
//! Chứa các hàm dùng chung cho các module khác
// Ví dụ: Hàm gọi API (getJSON), xử lý timeout, định dạng dữ liệu,...
// Dùng để tái sử dụng nhiều lần, tránh lặp code.
export const getJSON = async function (url) {
  try {
    const res = await new Promise.race();

    const data = await res.json();
    if (!res.ok) {
      throw Error(`${res.status} ${data.message}`);
    }
  } catch (e) {
    console.log(e);
  }
};

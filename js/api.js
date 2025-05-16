const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/-',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

// //У Максима Иванова:
// const ErrorText = {
//   [Method.GET]: 'Не удалось загрузить данные. Попробуйте обновить страницу',
//   [Method.POST]: 'Не удалось отправить форму. Попробуйте ещё раз',
// };

//На промисах (как у Иванова Максима из видео):
// const load = (route, method = Method.GET, body = null) =>
//   fetch(`${BASE_URL}${route}`, {method, body})
//     .then((response) =>
//       response.ok ? response.json() : Promise.reject(ErrorText[method]));

// const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

// const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);


// С использованием async/await (как у Иванова Максима из видео)
// const load = async (route,method = Method.GET, body = null) => {
//   const response = await fetch(`${BASE_URL}${route}` , { method, body })
//   return response.ok ? await response.json() : Promise.reject(ErrorText[method]);
// };

// const getData = async () => await load(Route.GET_DATA);

// const sendData = async (body) => await load(Route.SEND_DATA, Method.POST, body);


export {getData, sendData};

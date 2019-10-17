import axios from 'axios';

export const getBaseCurr = () => {
  const request = axios.get('https://api.exchangeratesapi.io/latest?base=USD')
    .then((res) => res.data)
    .catch(err => console.log(err))

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('EUR')
    }, 1000);
  })


  return {
    type: 'GET_BASE_CURR'
  }
}

export const getRates = (curr) => {
  const request = axios.get(`https://api.exchangeratesapi.io/latest?base=${curr}`)
    .then((res) => res.data)
    .catch(err => console.log(err))

  return {
    type: 'GET_RATES',
    payload: request
  }
}

export const setBaseCurr = (curr) => {

  return {
    type: 'SET_BASE_CURR',
    payload: curr
  }
}

export const getFavor = () => {
  let favoriteCurr = localStorage.getItem("currency_app");
  let promise = new Promise((res, rej) => {
    res(JSON.parse(favoriteCurr))
  })
  return {
    type: 'GET_FAVORITE_CURRENCY',
    payload: promise
  }
}

export const setFavor = curr => {
  let favoriteCurr = localStorage.getItem("currency_app");
  if (favoriteCurr) {
    favoriteCurr = JSON.parse(favoriteCurr)
    favoriteCurr.push(curr);
  } else {
    favoriteCurr = [];
    favoriteCurr.push(curr);
  }
  localStorage.setItem("currency_app", JSON.stringify(favoriteCurr))

  return {
    type: 'SET_FAVORITE_CURRENCY',
    payload: favoriteCurr
  }

}

export const unsetFavor = curr => {
  let favoriteCurr = JSON.parse(localStorage.getItem("currency_app"));
  favoriteCurr = favoriteCurr.filter(item => item !== curr);
  localStorage.setItem("currency_app", JSON.stringify(favoriteCurr))


  return {
    type: 'UNSET_FAVORITE_CURRENCY',
    payload: favoriteCurr
  }
}
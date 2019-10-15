import axios from 'axios';

export const getBaseCurr = () => {
  const request = axios.get('https://api.exchangeratesapi.io/latest?base=USD')
    .then((res) => res.data)
    .catch(err => console.log(err))

  let promise = new Promise((resolve,  reject) => {
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
import axios from '../utils/axios';

export const required = value => value ? null : 'Заполните поле'; 
export const email = value => value.match(/(.+)@(.+){2,}\.(.+){2,}/g) ? null : 'Неверный email';
export const matchedPassword = (value, allValues) => value === allValues.password ? null : 'Пароли должны совпадать';
export const minLength = minValue => value => value.length > minValue ? null : `Должно быть больше ${minValue} символов`;
export const maxLength = maxValue => value => value.length < maxValue ? null : `Должно быть меньше ${maxValue} символов`;
// export const asyncValidate = async (values) => {
//   await new Promise(resolve => setTimeout(resolve, 3000));
//   const { data: users } = await axios.get('http://localhost:3001/users');
//   if (users.find(user => user.email === values.email)) {
//     return Promise.reject({
//       email: 'Данный email уже зарегистрирован, выберите другой',
//     });
//   }
// };
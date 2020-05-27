import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    //Проверяем, корректный ли адрес.
    //Если нет, то выводится сообщение в скобках
    .email("Некорректный email")
    //не сабмитим, если поле не заполнено
    .required("Обязательное поле"),
  password: Yup.string()
  .required("Обязательное поле"),
});
export default LoginSchema;

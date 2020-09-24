import * as Yup from "yup";

const RegistrationSchema = Yup.object().shape({
  email: Yup.string()
    //Проверяем, корректный ли адрес.
    //Если нет, то выводится сообщение в скобках
    .email("Некорректный email")
    //не сабмитим, если поле не заполнено
    .required("Обязательное поле"),
  username: Yup.string()
    //минимальная длина - 2 символа
    .min(2, "Требуется более 2 символов")
    //максимальная длина - 20 символов
    .max(25, "Не более 25 символов")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(8, "Требуется более 8 символов")
    .required("Обязательное поле"),
  repassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Пароли не совпадают")
    .required("Обязательное поле"),
  acceptedTerms: Yup.boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions."),
});
export default RegistrationSchema;

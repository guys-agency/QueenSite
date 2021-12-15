import * as Yup from "yup";

const AskSchema = Yup.object().shape({
  name: Yup.string().required("Обязательное поле"),
  email: Yup.string()
    //Проверяем, корректный ли адрес.
    //Если нет, то выводится сообщение в скобках
    .email("Некорректный email")
    //не сабмитим, если поле не заполнено
    .required("Обязательное поле"),

  question: Yup.string().required("Обязательное поле"),
  acceptedTerms: Yup.boolean()
    .required("Обязательное поле")
    .oneOf([true], "You must accept the terms and conditions."),
});
export default AskSchema;

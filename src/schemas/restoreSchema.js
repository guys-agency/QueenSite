import * as Yup from "yup";

const RestoreSchema = Yup.object().shape({
  email: Yup.string()
    //Проверяем, корректный ли адрес.
    //Если нет, то выводится сообщение в скобках
    .email("Некорректный email")
    //не сабмитим, если поле не заполнено
    .required("Обязательное поле"),
});
export default RestoreSchema;

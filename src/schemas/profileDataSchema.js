import * as Yup from "yup";

const ProfileDataSchema = Yup.object().shape({
  name: Yup.string()
    //Проверяем, корректный ли адрес.
    //Если нет, то выводится сообщение в скобках

    //не сабмитим, если поле не заполнено
    .required("Обязательное поле"),
  tel: Yup.string().required("Обязательное поле"),
});
export default ProfileDataSchema;

import * as Yup from "yup";

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
  .required("Обязательное поле"),
  password: Yup.string()
    .min(8, "Требуется более 8 символов")
    .required("Обязательное поле"),
  repassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Пароли не совпадают"
  ),
  acceptedTerms: Yup.boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions."),
});
export default ChangePasswordSchema;
import * as Yup from "yup";

const GiftSchema = Yup.object().shape({
  question: Yup.string().required("Обязательное поле"),
});
export default GiftSchema;

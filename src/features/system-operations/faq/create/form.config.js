import * as Yup from "yup";

export const faqLang = {
  id: 0,
  faqId: 0,
  languageId: 0,
  question: "",
  answer: "",
};

export const initialValue = {
  userTypeId: 0,
  faqLangs: [faqLang],
  deletedFaqLangIds: [],
};

export const FaqCreateSchema = Yup.object().shape({
    userTypeId: Yup.number().required("This field is required"),
    faqLangs : Yup.array().of(Yup.object().shape({
        id: Yup.number(),
        faqId : Yup.number(),
        languageId: Yup.number(),
        question : Yup.string(),
        answer : Yup.string(),
    })),
    deletedFaqLangIds : Yup.array().of(Yup.number())

})

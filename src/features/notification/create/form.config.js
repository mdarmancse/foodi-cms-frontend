import * as Yup from "yup";

export const NotificationCreateSchema = Yup.object().shape({
    title : Yup.string(),
    description : Yup.string(),
    category : Yup.number(),
    image : Yup.mixed(),
    typeof : Yup.string(),
})

export const initialValue = {
    title : "",
    description : "",
    category : "",
    image : "",
    typeof : "",
}
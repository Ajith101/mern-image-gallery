import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("The mail is wrong")
    .required("PLease Enter Valid Email"),
  password: Yup.string().required("Please Enter Your Password"),
});

export const registerSchema = Yup.object({
  firstName: Yup.string().min(3).max(20).required("Name required"),
  email: Yup.string()
    .email("The mail is wrong")
    .required("Please enter valid mail"),
  password: Yup.string()
    .min(6, "Minimum 6 character required")
    .required("Please enter the password"),
  confirm_password: Yup.string()
    .required("Please enter the password")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

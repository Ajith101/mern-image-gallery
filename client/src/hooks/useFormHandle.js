import { useState } from "react";

export const useForms = (values) => {
  const [formValues, setFormValues] = useState(values);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return { handleChange, formValues };
};

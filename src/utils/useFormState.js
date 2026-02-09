import { useState, useCallback } from 'react';

export const useFormState = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialState);
  }, [initialState]);

  return { formData, setFormData, handleChange, resetForm };
};

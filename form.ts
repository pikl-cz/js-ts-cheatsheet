// Příprava dat FormData k odeslání například pomocí fetch()
export const prepareFormData = (data: Record<string, string>): FormData => {
  const formData = new FormData();
  new Map(Object.entries(data)).forEach((value, key) => {
    formData.append(key, value);
  });
  return formData;
};

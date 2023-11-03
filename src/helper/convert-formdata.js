export function convertToFormData(dataObject, parentKey = "") {
  const formData = new FormData();

  function appendFormData(value, key) {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === "object" && !Array.isArray(value)) {
      const childFormData = convertToFormData(value, key);
      for (const childKey of childFormData.keys()) {
        formData.append(childKey, childFormData.get(childKey));
      }
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const arrayItemKey = `${key}[${index}]`;
        appendFormData(item, arrayItemKey);
      });
    } else {
      formData.append(key, value);
    }
  }

  if (Array.isArray(dataObject)) {
    dataObject.forEach((item, index) => {
      const arrayItemKey = `${parentKey}[${index}]`;
      appendFormData(item, arrayItemKey);
    });
  } else {
    for (const key in dataObject) {
      const fullKey = parentKey ? `${parentKey}[${key}]` : key;
      appendFormData(dataObject[key], fullKey);
    }
  }

  return formData;
}

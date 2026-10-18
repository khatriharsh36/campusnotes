export const validateName = (value) => {
  if (!value.trim()) return "Student name is required.";
  if (value.trim().length < 3) return "Name must be at least 3 characters.";
  if (value.trim().length > 60) return "Name must not exceed 60 characters.";
  if (!/^[a-zA-Z\s]+$/.test(value.trim())) return "Name can only contain letters and spaces.";
  return "";
};

export const validateEmail = (value) => {
  if (!value.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Please enter a valid email address.";
  return "";
};

export const validateTitle = (value) => {
  if (!value.trim()) return "Resource title is required.";
  if (value.trim().length < 5) return "Title must be at least 5 characters.";
  if (value.trim().length > 80) return "Title must not exceed 80 characters.";
  return "";
};

export const validateRequired = (value, fieldName) => {
  if (!value || !value.toString().trim()) return `${fieldName} is required.`;
  return "";
};

export const validateDescription = (value) => {
  if (!value.trim()) return "Description is required.";
  if (value.trim().length < 20) return "Description must be at least 20 characters.";
  if (value.trim().length > 300) return "Description must not exceed 300 characters.";
  return "";
};

export const validateFile = (file) => {
  if (!file) return "Please select a PDF file to upload.";
  if (file.type !== "application/pdf" && !file.name.endsWith(".pdf"))
    return "Only PDF files are allowed.";
  if (file.size > 5 * 1024 * 1024) return "File size must not exceed 5 MB.";
  return "";
};

export const validatePassword = (value) => {
  if (!value) return "Password is required.";
  if (value.length < 6) return "Password must be at least 6 characters.";
  return "";
};

export const validateLoginEmail = (value) => {
  if (!value.trim()) return "College email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Please enter a valid email address.";
  return "";
};

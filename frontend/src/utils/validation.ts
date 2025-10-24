// Email validation
export const validateEmail = (email: string): { isValid: boolean; message: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { isValid: false, message: 'E-posta adresi gereklidir' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Geçerli bir e-posta adresi giriniz' };
  }
  
  return { isValid: true, message: '' };
};

// Phone validation (Turkish format)
export const validatePhone = (phone: string): { isValid: boolean; message: string } => {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (!cleanPhone) {
    return { isValid: false, message: 'Telefon numarası gereklidir' };
  }
  
  // Turkish phone: 10 digits (without country code) or 12 digits (with +90)
  if (cleanPhone.length === 10 && cleanPhone.startsWith('5')) {
    return { isValid: true, message: '' };
  }
  
  if (cleanPhone.length === 12 && cleanPhone.startsWith('90') && cleanPhone[2] === '5') {
    return { isValid: true, message: '' };
  }
  
  return { isValid: false, message: 'Geçerli bir telefon numarası giriniz (örn: 5XX XXX XX XX)' };
};

// Format phone number
export const formatPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length <= 3) return cleanPhone;
  if (cleanPhone.length <= 6) return `${cleanPhone.slice(0, 3)} ${cleanPhone.slice(3)}`;
  if (cleanPhone.length <= 8) return `${cleanPhone.slice(0, 3)} ${cleanPhone.slice(3, 6)} ${cleanPhone.slice(6)}`;
  return `${cleanPhone.slice(0, 3)} ${cleanPhone.slice(3, 6)} ${cleanPhone.slice(6, 8)} ${cleanPhone.slice(8, 10)}`;
};

// TC Kimlik No validation (Turkish ID number)
export const validateTCKimlik = (tcKimlik: string): { isValid: boolean; message: string } => {
  const cleanTC = tcKimlik.replace(/\D/g, '');
  
  if (!cleanTC) {
    return { isValid: false, message: 'TC Kimlik No gereklidir' };
  }
  
  if (cleanTC.length !== 11) {
    return { isValid: false, message: 'TC Kimlik No 11 haneli olmalıdır' };
  }
  
  if (cleanTC[0] === '0') {
    return { isValid: false, message: 'TC Kimlik No 0 ile başlayamaz' };
  }
  
  // TC Kimlik algorithm validation
  const digits = cleanTC.split('').map(Number);
  
  // Check 10th digit
  const sum1to9 = digits.slice(0, 9).reduce((sum, digit) => sum + digit, 0);
  if (sum1to9 % 10 !== digits[9]) {
    return { isValid: false, message: 'Geçersiz TC Kimlik No' };
  }
  
  // Check 11th digit
  const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const evenSum = digits[1] + digits[3] + digits[5] + digits[7];
  const digit10 = (oddSum * 7 - evenSum) % 10;
  
  if (digit10 !== digits[9]) {
    return { isValid: false, message: 'Geçersiz TC Kimlik No' };
  }
  
  const sum1to10 = digits.slice(0, 10).reduce((sum, digit) => sum + digit, 0);
  if (sum1to10 % 10 !== digits[10]) {
    return { isValid: false, message: 'Geçersiz TC Kimlik No' };
  }
  
  return { isValid: true, message: '' };
};

// Password strength validation
export interface PasswordStrength {
  score: number; // 0-4
  label: string;
  color: string;
  suggestions: string[];
  isValid: boolean;
}

export const validatePasswordStrength = (password: string): PasswordStrength => {
  if (!password) {
    return {
      score: 0,
      label: 'Çok Zayıf',
      color: 'red',
      suggestions: ['Şifre giriniz'],
      isValid: false,
    };
  }
  
  let score = 0;
  const suggestions: string[] = [];
  
  // Length check
  if (password.length >= 8) score++;
  else suggestions.push('En az 8 karakter kullanın');
  
  if (password.length >= 12) score++;
  
  // Lowercase check
  if (/[a-z]/.test(password)) score++;
  else suggestions.push('Küçük harf ekleyin');
  
  // Uppercase check
  if (/[A-Z]/.test(password)) score++;
  else suggestions.push('Büyük harf ekleyin');
  
  // Number check
  if (/\d/.test(password)) score++;
  else suggestions.push('Rakam ekleyin');
  
  // Special character check
  if (/[^a-zA-Z\d]/.test(password)) score++;
  else suggestions.push('Özel karakter ekleyin (!, @, #, vs.)');
  
  // Normalize score to 0-4
  score = Math.min(Math.floor(score / 1.5), 4);
  
  const strengthMap = {
    0: { label: 'Çok Zayıf', color: 'red', isValid: false },
    1: { label: 'Zayıf', color: 'orange', isValid: false },
    2: { label: 'Orta', color: 'yellow', isValid: password.length >= 6 },
    3: { label: 'Güçlü', color: 'green', isValid: true },
    4: { label: 'Çok Güçlü', color: 'green', isValid: true },
  };
  
  return {
    score,
    ...strengthMap[score as keyof typeof strengthMap],
    suggestions: score < 3 ? suggestions.slice(0, 2) : [],
  };
};

// General required field validation
export const validateRequired = (value: string, fieldName: string): { isValid: boolean; message: string } => {
  if (!value || value.trim() === '') {
    return { isValid: false, message: `${fieldName} gereklidir` };
  }
  return { isValid: true, message: '' };
};

// Min length validation
export const validateMinLength = (value: string, minLength: number, fieldName: string): { isValid: boolean; message: string } => {
  if (value.length < minLength) {
    return { isValid: false, message: `${fieldName} en az ${minLength} karakter olmalıdır` };
  }
  return { isValid: true, message: '' };
};

// Max length validation
export const validateMaxLength = (value: string, maxLength: number, fieldName: string): { isValid: boolean; message: string } => {
  if (value.length > maxLength) {
    return { isValid: false, message: `${fieldName} en fazla ${maxLength} karakter olmalıdır` };
  }
  return { isValid: true, message: '' };
};

// URL validation
export const validateURL = (url: string): { isValid: boolean; message: string } => {
  try {
    new URL(url);
    return { isValid: true, message: '' };
  } catch {
    return { isValid: false, message: 'Geçerli bir URL giriniz' };
  }
};

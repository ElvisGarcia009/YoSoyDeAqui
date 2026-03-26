/**
 * Client-side Dominican cédula validation (mirrors backend cedulaService.js).
 * Pure logic with zero dependencies — safe to run in the browser.
 */

const CEDULA_REGEX = /^\d{3}-?\d{7}-?\d{1}$/;
const WEIGHTS = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];

function validateFormat(cedula) {
  return CEDULA_REGEX.test(cedula.trim());
}

function validateChecksum(cedula) {
  const digits = cedula.replace(/\D/g, '');
  if (digits.length !== 11) return false;

  let sum = 0;
  for (let i = 0; i < 10; i++) {
    let product = parseInt(digits[i], 10) * WEIGHTS[i];
    if (product >= 10) {
      product = Math.floor(product / 10) + (product % 10);
    }
    sum += product;
  }

  const expected = (10 - (sum % 10)) % 10;
  const actual = parseInt(digits[10], 10);
  return expected === actual;
}

export function validateCedula(cedula) {
  if (!cedula || typeof cedula !== 'string') {
    return { valid: false, error: 'Cédula requerida' };
  }
  const trimmed = cedula.trim();
  if (!validateFormat(trimmed)) {
    return { valid: false, error: 'Formato inválido. Use: 000-0000000-0' };
  }
  if (!validateChecksum(trimmed)) {
    return { valid: false, error: 'Cédula inválida (dígito verificador incorrecto)' };
  }
  return { valid: true };
}

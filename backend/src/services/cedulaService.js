const { createHmac } = require('crypto');

/**
 * Dominican Republic cédula validation.
 *
 * Format: 001-0000000-0  (3 digits - 7 digits - 1 check digit)
 * Also accepts without dashes: 00100000000
 */

const CEDULA_REGEX = /^\d{3}-?\d{7}-?\d{1}$/;
const WEIGHTS = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];

function validateFormat(cedula) {
  return CEDULA_REGEX.test(cedula.trim());
}

/**
 * JCE módulo 10 check digit algorithm.
 * Verifies the 11th digit matches the computed check digit.
 */
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

function validateCedula(cedula) {
  if (!cedula || typeof cedula !== 'string') {
    return { valid: false, error: 'Cédula requerida' };
  }
  const trimmed = cedula.trim();
  if (!validateFormat(trimmed)) {
    return { valid: false, error: 'Formato de cédula inválido. Use: 000-0000000-0' };
  }
  if (!validateChecksum(trimmed)) {
    return { valid: false, error: 'Número de cédula inválido (dígito verificador incorrecto)' };
  }
  return { valid: true };
}

/**
 * Hashes a cédula using HMAC-SHA256 with a server-side pepper.
 * Deterministic output (same input → same hash) required for deduplication.
 * Pepper defends against rainbow table attacks on the 11-digit key space.
 */
function hashCedula(cedula) {
  const pepper = process.env.CEDULA_PEPPER || 'dev-pepper-change-in-production';
  const digits = cedula.replace(/\D/g, '');
  return createHmac('sha256', pepper).update(digits).digest('hex');
}

module.exports = { validateCedula, hashCedula };

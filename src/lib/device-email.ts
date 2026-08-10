const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NUMBERED_EMAIL_PATTERN = /^(.*?)(\d+)(@[^\s@]+)$/i;
const CLONEX_DEVICE_EMAIL_PATTERN = /^clonex\.cel\.(\d+)@gmail\.com$/i;

export function buildDeviceEmailSequence(firstEmail: string, quantity: number): string[] | null {
  const normalized = firstEmail.trim().toLowerCase();
  if (!EMAIL_PATTERN.test(normalized)) return null;

  const safeQuantity = Math.min(50, Math.max(1, quantity));
  if (safeQuantity === 1) return [normalized];

  const match = normalized.match(NUMBERED_EMAIL_PATTERN);
  if (!match) return null;
  const [, prefix, numberText, suffix] = match;
  const firstNumber = Number(numberText);
  return Array.from(
    { length: safeQuantity },
    (_, index) => `${prefix}${firstNumber + index}${suffix}`,
  );
}

export function clonexDeviceNumber(email: string): number | undefined {
  const match = email.trim().match(CLONEX_DEVICE_EMAIL_PATTERN);
  return match ? Number(match[1]) : undefined;
}

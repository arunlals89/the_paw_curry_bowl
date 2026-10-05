export function whatsappLink(phone: string, message?: string) {
  const digits = phone.replace(/\D/g, "");
  const params = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${params}`;
}

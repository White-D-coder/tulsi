import type { Quote, Product } from '@prisma/client';

const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ADMIN_NUMBER = process.env.ADMIN_WHATSAPP_NUMBER || '919325623540';

export async function sendWhatsAppToAdmin(quote: Quote, product: Product) {
  if (!WHATSAPP_TOKEN || !PHONE_ID || WHATSAPP_TOKEN === "mock_token") {
    console.log('WhatsApp not configured or mock token – skipping notification');
    return;
  }

  const message = `📋 *New Quote Request* 📋\n\n` +
    `*Product:* ${product.name} (${product.sku})\n` +
    `*Quantity:* ${quote.quantity}\n` +
    `*Customer:* ${quote.customerName}\n` +
    `*Phone:* ${quote.customerPhone}\n` +
    `*Email:* ${quote.customerEmail}\n` +
    `*Message:* ${quote.message || '—'}\n\n` +
    `Quote ID: ${quote.id}`;

  const url = `https://graph.facebook.com/v18.0/${PHONE_ID}/messages`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: ADMIN_NUMBER,
        type: 'text',
        text: { body: message },
      }),
    });

    const data = await response.json();
    if (!response.ok) console.error('WhatsApp send failed:', data);
    return data;
  } catch (error) {
    console.error('WhatsApp notification error:', error);
    return null;
  }
}

export function generateWhatsAppLink(productSku: string, productName: string): string {
  const message = `Hello TULSI OFFICE SOLUTION,%0A%0A*Product Enquiry*%0A📦 SKU: ${productSku}%0A📝 Name: ${encodeURIComponent(productName)}%0A🔢 Quantity: [Please specify]`;
  return `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${message}`;
}

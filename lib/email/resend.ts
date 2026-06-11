import { Resend } from 'resend';
import type { Quote, Product } from '@prisma/client';

const resend = new Resend(process.env.RESEND_API_KEY || 'mock');

export async function sendQuoteConfirmationEmail(quote: Quote, product: Product) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'mock_key' || process.env.RESEND_API_KEY === 'mock') {
    console.log('Resend not configured – skipping email confirmation');
    return;
  }

  const html = `
    <h1>Quote Request Received</h1>
    <p>Dear ${quote.customerName},</p>
    <p>Thank you for your interest in <strong>${product.name}</strong> (SKU: ${product.sku}).</p>
    <p><strong>Quote ID:</strong> ${quote.id}</p>
    <p><strong>Quantity:</strong> ${quote.quantity}</p>
    <p>We will contact you on WhatsApp (${quote.customerPhone}) within 2 hours with the best price and availability.</p>
    <br/>
    <p>Regards,<br/>TULSI OFFICE SOLUTION</p>
  `;

  try {
    await resend.emails.send({
      from: 'Tulsi Office <noreply@tulsi-office.com>',
      to: quote.customerEmail,
      subject: `Quote Request #${quote.id} – ${product.name}`,
      html,
    });
  } catch (error) {
    console.error('Email notification error:', error);
  }
}

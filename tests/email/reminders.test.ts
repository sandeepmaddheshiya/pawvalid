import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  formatWhatsAppLink,
  sendSpecialistIntakeNotification,
  sendDay30Reminder,
  sendDay5Reminder,
  sendDay2Reminder,
  sendTripReminder,
  sendSlackOpsNotification,
} from '@/lib/email/reminders';

describe('Email Reminders & Concierge Service', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.BREVO_API_KEY;
  });

  afterEach(() => {
    process.env = originalEnv;
  });
  const mockTrip = {
    id: 'test-trip-uuid-123',
    userEmail: 'traveler@example.com',
    petName: 'Bella',
    species: 'DOG',
    breed: 'Beagle',
    origin: 'United Kingdom',
    destination: 'Japan',
    departureDate: '2026-10-15',
    uploadedDocuments: JSON.stringify([
      { filename: 'rabies_titer_rnatt.pdf', category: 'Rabies Titre Test' },
      { filename: 'official_export_health_cert.pdf', category: 'Health Certificate' },
    ]),
    complianceChecklist: JSON.stringify({
      all: [
        { name: '180-Day Rabies Titer Quarantine Clock', status: 'ACTION_REQUIRED' },
        { name: 'ISO 11784/11785 Microchip Verification', status: 'SATISFIED' },
      ],
    }),
  };

  it('should format WhatsApp numbers cleanly into deep links', () => {
    expect(formatWhatsAppLink('+44 7123 456 789')).toBe('https://wa.me/447123456789');
    expect(formatWhatsAppLink('(555) 123-4567')).toBe('https://wa.me/5551234567');
    expect(formatWhatsAppLink('+1-800-PET-VIA1')).toBe('https://wa.me/18001');
  });

  it('should dispatch specialist intake notification in mock mode when no API key is provided', async () => {
    const result = await sendSpecialistIntakeNotification({
      trip: mockTrip,
      customerWhatsApp: '+44 7987 654321',
      notes: 'Please verify if the rabies laboratory seal is acceptable for Tokyo customs.',
      urgency: 'HIGH',
    });

    expect(result.success).toBe(true);
    expect(result.mocked).toBe(true);
    expect(result.messageId).toContain('mock-brevo-');
  });

  it('should handle Day -30 reminder dispatch', async () => {
    const result = await sendDay30Reminder(mockTrip);
    expect(result.success).toBe(true);
    expect(result.mocked).toBe(true);
    expect(result.messageId).toContain('mock-brevo-');
  });

  it('should handle Day -5 tapeworm reminder dispatch', async () => {
    const result = await sendDay5Reminder(mockTrip);
    expect(result.success).toBe(true);
    expect(result.mocked).toBe(true);
    expect(result.messageId).toContain('mock-brevo-');
  });

  it('should handle Day -2 government endorsement reminder dispatch', async () => {
    const result = await sendDay2Reminder(mockTrip);
    expect(result.success).toBe(true);
    expect(result.mocked).toBe(true);
    expect(result.messageId).toContain('mock-brevo-');
  });

  it('should dispatch via sendTripReminder for all valid reminder types', async () => {
    const r30 = await sendTripReminder(mockTrip, 'DAY_30');
    expect(r30.success).toBe(true);

    const r5 = await sendTripReminder(mockTrip, 'DAY_5');
    expect(r5.success).toBe(true);

    const r2 = await sendTripReminder(mockTrip, 'DAY_2');
    expect(r2.success).toBe(true);

    await expect(sendTripReminder(mockTrip, 'INVALID' as any)).rejects.toThrow();
  });

  it('should gracefully return false when Slack webhook is not configured', async () => {
    const result = await sendSlackOpsNotification('Test alert');
    expect(result).toBe(false);
  });
});

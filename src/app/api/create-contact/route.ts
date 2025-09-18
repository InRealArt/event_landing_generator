import { NextRequest, NextResponse } from 'next/server';
import { createBrevoContact } from '@/actions/emailActions';
import { getArtistData } from '@/lib/artistDataManager';
import { verifyRecaptchaToken } from '@/lib/recaptcha';
import { z } from 'zod';

// Schéma de validation Zod pour les données de contact
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets'),
  email: z.string()
    .email('Adresse email invalide')
    .max(255, 'L\'email ne peut pas dépasser 255 caractères'),
  mobile: z.string()
    .optional()
    .refine((val) => !val || /^(\+33|0)[1-9](\d{8})$/.test(val), 'Numéro de mobile français invalide'),
  slug: z.string()
    .min(1, 'Le slug est requis')
    .max(100, 'Le slug ne peut pas dépasser 100 caractères')
    .regex(/^[a-z0-9-]+$/, 'Le slug ne peut contenir que des lettres minuscules, chiffres et tirets'),
  recaptchaToken: z.string()
    .min(1, 'Le token reCAPTCHA est requis')
    .optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation des données avec Zod
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message
      }));

      return NextResponse.json(
        {
          error: 'Données de validation invalides',
          details: errors
        },
        { status: 400 }
      );
    }

    const { name, email, mobile, slug, recaptchaToken } = validationResult.data;

    // Validation reCAPTCHA (optionnelle en développement si pas de clé configurée)
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (recaptchaSecretKey && recaptchaToken) {
      const isRecaptchaValid = await verifyRecaptchaToken(recaptchaToken);

      if (!isRecaptchaValid) {
        return NextResponse.json(
          { error: 'Validation reCAPTCHA échouée' },
          { status: 400 }
        );
      }
    } else if (recaptchaSecretKey && !recaptchaToken) {
      return NextResponse.json(
        { error: 'Token reCAPTCHA requis' },
        { status: 400 }
      );
    } else {
      console.warn('⚠️ reCAPTCHA désactivé - RECAPTCHA_SECRET_KEY non configurée');
    }

    // Get artist data to retrieve Brevo list ID
    const artistData = await getArtistData(slug);

    if (!artistData) {
      return NextResponse.json(
        { error: 'Artiste non trouvé' },
        { status: 404 }
      );
    }

    if (!artistData.brevoListId) {
      return NextResponse.json(
        { error: 'ID de liste Brevo non configuré pour cet artiste' },
        { status: 500 }
      );
    }

    // Split name into first and last name
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Create contact in Brevo
    console.log('🚀 Starting contact creation process...');
    console.log('👤 Contact data:', { name, email, mobile, slug });
    console.log('👤 Artist data:', { fullName: artistData.fullName, brevoListId: artistData.brevoListId });

    const contactResult = await createBrevoContact({
      email,
      firstName,
      lastName,
      phone: mobile || undefined,
      listId: artistData.brevoListId
    });

    console.log('👤 Contact creation result:', contactResult);

    if (!contactResult.success) {
      console.error('❌ Contact creation failed:', contactResult.message);
      return NextResponse.json(
        {
          error: 'Erreur lors de la création du contact',
          details: contactResult.message
        },
        { status: 500 }
      );
    }


    return NextResponse.json(
      {
        message: 'Contact créé avec succès',
        contactId: contactResult.contactId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du contact' },
      { status: 500 }
    );
  }
}

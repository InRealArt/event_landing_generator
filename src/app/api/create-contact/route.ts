import { NextRequest, NextResponse } from 'next/server';
import { createBrevoContact } from '@/actions/emailActions';
import { getArtistData } from '@/lib/artistDataManager';

export async function POST(request: NextRequest) {
  try {
    const { name, email, mobile, slug } = await request.json();

    // Validate required fields
    if (!name || !email || !slug) {
      return NextResponse.json(
        { error: 'Nom, email et slug sont requis' },
        { status: 400 }
      );
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

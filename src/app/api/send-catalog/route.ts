import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/actions/emailActions';
import { defaultArtistData } from '@/lib/artistData';
import path from 'path';
import fs from 'fs';

export async function POST(request: NextRequest) {
  try {
    const { name, email, mobile } = await request.json();

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nom et email sont requis' },
        { status: 400 }
      );
    }

    // 1. Send notification email to team
    const teamNotificationData = {
      to: 'teaminrealart@gmail.com',
      subject: `Nouvelle demande de catalogue - ${name}`,
      html: `
        <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #333; font-size: 24px; margin-bottom: 20px; text-align: center;">
              📧 Nouvelle demande de catalogue
            </h1>
            
            <div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">
                Informations du demandeur
              </h2>
              <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 5px 0;">
                <strong>Nom:</strong> ${name}
              </p>
              <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 5px 0;">
                <strong>Email:</strong> ${email}
              </p>
              ${mobile ? `<p style="color: #666; font-size: 16px; line-height: 1.6; margin: 5px 0;"><strong>Téléphone:</strong> ${mobile}</p>` : ''}
              <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 5px 0;">
                <strong>Date:</strong> ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
              </p>
            </div>
            
            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2d5a2d; font-size: 16px; margin-bottom: 10px;">
                ✅ Action effectuée automatiquement
              </h3>
              <p style="color: #666; font-size: 14px; margin: 0;">
                Le catalogue ${defaultArtistData.name} (PDF) a été automatiquement envoyé à ${email}
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                Landing Page ${defaultArtistData.name}<br>
                InRealArt
              </p>
            </div>
          </div>
        </div>
      `
    };

    // Check if PDF file exists
    const pdfPath = path.join(process.cwd(), 'public', 'catalogue.pdf');
    console.log('📁 PDF Path:', pdfPath);
    console.log('📁 File exists:', fs.existsSync(pdfPath));
    
    if (!fs.existsSync(pdfPath)) {
      console.error('❌ PDF file not found at:', pdfPath);
      return NextResponse.json(
        { error: 'PDF file not found' },
        { status: 500 }
      );
    }

    // 2. Email template for user catalog
    const userCatalogData = {
      to: email,
      subject: `Catalogue ${defaultArtistData.name} - InRealArt`,
      html: `
        <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #333; font-size: 24px; margin-bottom: 20px; text-align: center;">
              Catalogue ${defaultArtistData.name}
            </h1>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Bonjour ${name},
            </p>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Merci pour votre intérêt pour le travail de ${defaultArtistData.name}. 
              Vous trouverez ci-joint son catalogue personnel avec ses œuvres récentes 
              et sa collection d'art contemporain.
            </p>
            
            <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8B5CF6;">
              <p style="color: #333; font-size: 14px; margin: 0; font-weight: 500;">
                📎 Le catalogue PDF est joint à cet email pour votre consultation.
              </p>
            </div>
            
            <div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #333; font-size: 18px; margin-bottom: 10px;">
                À propos d'InRealArt
              </h2>
              <ul style="color: #666; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>15+ Artistes sélectionnés dans notre catalogue global</li>
                <li>&lt; 100 Œuvres soigneusement choisies pour embellir votre collection</li>
                <li>500+ Transactions réalisées sur notre marketplace</li>
                <li>50% de nos artistes figurent dans le classement 50-60 de l'ICAC</li>
              </ul>
            </div>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              N'hésitez pas à nous contacter si vous avez des questions sur nos œuvres ou nos artistes.
            </p>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                Équipe InRealArt<br>
                teaminrealart@gmail.com
              </p>
            </div>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'Catalogue Monique Laville & InRealArt 2025.pdf',
          path: pdfPath
        }
      ]
    };

    // Send both emails
    console.log('🚀 Starting email sending process...');
    
    const [teamResult, userResult] = await Promise.all([
      sendEmail(teamNotificationData),
      sendEmail(userCatalogData)
    ]);

    console.log('📧 Team notification result:', teamResult);
    console.log('📧 User catalog result:', userResult);

    // Check if both emails were sent successfully
    if (!teamResult.success || !userResult.success) {
      console.error('❌ Email sending failed:', { 
        teamResult, 
        userResult,
        teamError: teamResult.message,
        userError: userResult.message
      });
      return NextResponse.json(
        { 
          error: 'Erreur lors de l\'envoi des emails',
          details: {
            team: teamResult.message,
            user: userResult.message
          }
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Catalogue envoyé avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending catalog email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du catalogue' },
      { status: 500 }
    );
  }
}

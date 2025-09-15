import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/actions/emailActions';

export async function POST(_request: NextRequest) {
  try {
    const testEmailData = {
      to: 'nino.lmx.pro@gmail.com',
      subject: 'Test Email from InRealArt',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1>Test Email</h1>
          <p>This is a simple test email to verify email delivery.</p>
          <p>Sent at: ${new Date().toISOString()}</p>
        </div>
      `
    };

    console.log('🧪 Sending test email...');
    const result = await sendEmail(testEmailData);
    
    return NextResponse.json({
      success: result.success,
      message: result.message,
      messageId: result.messageId
    });

  } catch (error) {
    console.error('❌ Test email error:', error);
    return NextResponse.json(
      { error: 'Test email failed' },
      { status: 500 }
    );
  }
}

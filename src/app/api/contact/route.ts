import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, project, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nom, email et message sont requis' },
        { status: 400 }
      )
    }

    const projectLabels: Record<string, string> = {
      'essentielle': 'Présence Essentielle (300€)',
      'association': 'Pack Communauté (550€)',
      'createur': 'Pack Créateur (750€)',
      'autre': 'Autre / Sur mesure',
    }

    const { data, error } = await resend.emails.send({
      from: 'Webopoli <thomas@webopoli.com>',
      to: ['thomas@webopoli.com'],
      replyTo: email,
      subject: `💬 Nouveau message de ${name} - Webopoli`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="color-scheme" content="light">
        </head>
        <body style="margin: 0; padding: 0; background-color: #ffffff;">
          <div style="background-color: #ffffff; padding: 20px;">
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #547454 0%, #6B936B 100%); padding: 30px; border-radius: 16px 16px 0 0;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Nouveau message de contact</h1>
              </div>
              
              <div style="background-color: #FDFCFA; padding: 30px; border: 1px solid #E8DFD0; border-top: none; border-radius: 0 0 16px 16px;">
                <div style="margin-bottom: 24px;">
                  <p style="color: #9A8567; font-size: 12px; text-transform: uppercase; margin: 0 0 4px 0;">Nom</p>
                  <p style="color: #3F382F; font-size: 16px; margin: 0; font-weight: 500;">${name}</p>
                </div>
                
                <div style="margin-bottom: 24px;">
                  <p style="color: #9A8567; font-size: 12px; text-transform: uppercase; margin: 0 0 4px 0;">Email</p>
                  <p style="color: #3F382F; font-size: 16px; margin: 0;">
                    <a href="mailto:${email}" style="color: #547454; text-decoration: none;">${email}</a>
                  </p>
                </div>
                
                <div style="margin-bottom: 24px;">
                  <p style="color: #9A8567; font-size: 12px; text-transform: uppercase; margin: 0 0 4px 0;">Type de projet</p>
                  <p style="color: #3F382F; font-size: 16px; margin: 0;">${projectLabels[project] || project || 'Non spécifié'}</p>
                </div>
                
                <div style="margin-bottom: 24px;">
                  <p style="color: #9A8567; font-size: 12px; text-transform: uppercase; margin: 0 0 4px 0;">Message</p>
                  <div style="background-color: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #E8DFD0;">
                    <p style="color: #3F382F; font-size: 15px; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </div>
                </div>
                
                <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #E8DFD0;">
                  <a href="mailto:${email}" style="display: inline-block; background-color: #547454; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">
                    Répondre à ${name}
                  </a>
                </div>
              </div>
              
              <p style="color: #9A8567; font-size: 12px; text-align: center; margin-top: 24px;">
                Message envoyé depuis webopoli.com
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Erreur Resend:', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, messageId: data?.id })

  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
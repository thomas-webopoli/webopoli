import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  console.log('=== Début de la requête contact ===')
  console.log('RESEND_API_KEY présente:', !!process.env.RESEND_API_KEY)
  
  try {
    const body = await request.json()
    const { name, email, project, message } = body
    console.log('Données reçues:', { name, email, project, message: message?.substring(0, 50) })

    // Validation basique
    if (!name || !email || !message) {
      console.log('Validation échouée: champs manquants')
      return NextResponse.json(
        { error: 'Nom, email et message sont requis' },
        { status: 400 }
      )
    }

    // 1. Sauvegarder dans Supabase
    console.log('Tentative sauvegarde Supabase...')
    const { error: dbError } = await supabase
      .from('contacts')
      .insert([{ name, email, project, message }])

    if (dbError) {
      console.error('Erreur Supabase:', dbError)
      // On continue quand même pour envoyer l'email
    } else {
      console.log('Sauvegarde Supabase OK')
    }

    // 2. Envoyer l'email avec Resend
    console.log('Tentative envoi email Resend...')
    
    const projectLabels: Record<string, string> = {
      'essentielle': 'Présence Essentielle (300€)',
      'association': 'Pack Communauté (550€)',
      'createur': 'Pack Créateur (750€)',
      'autre': 'Autre / Sur mesure',
    }

    const { data, error: emailError } = await resend.emails.send({
      from: 'Webopoli <thomas@webopoli.com>',
      to: ['thomas@webopoli.com'],
      reply_to: email,
      subject: `💬 Nouveau message de ${name} - Webopoli`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="color-scheme" content="light">
          <meta name="supported-color-schemes" content="light">
          <style>
            :root { color-scheme: light; }
            @media (prefers-color-scheme: dark) {
              .email-wrapper { background-color: #ffffff !important; }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #ffffff;">
          <div class="email-wrapper" style="background-color: #ffffff; padding: 20px;">
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
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
              
              <p style="color: #9A8567; font-size: 12px; text-align: center; margin-top: 24px; background-color: #ffffff;">
                Message envoyé depuis le formulaire de contact webopoli.com
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (emailError) {
      console.error('Erreur Resend:', emailError)
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email', details: emailError.message },
        { status: 500 }
      )
    }

    console.log('Email envoyé avec succès, ID:', data?.id)
    return NextResponse.json({ success: true, messageId: data?.id })

  } catch (error) {
    console.error('Erreur générale:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue', details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
  }
}

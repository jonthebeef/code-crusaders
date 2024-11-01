import { NextResponse } from 'next/server'
import mailchimp from '@mailchimp/mailchimp_marketing'

const apiKey = process.env.MAILCHIMP_API_KEY
const server = process.env.MAILCHIMP_SERVER_PREFIX
const listId = process.env.MAILCHIMP_LIST_ID

console.log('Environment variables:')
console.log('MAILCHIMP_API_KEY:', apiKey ? 'Set' : 'Not set')
console.log('MAILCHIMP_SERVER_PREFIX:', server)
console.log('MAILCHIMP_LIST_ID:', listId)

if (!apiKey || !server || !listId) {
  console.error('Missing required environment variables')
  throw new Error('Missing required environment variables')
}

mailchimp.setConfig({
  apiKey: apiKey,
  server: server,
})

export async function POST(request: Request) {
  console.log('Received POST request')
  
  let email: string
  let marketingConsent: boolean
  let termsConsent: boolean

  try {
    const body = await request.json()
    email = body.email
    marketingConsent = body.marketingConsent
    termsConsent = body.termsConsent
    console.log('Parsed data:', { email, marketingConsent, termsConsent })
  } catch (error) {
    console.error('Error parsing request body:', error)
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!email || typeof marketingConsent !== 'boolean' || typeof termsConsent !== 'boolean') {
    console.error('Invalid form data')
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  if (typeof listId !== 'string') {
    console.error('Mailchimp list ID is not a string')
    return NextResponse.json({ error: 'Mailchimp list ID is not configured correctly' }, { status: 500 })
  }

  try {
    console.log('Attempting to add member to list:', listId)
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        MMERGE1: marketingConsent ? 'YES' : 'NO',
        MMERGE2: termsConsent ? 'YES' : 'NO',
      },
    })
    console.log('Mailchimp API response:', JSON.stringify(response, null, 2))

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Mailchimp API Error:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
  }
}
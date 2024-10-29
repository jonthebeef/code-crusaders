import { NextResponse } from 'next/server'
import mailchimp from '@mailchimp/mailchimp_marketing'

const apiKey = process.env.MAILCHIMP_API_KEY
const server = process.env.MAILCHIMP_SERVER_PREFIX
const listId = process.env.MAILCHIMP_LIST_ID

if (!apiKey || !server || !listId) {
  console.error('Missing required environment variables')
  throw new Error('Missing required environment variables')
}

mailchimp.setConfig({
  apiKey: apiKey,
  server: server,
})

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    console.log('Attempting to add member to list:', listId)
    const response = await mailchimp.lists.addListMember(listId as string, {
      email_address: email,
      status: 'subscribed',
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
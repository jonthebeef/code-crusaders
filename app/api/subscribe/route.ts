import { NextResponse } from 'next/server'
import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
})

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const listId = process.env.MAILCHIMP_LIST_ID

  if (!listId) {
    return NextResponse.json({ error: 'Mailchimp list ID is not configured' }, { status: 500 })
  }

  try {
    await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
  }
}
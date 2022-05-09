// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiHandler } from 'next'

const handler: NextApiHandler = async (req,res)=> {
  if(req.method !== "POST") {
    res.setHeader("Allow","POST").status(405).json({})
  }

  const MAILER_GROUP_ID = process.env.NEXT_MAILER_GROUP_ID
  const API_MAILER_KEY = process.env.NEXT_API_MAILER_KEY!

 const email = req.body.email
 if(typeof email !== "string") {
     res.status(400).json({})
 }

 if(!MAILER_GROUP_ID || !API_MAILER_KEY) {
   return res.status(400).json({error: "you don't have set  ENV variables"})
 }
 const options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'X-MailerLite-ApiDocs': 'true',
    'Content-Type': 'application/json',
    'X-MailerLite-ApiKey':  API_MAILER_KEY
  },
  body: JSON.stringify({
    email
  })
};
  const response = await fetch(`https://api.mailerlite.com/api/v2/${MAILER_GROUP_ID}/id/subscribers`,options)
  const data = response.json()

  if(!response.ok) {
     res.status(500).json({
       error: "Error on Server"
     })
  }

  return res.status(201).json({status: "OK Man"})

}

const GROUP_ID = 12


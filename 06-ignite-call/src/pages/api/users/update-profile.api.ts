import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'

const updateProfileBodySchema = z.object({
    bio: z.string()
})



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    res.status(405).end()
  }
  const session = await getServerSession(req, res, buildNextAuthOptions(req, res))

  if (!session) {
    return res.status(401).end()
  }

  const { bio } = updateProfileBodySchema.parse(req.body)
  
  await prisma.user.update({
  
    where: {
      id: session.user.id
    },
    data: {
      bio
    },
  })


  return res.status(201).json(session)
}

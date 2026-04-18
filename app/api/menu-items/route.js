import { NextResponse } from 'next/server'

import { prisma } from '../../../lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const menuItems = await prisma.menuItem.findMany({
      where: category ? { category } : undefined,
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    })

    return NextResponse.json({ data: menuItems })
  } catch {
    return NextResponse.json({ error: 'Failed to load menu items.' }, { status: 500 })
  }
}
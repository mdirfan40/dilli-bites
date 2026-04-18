import { NextResponse } from 'next/server'

import { prisma } from '../../../../lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(_request, context) {
  try {
    const { id } = await context.params
    const menuItemId = Number(id)

    if (!Number.isInteger(menuItemId) || menuItemId <= 0) {
      return NextResponse.json({ error: 'Invalid menu item id.' }, { status: 400 })
    }

    const menuItem = await prisma.menuItem.findUnique({
      where: { id: menuItemId },
    })

    if (!menuItem) {
      return NextResponse.json({ error: 'Menu item not found.' }, { status: 404 })
    }

    return NextResponse.json({ data: menuItem })
  } catch {
    return NextResponse.json({ error: 'Failed to load menu item.' }, { status: 500 })
  }
}
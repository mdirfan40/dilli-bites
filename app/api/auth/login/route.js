import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getVerificationStatus(user) {
  if (user.userType === 'DELIVERY_AGENT') {
    return user.deliveryAgent?.verificationStatus ?? null
  }
  if (user.userType === 'RESTAURANT_OWNER') {
    return user.restaurantOwner?.verificationStatus ?? null
  }
  return null
}

export async function POST(request) {
  try {
    const body = await request.json()
    const email = body.email?.trim().toLowerCase()
    const password = body.password

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        deliveryAgent: {
          select: {
            phone: true,
            vehicleType: true,
            isAvailable: true,
            verificationStatus: true,
          },
        },
        restaurantOwner: {
          select: {
            restaurantName: true,
            phone: true,
            address: true,
            verificationStatus: true,
          },
        },
        admin: {
          select: {
            id: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const passwordMatches = await bcrypt.compare(password, user.password)
    if (!passwordMatches) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    if (!user.isActive) {
      return NextResponse.json({ error: 'This account is inactive. Contact support.' }, { status: 403 })
    }

    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        isActive: user.isActive,
        verificationStatus: getVerificationStatus(user),
        deliveryAgent: user.deliveryAgent,
        restaurantOwner: user.restaurantOwner,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
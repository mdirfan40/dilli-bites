import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[6-9]\d{9}$/

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, password, phone, restaurantName, address } = body

    // required fields
    const missing = []
    if (!name?.trim()) missing.push('name')
    if (!email?.trim()) missing.push('email')
    if (!password) missing.push('password')
    if (!restaurantName?.trim()) missing.push('restaurantName')
    if (missing.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missing.join(', ')}` }, { status: 400 })
    }

    // format validation
    if (!EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }
    if (password.length < 8 || password.length > 128) {
      return NextResponse.json({ error: 'Password must be 8–128 characters' }, { status: 400 })
    }
    if (phone && !PHONE_RE.test(phone.trim())) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
    }
    if (name.trim().length > 100 || restaurantName.trim().length > 150) {
      return NextResponse.json({ error: 'Input exceeds maximum length' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } })
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        userType: 'RESTAURANT_OWNER',
        restaurantOwner: {
          create: {
            restaurantName: restaurantName.trim(),
            phone: phone?.trim() || null,
            address: address?.trim() || null,
            verificationStatus: 'PENDING',
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        userType: true,
        isActive: true,
        createdAt: true,
        restaurantOwner: {
          select: {
            restaurantName: true,
            phone: true,
            address: true,
            verificationStatus: true,
          },
        },
      },
    })

    return NextResponse.json({ message: 'Restaurant owner registered successfully', user }, { status: 201 })
  } catch (error) {
    console.error('Restaurant register error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

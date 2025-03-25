import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Récupérer le token dans les cookies
        const cookieStore = cookies();
        const token = (await cookieStore).get('jwt')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        // Vérifier et décoder le token
        const decoded = jwt.verify(token, 'SECRET_KEY') as { userId: string };

        // Récupérer l'utilisateur depuis la base de données
        const user = await prisma.user.findUnique({
            where: { userId: decoded.userId },
            select: { userId: true, userName: true, email: true },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}
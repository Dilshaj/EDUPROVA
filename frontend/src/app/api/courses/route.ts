import { NextResponse } from 'next/server';

export async function GET() {
    // This is a mock API response to prevent the SyntaxError during development
    // until the real courses API is implemented in the backend.
    return NextResponse.json({
        success: true,
        courses: [
            {
                _id: '1',
                title: 'The Complete Python Pro Bootcamp for 2025',
                createdBy: { firstName: 'Angela', lastName: 'Yu' },
                rating: 4.8,
                numReviews: 401532,
                price: 399,
                thumbnail: '/courses/person.png',
                level: 'Beginner',
                description: 'Master Python by building 100 projects in 100 days.',
                createdAt: new Date().toISOString()
            },
            {
                _id: '2',
                title: 'React - The Complete Guide 2025',
                createdBy: { firstName: 'Maximilian', lastName: 'Schwarzmüller' },
                rating: 4.7,
                numReviews: 996100,
                price: 499,
                thumbnail: '/courses/webDevelopment.png',
                level: 'Intermediate',
                description: 'Dive deep into React and learn Next.js.',
                createdAt: new Date().toISOString()
            },
            {
                _id: '3',
                title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science',
                createdBy: { firstName: 'Kirill', lastName: 'Eremenko' },
                rating: 4.5,
                numReviews: 152352,
                price: 599,
                thumbnail: '/courses/ai-new.png',
                level: 'Intermediate',
                description: 'Learn to create Machine Learning Algorithms.',
                createdAt: new Date().toISOString()
            },
            {
                _id: '4',
                title: 'The Web Developer Bootcamp 2025',
                createdBy: { firstName: 'Colt', lastName: 'Steele' },
                rating: 4.7,
                numReviews: 948448,
                price: 399,
                thumbnail: '/courses/webDevelopment.png',
                level: 'Beginner',
                description: 'The only course you need to learn web development.',
                createdAt: new Date().toISOString()
            }
        ]
    });
}

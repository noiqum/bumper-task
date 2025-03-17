
export async function GET(request: Request) {

    return new Response('Hello, Next.js!')
}

export async function POST(request: Request) {
    console.log(request.body);
    return new Response(
        JSON.stringify({
            message: 'Registration successful',
        }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
}
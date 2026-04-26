export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    
    const response = await fetch(`${apiUrl}/api/interview/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
        level,
        techstack,
        type,
        amount,
        user_id: userid,
      }),
    });

    const result = await response.json();

    if (result.success) {
      return Response.json({ success: true }, { status: 200 });
    } else {
      return Response.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}

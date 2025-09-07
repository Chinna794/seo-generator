"use server";

const url = `https://api.github.com/repos/mrluisfer/seo-generator`;
export async function GET() {
  const response = await fetch(url);
  const data = await response.json();

  return Response.json({ ...data });
}

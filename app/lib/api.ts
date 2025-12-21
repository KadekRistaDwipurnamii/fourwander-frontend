const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function getData(endpoint: string) {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      console.error("API ERROR:", res.status, res.statusText, url);
      return { data: null };
    }

    return await res.json();
  } catch (error) {
    console.error("FETCH ERROR:", error);
    return { data: null };
  }
}

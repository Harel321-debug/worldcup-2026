export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { endpoint } = req.query;
  if (!endpoint) return res.status(400).json({ error: "חסר endpoint" });

  try {
    const response = await fetch(`https://v3.football.api-sports.io${endpoint}`, {
      headers: { "x-apisports-key": process.env.FOOTBALL_API_KEY }
    });

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      res.status(200).json(data);
    } catch {
      res.status(500).json({
        error: "API לא החזיר JSON",
        status: response.status,
        body: text.substring(0, 300)
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

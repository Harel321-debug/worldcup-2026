export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { endpoint } = req.query;
  if (!endpoint) return res.status(400).json({ error: "חסר endpoint" });

  try {
    const response = await fetch(`https://api.sofascore.com/api/v1${endpoint}`, {
      headers: { 
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
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

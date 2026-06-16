export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  
  const { endpoint } = req.query;
  if (!endpoint) return res.status(400).json({ error: "חסר endpoint" });

  const response = await fetch(`https://v3.football.api-sports.io${endpoint}`, {
    headers: { "x-apisports-key": process.env.FOOTBALL_API_KEY }
  });
  
  const data = await response.json();
  res.status(200).json(data);
}

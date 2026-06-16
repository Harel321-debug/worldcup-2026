export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { endpoint } = req.query;
  if (!endpoint) return res.status(400).json({ error: "חסר endpoint" });

  const response = await fetch(`https://api.football-data.org${endpoint}`, {
    headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_KEY }
  });

  const data = await response.json();
  res.status(200).json(data);
}

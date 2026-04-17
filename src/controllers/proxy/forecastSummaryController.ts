import { Request, Response } from 'express';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getForecastSummary = async (request: Request, response: Response) => {
  const city = request.query.city;
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const result = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(String(city))}&appid=${apiKey}&units=metric`
    );

    const data: any = await result.json();

    if (!result.ok) {
      response.status(result.status).json({ error: data.message || 'Forecast API error' });
      return;
    }

    // --------------------------
    // TRANSFORMATION LOGIC
    // --------------------------

    const groups: Record<string, any[]> = {};

    for (const entry of data.list) {
      const date = entry.dt_txt.split(' ')[0]; // "2024-04-18"
      if (!groups[date]) groups[date] = [];
      groups[date].push(entry);
    }

    const summary = Object.entries(groups).map(([date, entries]) => {
      const temps = entries.map(e => e.main.temp);
      const conditions = entries.map(e => e.weather[0].main);

      return {
        date,
        high: Math.max(...temps),
        low: Math.min(...temps),
        condition: mostFrequent(conditions),
      };
    });

    response.json({ city: data.city.name, summary });

  } catch (_error) {
    response.status(502).json({ error: 'Failed to reach forecast service' });
  }
};

// Helper: find most common condition
function mostFrequent(arr: string[]) {
  const counts: Record<string, number> = {};
  for (const item of arr) counts[item] = (counts[item] || 0) + 1;
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

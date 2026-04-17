import { Request, Response } from 'express';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getAirPollution = async (request: Request, response: Response) => {
  const { lat, lon } = request.query;
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const result = await fetch(
      `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );

    const data: any = await result.json();
   

    if (!result.ok) {
      response.status(result.status).json({ error: data.message });
      return;
    }

    response.json(data); // pass-through
  } catch (_error) {
    response.status(502).json({ error: 'Failed to reach air pollution service' });
  }
};

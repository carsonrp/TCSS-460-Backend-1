import { Request, Response } from "express";

// GET /v1/math/:num
export function getDouble(req: Request, res: Response) {
  const num = Number(req.params.num);
  res.json({ input: num, double: num * 2 });
}

// GET /v1/math/add?a=1&b=2
export function addNumbers(req: Request, res: Response) {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: "Missing or invalid query parameters" });
  }

  return res.json({
    a,
    b,
    sum: a + b,
  });
}


// POST /v1/math/multiply
export function multiply(req: Request, res: Response) {
  const { x, y } = req.body;
  res.status(201).json({ x, y, product: x * y });
}

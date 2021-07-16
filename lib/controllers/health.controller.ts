import { Request, response, Response } from "express";
import { health } from "../models/health.model";

// TODO: Improve health check mechanism

export class HealthController {
  public check(req: Request, res: Response) {
    const healthStatus: health = "ok";
    res.json({
      health: healthStatus,
    });
  }
}

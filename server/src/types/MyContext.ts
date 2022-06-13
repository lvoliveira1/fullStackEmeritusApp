import { Session } from 'express-session';
import { Request, Response } from "express";

export interface SessionData {
    userId: string;
}

export interface MyContext {
    req: Request & { session: Session & Partial<SessionData> };
    res: Response;
}

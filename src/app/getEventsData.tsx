import path from "path";
import fs from "fs";
import { CountdownEvent } from "./typings";

export const getEventsData = (): CountdownEvent[] => {
  const filePath = path.join(process.cwd(), "src/data/events.json");
  const jsonData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonData);
};

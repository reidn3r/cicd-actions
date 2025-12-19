import { app } from "./app";

const PORT: number = 3001;

app.listen({ 
  port: PORT,
  host: "0.0.0.0",
}).then(() => {
  console.log(`live at: http://localhost:${PORT}`);
});
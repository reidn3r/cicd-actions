import { app } from "./app";

const PORT: number = 3001;

app.listen({ port: PORT }).then(() => {
  console.log(`live at: http://localhost:${PORT}`);
});
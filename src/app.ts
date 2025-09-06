import express from 'express';
import swaggerUI from "swagger-ui-express";
import specs from "./swagger/swagger";
import chickenRoutes from "./routes/chickens.routes"
import lotesRoutes from "./routes/lotes.routes";

const app = express();
const PORT=3000;
//for use jsonwebtoken
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/chickens", chickenRoutes);
app.use("/lotes", lotesRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

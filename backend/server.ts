
import { Request, Response } from "express";
import AppConstants from "./src/utils/AppConstants";
import createApp from "./index";
const app = createApp()
app.get("/", (_req: Request, res: Response) => {
    res.send("App is running");
})

app.listen(AppConstants.PORT, () => {
    console.log(`App is running on http://localhost:${AppConstants.PORT}`);
});

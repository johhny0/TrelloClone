import { Request, Response, Router } from "express";
import { AuthController } from "./app/controllers/AuthController";
import { CardController } from "./app/controllers/CardController";
import { ListController } from "./app/controllers/ListController";

import { UserController } from "./app/controllers/UserController";
import { authMiddleware } from "./app/middleware/authMiddleware";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ status: "Connected" });
});

// Auth
router.post("/auth", AuthController.authenticate);

// User
router.get("/users", authMiddleware, UserController.index);
router.get("/users/:id", authMiddleware, UserController.show);
router.post("/users", UserController.store);
// router.put("/users/:id", authMiddleware, UserController.index);
// router.delete("/users/:id", authMiddleware, UserController.index);

// Lists
router.get("/lists", authMiddleware, ListController.index);
router.get("/lists/:id", authMiddleware, ListController.show);
router.post("/lists", authMiddleware, ListController.store);
router.put("/lists/:id", authMiddleware, ListController.update);
router.delete("/lists/:id", authMiddleware, ListController.remove);


// Cards
router.get("/cards", authMiddleware, CardController.index);
router.get("/cards/:id", authMiddleware, CardController.show);
router.post("/cards", authMiddleware, CardController.store);
router.put("/cards/:id", authMiddleware, CardController.update);
router.delete("/cards/:id", authMiddleware, CardController.remove);

export default router;

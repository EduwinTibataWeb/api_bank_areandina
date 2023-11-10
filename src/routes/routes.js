//routes
const { Router } = require('express');
import { methods as controllers } from '../controllers/controllers';
const router = Router()

router.get("/users/", controllers.getUsers);
router.get("/users/:id", controllers.getUser);
router.post("/users/", controllers.setUser);
router.delete("/users/:id", controllers.deleteUser);
router.put("/users/:id", controllers.updateUser);

router.get("/transacciones/", controllers.getTransacciones);
router.get("/transacciones/:id", controllers.getTransaccion);
router.post("/transacciones/", controllers.getTransaccion);

module.exports = router;
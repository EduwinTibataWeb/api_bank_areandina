//routes
const { Router } = require('express');
import { methods as controllers } from '../controllers/controllers';
const router = Router()

router.get("/:table/", controllers.getTablaDatos);
router.get("/:table/:id", controllers.getTablaDato);
router.post("/:table/", controllers.postTablaId);
router.delete("/:table/:id", controllers.deleteTablaDato);
router.put("/:table/:id", controllers.updateTablaId);
router.get("/usuarios/:id/:pass", controllers.getUserLogin);

router.get("/transacciones/usuarios/:id", controllers.getTransaccionesUser);
router.delete("/transacciones/delete/user/:id", controllers.deleteTransaccionesUser);


module.exports = router;
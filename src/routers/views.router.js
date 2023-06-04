import { Router } from "express";

// Inicializo router
const viewsRouter = Router ();

// Defino la ruta para el home
viewsRouter.get ("/", (req,res)=>{
    // renderizo la vista index
    res.render ("index");
});

// exporto la ruta
export default viewsRouter;
import { create, getAll, getId, update, remove } from '../controller/book.controller.js';

const bookRoutes = (app) => {
    app.post("/book", create);
    app.get("/book", getAll);
    app.get("/book/:id", getId);
    app.put("/book/:id", update);
    app.delete("/book/:id", remove);
};

export default bookRoutes;
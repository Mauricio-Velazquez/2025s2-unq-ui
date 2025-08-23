import getInstagramSystem from "@unq-ui/instagram-model-js";
import express from "express";
import {transformUser} from "./dtos.js";
import { userSchema } from './Schemas.js';
import TokenController from './TokenController.js';
import {middlewareConsole, consoleReq} from "./middlewareConsole.js";

const system = getInstagramSystem();

const app = express();
const port = 7070;

const tokenController = new TokenController(system.users);

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(middlewareConsole);

app.get("/", (req, res) => {
    res.send("Hello world!")
})

app.get("/user/:userId", (req, res) => {
    try {
        const userId = req.params.userId;
        const user = system.getUser(userId);
        const posts = system.getPostByUserId(userId);

        const userDto = transformUser({ ...user, posts });

        res.json(userDto);
    } catch (error) {
        res.status(404).send(`Usuario ${req.params.userId} no encontrado`);
    }
})

/*app.get("/user/:userId" ,tokenController.checkRole("admin"), (req, res) => {
    consoleReq(req);
    const user = system.users.find(user => user.id === req.params.userId)
    if (user) {
        res.json(transformUser(user));
    } else {
        res.status(404).json({ error: "Usuario ${req.params.userId} no encontrado" })
    }
})*/

app.post("/register", (req, res) => {
    consoleReq(req);
    try {
        const { name, email, password, image } = userSchema.validateSync(req.body);
        const newUser = system.register({ name, email, password, image });
        res.json(transformUser(newUser));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

console.log(system.users)


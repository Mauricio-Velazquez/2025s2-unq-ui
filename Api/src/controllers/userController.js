import {transformUserPosts, transformUserTimeline} from "../utils/Dtos.js";

class UserController{
    constructor(system) {
        this.system = system;
    }

    getUserTimeline = (req, res) => {
        const loggedUserId = req.user.id;
        const user = this.system.getUser(loggedUserId);
        const timeline = this.system.timeline(loggedUserId);

        const userDto = transformUserTimeline({ ...user, timeline });
        res.status(200).json(userDto);
    };

    getUser = (req, res) => {
        try {
            const userId = req.params.userId;
            const user = this.system.getUser(userId);
            const posts = this.system.getPostByUserId(userId);

            const userDto = transformUserPosts({ ...user, posts });

            res.json(userDto);
        } catch (error) {
            res.status(404).send(`Usuario ${req.params.userId} no encontrado`);
        }
    };

    putUserFollow = (req, res) => {
        const { userId } = req.params;
        const loggedUserId = req.user.id;

        if (userId === loggedUserId) {
            return res.status(400).json({ error: "Can't add yourself as a friend" });
        }

        let targetUser;
        let loggedUser;

        try {
            targetUser = this.system.getUser(userId);
            loggedUser = this.system.getUser(loggedUserId);
        } catch (error) {
            return res.status(404).json({ error: "Not found" });
        }

        const alreadyFollower = targetUser.followers.some(f => f.id === loggedUser.id);

        if (alreadyFollower) {
            targetUser.followers = targetUser.followers.filter(f => f.id !== loggedUser.id);
        } else {
            targetUser.followers.push({
                id: loggedUser.id,
                name: loggedUser.name,
                image: loggedUser.image
            });
        }

        const posts = this.system.getPostByUserId(userId);

        res.json(transformUserPosts({ ...targetUser, posts }));
    };

}

export default UserController;
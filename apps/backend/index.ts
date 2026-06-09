import express from "express";
import axios from "axios";
import cors from 'cors';
import { preInterviewBody } from "./types";
const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/pre-interview", async (req, res) => {
    const { success, data } = preInterviewBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Incorrect Inputs",
        });
    }

    try {
        const githubUrl = data.github.endsWith("/")
            ? data.github.slice(0, -1)
            : data.github;

        const githubUserName = githubUrl.split("/").pop();

        if (!githubUserName) {
            return res.status(400).json({
                message: "Invalid GitHub URL",
            });
        }

        const userRepo = await axios.get(
            `https://api.github.com/users/${githubUserName}/repos`
        );

        const repos = userRepo.data.map((repo: any) => ({
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            starCount: repo.stargazers_count,
        }));

        return res.json({
            userRepo: repos
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch GitHub repositories",
        });
    }
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
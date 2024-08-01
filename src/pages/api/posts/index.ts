import { NextApiRequest, NextApiResponse } from "next";
import { createPost, getPosts, setAuthorizationAPI } from "../../../utils/apis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let statusCode = 500;
  let data;
  const token = req.cookies['token']
  setAuthorizationAPI(token || "")
  if (req.method === "POST") {
    const { title, content, author } = req.body;
    await createPost(title, content, author)
      .then((response) => {
        statusCode = response.status;
        data = response.data;
      })
      .catch((error) => {
        statusCode = error.response.status;
        data = { error: (error as Error).message };
      });
    res.status(statusCode).json(data);
  } else if (req.method === "GET") {
    await getPosts()
      .then((response) => {
        statusCode = response.status;
        data = response.data;
      })
      .catch((error) => {
        statusCode = error.response.status;
        data = { error: (error as Error).message };
      });
    res.status(statusCode).json(data);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

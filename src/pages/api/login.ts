import { NextApiRequest, NextApiResponse } from "next";
import { login } from "../../utils/apis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    let statusCode = 500;
    let data;
    await login(username, password)
      .then((response) => {
        console.log(response)
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

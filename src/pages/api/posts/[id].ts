import { NextApiRequest, NextApiResponse } from 'next';
import { updatePost, deletePost, setAuthorizationAPI } from '../../../utils/apis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const token = req.cookies['token']
  setAuthorizationAPI(token || "")
  if (req.method === 'PUT') {
    const { title, content, author } = req.body;
    try {
      const response = await updatePost(id as string, title, content, author);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(res.statusCode).json({ error: (error as Error).message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const response = await deletePost(id as string);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(res.statusCode).json({ error: (error as Error).message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

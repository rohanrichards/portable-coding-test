import express, { Request, Response, Router } from 'express';
const router: Router = express.Router();
const guardianUrl = 'https://content.guardianapis.com/search?'
const buildGuardianQuery = (term: string): URL => {
  const url = new URL(guardianUrl)
  url.searchParams.append('api-key', process.env.GUARDIAN_API_KEY ?? '')
  url.searchParams.append('q', term)
  return url;
}

router.get('/', async (req: Request, res: Response) => {
  const searchTerm = req.query.term as string;
  const guardianResult = await fetch(buildGuardianQuery(searchTerm))
  const data = await guardianResult.json() as any
  console.log(data)
  res.json({results: data.response.results});
});

export default router; 
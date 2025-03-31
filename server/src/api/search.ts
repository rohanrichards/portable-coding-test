import express, { Request, Response, Router } from 'express';
const router: Router = express.Router();

const providers: any = {
  "dummy": {
    baseUrl: 'http://localhost/dummy',
    queryBuilder: (term: string, baseUrl: string): URL => {
      const url = new URL(baseUrl)
      url.searchParams.append('api-key', process.env.GUARDIAN_API_KEY ?? '')
      url.searchParams.append('q', term)
      return url;
    },
    getResults: async (url: URL) => {
      // const providerResult = await fetch(url)
      // const data = await providerResult.json() as any;
      return {provider: "dummy", results: [{webTitle: "Dummy Article"}]};
    }
  },
  "guardian": {
    baseUrl: 'https://content.guardianapis.com/search?',
    queryBuilder: (term: string, baseUrl: string): URL => {
      const url = new URL(baseUrl)
      url.searchParams.append('api-key', process.env.GUARDIAN_API_KEY ?? '')
      url.searchParams.append('q', term)
      return url;
    },
    getResults: async (url: URL) => {
      const providerResult = await fetch(url)
      const data = await providerResult.json() as any;
      console.log(data)
      return {provider: "guardian", results: data.response.results};
    }
  }
}

router.get('/', async (req: Request, res: Response) => {
  const searchTerm = req.query.term as string;
  // const searchProviders = (req.query.providers as string).split(',');
  const searchProviders = ['guardian', 'dummy'];
  const queries = searchProviders.map(provider => {
    const query = providers[provider].queryBuilder(searchTerm, providers[provider].baseUrl);
    const promise = () => providers[provider].getResults(query)
    return {query, promise};
  })
  const allProviderData = await Promise.all(queries.map(q => q.promise()))
  console.log(allProviderData)
  res.json({results: allProviderData});
});

export default router; 
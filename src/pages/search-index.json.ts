import type { APIRoute } from 'astro';
import { loadCatalog } from '../lib/catalog';
import { buildSearchDocs } from '../lib/search-docs';

export const GET: APIRoute = async () => {
  const catalog = await loadCatalog();
  return new Response(JSON.stringify(buildSearchDocs(catalog)), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

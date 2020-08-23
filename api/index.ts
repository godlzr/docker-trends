import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';

const router = new Router();

router
  .get('/repositories/:repo/:image', async context => {
    const { repo, image } = context.params;
    console.log(`[INFO] GET Request ${repo} ${image}`);
    const imageRes = await fetch(`https://hub.docker.com/v2/repositories/${repo}/${image}/`);
    const imageJson = await imageRes.json();

    const tagRes = await fetch(
      `https://hub.docker.com/v2/repositories/${repo}/${image}/tags/?page_size=25&page=1`,
    );
    const tagJson = await tagRes.json();

    context.response.body = { ...imageJson, ...tagJson };
  })
  .get('/', async context => {
    try {
      console.log(`[INFO] GET request${Deno.cwd()}`);
      await context.send({
        root: `${Deno.cwd()}/dist`,
        index: 'index.html',
      });
    } catch (e) {
      console.log(`[ERROR] ${e}`);
    }
  })
  .get('/:filename', async context => {
    try {
      const { filename } = context.params;
      await context.send({
        root: `${Deno.cwd()}/dist`,
        index: filename,
      });
    } catch (e) {
      console.log(`[ERROR] ${e}`);
    }
  });

const app = new Application();
app.use(
  oakCors({
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200,
  }),
);
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`[INFO] Server is running port 3000`);
await app.listen({ port: 3000 });

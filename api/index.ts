import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Docker Trends API";
  })
  .get(
    "/repositories/:repo/:image",
    async (context) => {
      const { repo, image } = context.params;
      const res = await fetch(
        `https://hub.docker.com/v2/repositories/${repo}/${image}/`,
      );
      const json = await res.json();
      context.response.body = json;
    },
  );

const app = new Application();
app.use(
  oakCors({
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200,
  }),
);
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 3000 });

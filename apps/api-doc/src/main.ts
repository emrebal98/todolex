import scalarApiReference from '@scalar/fastify-api-reference';
import editJson from 'edit-json-file';
import fastify from 'fastify';
import { isErrorResult, merge, MergeInput } from 'openapi-merge';
import fastifyEnv from '@fastify/env';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      OPEN_API_JSON_URLS: string[];
      PORT: number;
      BASE_PATH?: `/${string}`;
    };
  }
}

async function main() {
  const envSchema = {
    type: 'object',
    required: ['OPEN_API_JSON_URLS'],
    properties: {
      OPEN_API_JSON_URLS: { type: 'string', separator: ',' },
      PORT: { type: 'number', default: 5000 },
      BASE_PATH: { type: 'string', default: undefined },
    },
  };

  const server = fastify({
    logger:
      process?.env?.NODE_ENV === 'development'
        ? { transport: { target: 'pino-pretty' }, level: 'debug' }
        : true,
  });

  await server.register(fastifyEnv, {
    schema: envSchema,
    dotenv: true,
  });

  const basePath = server.config.BASE_PATH;

  server.register(scalarApiReference, {
    routePrefix: basePath ?? '/',
    configuration: {
      spec: {
        url: `${basePath}/public/openapi.json`,
      },
      theme: 'kepler',
      hideDownloadButton: true,
      darkMode: true,
      hideClientButton: true,
      servers: [{ url: 'http://localhost', description: 'Development' }],
      metaData: {
        title: 'Todolex API',
        description: 'API documentation for Todolex',
      },
    },
  });

  server.get(`${basePath}/public/openapi.json`, async function (request, reply) {
    const result = await getMergedOpenApiJson();
    reply.send(result ?? {});
  });

  const sendRequest = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      server.log.error(error, `Error fetching from ${url}`);
      return undefined;
    }
  };

  const getMergedOpenApiJson = async () => {
    const openApiJsonList: MergeInput = [];
    const openApiJsonUrls = server.config.OPEN_API_JSON_URLS;

    for (const url of openApiJsonUrls) {
      server.log.debug(`Getting OpenAPI JSON for ${url}`);
      const openApiJson = await sendRequest(url);
      if (openApiJson) {
        openApiJsonList.push({ oas: openApiJson });
      }
    }

    const mergeResult = merge(openApiJsonList);

    if (isErrorResult(mergeResult)) {
      server.log.error(mergeResult);
      return undefined;
    } else {
      let file = editJson('');
      for (const key of Object.keys(mergeResult.output)) {
        file.set(key, mergeResult.output[key]);
      }
      file.set('info.title', 'Todolex API');
      file.unset('info.description');
      const result = file.toObject();
      server.log.debug(result, 'Merge successful!');
      return result;
    }
  };

  server.listen({ port: server.config.PORT, host: '0.0.0.0' }, function (err) {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  });
}

main();

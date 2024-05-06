import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.generateLog(res, req);

    if (next) {
      next();
    }
  }

  generateLog = (res: Response, req: Request) => {
    const rawResponse = res.write;
    const rawResponseEnd = res.end;

    let chunkBuffers = [];

    res.write = (...chunks) => {
      const resArgs = [];
      for (let i = 0; i < chunks.length; i++) {
        if (chunks[i]) resArgs[i] = Buffer.from(chunks[i]);

        if (!chunks[i]) {
          res.once('drain', res.write);

          --i;
        }
      }

      if (Buffer.concat(resArgs)?.length) {
        chunkBuffers = [...chunkBuffers, ...resArgs];
      }

      return rawResponse.apply(res, resArgs);
    };

    res.end = (...chunks) => {
      const resArgs = [];
      for (let i = 0; i < chunks.length; i++) {
        if (chunks[i]) resArgs[i] = Buffer.from(chunks[i]);
      }

      if (Buffer.concat(resArgs)?.length) {
        chunkBuffers = [...chunkBuffers, ...resArgs];
      }

      const body = Buffer.concat(chunkBuffers).toString('utf8');
      const contentLength = res.get('content-length') || '';
      const { ip, method, originalUrl } = req;
      const userAgent = req.get('user-agent') || '';

      if (!originalUrl.includes('/v1/health')) {
        if (
          (res.statusCode >= 200 && res.statusCode <= 299) ||
          res.statusCode == 304
        ) {
          this.logger.info(
            `${method} ${originalUrl} ${res.statusCode} ${contentLength} - ${userAgent} ${ip}`,
          );
        } else {
          this.logger.error(
            `${method} ${originalUrl} ${res.statusCode} ${body} ${contentLength} - ${userAgent} ${ip}`,
          );
        }
      }

      const responseLog = {
        response: {
          statusCode: res.statusCode,
          body: body,
          headers: res.getHeaders(),
        },
      };

      rawResponseEnd.apply(res, resArgs);
      return responseLog as unknown as Response;
    };
  };
}

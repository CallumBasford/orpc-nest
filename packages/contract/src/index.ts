import { oc } from '@orpc/contract';
import { z } from 'zod';

export const contract = {
  hello: oc
    .route({
      method: 'GET',
      path: '/hello',
    })
    .input(
      z.object({
        name: z.string().optional(),
      }),
    )
    .output(
      z.object({
        message: z.string(),
      }),
    ),
  test: oc
    .route({
      method: 'POST',
      path: '/test',
    })
    .input(z.object({ name: z.string() }))
    .output(z.array(z.string())),
};

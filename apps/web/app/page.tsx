'use client';

import styles from './page.module.css';
import { orpc } from './client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const Gradient = ({
  conic,
  className,
  small,
}: Readonly<{
  small?: boolean;
  conic?: boolean;
  className?: string;
}>) => {
  return (
    <span
      className={[
        styles.gradient,
        conic ? styles.glowConic : undefined,
        small ? styles.gradientSmall : styles.gradientLarge,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
};

const RootPage = ({ params }: { params: { forTest?: boolean } }) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [testName, setTestName] = useState<string | undefined>(undefined);

  const { data } = useQuery(
    orpc.hello.queryOptions({
      input: {
        name,
      },
    }),
  );

  const mutation = useMutation(orpc.test.mutationOptions({}));

  return (
    <main className={styles.main}>
      <div>
        <h2>Query</h2>
        <p>{data?.message}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <h2>Mutation</h2>
        <input
          type="text"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
        />
        <button
          onClick={() => {
            if (testName) {
              mutation.mutate({ name: testName });
            }
          }}
        >
          Test
        </button>
        <p>{mutation.data?.join(', ')}</p>
      </div>
    </main>
  );
};

export default RootPage;

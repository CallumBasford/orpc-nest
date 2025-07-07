'use client';

import styles from './page.module.css';
import { orpc } from './client';
import { useQuery } from '@tanstack/react-query';
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

  const { data } = useQuery(
    orpc.hello.queryOptions({
      input: {
        name,
      },
    }),
  );

  return (
    <main className={styles.main}>
      <h1>{data?.message}</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </main>
  );
};

export default RootPage;

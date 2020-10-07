import type { ReactNode } from 'react';
import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';

interface PageProps {
  children?: ReactNode;
  title?: string;
  [key: string]: any;
}

// FIXME: fix props for typescript
const Page = forwardRef<HTMLDivElement, PageProps>(
  ({
    // eslint-disable-next-line react/prop-types
    children,
    // eslint-disable-next-line react/prop-types
    title = '',
    ...rest
  }, ref) => (
    <div
      ref={ref as any}
      {...rest}
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  ),
);

Page.displayName = 'Page';
export default Page;

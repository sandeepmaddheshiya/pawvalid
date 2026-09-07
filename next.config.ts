import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ISR revalidation for route pages (TRD §8)
  // On-demand revalidation can be triggered via webhook
};

export default withNextIntl(nextConfig);

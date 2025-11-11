/**
 * Next-intl navigation helpers
 *
 * Creates localized versions of Next.js navigation APIs that automatically
 * handle locale prefixes according to the routing configuration.
 */

import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

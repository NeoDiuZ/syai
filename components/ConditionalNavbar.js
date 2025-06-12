'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ConditionalNavbar() {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith('/admin');
    const isLinkInBioPage = pathname.startsWith('/linkinbio');

    if (isAdminPage || isLinkInBioPage) {
        return null;
    }

    return <Navbar />;
} 
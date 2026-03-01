'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const [isPending, startTransition] = useTransition();

    function onSelectChange(event) {
        const nextLocale = event.target.value;
        startTransition(() => {
            // Pour les routes dynamiques, passer les paramètres dans un objet
            if (params && Object.keys(params).length > 0) {
                router.replace(
                    { pathname, params },
                    { locale: nextLocale }
                );
            } else {
                router.replace(pathname, { locale: nextLocale });
            }
        });
    }

    return (
        <select
            defaultValue={locale}
            disabled={isPending}
            onChange={onSelectChange}
            className="px-3 py-2 text-sm font-medium bg-gray-50 border border-gray-200 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors disabled:opacity-50"
        >
            <option value="fr">🇫🇷 FR</option>
            <option value="en">🇬🇧 EN</option>
        </select>
    );
}

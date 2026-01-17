import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'fr'],

  // Used when no locale matches
  defaultLocale: 'fr',
  pathnames: {
    '/': '/',
    '/vehicles': {
      en: '/vehicles',
      fr: '/vehicules'
    },
    '/apartments': {
      en: '/apartments',
      fr: '/appartements'
    },
    '/gifts': {
      en: '/gifts',
      fr: '/cadeaux'
    },
    '/profile': {
      en: '/profile',
      fr: '/profil'
    },
    '/bookings': {
      en: '/bookings',
      fr: '/reservations'
    },
    '/bookings/[id]': {
      en: '/bookings/[id]',
      fr: '/reservations/[id]'
    },
    '/property-details/[id]': {
      en: '/properties/[id]',
      fr: '/proprietes/[id]'
    },
    '/vehicle-details/[id]': {
      en: '/vehicles/[id]',
      fr: '/vehicules/[id]'
    },
    '/apartment-details/[id]': {
      en: '/apartments/[id]',
      fr: '/appartements/[id]'
    },
    '/gift-details/[id]': {
      en: '/gifts/[id]',
      fr: '/cadeaux/[id]'
    },
    '/my-dashboard': {
      en: '/my-dashboard',
      fr: '/mon-tableau-de-bord'
    },
    '/my-profile': {
      en: '/my-profile',
      fr: '/mon-profil'
    },
    '/admin/vehicles': {
      en: '/admin/vehicles',
      fr: '/admin/vehicules'
    },
    '/admin/vehicles/[id]': {
      en: '/admin/vehicles/[id]',
      fr: '/admin/vehicules/[id]'
    },
    '/admin/apartments': {
      en: '/admin/apartments',
      fr: '/admin/appartements'
    },
    '/admin/apartments/[id]': {
      en: '/admin/apartments/[id]',
      fr: '/admin/appartements/[id]'
    },
    '/admin/reservations': {
      en: '/admin/reservations',
      fr: '/admin/reservations'
    },
    '/admin/reservations/[id]': {
      en: '/admin/reservations/[id]',
      fr: '/admin/reservations/[id]'
    },
    '/admin/clients': {
      en: '/admin/clients',
      fr: '/admin/clients'
    },
    '/admin/clients/[id]': {
      en: '/admin/clients/[id]',
      fr: '/admin/clients/[id]'
    },
    '/admin/newsletter': {
      en: '/admin/newsletter',
      fr: '/admin/newsletter'
    },
    '/admin/incidents': {
      en: '/admin/incidents',
      fr: '/admin/incidents'
    }
  }
});

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);

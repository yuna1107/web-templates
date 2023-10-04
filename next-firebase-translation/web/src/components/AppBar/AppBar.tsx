"use client"
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/contexts/AuthContext'
import Image from 'next/image';
import { languages } from '@/app/i18n/settings'
import { Trans } from 'react-i18next/TransWithoutContext'
import Link from "next/link"
import { useTranslation } from '@/app/i18n/client'
const navigation = [
  { name: 'sample', href: '/sample' },
  { name: 'sample', href: '/sample' },
  // { name: 'Company', href: '#' },
]

export default function AppBar({  lng }: { lng: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {t} = useTranslation(lng,"",{})
  const { user } = useAuth()

  return (
    <header className="bg-black">
      <nav className="flex items-center justify-between p-6 lg:py-3 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          {/* <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              className="w-auto h-5 ml-5"
              src={}
              alt=""
              style={{ transform: "scale(2,2)" }}
            />
          </a> */}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white">
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-3">
          {/* translation */}
          <div className="flex pr-5">
            <Trans i18nKey="languageSwitcher" t={t}>
              {languages
                .filter((l) => lng !== l)
                .map((l, index) => (
                  <span key={l} className={`text-blue-300 ${index === 0 ? "mr-2" : ""}`}>
                    <Link href={`/${l}`}>
                      {l.toUpperCase()}
                    </Link>
                  </span>
                ))}
            </Trans>
          </div>
          {/*  */}
          <a href={(user && !user.isAnonymous )? `/users/${user.uid}` : "/auth"} className="text-sm font-semibold leading-6 text-white">
            {`${(user && !user.isAnonymous ) ? "My page" : "Log in"}`} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            {/* <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                className="h-8 w-auto"
                src={logoBlack}
                alt=""
              />
            </a> */}
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:text-white hover:bg-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href={(user && !user.isAnonymous ) ? `/users/${user.uid}` : "/auth"}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {`${(user && !user.isAnonymous ) ? "My page" : "Log in"}`}
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

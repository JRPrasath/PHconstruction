import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/images/logo.png';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (location.pathname === path) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      navigate(path);
    }
  };

  return (
    <Disclosure as="nav" className="fixed w-full z-50 bg-cream-white shadow-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link 
                    to="/" 
                    className="flex flex-shrink-0 items-center hover:opacity-80 transition-opacity bg-gradient-to-r from-primary-red to-cream-white rounded-md p-1"
                    onClick={() => handleNavigation('/')}
                  >
                    <img 
                      className="block h-12 w-auto"
                      src={logo}
                      alt="PaperHouse Construction Logo"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.href)}
                      className={classNames(
                        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-all duration-300 hover:bg-gray-100 hover:translate-y-[-2px] rounded-md',
                        location.pathname === item.href
                          ? 'border-primary-red text-dark-gray'
                          : 'border-transparent text-dark-gray hover:border-gray-300 hover:text-gray-700'
                      )}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-dark-gray hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-red transition-all duration-300">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="button"
                  onClick={() => handleNavigation(item.href)}
                  className={classNames(
                    'block w-full text-left border-l-4 py-2 pl-3 pr-4 text-base font-medium transition-all duration-300 hover:bg-gray-100 hover:translate-x-1 rounded-md',
                    location.pathname === item.href
                      ? 'border-primary-red bg-primary-red/10 text-primary-red'
                      : 'border-transparent text-dark-gray hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
} 
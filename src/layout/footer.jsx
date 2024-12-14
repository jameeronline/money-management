import clsx from "clsx";
import {
  BadgeDollarSign,
  Facebook,
  FacebookIcon,
  Twitter,
  TwitterIcon,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";

// const subFooterLinks = [
//   {
//     id: crypto.randomUUID(),
//     name: "Cookies",
//     slug: "cookies",
//   },
// ];

const productLinks = [
  {
    id: crypto.randomUUID(),
    name: "Features",
    slug: "features",
  },
  {
    id: crypto.randomUUID(),
    name: "Customers",
    slug: "customers",
  },
  {
    id: crypto.randomUUID(),
    name: "Pricing",
    slug: "pricing",
  },
  {
    id: crypto.randomUUID(),
    name: "Terms",
    slug: "terms-and-conditions",
  },
  {
    id: crypto.randomUUID(),
    name: "Privacy",
    slug: "privacy-policy",
  },
];

const aboutUsLinks = [
  {
    id: crypto.randomUUID(),
    name: "Careers",
    slug: "careers",
  },
  {
    id: crypto.randomUUID(),
    name: "Leadership",
    slug: "leadership",
  },
  {
    id: crypto.randomUUID(),
    name: "News",
    slug: "news",
  },
  {
    id: crypto.randomUUID(),
    name: "Events",
    slug: "events",
  },
];

const getInTouchLinks = [
  {
    id: crypto.randomUUID(),
    name: "Contact",
    slug: "contact",
  },
  {
    id: crypto.randomUUID(),
    name: "Support",
    slug: "support",
  },
  {
    id: crypto.randomUUID(),
    name: "Partners",
    slug: "partners",
  },
  {
    id: crypto.randomUUID(),
    name: "Join Search",
    slug: "join-search",
  },
];

const socialLinks = [
  {
    id: crypto.randomUUID(),
    name: "facebook",
    icon: <Facebook />,
    link: "http://facebook.com/moneycontrolai",
  },
  {
    id: crypto.randomUUID(),
    name: "twitter",
    icon: <Twitter />,
    link: "http://x.com/moneycontrolai",
  },
  {
    id: crypto.randomUUID(),
    name: "youtube",
    icon: <Youtube />,
    link: "http://youtube.com/moneycontrolai",
  },
];

const LinkGroups = ({ links, vertical = true }) => {
  return links.map((link) => (
    <li className={clsx(vertical ? "mb-2" : "", "leading-6")} key={link.id}>
      <Link
        to={link.slug}
        className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
      >
        {link.name}
      </Link>
    </li>
  ));
};

const Footer = () => {
  return (
    <>
      <footer className="text-white">
        <div className="pt-16 pb-12 text-sm border-t border-slate-200 bg-teal-800">
          <div className="w-full xl:container px-6 mx-auto">
            <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
              <div
                className="col-span-4 md:col-span-8 lg:col-span-6"
                aria-labelledby="footer-header"
              >
                <a
                  id="WindUI-5-logo"
                  aria-label="WindUI logo"
                  aria-current="page"
                  className="flex items-center gap-2 mb-6 text-xl font-bold leading-6 whitespace-nowrap text-white focus:outline-none"
                  href=""
                >
                  <BadgeDollarSign className="text-white" size={36} />
                  Money Control <span className="text-teal-500">AI</span>
                </a>
                <p className="hidden lg:block lg:max-w-sm">
                  Expertly made, responsive, accessible components in React and
                  HTML ready to be used on your website or app. Just copy and
                  paste them on your Tailwind CSS project.
                </p>
              </div>

              <nav
                className="col-span-2 md:col-span-4 lg:col-span-2"
                aria-labelledby="footer-product-5-logo"
              >
                <h3
                  className="mb-6 text-base font-medium text-teal-100"
                  id="footer-product-5-logo"
                >
                  Product
                </h3>
                <ul>
                  <LinkGroups links={productLinks} />
                </ul>
              </nav>

              <nav
                className="col-span-2 md:col-span-4 lg:col-span-2"
                aria-labelledby="footer-docs-5-logo"
              >
                <h3
                  className="mb-6 text-base font-medium text-teal-100"
                  id="footer-docs-5-logo"
                >
                  About
                </h3>
                <ul>
                  <LinkGroups links={aboutUsLinks} />
                </ul>
              </nav>

              <nav
                className="col-span-2 md:col-span-4 lg:col-span-2"
                aria-labelledby="footer-get-in-touch-5-logo"
              >
                <h3
                  className="mb-6 text-base font-medium text-teal-100"
                  id="footer-get-in-touch-5-logo"
                >
                  Get in touch
                </h3>
                <ul>
                  <LinkGroups links={getInTouchLinks} />
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="py-4 text-sm bg-teal-900 text-white">
          <div className="w-full xl:container px-6 mx-auto">
            <div className="grid items-center grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
              <div className="col-span-4 text-center lg:col-span-6 lg:text-start">
                Copyright 2024 Money Control AI
              </div>
              <nav
                className="col-span-4 lg:col-span-6"
                aria-labelledby="subfooter-links-3-sub"
              >
                <h3 className="sr-only" id="subfooter-links-3-sub">
                  Get in touch
                </h3>
                <ul className="flex flex-wrap items-center justify-center lg:justify-end gap-2 lg:gap-6">
                  {/* <LinkGroups links={subFooterLinks} vertical={false} /> */}
                  {socialLinks.map((item) => (
                    <li
                      key={item.id}
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      <a href={item.link} target="_blank">
                        {item.icon}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

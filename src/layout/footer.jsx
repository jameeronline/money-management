import { BadgeDollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="text-white">
        <div className="pt-16 pb-12 text-sm border-t border-slate-200 bg-teal-800">
          <div className="xl:container px-6 mx-auto">
            <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
              <div
                className="col-span-4 md:col-span-8 lg:col-span-4"
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
                <p className="hidden lg:block">
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
                  <li className="mb-2 leading-6">
                    <a
                      href=""
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      {" "}
                      Features{" "}
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href=""
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      {" "}
                      Customers{" "}
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href=""
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      {" "}
                      Why us?{" "}
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href=""
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      {" "}
                      Pricing{" "}
                    </a>
                  </li>
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
                  Docs & Help
                </h3>
                <ul>
                  <li className="mb-2 leading-6">
                    <a
                      href=""
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      {" "}
                      Documentation
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href=""
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      {" "}
                      Training{" "}
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href=""
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      {" "}
                      System status{" "}
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href=""
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      {" "}
                      FAQ's{" "}
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href=""
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      {" "}
                      Help Center{" "}
                    </a>
                  </li>
                </ul>
              </nav>
              <nav
                className="col-span-2 md:col-span-4 lg:col-span-2"
                aria-labelledby="footer-about-5-logo"
              >
                <h3
                  className="mb-6 text-base font-medium text-teal-100"
                  id="footer-about-5-logo"
                >
                  About us
                </h3>
                <ul>
                  <li className="mb-2 leading-6">
                    <a
                      href=""
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      {" "}
                      About us{" "}
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href=""
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      {" "}
                      Careers{" "}
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href=""
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      {" "}
                      Leadership{" "}
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href=""
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      {" "}
                      Blog
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href=""
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      {" "}
                      Events{" "}
                    </a>
                  </li>
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
                  <li className="mb-2 leading-6">
                    <a
                      href=""
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      {" "}
                      Contact{" "}
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href=""
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      {" "}
                      Support{" "}
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href=""
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      {" "}
                      Partners{" "}
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href=""
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      {" "}
                      Join research{" "}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="py-4 text-sm bg-teal-900 text-white">
          <div className="xl:container px-6 mx-auto">
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
                <ul className="flex flex-wrap items-center justify-center lg:justify-end gap-2 lg:gap-4">
                  <li className="leading-6">
                    <Link
                      to="static/terms"
                      state={{ entryId: "JxMBxxvylws47EZPPfrVU" }}
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      T&C{" "}
                    </Link>
                  </li>
                  <li className="leading-6">
                    <Link
                      to="static/privacy"
                      state={{ entryId: "JxMBxxvylws47EZPPfrVU" }}
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li className="leading-6">
                    <a
                      href=""
                      className="transition-colors duration-300 hover:text-teal-500 focus:text-teal-600"
                    >
                      {" "}
                      Cookies{" "}
                    </a>
                  </li>
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

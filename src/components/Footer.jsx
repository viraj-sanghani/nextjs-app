import Link from "next/link";
import NewsLetter from "@/components/NewsLetter";
import { footerInvalidPath } from "@/utils/data";
import { useFindVisibility } from "./CustomHook";

function Footer() {
  const showFooter = useFindVisibility(footerInvalidPath);

  return (
    showFooter && (
      <footer id="footer">
        <div className="footer-content">
          <div>
            <h2 className="contact-title">Contact Us</h2>
            <div className="footer-item">
              Toll Free :{" "}
              <Link
                target="_blank"
                href="tel:+917208305579"
                className="footer-link"
              >
                +91 7208305579
              </Link>
            </div>
            <div className="footer-item">
              Monday - Saturday (9:00AM to 11:00PM IST)
            </div>
            <div className="f-email-link">
              Email -{" "}
              <Link
                target="_blank"
                href="mail:feedback@housingmagic.com"
                className="footer-link"
              >
                feedback@housingmagic.com
              </Link>
            </div>
            <div className="footer-item">Connect with us</div>
          </div>
          <div>
            <h2 className="f-sec-title">Quick Links</h2>
            <div className="footer-item">
              <Link className="f-link-hover" href="/post-property">
                Post your Property
              </Link>
            </div>

            <div className="footer-item">
              <Link className="f-link-hover" target="_blank" href="/sitemap">
                Sitemap
              </Link>
            </div>
            <div className="footer-item">
              <Link className="f-link-hover" target="_blank" href="/support">
                Support
              </Link>
            </div>
            <div className="footer-item">
              <Link className="f-link-hover" target="_blank" href="/blog">
                Blog
              </Link>
            </div>
            <div className="footer-item">
              <Link className="f-link-hover" target="_blank" href="/chatbot">
                Chatbot
              </Link>
            </div>
          </div>
          <div>
            <h2 className="f-sec-title">Company</h2>
            <div className="footer-item">
              <Link className="f-link-hover" href="/info/about-us">
                About us
              </Link>
            </div>
            <div className="footer-item">
              <Link className="f-link-hover" href="/info/contact-us">
                Contact us
              </Link>
            </div>
            <div className="footer-item">
              <Link className="f-link-hover" href="/info/terms-and-conditions">
                Terms & Conditions
              </Link>
            </div>
            <div className="footer-item">
              <Link className="f-link-hover" href="/info/privacy-policy">
                Privacy Policy
              </Link>
            </div>
            <div className="footer-item">
              <Link className="f-link-hover" href="/info/feedback">
                Feedback
              </Link>
            </div>
            <div className="footer-item">
              <Link className="f-link-hover" href="/info/faq">
                FAQ
              </Link>
            </div>
          </div>
          <NewsLetter />
        </div>
      </footer>
    )
  );
}

export default Footer;

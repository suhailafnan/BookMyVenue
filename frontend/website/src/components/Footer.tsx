import styles from "./Footer.module.css";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerCard}>

        <div className={styles.topSection}>

          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Cancellation Options</li>
              <li>Safety Information</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Hosting</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Become a Host</li>
              <li>Host Resources</li>
              <li>Community Forum</li>
              <li>Hosting Guidelines</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>About Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

        </div>

        <div className={styles.bottomSection}>

          <div className={styles.brand}>
            <div className={styles.logo}></div>

            <span>
              © 2026 BookMyVenue
            </span>
          </div>

          <div className={styles.socials}>
            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaXTwitter />
            </a>

            <a href="#">
              <FaLinkedinIn />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
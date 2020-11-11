import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./index.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <a
          href="https://www.facebook.com/meeramampilly"
          className="facebook footer"
        >
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://twitter.com/?lang=en" className="twitter footer">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a
          href="https://www.instagram.com/abrahammeera/"
          className="instagram footer"
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
      </div>
    </footer>
  );
}

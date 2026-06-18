import Link from "next/link";
import Logo from "./Logo";
import LiveClock from "./LiveClock";
import SocialLinks from "./SocialLinks";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-forest-800 bg-forest-950 text-forest-200">
      <div className="container-x grid gap-12 py-20 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo light mark="#f7f9f5" size={52} />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-forest-300">
            A peaceful RV retreat in the Sandhills of North Carolina where
            southern hospitality meets modern convenience.
          </p>
          <div className="mt-8">
            <LiveClock />
          </div>
        </div>

        <div>
          <p className="eyebrow bracket-label">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link href="/#about" data-cursor="Go" className="hover:text-cream">About</Link></li>
            <li><Link href="/#offerings" data-cursor="Go" className="hover:text-cream">Amenities</Link></li>
            <li><Link href="/#gallery" data-cursor="Go" className="hover:text-cream">Gallery</Link></li>
            <li><Link href="/#reviews" data-cursor="Go" className="hover:text-cream">Reviews</Link></li>
            <li><Link href="/#contact" data-cursor="Go" className="hover:text-cream">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow bracket-label">Visit</p>
          <ul className="mt-5 space-y-3 text-sm text-forest-300">
            <li className="text-forest-100">{site.address}</li>
            <li><a href={site.phoneHref} data-cursor="Call" className="hover:text-cream">{site.phone}</a></li>
            {/* TODO: replace with the real email address */}
            <li>Email: [ add email here ]</li>
          </ul>
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Book"
            className="btn-pill mt-7"
          >
            Book Your Stay
          </a>
        </div>

        <div>
          <p className="eyebrow bracket-label">Socials</p>
          <SocialLinks className="mt-5" />
        </div>
      </div>

      <div className="border-t border-forest-800">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-forest-400 md:flex-row">
          <p>© {new Date().getFullYear()} DeerRidge RV Park. All rights reserved.</p>
          <p>Ellerbe, North Carolina</p>
        </div>
      </div>
    </footer>
  );
}

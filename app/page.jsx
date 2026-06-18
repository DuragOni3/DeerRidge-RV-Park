import Link from "next/link";
import MenuOverlay from "@/components/MenuOverlay";
import Footer from "@/components/Footer";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import HeroReveal from "@/components/HeroReveal";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import Counter from "@/components/Counter";
import Faq from "@/components/Faq";
import ParallaxGallery from "@/components/ParallaxGallery";
import ReviewsMarquee from "@/components/ReviewsMarquee";
import { site } from "@/lib/site";

const offerings = [
  { n: "01", title: "Free Park-Wide Wi-Fi", href: "/amenities", desc: "Stay connected throughout the park with complimentary wireless internet." },
  { n: "02", title: "On-Site Laundry", href: "/amenities", desc: "Washers and dryers on-site to keep your road trip moving (additional cost)." },
  { n: "03", title: "Mini-Golf", href: "/amenities", desc: "A little friendly competition for the whole family, right on the grounds." },
  { n: "04", title: "Wildlife Viewing Area", href: "/amenities", desc: "A serene spot to slow down and take in the natural beauty of the Sandhills." },
  { n: "05", title: "Easy Interstate Access", href: "https://www.google.com/maps/search/?api=1&query=DeerRidge+RV+Park,+125+Cargo+Rd,+Ellerbe,+NC+28338", desc: "Just off Exit 25 on US Interstate 74 — an effortless stop or home base." },
  { n: "06", title: "Events", href: "/events", desc: "Gatherings and happenings at the park — see what's coming up." },
];

const activities = [
  { n: "01", title: "Rockingham Speedway", desc: "Historic motorsports just a short drive away." },
  { n: "02", title: "Pinehurst Golf", desc: "World-renowned golf courses in the heart of the Sandhills." },
  { n: "03", title: "The Berry Patch", desc: "Local fruit, vegetables, and homemade ice cream down the road." },
  { n: "04", title: "World's Largest Strawberry", desc: "A beloved roadside landmark and local favorite." },
];

const reviews = [
  { quote: "Everything in the park was very well taken care of. The owner couldn't have been more accommodating. Very pleasant and easy going. It was quiet, but convenient to the interstate.", name: "Sharon A.", date: "May 2026", stars: 5 },
  { quote: "No frills but friendly operators and clean. The Berry Patch is just down the road and has local fruit, vegetables and homemade ice cream. Stayed again on the way back home.", name: "S.K.", date: "May 2026", stars: 4 },
  { quote: "A convenient, quiet stop right off the interstate — exactly what we needed on a long haul. We'd happily stay again.", name: "Verified Camper", date: "2026", stars: 5 },
];

const faqs = [
  { q: "What time is check-in and check-out?", a: `Check-in is after ${site.checkIn} and check-out is before ${site.checkOut}. If you're arriving late, just let us know ahead of time.` },
  { q: "How do I make a reservation?", a: "Reservations are handled online through our Campspot booking page — it's quick and easy. Use any of the Book or Reserve buttons on this site to get started." },
  { q: "Is there Wi-Fi and cell service?", a: "Yes. We offer free Wi-Fi throughout the park, and guests consistently rate both the Wi-Fi and cellular coverage highly." },
  { q: "What's nearby?", a: "We're ideally located just off Exit 25 on I-74 — close to Rockingham Speedway, the golf courses of Pinehurst, The Berry Patch, and plenty of historic sites and local dining." },
];

function Stars({ count }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24"
          fill={i <= count ? "#7fae86" : "none"} stroke="#7fae86" strokeWidth="1.5">
          <path d="M12 2l3 6.5 7 .9-5 4.8 1.2 7L12 18l-6.4 3.2 1.2-7-5-4.8 7-.9z" />
        </svg>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-forest-950">
      <MenuOverlay />

      {/* ===== HERO (mouse-reveal spotlight) ===== */}
      <HeroReveal image="/photos/hero.png">
        {/* top meta row */}
        <div className="container-x absolute inset-x-0 top-24 hidden items-center justify-between text-xs uppercase tracking-[0.2em] text-forest-200 md:flex">
          <span className="bracket-label">Est. on US-74, Exit 25</span>
          <span>Ellerbe, NC</span>
        </div>

        <div className="container-x relative pb-16 pt-40">
          <Reveal>
            <p className="eyebrow bracket-label">Welcome to DeerRidge RV Park</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 display text-[3.4rem] text-cream sm:text-7xl md:text-[8.5rem]">
              Your Retreat in<br />the Sandhills
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="max-w-md text-base leading-relaxed text-forest-100">
                Southern hospitality meets modern convenience — quiet sites,
                free Wi-Fi, and easy interstate access, just minutes from
                Pinehurst and Rockingham Speedway.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" data-cursor="Book" className="btn-pill">
                  Reserve Your Spot
                </a>
                <Link href="/#offerings" data-cursor="Explore" className="btn-ghost">
                  Explore the Park
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-12 text-xs uppercase tracking-[0.2em] text-forest-300">
              Move your mouse to explore →
            </p>
          </Reveal>
        </div>
      </HeroReveal>

      {/* ===== MARQUEE ===== */}
      <section className="border-y border-forest-800 py-7">
        <Marquee items={["Free Wi-Fi", "Mini-Golf", "On-Site Laundry", "Wildlife Viewing", "Pull-Through Sites", "Pet-Friendly", "Quiet & Clean", "Southern Hospitality"]} />
      </section>

      {/* ===== INTRO STATEMENT ===== */}
      <section id="about" className="scroll-mt-24 py-28 md:py-40">
        <div className="container-x grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col">
            <Reveal>
              <p className="eyebrow bracket-label">Our Story</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 flex-1">
              <PhotoPlaceholder label="Park photo" className="h-full min-h-[240px]" />
            </Reveal>
          </div>
          <div>
            <Reveal>
              <h2 className="display text-3xl text-cream sm:text-4xl md:text-6xl">
                A Peaceful Place Where the Open Road Feels Like Home
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 grid gap-8 text-forest-200 md:grid-cols-2">
                <p className="leading-relaxed">
                  DeerRidge RV Park in Ellerbe, NC offers a peaceful retreat
                  where southern hospitality blends seamlessly with modern
                  convenience. Ideally located just off Exit 25 on US Interstate
                  74, we're a perfect base for exploring the Sandhills region.
                </p>
                <p className="leading-relaxed">
                  Enjoy the serene on-site Wildlife Viewing Area, stay connected
                  with free Wi-Fi, and grab fresh local produce from The Berry
                  Patch just down the road. Whether you're passing through or
                  settling in, we welcome you to experience the best of North
                  Carolina.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== OFFERINGS ===== */}
      <section id="offerings" className="scroll-mt-24 border-t border-forest-800 py-28 md:py-36">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal><p className="eyebrow bracket-label">What We Offer</p></Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 display text-4xl text-cream md:text-6xl">
                  Everything You Need<br />for an Easy Stay
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-forest-800 bg-forest-800 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((o, i) => {
              const inner = (
                <>
                  <span className="font-serif text-sm text-forest-400">/{o.n}</span>
                  <h3 className="mt-8 font-serif text-2xl font-light text-cream">{o.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-forest-300">{o.desc}</p>
                </>
              );
              const cardClass =
                "group block h-full p-9 transition-colors duration-300 hover:bg-forest-900";
              const isExternal = o.href && o.href.startsWith("http");
              return (
                <Reveal key={o.n} delay={(i % 3) * 0.08} className="bg-forest-950">
                  {isExternal ? (
                    <a href={o.href} target="_blank" rel="noopener noreferrer" data-cursor="Map" className={cardClass}>
                      {inner}
                    </a>
                  ) : o.href ? (
                    <Link href={o.href} data-cursor="Go" className={cardClass}>
                      {inner}
                    </Link>
                  ) : (
                    <div className={cardClass}>{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== GALLERY (pinned horizontal scroll) ===== */}
      <section id="gallery" className="scroll-mt-24 py-28 md:py-36">
        <div className="container-x flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal><p className="eyebrow bracket-label">Gallery</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 display text-4xl text-cream md:text-6xl">A Look Around</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <span className="text-xs uppercase tracking-[0.2em] text-forest-300">Scroll to explore ↓</span>
          </Reveal>
        </div>
        <div className="mt-16">
          <ParallaxGallery
            images={[
              { src: "/photos/grass.jpg", pos: "center" },
              { src: "/photos/signage.jpg", pos: "center" },
              { src: "/photos/sunset.jpg", pos: "center" },
              { src: "/photos/outdoors.jpg", pos: "center" },
              { src: "/photos/fire.jpg", pos: "center", h: 160 },
              { src: "/photos/ariel.jpg", pos: "center", h: 160 },
            ]}
          />
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-24">
        <div className="container-x grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {[
            { v: 4.5, dec: 1, suffix: "★", label: "Guest rating" },
            { v: 15, dec: 0, suffix: "+", label: "Verified reviews" },
            { v: 25, dec: 0, prefix: "Exit ", label: "Off Interstate 74" },
            { v: 100, dec: 0, suffix: "%", label: "Free park-wide Wi-Fi" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="font-serif text-5xl font-light text-cream md:text-6xl">
                <Counter value={s.v} decimals={s.dec} prefix={s.prefix || ""} suffix={s.suffix || ""} />
              </p>
              <p className="mt-3 text-sm text-forest-300">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section id="reviews" className="scroll-mt-24 border-t border-forest-800 py-28 md:py-36">
        <div className="container-x">
          <Reveal><p className="eyebrow bracket-label">Client Stories</p></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 display text-4xl text-cream md:text-6xl">Loved by Campers</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-forest-300">
              Rated {site.rating} out of 5 across {site.reviewCount} verified Campspot reviews.
            </p>
          </Reveal>

        </div>

        <div className="mt-14">
          <ReviewsMarquee items={reviews} />
        </div>

        <div className="container-x mt-12">
          <a
            href={site.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Reviews"
            className="btn-ghost"
          >
            Read All Reviews on Google
          </a>
        </div>
      </section>

      {/* ===== NEARBY ===== */}
      <section className="py-28 md:py-36">
        <div className="container-x grid gap-14 md:grid-cols-2">
          <div>
            <Reveal><p className="eyebrow bracket-label">Nearby</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 display text-4xl text-cream md:text-6xl">Explore the Sandhills</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md leading-relaxed text-forest-200">
                From racing and golf to historic sites and fresh local produce,
                there's plenty to discover just beyond your campsite.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <PhotoPlaceholder label="Nearby attractions photo" className="mt-10 aspect-[4/3]" />
            </Reveal>
          </div>

          <div className="flex flex-col justify-center divide-y divide-forest-800 border-y border-forest-800">
            {activities.map((a, i) => (
              <Reveal key={a.n} delay={i * 0.08}>
                <div className="flex items-start gap-6 py-7">
                  <span className="font-serif text-sm text-forest-400">/{a.n}</span>
                  <div>
                    <h3 className="font-serif text-2xl font-light text-cream">{a.title}</h3>
                    <p className="mt-2 text-sm text-forest-300">{a.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="border-t border-forest-800 py-28 md:py-36">
        <div className="container-x grid gap-14 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Reveal><p className="eyebrow bracket-label">Common Questions</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 display text-4xl text-cream md:text-5xl">Good to Know</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Faq items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ===== CONTACT / MAP ===== */}
      <section id="contact" className="scroll-mt-24 pb-28">
        <div className="container-x">
          <Reveal><p className="eyebrow bracket-label">Visit Us</p></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 display text-4xl text-cream md:text-6xl">Find Us in Ellerbe</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 overflow-hidden rounded-3xl border border-forest-800">
              <iframe
                title="DeerRidge RV Park location on Google Maps"
                src="https://www.google.com/maps?q=DeerRidge%20RV%20Park%2C%20125%20Cargo%20Rd%2C%20Ellerbe%2C%20NC%2028338&output=embed"
                width="100%"
                height="480"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-3 text-sm text-forest-200">
              <span className="text-cream">{site.address}</span>
              <a href={site.phoneHref} data-cursor="Call" className="hover:text-cream">{site.phone}</a>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Book"
                className="hover:text-cream"
              >
                Book on Campspot →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

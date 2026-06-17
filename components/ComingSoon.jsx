import Link from "next/link";
import MenuOverlay from "./MenuOverlay";
import Footer from "./Footer";

export default function ComingSoon({ title }) {
  return (
    <main className="bg-forest-950">
      <MenuOverlay />
      <section className="flex min-h-screen items-center">
        <div className="container-x py-32 text-center">
          <p className="eyebrow bracket-label justify-center">DeerRidge RV Park</p>
          <h1 className="mx-auto mt-6 max-w-3xl display text-5xl text-cream md:text-8xl">
            {title}
          </h1>
          <p className="mx-auto mt-8 max-w-md leading-relaxed text-forest-200">
            This page is still under construction — check back soon. In the
            meantime, explore our homepage or reserve your spot.
          </p>
          <div className="mt-10 flex justify-center">
            <Link href="/" data-cursor="Home" className="btn-pill">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

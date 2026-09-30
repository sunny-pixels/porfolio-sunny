import { profile } from "@/lib/content";
import Arrow from "@/components/ui/Arrow";

/** Colophon: build info, type credits, and a huge cropped wordmark. */
export default function Footer() {
  const year = 2026;
  return (
    <footer data-nav-theme="dark" className="relative overflow-hidden bg-ink text-chalk">
      <div className="gutter grid grid-cols-12 gap-x-4 gap-y-6 border-t border-chalk/10 pt-10">
        <p className="t-micro col-span-12 text-fog md:col-span-3">
          © {year} {profile.name}
        </p>
        <p className="t-micro col-span-12 text-fog md:col-span-5">
          Built with Next.js, GSAP &amp; Lenis · Set in Inter Tight, Inter &amp; JetBrains Mono
        </p>
        <p className="t-micro col-span-6 text-fog md:col-span-2">{profile.version}</p>
        <a href="#top" className="link-line t-micro col-span-6 justify-self-end md:col-span-2">
          Back to top <Arrow direction="up" />
        </a>
      </div>
      <p
        aria-hidden="true"
        className="t-mega mt-[6vh] select-none whitespace-nowrap text-center text-[27.5vw]! leading-[0.74]! text-chalk [margin-bottom:-0.015em]"
      >
        {profile.first}
        <span className="text-dusk">.</span>
      </p>
    </footer>
  );
}

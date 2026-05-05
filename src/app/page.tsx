"use client";

import { useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=spark+barbershop&ie=UTF-8#lrd=0x4cce05724d8196ff:0x7c77babcaa062849,1,,,,";
const BOOKSY_REVIEWS_URL = "https://booksy.com/en-ca/17486_spark-barbershop_barbershop_1025953_gatineau#reviews-section";

export default function Page() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollY } = useScroll();
  const [expandedImage, setExpandedImage] = useState<null | { src: string; alt: string }>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const shadowX = useTransform(mouseX, [-0.5, 0.5], [-14, 14]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

  const mouseShineY = useTransform(mouseY, [-0.18, 0.18], ["-135vh", "135vh"], { clamp: false });
  const mouseShineOpacity = useTransform(mouseY, [-0.5, 0.5], [0.25, 0.7]);

  const scrollShineY = useTransform(scrollY, [0, 650], ["-135vh", "135vh"]);
  const scrollShineOpacity = useTransform(scrollY, [0, 60, 360, 650, 900], [0, 0.85, 0.7, 0.25, 0]);

  const mobileScrollShineY = useTransform(scrollY, [0, 420], ["-70vh", "70vh"]);
  const mobileScrollShineOpacity = useTransform(scrollY, [0, 25, 240, 420, 620], [0, 1, 0.9, 0.35, 0]);

  const headerOpacity = useTransform(scrollY, [850, 1080], [0, 1]);
  const headerY = useTransform(scrollY, [850, 1080], [18, 0]);
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 260], [1, 0]);

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    mouseX.set(event.clientX / window.innerWidth - 0.5);
    mouseY.set(event.clientY / window.innerHeight - 0.5);
  }

  function resetMouse() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <main
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
      style={{
        position: "relative",
        minHeight: "180vh",
        overflowX: "hidden",
        background: "#f4f4f4",
      }}
    >
      <SiteStyles />

      <section id="home" className="hero-section">
        <motion.img
          src="/hero-shadow.png"
          alt=""
          draggable={false}
          className="hero-layer hero-layer-desktop"
          style={{ zIndex: 1, x: shadowX, y: shadowY }}
        />
        <motion.img
          src="/hero-shadow-mobile.png?v=2"
          alt=""
          draggable={false}
          className="hero-layer hero-layer-mobile"
          style={{ zIndex: 1, x: shadowX, y: shadowY }}
        />

        <img src="/hero-cutout.png" alt="" draggable={false} className="hero-layer hero-layer-desktop" style={{ zIndex: 2 }} />
        <img src="/hero-cutout-mobile.png?v=2" alt="" draggable={false} className="hero-layer hero-layer-mobile" style={{ zIndex: 2 }} />

        <img src="/basement-logo.png" alt="The Basement logo" draggable={false} className="hero-layer hero-layer-desktop" style={{ zIndex: 3 }} />
        <img src="/basement-logo-mobile.png?v=2" alt="The Basement logo" draggable={false} className="hero-layer hero-layer-mobile" style={{ zIndex: 3 }} />

        <motion.div className="logo-mask-layer mouse-shine-layer" style={{ zIndex: 4, opacity: mouseShineOpacity }}>
          <motion.div
            style={{
              y: mouseShineY,
              rotate: 15,
              position: "absolute",
              left: "-20%",
              right: "-20%",
              top: "50%",
              height: "18vh",
              translateY: "-50%",
              background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.9) 48%, rgba(255,255,255,0.35) 58%, transparent 100%)",
              filter: "blur(10px)",
              mixBlendMode: "screen",
            }}
          />
        </motion.div>

        <motion.div className="logo-mask-layer scroll-shine-layer scroll-shine-layer-desktop" style={{ zIndex: 5, opacity: scrollShineOpacity }}>
          <motion.div
            style={{
              y: scrollShineY,
              rotate: -12,
              position: "absolute",
              left: "-25%",
              right: "-25%",
              top: "50%",
              height: "34vh",
              translateY: "-50%",
              background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.95) 45%, rgba(255,255,255,0.25) 60%, transparent 100%)",
              filter: "blur(16px)",
              mixBlendMode: "screen",
            }}
          />
        </motion.div>

        <motion.div className="logo-mask-layer scroll-shine-layer-mobile" style={{ zIndex: 6, opacity: mobileScrollShineOpacity }}>
          <motion.div
            style={{
              y: mobileScrollShineY,
              rotate: 14,
              position: "absolute",
              left: "-35%",
              right: "-35%",
              top: "50%",
              height: "48vh",
              translateY: "-50%",
              background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,1) 44%, rgba(255,255,255,0.45) 58%, transparent 100%)",
              filter: "blur(18px)",
              mixBlendMode: "screen",
            }}
          />
        </motion.div>

        <motion.div
          style={{
            opacity: scrollIndicatorOpacity,
            position: "fixed",
            left: "50%",
            bottom: "28px",
            zIndex: 10,
            transform: "translateX(-50%)",
            pointerEvents: "none",
            color: "#777",
            fontSize: "14px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          Scroll to enter
        </motion.div>
      </section>

      <DesktopHeader opacity={headerOpacity} y={headerY} />
      <MobileMenuButton open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
      <MobileDrawer open={mobileMenuOpen} setOpen={setMobileMenuOpen} />

      <TestimonialsSection onExpandImage={setExpandedImage} />
      <ServicesSection onExpandImage={setExpandedImage} />
      <BookingSection />
      <AboutSection />
      <Footer />

      {expandedImage && (
        <ImageLightbox src={expandedImage.src} alt={expandedImage.alt} onClose={() => setExpandedImage(null)} />
      )}
    </main>
  );
}

function SiteStyles() {
  return (
    <style>{`
      html { scroll-behavior: smooth; }
      html, body {
        margin: 0;
        padding: 0;
        background: #f4f4f4;
        overflow-x: hidden;
      }
      * {
        box-sizing: border-box;
      }
      .hero-section {
        position: relative;
        width: 100vw;
        height: max(100vh, calc((100vw + 80px) * 0.6667 - 120px));
        overflow: hidden;
        background: #f4f4f4;
      }
      .hero-layer {
        position: absolute;
        top: -120px;
        left: -40px;
        width: calc(100vw + 80px);
        height: auto;
        user-select: none;
        pointer-events: none;
      }
      .hero-layer-mobile { display: none; }
      .logo-mask-layer {
        position: absolute;
        top: -120px;
        left: -40px;
        width: calc(100vw + 80px);
        height: calc((100vw + 80px) * 0.6667);
        pointer-events: none;
        -webkit-mask-image: url('/basement-logo.png');
        mask-image: url('/basement-logo.png');
        -webkit-mask-size: 100% auto;
        mask-size: 100% auto;
        -webkit-mask-position: top center;
        mask-position: top center;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
      }
      .mobile-menu-button, .mobile-drawer, .mobile-menu-backdrop { display: none; }
      .scroll-shine-layer-mobile { display: none; }

      @media (max-width: 900px) {
        .desktop-header { display: none !important; }
        .hero-section {
          height: max(100vh, calc((100vw + 72px) * 1.5 - 96px));
        }
        .hero-layer {
          top: -96px;
          left: -36px;
          width: calc(100vw + 72px);
        }
        .hero-layer-desktop { display: none !important; }
        .hero-layer-mobile { display: block; }
        .logo-mask-layer {
          top: -96px;
          left: -36px;
          width: calc(100vw + 72px);
          height: calc((100vw + 72px) * 1.5);
          -webkit-mask-image: url('/basement-logo-mobile.png?v=2');
          mask-image: url('/basement-logo-mobile.png?v=2');
        }
        .mouse-shine-layer {
          display: none !important;
        }
        .scroll-shine-layer-desktop {
          display: none !important;
        }
        .scroll-shine-layer-mobile {
          display: block !important;
        }
        .site-section {
          padding: 88px 18px !important;
        }
        .mobile-scroll-grid {
          display: flex !important;
          overflow-x: auto;
          overflow-y: hidden;
          gap: 16px !important;
          margin-left: -18px;
          margin-right: -18px;
          padding: 0 18px 18px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .mobile-scroll-grid::-webkit-scrollbar {
          display: none;
        }
        .mobile-scroll-grid > * {
          flex: 0 0 82vw;
          scroll-snap-align: start;
        }
        .section-grid-two {
          grid-template-columns: 1fr !important;
        }
        .mobile-menu-button {
          display: flex !important;
        }
        .mobile-drawer {
          display: block !important;
        }
        .mobile-menu-backdrop {
          display: block !important;
        }
      }
    `}</style>
  );
}

function SectionShell({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="site-section" style={sectionStyle}>
      <div style={sectionInnerStyle}>
        <p style={eyebrowStyle}>{eyebrow}</p>
        <h2 style={headlineStyle}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

function TestimonialsSection({ onExpandImage }: { onExpandImage: (image: { src: string; alt: string }) => void }) {
  return (
    <SectionShell id="testimonials" eyebrow="Testimonials" title="The cut should feel personal before it ever feels routine.">
      <div className="mobile-scroll-grid" style={cardGridStyle}>
        <TestimonialCard source="Booksy" sourceUrl={BOOKSY_REVIEWS_URL} name="Alvin" date="Mar 8, 2026" service="Haircut" quote="TJ remembered me from 2 and a half months ago. Did me a solid. Great guy, great cut." />
        <TestimonialCard source="Booksy" sourceUrl={BOOKSY_REVIEWS_URL} name="Guillaume" date="Mar 1, 2026" service="Haircut" quote="Bon service" />
        <TestimonialCard source="Booksy" sourceUrl={BOOKSY_REVIEWS_URL} name="Danielo" date="Feb 22, 2026" service="Haircut and Beard Trim" quote="TJ did a great job!" />
        <TestimonialCard source="Booksy" sourceUrl={BOOKSY_REVIEWS_URL} name="Matthew" date="Feb 15, 2026" service="Haircut" quote="TJ making some fire beats and cuts. 10/10" />
        <TestimonialCard source="Google" sourceUrl={GOOGLE_REVIEWS_URL} name="Michael Grenier" date="Feb 2026" quote="Ossein and TJ are very attentive to details, offer a stand out customer service, always making sure their clients are fully satisfied! They offer a wide variety of services and are very talented. Come and check them out for yourselves, highly recommended!" />
        <TestimonialCard source="Google" sourceUrl={GOOGLE_REVIEWS_URL} name="Vytautas Budnikas" date="Apr 2026" quote="Great place, barber TJ is an awesome guy. Really liked the cut they gave me. Definitely worth your while." />
        <TestimonialCard source="Google" sourceUrl={GOOGLE_REVIEWS_URL} name="Danielo JB" date="Mar 2026" quote="T.J nailed it!" />
        <PhotoTile src="/cut-1.jpg" alt="Haircut by The Basement" label="Basement cut" onExpand={onExpandImage} />
        <PhotoTile src="/cut-2.jpg" alt="Haircut by The Basement" label="Basement cut" onExpand={onExpandImage} />
      </div>

      <p style={noteStyle}>
        These testimonials come from TJ’s time at Spark Barbershop before The Basement opened. Click any review to see it at its original source.
      </p>
    </SectionShell>
  );
}

function ServicesSection({ onExpandImage }: { onExpandImage: (image: { src: string; alt: string }) => void }) {
  return (
    <SectionShell id="services" eyebrow="Services" title="Services designed around a complete appointment.">
      <div className="mobile-scroll-grid" style={cardGridStyle}>
        <ServiceCard title="Haircut" price="$40" description="A complete haircut appointment for any style. Beard cleanup is included when requested during the same appointment." />
        <ServiceCard title="Shampoo" price="$8" description="A hand shampoo and conditioning service to refresh the hair before or after the cut." />
        <ServiceCard title="Designs" price="$10" description="Additional design work added to a haircut. Very simple details may be included depending on the request." />
        <ServiceCard title="Beard" price="$25" description="A standalone beard service focused on shaping, cleanup, line work, and a clean finish." />
        <ServiceCard title="Outline" price="$20" description="A maintenance service for the hairline, neckline, and edges without a full haircut." />
      </div>

      <div style={servicesPhotoNoteGridStyle} className="section-grid-two">
        <div style={wideNoteBoxStyle}>
          <p style={{ margin: 0 }}>
            Tips are never expected. They are always appreciated, but routine tipping goes against the point of keeping the experience simple, fair, and easy to understand. The price is the price, and the goal is for you to leave happy without feeling extra pressure at the end.
          </p>
        </div>

        <PhotoTile src="/chair.jpg" alt="The Basement barber station" label="The station" onExpand={onExpandImage} />
      </div>
    </SectionShell>
  );
}

function BookingSection() {
  return (
    <SectionShell id="booking" eyebrow="Booking" title="Private appointments, arranged directly.">
      <div style={bookingGridStyle} className="section-grid-two">
        <div style={bookingPanelStyle}>
          <p style={bookingTextStyle}>
            The Basement is a private home studio, so appointments are handled through direct request rather than walk ins or instant online booking. You can call, text, email, or send a request through the form and we’ll work out the details from there.
          </p>

          <div style={contactGridStyle}>
            <ContactButton label="Call or text" value="613 600 7290" href="tel:6136007290" />
            <ContactButton label="Email" value="thebasement.stittsville@gmail.com" href="mailto:thebasement.stittsville@gmail.com?subject=Appointment%20Request%20-%20The%20Basement" />
          </div>

          <p style={{ margin: "34px 0 0", lineHeight: 1.65, color: "#686868", fontSize: "15px" }}>
            Prefer to talk it through? Call or text directly and we can sort everything out over the phone.
          </p>
        </div>

        <form
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          style={bookingFormStyle}
        >
          <input type="hidden" name="_subject" value="New appointment request for The Basement" />

          <p style={smallCapsStyle}>Request form</p>

          <label style={formLabelStyle}>
            Name
            <input name="name" type="text" required style={formInputStyle} />
          </label>

          <label style={formLabelStyle}>
            Email
            <input name="email" type="email" required style={formInputStyle} />
          </label>

          <label style={formLabelStyle}>
            Phone
            <input name="phone" type="tel" required style={formInputStyle} />
          </label>

          <label style={formLabelStyle}>
            Service
            <select name="service" required style={formInputStyle} defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              <option value="Haircut">Haircut</option>
              <option value="Haircut and beard">Haircut and beard</option>
              <option value="Beard">Beard</option>
              <option value="Outline">Outline</option>
              <option value="Shampoo">Shampoo</option>
              <option value="Designs">Designs</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </label>

          <label style={formLabelStyle}>
            Preferred availability
            <input name="availability" type="text" required placeholder="Example: Friday evening or Sunday afternoon" style={formInputStyle} />
          </label>

          <label style={formLabelStyle}>
            Notes
            <textarea
              name="message"
              rows={5}
              placeholder="Tell me what you’re looking for, what your hair is like right now, or whether you have reference photos."
              style={{ ...formInputStyle, resize: "vertical", minHeight: "132px" }}
            />
          </label>

          <button type="submit" style={formSubmitStyle}>
            Request appointment
          </button>

          <p style={{ margin: "18px 0 0", lineHeight: 1.55, color: "#777", fontSize: "13px" }}>
            Replace the Formspree URL in the code with your own endpoint before publishing.
          </p>
        </form>
      </div>
    </SectionShell>
  );
}

function AboutSection() {
  return (
    <SectionShell id="about" eyebrow="About" title="Finding the most optimal version of you.">
      <div style={aboutGridStyle} className="section-grid-two">
        <div style={aboutBodyStyle}>
          <p style={{ margin: "0 0 26px" }}>
            My mission as a barber is to help you find the version of yourself that feels the most natural, sharp, and confident. That means working together to figure out what style suits you best, what products help you maintain it, and what kind of routine makes sense for your hair, whether that is every two weeks, every month, or every two months.
          </p>
          <p style={{ margin: "0 0 26px" }}>
            Making people happy has been the point from the day I started. Bringing the shop home means time is no longer the same restriction it used to be. It becomes a convenience. If you need to be in and out in thirty minutes, we can do that. If you want to sit down, talk through your hair, and figure out a plan properly, we can do that too.
          </p>
          <p style={{ margin: 0 }}>
            The goal is to give you the cut you need without the stress, noise, or unnecessary fluff of a traditional barbershop. I am thorough about what needs to happen and why, because the best part of this craft is giving people what they did not know they needed and seeing them happy when they leave. If you already know exactly what you want, then we focus on giving you exactly that.
          </p>
        </div>

        <div style={aboutPanelStyle}>
          <p style={smallCapsStyle}>The difference</p>
          <p style={aboutPanelTextStyle}>
            The Basement is built around a relaxed environment, good music, entertainment, and a real personal connection. The customer is the focus, not the rush.
          </p>
          <p style={aboutPanelTextStyle}>
            I have never loved the direction of the industry where barbers make things more expensive, more complicated, and less personal in the name of maximizing profit. That can work as a business strategy, but it is not my mission.
          </p>
          <p style={{ ...aboutPanelTextStyle, marginBottom: 0 }}>
            I want to pay my bills, make a decent living, and keep loyal clients happy every time they sit in my chair. A haircut here is simple: one fair price for the service, clear communication, and the time needed to do it properly.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

function MobileMenuButton({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  return (
    <button
      type="button"
      className="mobile-menu-button"
      onClick={() => setOpen(!open)}
      aria-label="Open menu"
      aria-expanded={open}
      style={mobileMenuButtonStyle}
    >
      <span style={mobileMenuLineStyle} />
      <span style={mobileMenuLineStyle} />
      <span style={mobileMenuLineStyle} />
    </button>
  );
}

function MobileDrawer({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const links = [
    { label: "Home", href: "#home" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Services", href: "#services" },
    { label: "Booking", href: "#booking" },
    { label: "About", href: "#about" },
  ];

  return (
    <>
      {open && <button className="mobile-menu-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} style={mobileBackdropStyle} />}
      <aside
        className="mobile-drawer"
        style={{
          ...mobileDrawerStyle,
          transform: open ? "translateX(0)" : "translateX(-112%)",
        }}
      >
        <img src="/header-logo.png" alt="The Basement" draggable={false} style={{ height: "112px", width: "auto", marginBottom: "28px" }} />
        <nav style={{ display: "grid", gap: "10px" }}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} style={mobileDrawerLinkStyle}>
              {link.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}

function ContactButton({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      style={contactButtonStyle}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = "translateY(-4px)";
        event.currentTarget.style.boxShadow = "0 24px 70px rgba(0,0,0,0.075)";
        event.currentTarget.style.background = "rgba(255,255,255,0.72)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = "translateY(0)";
        event.currentTarget.style.boxShadow = "0 18px 50px rgba(0,0,0,0.045)";
        event.currentTarget.style.background = "rgba(244,244,244,0.72)";
      }}
    >
      <p style={smallCapsStyle}>{label}</p>
      <p style={{ ...contactValueStyle, fontSize: label === "Email" ? "clamp(17px, 1.5vw, 24px)" : "clamp(26px, 3vw, 42px)" }}>{value}</p>
    </a>
  );
}

function PhotoTile({ src, alt, label, onExpand }: { src: string; alt: string; label: string; onExpand: (image: { src: string; alt: string }) => void }) {
  return (
    <button
      type="button"
      onClick={() => onExpand({ src, alt })}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = "translateY(-4px)";
        event.currentTarget.style.boxShadow = "0 24px 70px rgba(0,0,0,0.075)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = "translateY(0)";
        event.currentTarget.style.boxShadow = "0 18px 50px rgba(0,0,0,0.045)";
      }}
      style={photoTileStyle}
      aria-label={`Expand ${label}`}
    >
      <img src={src} alt={alt} draggable={false} style={photoImageStyle} />
      <div style={photoTileLabelStyle}>{label}</div>
    </button>
  );
}

function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div onClick={onClose} style={lightboxStyle}>
      <img src={src} alt={alt} draggable={false} onClick={(event) => event.stopPropagation()} style={lightboxImageStyle} />
      <button type="button" onClick={onClose} aria-label="Close image preview" style={lightboxCloseStyle}>
        ×
      </button>
    </div>
  );
}

function ServiceCard({ title, price, description }: { title: string; price: string; description: string }) {
  return (
    <article style={serviceCardStyle}>
      <div>
        <p style={smallCapsStyle}>{title}</p>
        <p style={priceStyle}>{price}</p>
      </div>
      <p style={cardDescriptionStyle}>{description}</p>
    </article>
  );
}

function TestimonialCard({ source, sourceUrl, name, date, service, quote }: { source: string; sourceUrl: string; name: string; date: string; service?: string; quote: string }) {
  return (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={testimonialCardStyle}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = "translateY(-4px)";
        event.currentTarget.style.boxShadow = "0 24px 70px rgba(0,0,0,0.075)";
        event.currentTarget.style.background = "rgba(255,255,255,0.68)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = "translateY(0)";
        event.currentTarget.style.boxShadow = "0 18px 50px rgba(0,0,0,0.045)";
        event.currentTarget.style.background = "rgba(255,255,255,0.52)";
      }}
    >
      <div>
        <div style={reviewHeaderStyle}>
          <div>
            <p style={reviewNameStyle}>{name}</p>
            <p style={smallCapsStyle}>{source}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p aria-label="5 star review" style={starsStyle}>★★★★★</p>
            <p style={reviewDateStyle}>{date}</p>
          </div>
        </div>

        {service && <p style={{ margin: "0 0 18px", fontSize: "13px", color: "#555" }}><strong>Service:</strong> {service}</p>}
        <p style={quoteStyle}>“{quote}”</p>
      </div>

      <p style={viewOriginalStyle}>View original</p>
    </a>
  );
}

function Footer() {
  return (
    <footer style={footerStyle}>
      <a
        href="https://www.instagram.com/thebasement_barbershop_/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
        style={footerLinkStyle}
      >
        Instagram
      </a>

      <div style={footerRightStyle}>
        <span>© {new Date().getFullYear()} The Basement</span>
        <span>Private barbering in Stittsville</span>
      </div>
    </footer>
  );
}

function DesktopHeader({ opacity, y }: { opacity: any; y: any }) {
  const links = [
    { label: "Home", href: "#home" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Services", href: "#services" },
    { label: "Booking", href: "#booking" },
    { label: "About", href: "#about" },
  ];

  return (
    <motion.header className="desktop-header" style={{ ...desktopHeaderStyle, opacity, y }}>
      <a href="#home" aria-label="Go to home" style={{ display: "inline-flex", alignItems: "center" }}>
        <img src="/header-logo.png" alt="The Basement" draggable={false} style={headerLogoStyle} />
      </a>

      <nav aria-label="Main navigation" style={navStyle}>
        {links.map((link) => (
          <a key={link.href} href={link.href} style={navLinkStyle}>
            {link.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}

const sectionStyle = {
  minHeight: "100vh",
  background: "#f4f4f4",
  padding: "120px 24px",
  display: "flex",
  justifyContent: "center",
};

const sectionInnerStyle = {
  width: "100%",
  maxWidth: "1180px",
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  alignContent: "center",
};

const eyebrowStyle = { letterSpacing: "0.35em", textTransform: "uppercase" as const, fontSize: "12px", color: "#777", margin: "0 0 18px" };
const headlineStyle = { fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 0.95, letterSpacing: "-0.06em", margin: 0, color: "#181818", maxWidth: "960px" };

const cardGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gridAutoRows: "1fr",
  alignItems: "stretch",
  gap: "18px",
  marginTop: "48px",
};

const noteStyle = { maxWidth: "760px", margin: "34px 0 0", fontSize: "clamp(15px, 1.4vw, 18px)", lineHeight: 1.7, color: "#686868" };

const servicesPhotoNoteGridStyle = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.2fr) minmax(260px, 0.8fr)",
  gap: "18px",
  marginTop: "34px",
  alignItems: "stretch",
};

const wideNoteBoxStyle = {
  borderRadius: "28px",
  background: "rgba(255,255,255,0.42)",
  padding: "28px",
  boxShadow: "0 18px 50px rgba(0,0,0,0.035)",
  fontSize: "clamp(16px, 1.5vw, 20px)",
  lineHeight: 1.65,
  color: "#555",
};

const serviceCardStyle = {
  minHeight: "320px",
  height: "100%",
  borderRadius: "28px",
  background: "rgba(255,255,255,0.52)",
  boxShadow: "0 18px 50px rgba(0,0,0,0.045)",
  padding: "30px",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
};

const priceStyle = { margin: 0, fontSize: "clamp(42px, 5vw, 76px)", lineHeight: 0.92, letterSpacing: "-0.07em", color: "#181818", fontWeight: 800 };
const cardDescriptionStyle = { margin: "30px 0 0", fontSize: "17px", lineHeight: 1.65, color: "#555" };

const bookingGridStyle = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 0.95fr) minmax(320px, 0.75fr)",
  gap: "clamp(22px, 4vw, 54px)",
  alignItems: "stretch",
  marginTop: "46px",
};

const bookingPanelStyle = {
  borderRadius: "34px",
  background: "rgba(255,255,255,0.46)",
  boxShadow: "0 20px 70px rgba(0,0,0,0.045)",
  padding: "clamp(28px, 4vw, 52px)",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
  minHeight: "430px",
};

const bookingFormStyle = {
  borderRadius: "34px",
  background: "rgba(255,255,255,0.38)",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.55), 0 18px 60px rgba(0,0,0,0.035)",
  padding: "clamp(28px, 4vw, 42px)",
  minHeight: "430px",
  display: "grid",
  gap: "18px",
};

const formLabelStyle = {
  display: "grid",
  gap: "8px",
  color: "#555",
  fontSize: "13px",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
};

const formInputStyle = {
  width: "100%",
  border: "none",
  outline: "none",
  borderRadius: "18px",
  background: "rgba(244,244,244,0.82)",
  padding: "16px 17px",
  color: "#181818",
  fontSize: "16px",
  letterSpacing: "normal",
  boxSizing: "border-box" as const,
};

const formSubmitStyle = {
  border: "none",
  borderRadius: "999px",
  background: "#181818",
  color: "#f4f4f4",
  padding: "17px 22px",
  fontSize: "13px",
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const,
  cursor: "pointer",
  boxShadow: "0 18px 50px rgba(0,0,0,0.12)",
};

const bookingTextStyle = { margin: 0, fontSize: "clamp(18px, 1.7vw, 24px)", lineHeight: 1.65, color: "#555", maxWidth: "720px" };
const contactGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px", marginTop: "42px" };

const contactButtonStyle = {
  borderRadius: "24px",
  background: "rgba(244,244,244,0.72)",
  padding: "24px",
  color: "#181818",
  textDecoration: "none",
  minHeight: "150px",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
  boxShadow: "0 18px 50px rgba(0,0,0,0.045)",
  transform: "translateY(0)",
  transition: "transform 160ms ease, box-shadow 160ms ease, background 160ms ease",
};

const contactValueStyle = { margin: "20px 0 0", lineHeight: 1.05, letterSpacing: "-0.05em", fontWeight: 700, wordBreak: "break-word" as const };
const smallCapsStyle = { margin: 0, fontSize: "14px", letterSpacing: "0.26em", textTransform: "uppercase" as const, color: "#777" };
const listItemStyle = { display: "flex", alignItems: "center", gap: "12px", color: "#333", fontSize: "clamp(16px, 1.4vw, 19px)" };
const bulletStyle = { width: "7px", height: "7px", borderRadius: "999px", background: "#bbb", flex: "0 0 auto" };

const aboutGridStyle = { display: "grid", gridTemplateColumns: "minmax(0, 0.9fr) minmax(320px, 0.75fr)", gap: "clamp(26px, 4vw, 60px)", alignItems: "start", marginTop: "48px" };
const aboutBodyStyle = { fontSize: "clamp(18px, 1.65vw, 23px)", lineHeight: 1.7, color: "#555" };
const aboutPanelStyle = { borderRadius: "34px", background: "rgba(255,255,255,0.44)", boxShadow: "0 18px 60px rgba(0,0,0,0.04)", padding: "clamp(28px, 4vw, 44px)", color: "#555", lineHeight: 1.7 };
const aboutPanelTextStyle = { margin: "0 0 22px", fontSize: "clamp(17px, 1.45vw, 20px)" };

const photoTileStyle = {
  position: "relative" as const,
  minHeight: "320px",
  height: "100%",
  borderRadius: "28px",
  overflow: "hidden",
  background: "rgba(255,255,255,0.52)",
  boxShadow: "0 18px 50px rgba(0,0,0,0.045)",
  transform: "translateY(0)",
  transition: "transform 160ms ease, box-shadow 160ms ease",
  border: "none",
  padding: 0,
  cursor: "pointer",
};

const photoImageStyle = { width: "100%", height: "100%", objectFit: "cover" as const, display: "block", userSelect: "none" as const };
const photoTileLabelStyle = { position: "absolute" as const, left: "18px", bottom: "18px", padding: "10px 13px", borderRadius: "999px", background: "rgba(244,244,244,0.72)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", color: "#3f3f3f", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase" as const };

const testimonialCardStyle = {
  minHeight: "320px",
  height: "100%",
  borderRadius: "28px",
  background: "rgba(255,255,255,0.52)",
  boxShadow: "0 18px 50px rgba(0,0,0,0.045)",
  transform: "translateY(0)",
  transition: "transform 160ms ease, box-shadow 160ms ease, background 160ms ease",
  padding: "30px",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  textDecoration: "none",
  color: "inherit",
};

const reviewHeaderStyle = { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "18px", marginBottom: "24px" };
const reviewNameStyle = { margin: "0 0 6px", fontSize: "18px", fontWeight: 700, letterSpacing: "-0.03em", color: "#181818" };
const starsStyle = { margin: "0 0 8px", color: "#d6a13b", letterSpacing: "0.06em", fontSize: "16px" };
const reviewDateStyle = { margin: 0, fontSize: "12px", color: "#777", whiteSpace: "nowrap" as const };
const quoteStyle = { margin: 0, fontSize: "clamp(18px, 1.8vw, 26px)", lineHeight: 1.18, letterSpacing: "-0.04em", color: "#1d1d1d" };
const viewOriginalStyle = { margin: "34px 0 0", fontSize: "11px", letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "#777" };

const lightboxStyle = { position: "fixed" as const, inset: 0, zIndex: 100, background: "rgba(20,20,20,0.72)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", cursor: "zoom-out" };
const lightboxImageStyle = { maxWidth: "min(1100px, 94vw)", maxHeight: "88vh", objectFit: "contain" as const, borderRadius: "28px", boxShadow: "0 30px 100px rgba(0,0,0,0.38)", cursor: "default", userSelect: "none" as const };
const lightboxCloseStyle = { position: "fixed" as const, right: "24px", top: "24px", width: "44px", height: "44px", borderRadius: "999px", border: "none", background: "rgba(244,244,244,0.72)", color: "#181818", fontSize: "24px", lineHeight: 1, cursor: "pointer" };

const footerStyle = {
  minHeight: "92px",
  background: "rgba(232,232,232,0.72)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 36px",
  boxSizing: "border-box" as const,
  color: "#3f3f3f",
};

const footerLinkStyle = {
  color: "#3f3f3f",
  textDecoration: "none",
  fontSize: "14px",
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const,
  fontWeight: 500,
};

const footerRightStyle = {
  display: "flex",
  alignItems: "center",
  gap: "24px",
  color: "#686868",
  fontSize: "12px",
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
};

const desktopHeaderStyle = { position: "fixed" as const, top: 0, left: 0, right: 0, width: "100vw", zIndex: 20, height: "92px", background: "rgba(232,232,232,0.72)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", borderTop: "none", borderBottom: "none", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 36px", boxSizing: "border-box" as const };
const headerLogoStyle = { height: "134px", width: "auto", display: "block", userSelect: "none" as const };
const navStyle = { display: "flex", alignItems: "center", gap: "clamp(18px, 3vw, 42px)" };
const navLinkStyle = { color: "#3f3f3f", textDecoration: "none", fontSize: "14px", letterSpacing: "0.22em", textTransform: "uppercase" as const, fontWeight: 500, padding: "12px 14px", borderRadius: "999px", background: "transparent", boxShadow: "none", transition: "background 160ms ease, box-shadow 160ms ease" };

const mobileMenuButtonStyle = { position: "fixed" as const, top: "18px", left: "18px", zIndex: 50, width: "52px", height: "52px", borderRadius: "999px", border: "none", background: "rgba(232,232,232,0.72)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", alignItems: "center", justifyContent: "center", flexDirection: "column" as const, gap: "5px", padding: 0 };
const mobileMenuLineStyle = { width: "24px", height: "2px", borderRadius: "999px", background: "#3f3f3f", display: "block" };
const mobileBackdropStyle = { position: "fixed" as const, inset: 0, zIndex: 39, border: "none", background: "rgba(20,20,20,0.22)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", padding: 0 };
const mobileDrawerStyle = { position: "fixed" as const, top: 0, left: 0, bottom: 0, zIndex: 40, width: "min(82vw, 340px)", background: "rgba(232,232,232,0.78)", backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)", padding: "28px 22px", boxShadow: "20px 0 70px rgba(0,0,0,0.16)", transition: "transform 220ms ease", boxSizing: "border-box" as const };
const mobileDrawerLinkStyle = { display: "block", padding: "18px 16px", borderRadius: "22px", color: "#2f2f2f", textDecoration: "none", fontSize: "15px", letterSpacing: "0.22em", textTransform: "uppercase" as const, background: "rgba(244,244,244,0.44)" };

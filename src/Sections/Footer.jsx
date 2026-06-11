const LINKS = {
  COMPANY: ["Jobs", "Press", "About us"],
  CONTACT: ["Contact Form", "Newsletter"],
  FAQ: [
    "All Support Topics",
    "How can I return my order?",
    "What to do with a faulty product?",
    "How long does delivery take?",
  ],
  SERVICE: [
    "Downloads",
    "Spare Parts",
    "Extranet",
    "Warranty",
    "Repairs",
    "Safe Buying Guide",
    "Dealer & Distributor Finder",
    "Product registration",
  ],
  LEGAL: [
    "GTC",
    "Accessibility",
    "Cookie-Configuration",
    "Data Protection",
    "Commercial Guarantee",
    "Legal-Notice",
    "Consumer Information",
    "Right of Withdrawal",
    "Payment and Shipping",
  ],
  TOPICS: [
    "100 Years",
    "Apps",
    "Blog",
    "Broadcast",
    "Bundle Deals",
    "DT in-ear series",
    "HEADPHONE LAB",
    "Home Office",
    "Microphones Made in Germany",
    "MANUFAKTUR",
    "Social Wall",
    "Tesla-Technology",
  ],
};

function LinkColumn({ title, links, wide = false }) {
  return (
    <div className={wide ? "col-span-2 sm:col-span-1" : ""}>
      <p className="text-[16px] font-mono tracking-[0.2em] text-orange-500 uppercase mb-5">
        {title}
      </p>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-[13px] text-grey-500 hover:text-orange-400 transition-colors duration-150 tracking-wide leading-snug block"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-grey-200 border-t border-grey-900/5 pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-16">
          <LinkColumn title="Company" links={LINKS.COMPANY} />
          <LinkColumn title="Contact" links={LINKS.CONTACT} />
          <LinkColumn title="FAQ" links={LINKS.FAQ} />
          <LinkColumn title="Service" links={LINKS.SERVICE} />
        </div>

        {/* Divider */}
        <div className="h-px bg-orange-700/5 mb-16" />

        {/* Bottom grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
          <LinkColumn title="Legal" links={LINKS.LEGAL} />
          <LinkColumn title="Topics" links={LINKS.TOPICS} />
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[11px] text-grey-900 font-mono tracking-wider">
            © {new Date().getFullYear()} beyerdynamic GmbH & Co. KG
          </p>
          <p className="text-[11px] text-grey-900 font-mono tracking-wider">
            Made in Germany · Heilbronn
          </p>
        </div>
      </div>
    </footer>
  );
}

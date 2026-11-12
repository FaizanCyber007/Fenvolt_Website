import { capabilities } from "@/constants/company";
import { SectionHead } from "@/components/ui/section-head";
import { Reveal } from "@/components/motion/reveal";

export function CapabilityMatrix() {
  return (
    <section
      aria-labelledby="stack"
      className="border-t border-rule bg-paper-deep/35 py-[clamp(4.5rem,9vw,8.75rem)]"
    >
      <div className="shell">
        <SectionHead
          index="06"
          label="The stack, by responsibility"
          id="stack"
          title={
            <>
              Technologies grouped by what they <em className="display-italic">do</em>.
            </>
          }
          lede="A tool list says little on its own. This is how the pieces fit into a working system, in the order data moves through it."
          align="split"
        />

        <div className="mt-12 border-t border-rule-strong">
          {capabilities.map((group, i) => (
            <Reveal key={group.area} delay={i * 0.03}>
              <div className="group grid gap-3 border-b border-rule py-5 sm:py-6 lg:grid-cols-12 lg:gap-8">
                <div className="flex items-baseline gap-4 lg:col-span-3">
                  <span className="font-mono text-[0.625rem] tracking-[0.1em] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[1.0625rem] font-medium leading-snug">
                    {group.area}
                  </h3>
                </div>

                <p className="max-w-[34ch] text-[0.875rem] leading-relaxed text-muted lg:col-span-3">
                  {group.detail}
                </p>

                <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:col-span-6 lg:justify-end">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-muted-strong"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 max-w-[62ch] text-[0.8125rem] leading-relaxed text-muted">
          We use what the engagement needs. Nothing on this list is here because
          it looks good in a badge row.
        </p>
      </div>
    </section>
  );
}

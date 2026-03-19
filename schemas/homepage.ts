import { defineArrayMember, defineField, defineType } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    // ─── Hero ────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroTag',
      title: 'Hero Tag',
      type: 'string',
      initialValue: 'Modular Battery Storage',
    }),
    defineField({
      name: 'heroHeadlineLines',
      title: 'Hero Headline (one line per item)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      initialValue: ['Reliable power for facilities', "that can't afford downtime"],
    }),
    defineField({
      name: 'heroSub',
      title: 'Hero Sub-headline',
      type: 'text',
      rows: 3,
      initialValue:
        'Stratum Energy builds modular battery storage systems for mid-size manufacturers — scalable, simple to install, and built to grow with your operation.',
    }),
    defineField({
      name: 'heroSpecs',
      title: 'Spec Strip Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'value', type: 'string', title: 'Value' }),
            defineField({ name: 'label', type: 'string', title: 'Label' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
      initialValue: [
        { value: '50kWh', label: 'Per Module' },
        { value: '2-Day', label: 'Installation' },
        { value: '140+', label: 'Facilities Deployed' },
        { value: '22%', label: 'Avg. Cost Reduction' },
        { value: '3.5 Yrs', label: 'Avg. Payback Period' },
      ],
    }),

    // ─── Problem ──────────────────────────────────────────────────────────────
    defineField({
      name: 'problemTag',
      title: 'Problem Tag',
      type: 'string',
      initialValue: 'The Challenge',
    }),
    defineField({
      name: 'problemHeadline',
      title: 'Problem Headline',
      type: 'text',
      rows: 2,
      initialValue:
        "Your facility runs on tight margins. Your power supply shouldn't add to the risk.",
    }),
    defineField({
      name: 'problemP1',
      title: 'Problem Body — Paragraph 1',
      type: 'text',
      rows: 4,
      initialValue:
        "Grid instability, rising energy costs, and the threat of unplanned downtime aren't new problems — but they're getting harder to ignore. Most storage solutions on the market are built for homes or utilities. If you're running a mid-size manufacturing facility, neither one fits.",
    }),
    defineField({
      name: 'problemP2',
      title: 'Problem Body — Paragraph 2',
      type: 'text',
      rows: 3,
      initialValue:
        'Stratum was built for the middle — facilities large enough to need serious power backup, but lean enough to need it to actually make sense financially.',
    }),

    // ─── Product ──────────────────────────────────────────────────────────────
    defineField({
      name: 'productTag',
      title: 'Product Tag',
      type: 'string',
      initialValue: 'The S-Series',
    }),
    defineField({
      name: 'productHeadline',
      title: 'Product Headline',
      type: 'text',
      rows: 2,
      initialValue: 'Modular by design,\nbuilt for the long run.',
    }),
    defineField({
      name: 'productBody',
      title: 'Product Body',
      type: 'text',
      rows: 3,
      initialValue:
        'The Stratum S-Series is a stackable battery storage system that installs in two days and scales as your operation grows.',
    }),
    defineField({
      name: 'productFeatures',
      title: 'Product Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'heading', type: 'string', title: 'Heading' }),
            defineField({ name: 'body', type: 'text', title: 'Body', rows: 3 }),
          ],
          preview: { select: { title: 'heading' } },
        }),
      ],
      initialValue: [
        {
          heading: 'Scale without starting over.',
          body: "Each S-Series module delivers 50kWh of storage and stacks directly onto your existing system. As your facility grows or energy demands shift, add capacity in hours — not weeks.",
        },
        {
          heading: 'Installed in two days, not two months.',
          body: "The S-Series arrives pre-configured and ready to connect. Our deployment team handles permitting, integration, and commissioning. Most facilities are fully operational within 48 hours of delivery.",
        },
        {
          heading: 'Monitored around the clock with StratumOS.',
          body: "Every system ships with our cloud-based dashboard — included, not upsold. Your facility manager gets real-time visibility into power consumption, battery health, and projected savings.",
        },
      ],
    }),

    // ─── Process ──────────────────────────────────────────────────────────────
    defineField({
      name: 'processTag',
      title: 'Process Tag',
      type: 'string',
      initialValue: 'How It Works',
    }),
    defineField({
      name: 'processHeadline',
      title: 'Process Headline',
      type: 'text',
      rows: 2,
      initialValue: 'Simple to understand.\nSimpler to operate.',
    }),
    defineField({
      name: 'processCards',
      title: 'Process Cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Step Title' }),
            defineField({ name: 'body', type: 'text', title: 'Step Body', rows: 3 }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
      initialValue: [
        {
          title: 'Assess',
          body: "We start with a facility walkthrough and energy audit. You'll know exactly what you need before you commit to anything.",
        },
        {
          title: 'Install',
          body: 'Our team handles the full installation in two days with minimal disruption to your production schedule.',
        },
        {
          title: 'Monitor',
          body: "StratumOS gives you a live view of your system's performance from any device. We handle the maintenance. You focus on running your facility.",
        },
      ],
    }),

    // ─── Proof ────────────────────────────────────────────────────────────────
    defineField({
      name: 'proofTag',
      title: 'Proof Tag',
      type: 'string',
      initialValue: 'Proof',
    }),
    defineField({
      name: 'proofHeadline',
      title: 'Proof Headline',
      type: 'text',
      rows: 2,
      initialValue: 'The numbers speak\nfor themselves.',
    }),
    defineField({
      name: 'proofStats',
      title: 'Proof Stats',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'value', type: 'string', title: 'Value' }),
            defineField({ name: 'label', type: 'string', title: 'Label' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
      initialValue: [
        { value: '22%', label: 'Avg. energy cost reduction in year one' },
        { value: '99.4%', label: 'System uptime across all deployments' },
        { value: '3.5 Yrs', label: 'Typical payback period' },
        { value: '140+', label: 'Facilities deployed across North America' },
      ],
    }),

    // ─── Audience ─────────────────────────────────────────────────────────────
    defineField({
      name: 'audienceHeadline',
      title: 'Audience Headline',
      type: 'text',
      rows: 2,
      initialValue: 'Built for operations leaders\nwho think long-term.',
    }),
    defineField({
      name: 'audienceBody',
      title: 'Audience Body',
      type: 'text',
      rows: 4,
      initialValue:
        "Stratum works best for operations directors and facility managers at mid-size manufacturers — food processing, electronics assembly, auto parts, cold storage, and distribution. If you're responsible for keeping a facility running and you're tired of energy costs eating into your margins, we should talk.",
    }),

    // ─── StratumOS ────────────────────────────────────────────────────────────
    defineField({
      name: 'osTag',
      title: 'OS Tag',
      type: 'string',
      initialValue: 'StratumOS',
    }),
    defineField({
      name: 'osHeadline',
      title: 'OS Headline',
      type: 'text',
      rows: 2,
      initialValue: 'Full visibility into your\nenergy performance.',
    }),
    defineField({
      name: 'osBody',
      title: 'OS Body',
      type: 'text',
      rows: 4,
      initialValue:
        "Every Stratum system ships with StratumOS — a cloud-based monitoring platform that gives your facility manager real-time insight into power consumption, battery health, and projected savings. No extra cost, no upsell. Just a clear picture of what your system is doing and why it matters.",
    }),

    // ─── CTA ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'ctaHeadline',
      title: 'CTA Headline',
      type: 'string',
      initialValue: 'Get Started',
    }),

    // ─── Footer ───────────────────────────────────────────────────────────────
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
      initialValue: "Reliable power for facilities that can't afford downtime.",
    }),
  ],
})

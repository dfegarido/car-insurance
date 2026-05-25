/** Full article HTML sourced from Insurance Journal when TIP/WP only syndicates a teaser. */
const INSURANCE_JOURNAL_BY_SLUG: Record<string, string> = {
  "people-moves-markel-taps-talbots-odonoghue-to-lead-fine-art-specie-for-london-aons-global-respecialty-team-promotes-mitchell-hires-floodflashs-rimmer":
    "https://www.insurancejournal.com/news/international/2026/05/22/871190.htm",
  "california-governor-issues-executive-order-to-prepare-workers-and-businesses-for-ai-disruption":
    "https://www.insurancejournal.com/news/west/2026/05/22/871182.htm",
  "delay-in-calling-police-does-not-wreck-um-claim-wv-supreme-court-says":
    "https://www.insurancejournal.com/news/southeast/2026/05/22/871170.htm",
  "acrisure-to-cut-2250-employees-citing-advances-in-technology-and-ai":
    "https://www.insurancejournal.com/news/national/2026/05/22/871138.htm",
  "these-homeowners-got-an-energy-bill-lifeline-trump-yanked-it-back":
    "https://www.insurancejournal.com/news/southeast/2026/05/22/871157.htm",
  "osha-has-6-inspectors-for-60000-west-virginia-workplaces":
    "https://www.insurancejournal.com/news/southeast/2026/05/22/871135.htm",
  "new-york-issues-cybersecurity-tips-for-a-heightened-threat-environment":
    "https://www.insurancejournal.com/news/east/2026/05/22/871132.htm",
  "judge-refuses-to-delay-civil-trial-over-fatal-baltimore-bridge-collapse":
    "https://www.insurancejournal.com/news/east/2026/05/22/871121.htm",
  "us-p-c-insurers-post-biggest-q1-underwriting-profit-in-25-years":
    "https://www.insurancejournal.com/news/national/2026/05/22/871117.htm",
};

export function getInsuranceJournalUrl(slug: string): string | null {
  return INSURANCE_JOURNAL_BY_SLUG[slug] ?? null;
}

export function isSyndicatedNewsSlug(slug: string): boolean {
  return slug in INSURANCE_JOURNAL_BY_SLUG;
}

function cleanSyndicatedHtml(html: string): string {
  let content = html;
  content = content.replace(/<script[\s\S]*?<\/script>/gi, "");
  content = content.replace(/<div class="bzn[\s\S]*?<\/div>/gi, "");
  content = content.replace(/<ins[\s\S]*?<\/ins>/gi, "");
  content = content.replace(/<div data-beyondwords-player[\s\S]*?<\/div>/gi, "");
  return content.trim();
}

export function extractInsuranceJournalArticle(html: string): string | null {
  const match = html.match(
    /<div class="article-content clearfix">([\s\S]*?)(?:<p class="tagtag"|<div class="article-poll"|<div class="author-byline|<aside class="author-byline|<footer class="article)/i
  );
  if (!match) return null;

  const content = cleanSyndicatedHtml(match[1]);
  return content.length > 0 ? content : null;
}

function decodeHtmlEntities(html: string): string {
  return html
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&#8230;/g, "…")
    .replace(/&#038;/g, "&")
    .replace(/&hellip;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) =>
      String.fromCharCode(Number.parseInt(code, 10))
    );
}

function stripImgAttributes(attrs: string): string {
  const src = attrs.match(/\bsrc="([^"]*)"/i)?.[1] ?? "";
  const alt = attrs.match(/\balt="([^"]*)"/i)?.[1] ?? "";
  if (!src) return "";
  const safeAlt = alt.replace(/"/g, "&quot;");
  return `<img src="${src}" alt="${safeAlt}" loading="lazy" decoding="async" />`;
}

/** Turn scraped IJ markup into styled article blocks used site-wide. */
export function normalizeSyndicatedArticleHtml(html: string): string {
  let content = decodeHtmlEntities(cleanSyndicatedHtml(html));

  content = content.replace(/\sclass="[^"]*"/gi, "");
  content = content.replace(/\sstyle="[^"]*"/gi, "");

  content = content.replace(
    /<a[^>]*href="[^"]*"[^>]*>\s*<img([^>]*)>\s*<\/a>/gi,
    (_, imgAttrs) => {
      const img = stripImgAttributes(imgAttrs);
      return img ? `<figure class="article-media">${img}</figure>` : "";
    }
  );

  content = content.replace(/<img([^>]*)>/gi, (match, imgAttrs, offset) => {
    const before = content.slice(Math.max(0, offset - 80), offset);
    if (before.includes("article-media")) return match;
    const img = stripImgAttributes(imgAttrs);
    return img ? `<figure class="article-media">${img}</figure>` : "";
  });

  content = content.replace(
    /<p>\s*(<figure class="article-media">[\s\S]*?<\/figure>)\s*([\s\S]*?)<\/p>/gi,
    "$1<p>$2</p>"
  );

  content = content.replace(
    /<p>\s*<strong>\s*Related:\s*<\/strong>\s*<a([^>]*)>([\s\S]*?)<\/a>\s*<\/p>/gi,
    '<aside class="article-related"><span class="article-related-label">Related reading</span><a$1>$2</a></aside>'
  );

  content = content.replace(
    /<a\s+href="(https?:\/\/[^"]+)"(?![^>]*\btarget=)/gi,
    '<a href="$1" target="_blank" rel="noopener noreferrer"'
  );

  content = content.replace(/<p>\s*<em>([\s\S]*?)<\/em>\s*<\/p>/gi, '<p class="article-byline">$1</p>');

  content = content.replace(/^(\s*<\/div>\s*)+/, "");
  content = content.trim();
  content = content.replace(/^<p>/, '<p class="article-lead">');
  content = content.replace(/<p>(?!\s+class=)/g, '<p class="article-paragraph">');

  return `<div class="article-prose">${content}</div>`;
}

export async function fetchInsuranceJournalContent(
  slug: string
): Promise<string | null> {
  const url = getInsuranceJournalUrl(slug);
  if (!url) return null;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; TheInsuranceProvider/1.0)" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const html = await res.text();
    const raw = extractInsuranceJournalArticle(html);
    return raw ? normalizeSyndicatedArticleHtml(raw) : null;
  } catch {
    return null;
  }
}

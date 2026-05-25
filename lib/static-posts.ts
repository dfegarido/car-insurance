import type { WPPost } from "./wordpress";

import cyberattacksPost from "./posts/simple-ways-to-protect-your-business-from-cyberattacks.json";
import homeBasedBusinessPost from "./posts/how-to-insure-a-home-based-business.json";
import homeOwnersAmountPost from "./posts/how-do-i-know-if-i-have-the-right-amount-of-home-owners-insurance.json";
import homeInsuranceClaimPost from "./posts/how-to-file-a-home-insurance-claim.json";
import presidentHealthPolicyPost from "./posts/can-a-new-president-make-health-policy-changes-on-day-one.json";
import shortTermHealthPlansPost from "./posts/finalized-federal-rule-reduces-total-duration-of-short-term-health-plans-to-4-months.json";
import typesOfBusinessInsurancePost from "./posts/types-of-business-insurance.json";
import vermontEqualProtectionPost from "./posts/vermonters-to-vote-on-equal-protection-amendment-to-state-constitution.json";

const STATIC_POSTS: Record<string, WPPost> = {
  "can-a-new-president-make-health-policy-changes-on-day-one":
    presidentHealthPolicyPost as WPPost,
  "finalized-federal-rule-reduces-total-duration-of-short-term-health-plans-to-4-months":
    shortTermHealthPlansPost as WPPost,
  "how-do-i-know-if-i-have-the-right-amount-of-home-owners-insurance":
    homeOwnersAmountPost as WPPost,
  "how-to-file-a-home-insurance-claim": homeInsuranceClaimPost as WPPost,
  "how-to-insure-a-home-based-business": homeBasedBusinessPost as WPPost,
  "types-of-business-insurance": typesOfBusinessInsurancePost as WPPost,
  "simple-ways-to-protect-your-business-from-cyberattacks":
    cyberattacksPost as WPPost,
  "vermonters-to-vote-on-equal-protection-amendment-to-state-constitution":
    vermontEqualProtectionPost as WPPost,
};

/** Optional section anchors for “In this article” TOC links */
const SECTION_IDS_BY_SLUG: Record<string, { id: string; match: string }[]> = {
  "can-a-new-president-make-health-policy-changes-on-day-one": [
    { id: "dayone", match: "How can a President start making changes" },
    { id: "rulemaking", match: "How quickly can a President make policy changes through federal" },
    { id: "types", match: "What types of health insurance policy changes" },
    { id: "overturn", match: "Is it possible for Congress and a President to overturn" },
    { id: "party", match: "How can one-party control of the White House" },
  ],
};

function normalizeArticleHtml(html: string, slug: string): string {
  let content = html;

  content = content.replace(
    /https:\/\/www\.healthinsurance\.org\/blog\/([a-z0-9-]+)\/?/gi,
    "/$1/"
  );
  content = content.replace(
    /https:\/\/www\.healthinsurance\.org\//gi,
    `/${slug}/`
  );

  const sectionIds = SECTION_IDS_BY_SLUG[slug] ?? [];
  for (const { id, match } of sectionIds) {
    const pattern = new RegExp(
      `(<h3[^>]*>)([^<]*${match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^<]*)(</h3>)`,
      "i"
    );
    content = content.replace(pattern, `$1<span id="${id}"></span>$2$3`);
  }

  return content;
}

export function getStaticPostBySlug(slug: string): WPPost | null {
  const post = STATIC_POSTS[slug];
  if (!post) return null;

  return {
    ...post,
    content: {
      rendered: normalizeArticleHtml(post.content.rendered, slug),
    },
  };
}

export function hasStaticPost(slug: string): boolean {
  return slug in STATIC_POSTS;
}

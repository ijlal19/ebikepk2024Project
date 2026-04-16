"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { isLoginUser } from "@/genericFunctions/geneFunc";
import styles from "./index.module.scss";

const highlights = [
  { value: "Free Ad", label: "Post your bike listing at no cost" },
  { value: "3 Steps", label: "Simple flow to publish your ad" },
  { value: "10x Faster", label: "Featured listings get more attention" },
];

const steps = [
  {
    number: "",
    icon: "A",
    title: "Sign up on ebike.pk",
    description:
      "Create your account first so you can manage your ad, update details, and respond to interested buyers easily.",
  },
  {
    number: "",
    icon: "B",
    title: "Create your ad",
    description:
      "Add your bike information, upload clear images, write a useful description, and set a realistic asking price.",
  },
  {
    number: "",
    icon: "C",
    title: "Get instant offers",
    description:
      "Once your listing goes live, buyers can contact you directly and you can move toward a quicker sale.",
  },
];

const quickSellTips = [
  {
    icon: "P",
    title: "Upload good quality landscape photos",
    description:
      "Ads with multiple clear images usually get more views and stronger buyer response than low-quality listings.",
  },
  {
    icon: "F",
    title: "Feature your ad",
    description:
      "A featured tag helps your listing stand out and pushes it higher, which can improve visibility and lead quality.",
  },
  {
    icon: "R",
    title: "Set up a realistic price",
    description:
      "A fair market-aligned price attracts serious buyers faster than a number that feels too optimistic.",
  },
];

const stories = [
  {
    quote:
      "Maine apni bike ki photos aur detail add ki, aur expected se kaafi jaldi buyer response mil gaya. Process simple tha aur ad manage karna bhi easy raha.",
    name: "Ali Raza",
    city: "Rawalpindi",
  },
  {
    quote:
      "Sab se achi baat ye lagi ke listing flow confusing nahi tha. Price, images aur description sahi dalne ke baad serious calls aana start ho gaye.",
    name: "Hamza Javed",
    city: "Lahore",
  },
  {
    quote:
      "Pehle mujhe lag raha tha bike online sell karna mushkil hoga, lekin proper guidance aur clean posting steps ki wajah se kaam kaafi smooth ho gaya.",
    name: "Usman Tariq",
    city: "Karachi",
  },
];

const hotTips = [
  "Clean your bike properly so it looks presentable and trustworthy to buyers.",
  "Take high-quality photos from different angles to highlight its condition.",
  "Set a reasonable price based on market value, model year, and bike condition.",
  "Provide useful details like mileage, service history, papers, and ownership information.",
];

const latestNews = [
  {
    category: "Bike Review",
    title: "Futuristic Electric Bikes In Pakistan",
    description:
      "Electric bikes continue to gain attention in Pakistan, especially among riders looking for lower running costs and a modern riding experience.",
    href: "/blog",
  },
  {
    category: "Industry",
    title: "Govt Plans To Produce More Electric Bikes",
    description:
      "Policy and production moves around EV adoption are helping electric two-wheelers stay in the conversation for future buyers and sellers.",
    href: "/blog",
  },
  {
    category: "Market",
    title: "Why Honda Bikes Still Dominate Resale Interest",
    description:
      "Brand trust, maintenance familiarity, and strong market demand keep popular Honda bikes highly visible in used listings.",
    href: "/blog",
  },
];

const faqList = [
  {
    question: "How long can it take to sell a bike online?",
    answer:
      "That depends on your price, pictures, and description. A clear listing with a realistic price usually performs much better.",
  },
  {
    question: "How can I get the best price for my bike?",
    answer:
      "Write an honest description, add multiple clear photos, mention service or document status, and keep the asking price competitive.",
  },
  {
    question: "Can I sell a bike that is not in working condition?",
    answer:
      "Yes, but mention the condition clearly so buyers know what repairs or restoration work may be needed.",
  },
  {
    question: "Is it safe to sell a bike online?",
    answer:
      "It can be, as long as you share accurate details, deal carefully with buyers, and avoid unclear or suspicious interactions.",
  },
  {
    question: "Should I repair my bike before selling?",
    answer:
      "Minor fixes, cleaning, and visible repairs can improve presentation and may help you justify a stronger selling price.",
  },
];

const whyChoose = [
  "Broad audience reach across Pakistan to improve listing visibility.",
  "Detailed listing fields with images, pricing, and bike-specific information.",
  "Simple posting flow that reduces friction for first-time sellers.",
  "A separate sell form that can stay untouched while this page handles awareness and guidance.",
];

const requiredFields = [
  "City",
  "City area",
  "Bike information",
  "Registered in",
  "Mileage",
  "Engine type",
  "Detailed description",
];

export default function SellMyBikeInstructions() {
  const router = useRouter();

  const handleSellBikeClick = () => {
    const loginState = isLoginUser();

    if (loginState?.login) {
      router.push("/used-bikes/sell-used-bike");
      return;
    }

    alert("Please login first to sell your bike.");
    router.push("/signup");
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Sell Bike Online</span>
          <h1 className={styles.heroTitle}>Sell your bike or motorcycle online in Pakistan instantly</h1>
          <p className={styles.heroText}>
            This new page now follows the same type of section flow as the referenced marketplace
            page: a free-posting hero, simple steps, quick selling tips, seller stories, hot tips,
            latest news, FAQs, and explanatory content blocks.
          </p>

          <div className={styles.heroActions}>
            <button type="button" className={styles.primaryButton} onClick={handleSellBikeClick}>
              I Want To Sell My Bike
            </button>
            <a href="#three-steps" className={styles.secondaryButton}>
              Explore Sections
            </a>
          </div>

          <div className={styles.highlightGrid}>
            {highlights.map((item) => (
              <div key={item.label} className={styles.highlightCard}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.heroPanel}>
          <div className={styles.previewCard}>
            <div className={styles.heroArtwork}>
              <div className={styles.bikeShape}></div>
              <div className={styles.heroBadge}>
                <strong>FREE</strong>
                <span>Ad Posting</span>
              </div>
            </div>
            <div className={styles.previewBody}>
              <p className={styles.previewLabel}>Post An Ad For Free</p>
              <h2>Sell from the comfort of your home</h2>
              <p className={styles.previewText}>
                Keep all details ready, add clear photos, and then continue to the existing sell
                form when you are ready to publish the listing.
              </p>
              <div className={styles.previewChecklist}>
                <span>Bike title and model</span>
                <span>Recent photos</span>
                <span>Price and city</span>
                <span>Contact details</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="three-steps" className={styles.section}>
        <div className={styles.sectionHeaderCentered}>
          <span className={styles.sectionTag}>3 Simple Steps</span>
          <h2>3 simple steps to sell your bike</h2>
        </div>

        <div className={styles.stepGrid}>
          {steps.map((step) => (
            <article key={step.title} className={styles.stepCard}>
              <div className={styles.cardIcon}>{step.icon}</div>
              <span className={styles.stepNumber}>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Sell Quickly</span>
          <h2>How to sell your bike quickly?</h2>
        </div>

        <div className={styles.featureGrid}>
          {quickSellTips.map((item) => (
            <article key={item.title} className={styles.featureCard}>
              <div className={styles.cardIcon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.tintedSection}`}>
        <div className={styles.sectionHeaderCentered}>
          <span className={styles.sectionTag}>Success Stories</span>
          <h2>Sell bike success stories</h2>
        </div>

        <div className={styles.storyGrid}>
          {stories.map((story) => (
            <article key={story.name} className={styles.storyCard}>
              <p className={styles.storyQuote}>&ldquo;{story.quote}&rdquo;</p>
              <strong>{story.name}</strong>
              <span>{story.city}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.contentGrid}>
          <article className={styles.infoCard}>
            <span className={styles.sectionTag}>Bike Tips For Beginners</span>
            <h2>Hot tips to sell used bikes</h2>
            <ul className={styles.list}>
              {hotTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </article>

          <aside className={styles.sidePanel}>
            <span className={styles.sectionTag}>Next Step</span>
            <h3>Ready to post the actual listing?</h3>
            <p>
              This page is only the instructions and landing experience. Your original selling form
              still stays separate and untouched.
            </p>
            <button type="button" className={styles.inlineLink} onClick={handleSellBikeClick}>
              Open Existing Sell Form
            </button>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Latest News</span>
          <h2>Bikes latest news</h2>
        </div>

        <div className={styles.newsGrid}>
          {latestNews.map((item) => (
            <article key={item.title} className={styles.newsCard}>
              <span className={styles.newsTag}>{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link href={item.href} className={styles.inlineLink}>
                Read More
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>FAQs</span>
          <h2>FAQs about selling bikes</h2>
        </div>

        <div className={styles.faqGrid}>
          {faqList.map((item) => (
            <article key={item.question} className={styles.faqCard}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.longFormGrid}>
          <article className={styles.longFormCard}>
            <span className={styles.sectionTag}>Online Bike Selling</span>
            <h2>Sell your bikes instantly with our online bike selling platform</h2>
            <p>
              We have turned this page into a detailed selling landing page so users first
              understand the process, trust signals, and content support before opening the form.
              This helps the journey feel more complete instead of dropping users directly into a
              blank form experience.
            </p>
          </article>

          <article className={styles.longFormCard}>
            <span className={styles.sectionTag}>Why Choose Us</span>
            <h2>Why choose this flow as your online bike selling experience?</h2>
            <ul className={styles.list}>
              {whyChoose.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.contentGrid}>
          <article className={styles.infoCard}>
            <span className={styles.sectionTag}>Required Information</span>
            <h2>What are the steps for selling your bike?</h2>
            <p className={styles.paragraph}>
              After clicking the main selling button, users can move to the actual posting form and
              fill in the core fields needed for a proper listing.
            </p>
            <ul className={styles.list}>
              {requiredFields.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.sidePanel}>
            <span className={styles.sectionTag}>Description Tip</span>
            <h3>Describe your bike in detail</h3>
            <p>
              Mention condition, mileage, maintenance, documents, ownership background, and any
              improvements or faults so the buyer gets a complete picture.
            </p>
          </article>
        </div>
      </section>

    </main>
  );
}

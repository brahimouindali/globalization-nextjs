import { useRouter } from "next/router";
import { Roboto } from "next/font/google";

import { ProductJsonLd } from "next-seo";

import Page from "@/components/Page";

import styles from "@/styles/Home.module.css";
import { useTranslation } from "@/hooks/useTranslation";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

export default function Home() {
  const router = useRouter();
  const { translate } = useTranslation();

  const [username, password, language, description] = translate([
    "username",
    "password",
    "language",
    "description",
  ]);

  const changeLanguageAction = (lang: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: lang });
  };

  return (
    <Page
      title="Login Form"
      description="This is a simple login form"
      image="/images/banner.png"
      date={new Date("2024-04-04T15:14:28.000Z").toString()}
    >
      <main className={`${styles.main} ${roboto.className}`}>
        <div className={styles.form_group}>
          <label className={styles.label} htmlFor={language}>
            {language}
          </label>
          <select
            className={styles.input}
            id={language}
            onChange={(e) => {
              const { value } = e.target;
              changeLanguageAction(value);
            }}
            defaultValue={router.locale}
          >
            <option value="en">English</option>
            <option value="sp">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className={styles.form_group}>
          <label className={styles.label} htmlFor={username}>
            {username}
          </label>
          <input
            className={styles.input}
            type="text"
            id={username}
            placeholder={username}
          />
        </div>
        <div className={styles.form_group}>
          <label className={styles.label} htmlFor={password}>
            {password}
          </label>
          <input
            className={styles.input}
            type="text"
            id={password}
            placeholder={password}
          />
        </div>

        <p className={styles.description}>{description}</p>
      </main>
      <ProductJsonLd
        aggregateRating={{
          ratingValue: "5.0",
          reviewCount: "7",
        }}
        brand="Login page"
        description="This is a simple login form"
        images={["https://globalization-nextjs.vercel.app/images/banner.jpg"]}
        offers={{
          availability: "http://schema.org/InStock",
          itemCondition: "http://schema.org/NewCondition",
          price: "99.99",
          priceCurrency: "USD",
          priceValidUntil: "2021-02-12",
          seller: {
            name: "Bra Oui",
          },
          url: "https://globalization-nextjs.vercel.app",
        }}
        productName="Login page"
        reviews={[
          {
            author: {
              name: "My name",
              type: "Person",
            },
            datePublished: "2023-06-17T03:37:40Z",
            name: "Shipped my first nextjs app - thank you!",
            reviewBody:
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, mollitia deleniti quidem error, officiis voluptatem voluptas accusamus provident quos accusantium, delectus pariatur!",
            reviewRating: {
              bestRating: "5",
              ratingValue: "5",
              worstRating: "1",
            },
          },
        ]}
      />
    </Page>
  );
}

export const getServerSideProps = () => {
  return {
    props: {},
  };
};

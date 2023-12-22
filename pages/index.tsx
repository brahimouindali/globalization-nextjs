import Head from "next/head";
import { useRouter } from "next/router";

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import Page from "@/components/Page";

const inter = Inter({ subsets: ["latin"] });

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
      date={new Date().toString()}
    >
      <main className={`${styles.main} ${inter.className}`}>
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
    </Page>
  );
}

export const getServerSideProps = () => {
  return {
    props: {},
  };
};

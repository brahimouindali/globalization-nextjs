import { Roboto } from "next/font/google";

import Page from "@/components/Page";
import { signIn } from "next-auth/react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

export default function Home() {
  return (
    <Page
      title="Blog page"
      description="This is a simple Blog page"
      image="/images/banner.png"
      date={new Date("2024-04-09T15:14:35.000Z").toString()}
    >
      <main className={`${roboto.className}`}>
        <h2>Hello</h2>

        <button
          className="btn"
          onClick={() => {
            signIn("credentials", { email: "", password: "", redirect: false });
          }}
        >
          login
        </button>
      </main>
    </Page>
  );
}

export const getServerSideProps = () => {
  return {
    props: {},
  };
};

import Head from "next/head";
import HousePlan from "../components/HousePlan";

export default function Home() {
  return (
    <div>
      <Head>
        <title>House Plan</title>
        <meta name="description" content="Interactive house plan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Interactive House Plan</h1>
        <HousePlan />
      </main>

      <style jsx>{`
        main {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #fafafa;
          padding: 1rem;
          box-sizing: border-box;
        }

        h1 {
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
}

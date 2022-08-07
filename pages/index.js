import Head from "next/head";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/Home.module.css";

export default function Home({ data }) {
  console.log(data);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {data.data.jobs.map((job) => (
          <div className={styles.row} key={uuidv4()}>
            <div className={styles.company}>
              <h1>{job.title}</h1>
              <p>{job.company.name}</p>
            </div>
            <div className={styles.tags}>
              {job.tags.slice(0, 3).map((tag) => (
                <span key={uuidv4()}>{tag.name}</span>
              ))}
            </div>
            <div className={styles.location}>
              {job.locationNames ? (
                <p>{job.locationNames}</p>
              ) : job.cities.length > 0 ? (
                job.cities.map((city, index) => (
                  <span key={uuidv4()}>{(index ? ", " : "") + city.name}</span>
                ))
              ) : (
                <p>Remote</p>
              )}
            </div>
          </div>
        ))}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://api.graphql.jobs", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        jobs{
            title
            company{
              name
            }
            tags{
              name
          }
            cities{
              name
            }
            locationNames
          }
        companies{
            name
            logoUrl
            }
      }`,
    }),
  });

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

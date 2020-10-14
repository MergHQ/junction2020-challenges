import Head from "next/head"
import styles from "../styles/Home.module.css"
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

type Challenge = {
  uniqueId: string
  company: string
  name: string
  shorttext: string
  long_text: string
  thechallenge: string
  insights: string
  price: string
  judging: string
  aboutcompany: string
  cardbackground: {
    url: string
  }
}

type Props = {
  challenges: Challenge[]
}

export default function Home(props: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Junction 2020 Challenges</title>
      </Head>
      <h1 className={styles.title}>
        Junction 2020 challenges
      </h1>
      <main className={styles.main}>
        {props
          .challenges
          .map(challenge =>
            <Challenge key={challenge.uniqueId} challenge={challenge} />
          )
        }
      </main>
    </div>
  );
}

const Challenge = ({ challenge }: { challenge: Challenge }) =>
  <div className={styles.card}>
    <div className={styles.cardheader}>
      <h3>{challenge.name}</h3>
      <img className={styles.logo} src={challenge.cardbackground.url}></img>
    </div>
    <h4>{challenge.shorttext}</h4>
    <h4>The challenge</h4>
    <ReactMarkdown source={challenge.thechallenge} />
    <h4>Insights</h4>
    <ReactMarkdown source={challenge.insights} />
    <h4>Price</h4>
    <ReactMarkdown source={challenge.price} />
    <h4>Judging</h4>
    <ReactMarkdown source={challenge.judging} />
    <h4>About company</h4>
    <ReactMarkdown source={challenge.aboutcompany} />
  </div>

export async function getServerSideProps(context) {
  const challenges = await axios.get('https://cms.www.hackjunction.com/api/challenges').then(({ data }) => data)
  return {
    props: {
      challenges
    },
  }
}

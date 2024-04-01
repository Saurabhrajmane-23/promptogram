import Feed from '../components/Feed';


const Home = () => {
  return (
   <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
         IIT J junta, discover & share masaledar gossips and hearfelt confessions
      </h1>
      <br className="max-md:hidden"/>
      <p className="text-black text-center"> This is an open-source gossip sharing site </p>

      <Feed/>
   </section>

  )
}

export default Home

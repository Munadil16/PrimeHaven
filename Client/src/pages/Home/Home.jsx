import "./Home.css";
import Video from "../../assets/videos/RealEstatePromo.mp4";

const Home = () => {
  return (
    <main className="home-container">
      <div className="home-content">
        <h1>
          Buy and sell properties at
          <span className="one-stop"> one stop </span>
          with ease.
        </h1>
      </div>

      <div className="home-video">
        <video loop muted autoPlay>
          <source src={Video} type="video/mp4" />
        </video>
      </div>
    </main>
  );
};

export default Home;

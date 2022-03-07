import styles from "../styles/Home.module.css";
import { LayoutTemplate } from "../templates/LayoutTemplate";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen min-w-screen  col-span-6 col-start-4">
      <div className="grid border-2 border-red-500 place-items-center p-2">
        <h1>Elegancko</h1>
      </div>
    </div>
  );
};

export default Home;

import { At, Key, SignIn, ArrowLeft } from "phosphor-react";
import Img from "../assets/bg-mobile.jpg";
import InputIcon from "../components/ui/InputIcon";
import { Link } from "react-router-dom";


const Login = () => {

  return (
    <div className={styles.main}>
      <section className={styles.section}>
        <div className="p-6 md:p-20">
          <h2 className="font-mono mb-5 text-4xl font-bold"> Login </h2>
          <p className="max-w-sm mb-12 font-sans font-light text-gray-600">
            Log in to your account if you are an employee
          </p>
          <InputIcon icon={<At />} placeholder="email" id="email" name="email" type="email" styles="mb-6" />
          <InputIcon icon={<Key />} placeholder="password" id="password" name="password" type="password" />

          <div className="flex flex-col items-center justify-between mt-6 space-y-6 lg:flex-row lg:space-y-0"
          >
            <div className="font-thing text-black">Forgot Password</div>
            <button className={styles.button}>
              <span>Next</span>
              <SignIn />
            </button>
          </div>

          <div className="mt-12 border-b border-b-grayDark"></div>

        </div>

        <img
          src={Img}
          alt="image"
          className="w-[430px] hidden md:block"
        />

        <Link to="/">
        
          <ArrowLeft className="absolute top-[27px] left-[20px] md:top-[20px] md:left-[20px]" size={28}/>
        </Link>
      </section>
    </div>
  );
};

export default Login;

const styles = {
  main: "flex items-center justify-center min-h-screen bg-black overflow-x-hidden",
  section:
  "relative flex flex-col m-6 space-y-10 bg-grayLight shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0",
  button: "w-full md:w-auto flex justify-center items-center p-6 font-sans space-x-4 font-bold text-white rounded-md shadow-lg px-9 bg-black shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-tranlate-y-0.5 duration-150"
};

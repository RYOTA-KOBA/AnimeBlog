import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { PostProvider } from "../components/context/PostContext";

function MyApp({ Component, pageProps }) {
  return (
    <PostProvider>
      <Component {...pageProps} />
    </PostProvider>
  );
}

export default MyApp;

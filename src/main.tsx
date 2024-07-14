import ReactDOM from "react-dom/client";
import Users from "./components/users";
import "./index.css";
import axios from "axios";
import { setupInterceptorsTo } from "./interceptor";

setupInterceptorsTo(axios);

ReactDOM.createRoot(document.getElementById("root")!).render(<Users />);

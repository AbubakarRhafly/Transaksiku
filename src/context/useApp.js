import { useContext } from "react";
import AppContext from "./AppContextBase.js";
export default function useApp() { return useContext(AppContext); }


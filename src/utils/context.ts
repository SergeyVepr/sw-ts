import {createContext} from "react";
import type {SWContextValue} from "./types";
import {defaultHero} from "./constants.ts";


export const SWContext = createContext<SWContextValue>({
    hero: defaultHero || "Error",
    changeHero: (hero?: string) => console.log(hero)
});

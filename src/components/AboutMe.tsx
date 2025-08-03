import {characters, period_month} from "../utils/constants.ts";
import {useEffect, useState} from "react";
import type {HeroInfo} from "../utils/types";
import ErrorPage from "./ErrorPage.tsx";
import {useErrorPage} from "../hooks/useErrorPage.tsx";

const AboutMe = () => {
    const [hero, setHero] = useState<HeroInfo>();
    const {isError, heroId} = useErrorPage();

    useEffect(() => {

        if(isError) return;
        const hero = JSON.parse(localStorage.getItem(heroId)!);
        if (hero && ((Date.now() - hero.timestamp) < period_month)) {
            setHero(hero.payload);
        } else {
            fetch(characters[heroId].url)
                .then(response => response.json())
                .then(data => {
                    const info = {
                        name: data.name,
                        gender: data.gender,
                        birth_year: data.birth_year,
                        height: data.height,
                        mass: data.mass,
                        hair_color: data.hair_color,
                        skin_color: data.skin_color,
                        eye_color: data.eye_color
                    }
                    setHero(info);
                    localStorage.setItem(heroId, JSON.stringify({
                        payload: info,
                        timestamp: Date.now()
                    }));
                })
        }
    }, [heroId])

    return !isError ? (
        <>
            {(!!hero) &&
                <div className={'flex flex-row items-start justify-around text-[2em] text-justify tracking-widest leading-14 ml-8 m-3 '}>
                    <img className={'w-120 h-auto rounded-xl shadow-lg'} src={characters[heroId].img}
                         alt={characters[heroId].name}/>
                    <div className={'flex flex-col text-justify'}>
                        {Object.entries(hero).map(([key, value]) => (
                            <div key={key} className="flex flex-row mb-2">
                                <div className="w-58 font-bold capitalize text-2xl">{key.replace('_', ' ')} :</div>
                                <div className="text-2xl ml-4">{value}</div>
                            </div>
                        ))}
                    </div>


                </div>
            }
        </>
    ) : <ErrorPage/>;
};

export default AboutMe;
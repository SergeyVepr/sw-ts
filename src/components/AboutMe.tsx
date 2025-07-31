import {characters, period_month} from "../utils/constants.ts";
import {useEffect, useState} from "react";
import type {HeroInfo} from "../utils/types";
import ErrorPage from "./ErrorPage.tsx";
import {useErrorPage} from "../hooks/useErrorPage.tsx";

const AboutMe = () => {
    const [hero, setHero] = useState<HeroInfo>();
    const {isError, heroId} = useErrorPage();

    useEffect(() => {

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
                <div className={'flex flex-col text-[2em] text-justify tracking-widest leading-14 ml-8'}>
                    <img className={'w-64 h-auto rounded-xl shadow-lg'} src={characters[heroId].img} alt={characters[heroId].name} />
                    {Object.keys(hero).map(key => <p key={key}>
                        <span
                            className={'text-3xl capitalize flex text-center'}>{key.replace('_', ' ')}</span>: {hero[key as keyof HeroInfo]}

                    </p>)}


                </div>
            }
        </>
    ) : <ErrorPage/>;
};

export default AboutMe;
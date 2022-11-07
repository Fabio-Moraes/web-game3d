import { useEffect, useState } from "react";
import { useKeyboard } from "../hooks/useKeyboard";
import { useStore } from "../hooks/useStore";
import { dirtImg, grassImg, glassImg, logImg, woodImg, fireImg } from '../images/menu/images'


const images = {
	dirt: dirtImg,
	grass: grassImg,
	glass: glassImg,
	wood: woodImg,
	log: logImg,
	fire: fireImg
}

export const TextureSelector = () => {
	const [visible, setVisible] = useState(false);
	const [activeTexture, setTexture] = useStore((state) => [state.texture, state.setTexture]);
	const {
		dirt,
		grass,
		glass,
		wood,
		log,
		fire,
	} = useKeyboard();

	useEffect(() => {
		const textures = {
			dirt,
			grass,
			glass,
			wood,
			log,
			fire,
		}
		const pressedTexture = Object.entries(textures).find(([k, v]) => v)
		if (pressedTexture) {
			setTexture(pressedTexture[0])
		}
	}, [setTexture, dirt, grass, glass, wood, log, fire])

/* 	useEffect(() => {
		const visibilityTimeout = setTimeout(() => {
			setVisible(false)
		}, 200)
		setVisible(true)
		return () => {
			clearTimeout(visibilityTimeout)
		}
	}, [activeTexture]) */

	return dirt || grass || glass || wood || log || fire ? (
			<div className='absolute centered texture-selector'>
				{Object.entries(images).map(([k, src]) => {
					return (<img
						key={k}
						src={src}
						alt={k}
						className={`${k === activeTexture ? 'active' : ''}`}
					/>)
				})}
			</div>
		) : null
}
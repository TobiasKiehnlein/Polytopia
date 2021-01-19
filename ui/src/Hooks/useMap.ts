import { useEffect, useRef, useState } from 'react';

const useMap = () => {
	const [ map, setMap ] = useState<Tiles[][]>([ [] ]);
	useEffect(() => {
		fetch('/dummyData.json').then(data => data.json().then(parsedData => {
			setMap(parsedData.tiles);
		}));
	}, []);
	
	return map;
};

export const useTestWebSocket = () => {
	let ws = useRef<WebSocket>(new WebSocket('wss://localhost:6789'));
	
	useEffect(() => {
		ws.current.onopen = () => console.log('ws opened');
		ws.current.onclose = () => console.log('ws closed');
		
		ws.current.onmessage = e => {
			const message = JSON.parse(e.data);
			console.log('e', message);
		};
		
		return () => {
			ws.current?.close();
		};
	}, []);
};

export enum Tiles {
	PLAIN = 'PLAIN',
	VILLAGE = 'VILLAGE',
	FOREST = 'FOREST',
	FOG = 'FOG',
	MOUNTAIN = 'MOUNTAIN',
	SHALLOW_WATER = 'SHALLOW_WATER',
	DEEP_WATER = 'DEEP_WATER',
	CITY = 'CITY'
}

export enum Tribes {
	AI_MO = 'AiMo',
	AQUARION = 'Aquarion',
	BARDUR = 'Bardur',
	ELYRION = 'Elyrion',
	HOODRICK = 'Hoodrick',
	IMPERIUS = 'Imperius',
	KICKOO = 'Kickoo',
	LUXIDOR = 'Luxidor',
	OUMAJI = 'Oumaji',
	POLARIS = 'Polaris',
	QUETZALI = 'Quetzali',
	VENGIR = 'Vengir',
	XIN_XI = 'XinXi',
	YADAKK = 'Yadakk',
	ZEBASI = 'Zebasi'
}

export const TribeInfo = {
	AiMo: { name: 'Ai-Mo' },
	Aquarion: { name: 'Aquarion' },
	Bardur: { name: 'Bardur' },
	Elyrion: { name: '∑∫ỹriȱŋ' },
	Hoodrick: { name: 'Hoodrick' },
	Imperius: { name: 'Imperius' },
	Kickoo: { name: 'Kickoo' },
	Luxidor: { name: 'Luxidor' },
	Oumaji: { name: 'Oumaji' },
	Polaris: { name: 'Polaris' },
	Quetzali: { name: 'Quetzali' },
	Vengir: { name: 'Vengir' },
	XinXi: { name: 'Xin-Xi' },
	Yadakk: { name: 'Yadakk' },
	Zebasi: { name: 'Zebasit' }
};

export default useMap;

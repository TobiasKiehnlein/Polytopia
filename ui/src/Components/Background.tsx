import React, { useEffect, useRef } from 'react';
import useMap, { Tiles, Tribes } from '../Hooks/useMap';

const Background: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	
	const map = useMap();
	
	useEffect(() => {
		const ctx = canvasRef.current?.getContext('2d');
		const canvas = canvasRef.current;
		if (!ctx || !canvas) {
			return;
		}
		
		const tileHeight = canvas.height / map.length;
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		const tribe = Tribes.AI_MO;
		map.forEach((tiles, x) => {
			tiles.map(async (tile, y) => {
				const [ imgX, imgY ] = calculatePosition(canvas.height, tileHeight, x, y);
				ctx.drawImage(await getImage(tribe, Tiles.PLAIN), imgX, imgY, tileHeight, tileHeight);
				
			});
		});
	}, [ map ]);
	
	return <canvas ref={ canvasRef } width={ 1000 } height={ 1000 }/>;
};

let lengthTable: number[] = [];

function calculatePosition(canvasHeight: number, tileHeight: number, x: number, y: number): [ x: number, y: number ] {
	const width = Math.round(canvasHeight / tileHeight);
	if (!lengthTable.length) {
		for (let i = 0; i < width * 2; i++) {
			lengthTable.push(i <= width ? i + 1 : (width * 2) - i);
		}
		console.log(lengthTable);
	}
	// find row
	let pos = x * width + y;
	let row = -1;
	for (const length of lengthTable) {
		row++;
		if ((pos -= length) < 0) {
			break;
		}
	}
	return [ Math.abs(pos) * width, row * tileHeight * 0.4 ];
}

async function getImage(tribe: Tribes, tile: Tiles) {
	return new Promise<HTMLImageElement>((resolve => {
		const img = new Image();
		img.onload = () => {
			resolve(img);
		};
		// const tribe = Tribes.AI_MO;
		img.src = `/assets/Tribes/${ tribe }/ground.png`;
	}));
}

export default Background;

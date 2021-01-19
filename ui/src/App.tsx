import React from 'react';
import './App.scss';
import Background from './Components/Background';
import { useTestWebSocket } from './Hooks/useMap';

function App() {
	useTestWebSocket();
	
	return (
		<>
			<Background/>
		</>
	);
}

export default App;

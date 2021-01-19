import React from 'react';
import './App.scss';
import Background from './Components/Background';
import { useTestWebSocket } from './Hooks/useMap';

function App() {
	const sendDummy = useTestWebSocket();
	
	return (
		<>
			<Background/>
			<div style={ { width: 200, height: 100, background: 'red', borderRadius: 5 } }
			     onClick={ () => sendDummy({ id: Math.random(), data: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore eligendi exercitationem illum qui vero! Architecto, harum, neque. A, ad adipisci autem beatae cumque dignissimos dolor ducimus, eius, exercitationem illum laborum minus nemo nisi non nostrum odio praesentium sequi soluta totam voluptate? A animi eligendi maiores officia reiciendis? Excepturi facere, laboriosam?' }) }/>
		
		</>
	);
}

export default App;

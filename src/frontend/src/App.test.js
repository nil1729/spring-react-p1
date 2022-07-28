import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

it('renders without crashing', () => {
	const div = document.createElement('div');
	div.id = 'root';
	const root = ReactDOM.createRoot(div);
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
});

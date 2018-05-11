import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import BootstrapProvider from 'bootstrap-styled/lib/BootstrapProvider';
import { makeTheme } from 'bootstrap-styled/lib/theme';
import themeKopax from './theme';
import './index.css';

const theme = {
	...makeTheme(themeKopax),
};

ReactDOM.render(<BootstrapProvider theme={theme}><App /></BootstrapProvider>, document.getElementById('root'));

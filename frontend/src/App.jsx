import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';

const App = () => {
    const code = new URLSearchParams(window.location.search).get('code');
    return code ? <Dashboard code={code} /> : <Login />;
};

export default App;
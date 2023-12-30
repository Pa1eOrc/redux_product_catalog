import { Provider } from 'react-redux';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { store } from './app/store';
import App from './App';
import { HomePage } from './pages/homePage';

export const Root = () => {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </Provider>
    </Router>
  )
}

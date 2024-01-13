import { Provider } from 'react-redux';
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom';
import { store } from './app/store';
import App from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { DetailsPage } from './pages/DetailsPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="phones">
              <Route index element={<PhonesPage />} />
              <Route path=":productId" element={<DetailsPage />} />
            </Route>
            <Route path="tablets">
              <Route index element={<TabletsPage />} />
              <Route path=":productId" element={<DetailsPage />} />
            </Route>
            <Route path="accessories">
              <Route index element={<AccessoriesPage />} />
              <Route path=":productId" element={<DetailsPage />} />
            </Route>
            <Route path="favourites">
              <Route index element={<FavouritesPage />} />
              <Route path=":productId" element={<DetailsPage />} />
            </Route>
            <Route path="cart">
              <Route index element={<CartPage />} />
            </Route>
            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Route>
        </Routes>
      </Provider>
    </Router>
  )
}

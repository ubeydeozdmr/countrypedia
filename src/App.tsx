import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Countries from './pages/Countries/Countries';
import About from './pages/About/About';
import Collections from './pages/Collections/Collections';
import Map from './pages/Map/Map';
import Stats from './pages/Stats/Stats';
import Profile from './pages/Profile/Profile';
import Games from './pages/Games/Games';
import Settings from './pages/Settings/Settings';
import NotFound from './pages/NotFound/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Countries />} />
      <Route path="/countries" element={<Countries />} />
      <Route path="/map" element={<Map />} />,
      <Route path="/collections" element={<Collections />} />,
      <Route path="/games" element={<Games />} />,
      <Route path="/stats" element={<Stats />} />,
      <Route path="/profile" element={<Profile />} />,
      <Route path="/about" element={<About />} />,
      <Route path="/settings" element={<Settings />} />,
      <Route path="*" element={<NotFound />} />,
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

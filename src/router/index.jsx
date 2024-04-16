import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../layout/Layout';
import Adoptar from '../pages/Adoptar';
import Donar from '../pages/donar/Donar';
import SobreNosotras from '../pages/sobreNosotras/SobreNosotras';
import Contacto from '../pages/contacto/Contacto';
import EditarInfo from '../pages/editarInfo/EditarInfo';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/adoptar',
        element: <Adoptar />,
      },
      {
        path: '/donar',
        element: <Donar />,
      },
      {
        path: '/sobreNosotras',
        element: <SobreNosotras />,
      },
      {
        path: '/contacto',
        element: <Contacto />,
      },
      {
        path: '/editarInfo/:id',
        element: <EditarInfo />,
      },
    ],
  },
]);

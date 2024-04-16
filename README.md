# Adopta Amor

Adopta Amor es un sitio web donde puedes adoptar un animal de un refugio local en Barcelona. La idea para este proyecto nació de una profunda sensibilidad hacia la situación de animales abandonados y desamparados.

## Tecnologías

`JavaScript`, `React`, `CSS`

## Características

Los usuarios pueden ver una lista de animales disponibles para adopción, filtrar por tipo de animal, tamaño y edad. Además, los usuarios tienen la opción de ofrecer sus propios animales en adopción proporcionando la información necesaria. También pueden eliminar o editar animales en la base de datos.

## Vista Previa

### Vista principal

![Captura de pantalla 2024-01-29 a las 10 00 53](https://github.com/2007riot/Proyecto-final/assets/73304608/07153c1e-3b5a-4a77-ae6e-676b7c6b9084)

### Vista de Adopción

![Captura de pantalla 2024-01-29 a las 10 35 54](https://github.com/2007riot/Proyecto-final/assets/73304608/a2f0067c-ef00-403c-b0df-0c1d63a81042)

### Vista de Animal

![Captura de pantalla 2024-01-29 a las 10 32 01](https://github.com/2007riot/Proyecto-final/assets/73304608/c062000d-961e-4fb9-845c-d51685934d3f)

### Vista de Donación de Animal

![Captura de pantalla 2024-01-29 a las 10 13 44](https://github.com/2007riot/Proyecto-final/assets/73304608/676f76a5-c66f-4738-9df9-67bc0cfc8114)

## Cómo Instalar y Ejecutar el Proyecto

Para ejecutar el proyecto, necesitas tener instalados en tu máquina VSCode y Node.js. Después de clonar el repositorio, ejecuta los siguientes comandos:

```
npm install
npm start
npm run dev
```

`npm install` - para instalar todas las dependencias

`npm start` - para ejecutar JSON-server

`npm run dev` - para ejecutar el proyecto en el navegador

### Implementación Principal

#### Crear un Router de Navegador y Configuración de Rutas

```javascript
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
        path: `/animal-info/:id`,
        element: <AnimalInfo />,
      },
      {
        path: '/casita',
        element: <Casita />,
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
```

#### Llamada a la API con axios para cargar animales desde la base de datos

```javascript
useEffect(() => {
  const data = async () => {
    const response = await axios.get('http://localhost:3000/aninmales');
    const info = await response.data;
    setAnimales(info);
    console.log(info);
  };

  data();
}, []);
```

#### Adopt animal form

```javascript
const Formulario = () => {
  const navigate = useNavigate();
  const baseURL = 'http://localhost:3000/animales';
  const [tipo, setTipo] = useState('');
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [tamaño, setTamaño] = useState('');
  const [cuidadosEspeciales, setCuidadosEspeciales] = useState('');
  const [aedad, setAedad] = useState(0);
  const [imagen, setImagen] = useState('');

  const storeAnimal = async (event) => {
    event.preventDefault();
    console.log(event);
    await axios.post(baseURL, {
      tipo: tipo,
      nombre: nombre,
      raza: raza,
      tamaño: tamaño,
      cuidadosEspeciales: cuidadosEspeciales,
      ubicacion: 'Barcelona',
      aedad: aedad,
      gastosDeGestion: '500€',
      imagen: imagen,
    });
    alert('Tu peludito se ha guardado correctamente');
    navigate('/adoptar');
  };

  return (
    <>
      <div className="formContainer">
        <form onSubmit={storeAnimal} className="form">
          <p>
            <b>Seleccione el tipo de animal: </b>
          </p>
          <div className="form--tipo">
            <label>
              <input
                value="Perro"
                checked={tipo === 'Perro'}
                type="radio"
                id="Perro"
                name="tipo"
                onChange={(event) => setTipo(event.target.value)}
              />
              Perro
            </label>
            <label>
              <input
                value="Gato"
                checked={tipo === 'Gato'}
                type="radio"
                id="Gato"
                name="tipo"
                onChange={(event) => setTipo(event.target.value)}
              />
              Gato
            </label>
          </div>
          <div className="contenedor--entradas--formulario">
            <div className="contenedor--entradas--divs">
              <div>
                <input
                  value={nombre}
                  type="text"
                  placeholder="Nombre"
                  onChange={(event) => setNombre(event.target.value)}
                />
              </div>
              <div>
                <input value={raza} type="text" placeholder="Raza" onChange={(event) => setRaza(event.target.value)} />
              </div>
              <div>
                <input
                  value={aedad}
                  type="number"
                  placeholder="Aedad"
                  onChange={(event) => setAedad(event.target.value)}
                />
              </div>
            </div>
            <div className="contenedor--entradas--divs">
              <div>
                <input
                  value={imagen}
                  type="text"
                  placeholder="Enlace de la foto"
                  onChange={(event) => setImagen(event.target.value)}
                />
              </div>
              <div>
                <select value={tamaño} name="tamaño" id="tamaño" onChange={(event) => setTamaño(event.target.value)}>
                  <option hidden selected className="select--option">
                    Tamaño
                  </option>
                  <option value="grande" className="select--option">
                    Grande
                  </option>
                  <option value="mediano" className="select--option">
                    Mediano
                  </option>
                  <option value="pequeño" className="select--option">
                    Pequeño
                  </option>
                </select>
              </div>
              <div>
                <input
                  value={cuidadosEspeciales}
                  type="text"
                  placeholder="Cuidados del animal"
                  onChange={(event) => setCuidadosEspeciales(event.target.value)}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="boton-adopta">
            Guardar
          </button>
        </form>
      </div>
    </>
  );
};
```

### Implementación Futura

- Mejorar consultas de medios
- Agregar desplazamiento a la página de inicio
- Mejorar la funcionalidad de filtro
- Separar lógica de componentes
- Agregar carrito de compras

### Desarrollado por

- [Cris](https://www.linkedin.com/in/cristinacasasdesign/)
- [Galina](https://www.linkedin.com/in/galexanrova/)
- [Luciana](https://www.linkedin.com/in/lbonu/)
- [Mar](https://www.linkedin.com/in/mar-domenech-/)
- [Ziortza](https://www.linkedin.com/in/ziortzarl/)

##### Proyecto creado durante el bootcamp de desarrollo frontend en [Factoria F5](https://factoriaf5.org/)

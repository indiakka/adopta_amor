import './header.css';
import BotonDona from '../botones/botonDona/BotonDona';
import BotonAdopta from '../botones/botonAdopta/BotonAdopta';

const Header = () => {
  return (
    <>
      <div className="contenedor-header">
        <div className="botones-header">
          <BotonAdopta />
          <BotonDona />
        </div>
      </div>
    </>
  );
};

export default Header;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filtro from '../components/filtro/Filtro';
import TarjetaAnimal from '../components/tarjeta/TarjetaAnimal';
import Paginacion from '../components/pagination/Paginacion';
import { recibirAnimales } from '../axios';

const Adoptar = () => {
  const [animales, setAnimales] = useState([]);
  const [animalesFiltradosYMezclados, setAnimalesFiltradosYMezclados] = useState([]);
  const [criteriosFiltro, setCriteriosFiltro] = useState({ tipo: [], tamano: [], edad: [] });
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 6;

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const animales = await recibirAnimales();
        setAnimales(animales);
      } catch (error) {
        console.error('Error al obtener datos: ', error);
      }
    };

    obtenerDatos();
  }, []);

  const manejarCambioFiltro = (filtroSeleccionado, valor) => {
    setCriteriosFiltro((filtroActual) => ({
      ...filtroActual,
      [filtroSeleccionado]: valor,
    }));
  };

  useEffect(() => {
    let animalesFiltrados = animales.filter((animal) => {
      if (criteriosFiltro.tipo.length > 0 && !criteriosFiltro.tipo.includes(animal.tipo)) {
        return false;
      }
      if (criteriosFiltro.tamano.length > 0 && !criteriosFiltro.tamano.includes(animal.tamano)) {
        return false;
      }
      if (criteriosFiltro.edad.length > 0) {
        const edad = animal.edad;
        if (criteriosFiltro.edad.includes('Cachorrito')) {
          if (!(edad >= 0 && edad <= 1)) {
            return false;
          }
        }
        if (criteriosFiltro.edad.includes('Adulto')) {
          if (!(edad > 1 && edad < 5)) {
            return false;
          }
        }
      }
      return true;
    });

    animalesFiltrados = mezclarAnimales(animalesFiltrados);

    setAnimalesFiltradosYMezclados(animalesFiltrados);
  }, [animales, criteriosFiltro]);

  const mezclarAnimales = (array) => {
    // Verificar si el array es undefined o null
    if (!array || array.length === 0) {
      return []; // Devolver un array vacío si no hay elementos
    }

    // Filtrar los animales
    let animalesFiltrados = array.filter((animal) => {
      // Lógica de filtrado
      return true; // Puedes modificar esto según tu lógica de filtro
    });

    // Mezclar los animales filtrados
    let indiceActual = animalesFiltrados.length;
    let valorTemporal, indiceAleatorio;

    while (0 !== indiceActual) {
      indiceAleatorio = Math.floor(Math.random() * indiceActual);
      indiceActual -= 1;

      valorTemporal = animalesFiltrados[indiceActual];
      animalesFiltrados[indiceActual] = animalesFiltrados[indiceAleatorio];
      animalesFiltrados[indiceAleatorio] = valorTemporal;
    }

    return animalesFiltrados;
  };

  const manejarCambioPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const borrarFiltros = () => {
    setCriteriosFiltro({ tipo: [], tamano: [], edad: [] });
  };

  const indiceUltimoElemento = paginaActual * elementosPorPagina;
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
  const elementosActuales =
    animalesFiltradosYMezclados && animalesFiltradosYMezclados.length > 0
      ? animalesFiltradosYMezclados.slice(indicePrimerElemento, indiceUltimoElemento)
      : [];

  return (
    <>
      <Filtro onClick={manejarCambioFiltro} onClearFilters={borrarFiltros} />
      <div className="tarjetas">
        {elementosActuales.map((animal) => (
          <TarjetaAnimal
            alEliminar={async () => setAnimales(await recibirAnimales())}
            key={animal.id}
            animal={animal}
          />
        ))}
      </div>
      <div className="paginacion">
        <Paginacion
          totalItems={animalesFiltradosYMezclados.length}
          itemsPorPagina={elementosPorPagina}
          paginaActual={paginaActual}
          alCambiarPagina={manejarCambioPagina}
        />
      </div>
    </>
  );
};

export default Adoptar;

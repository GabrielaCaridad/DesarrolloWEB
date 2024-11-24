import React, { useState, useEffect } from "react"; // Importa las funciones React, useState y useEffect desde la librería 'react'
import { Link } from "react-router-dom"; // Importa el componente Link para la navegación
import "./PracticeListPage.css"; // Importa el archivo CSS para los estilos de la página
import Header from "./Header"; // Importa el componente Header
import casonaImage from "./IMAGENES/Casona-2-scaled.jpg"; // Importa la imagen de fondo

const PracticeListPage = () => {
  const [practices, setPractices] = useState([]); // Almacena la lista de prácticas obtenidas
  const [error, setError] = useState(null); // Estado para el mensaje de error

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3900/api/practicas"); 
        if (!response.ok) {
          // Si la respuesta no es exitosa, lanza un error
          const errorData = await response.json();
          const errorMessage =
            errorData.mensaje || "Error al obtener las prácticas";
          throw new Error(errorMessage);
        }
        const data = await response.json(); // Convierte la respuesta a formato JSON
        setPractices(data.practicas); // Actualiza el estado 'practices' con los datos obtenidos
      } catch (error) {
        console.error(error); // Muestra el error en la consola
        setError(error.message); // Actualiza el estado de error
      }
    };

    fetchData(); 
  }, []); 

  return (
    <div className="Cabecera">
      <Header />{" "}
      {}
      <div
        className="homepage-container"
        style={{ backgroundImage: `url(${casonaImage})` }}
      >
        {/* Contenedor principal con la imagen de fondo */}
        <div className="practice-list-container">
          {/* Contenedor de la lista de prácticas */}
          <h2>Lista de Prácticas</h2>
          {error && (
            <div className="error-message">{error}</div>
          )} 
          <table>
            {/* Tabla para mostrar las prácticas */}
            <thead>
              {/* Encabezado de la tabla */}
              <tr>
                <th>Nombre de la Práctica</th>
                <th>Empresa</th>
                <th>Fecha de Inicio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Cuerpo de la tabla */}
              {practices.map((practice) => (
                // Itera sobre la lista de prácticas 
                <tr key={practice._id}>
                  {/* Asigna una clave única a cada fila (importante para React) */}
                  <td>{practice.name_practice}</td>{" "}
                  {/* Muestra el nombre de la práctica */}
                  <td>{practice.company}</td> {/* Muestra la empresa */}
                  <td>{practice.date_start}</td>{" "}
                  {/* Muestra la fecha de inicio */}
                  <td>
                    <Link to={`/practicas/${practice._id}`}>
                      Ver Detalles
                    </Link>{" "}
                    {/* Enlace para ver los detalles de la práctica */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Link to="/añadir-practica" className="add-button">
            {/* Enlace para añadir una nueva práctica */}
            Añadir Nueva Práctica
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PracticeListPage; // Exporta el componente PracticeListPage para que pueda ser usado en otras partes de la aplicación
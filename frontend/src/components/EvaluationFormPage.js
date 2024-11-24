import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./EvaluationFormPage.css";
import Header from "./Header";
import casonaImage from "./IMAGENES/Casona-2-scaled.jpg";

const EvaluationFormPage = () => {
  
  const [evaluatorName, setEvaluatorName] = useState(""); // Almacena el nombre del evaluador
  const [evaluatorRole, setEvaluatorRole] = useState("docente"); // Almacena el rol del evaluador (valor inicial: 'docente')
  const [studentName, setStudentName] = useState(""); // Almacena el nombre del estudiante
  const [evaluationDate, setEvaluationDate] = useState(""); // Almacena la fecha de la evaluación
  const [performanceRating, setPerformanceRating] = useState("excelente"); // Almacena la calificación de desempeño (valor inicial: 'excelente')
  const [comments, setComments] = useState(""); // Almacena los comentarios adicionales
  const [showPopup, setShowPopup] = useState(false); // Controla la visibilidad del popup de confirmación
  const navigate = useNavigate(); // Inicializa la función useNavigate para la navegación
  const [error, setError] = useState(null); // Estado para el mensaje de error

  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)
    setError(null); // Limpia el mensaje de error

    try {
      const response = await axios.post("http://localhost:3900/api/evaluacion", {
        
        name_evaluador: evaluatorName,
        rol: evaluatorRole,
        name_alumno: studentName,
        date_start: evaluationDate,
        calification: performanceRating,
        comentarios: comments,
      }
    );

      // Muestra el popup de confirmación si la solicitud fue exitosa
      handleShowPopup();
    } catch (error) {
      // Maneja el error y actualiza el estado de error
      console.error("Error al crear la evaluación:", error);
      setError(error.message);
    }
  };

  const handleShowPopup = () => {
    setShowPopup(true); // Actualiza el estado para mostrar el popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Actualiza el estado para ocultar el popup
    navigate("/Inicio"); // Redirige a la página '/Inicio'
  };

  return (
    <div className="Cabecera">
      <Header />{" "}
      {/* Renderiza el componente Header */}
      <div
        className="homepage-container"
        style={{ backgroundImage: `url(${casonaImage})` }}
      >
        {/* Contenedor principal con la imagen de fondo */}
        <div className="evaluation-form-container">
          {/* Contenedor del formulario */}
          <h2>Evaluación de Desempeño del Alumno</h2>
          {error && (
            <div className="error-message">{error}</div>
          )} 
          <form onSubmit={handleSubmit}>
            {/* Formulario con la función handleSubmit para manejar el envío */}

            <div className="form-group">
              <label htmlFor="evaluator-name">Nombre del Evaluador:</label>
              <input
                type="text"
                id="evaluator-name"
                value={evaluatorName}
                onChange={(e) => setEvaluatorName(e.target.value)} // Actualiza el estado 'evaluatorName' cuando cambia el valor del input
                required
              />
            </div>
            {}
            <div className="form-group">
              <label htmlFor="evaluator-role">Rol del Evaluador:</label>
              <select
                id="evaluator-role"
                value={evaluatorRole}
                onChange={(e) => setEvaluatorRole(e.target.value)}
                required
              >
                <option value="docente">Docente a Cargo</option>
                <option value="empleador">Empleador</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="student-name">Nombre del Alumno:</label>
              <input
                type="text"
                id="student-name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="evaluation-date">Fecha de Evaluación:</label>
              <input
                type="date"
                id="evaluation-date"
                value={evaluationDate}
                onChange={(e) => setEvaluationDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="performance-rating">
                Calificación de Desempeño:
              </label>
              <select
                id="performance-rating"
                value={performanceRating}
                onChange={(e) => setPerformanceRating(e.target.value)}
                required
              >
                <option value="excelente">Excelente</option>
                <option value="bueno">Bueno</option>
                <option value="regular">Regular</option>
                <option value="deficiente">Deficiente</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="comments">Comentarios Adicionales:</label>
              <textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>

            <button type="submit">Enviar Evaluación</button>{" "}
            {/* Botón para enviar el formulario */}
          </form>

          {}
          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <h2>Evaluación Enviada</h2>
                <p>Tu evaluación ha sido enviada con éxito.</p>
                <button onClick={handleClosePopup}>Cerrar</button>{" "}
                {/* Botón para cerrar el popup y redirigir */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EvaluationFormPage; // Exporta el componente para que pueda ser usado en otras partes de la aplicación
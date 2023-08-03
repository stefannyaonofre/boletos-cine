import React, { useEffect, useState } from "react";
import "./seleccionAsientos.scss";
import Asiento from "../asiento/Asiento";
import { MdChair } from "react-icons/md";
import useSessionStorage from "../../hooks/useSessionStorage";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailsMovie } from "../../services/getDetailsMovie";
import { getSalas } from "../../services/getSalas";
import { getTicket } from "../../services/ticket";
import Swal from "sweetalert2";

const SeleccionAsientos = () => {
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  const [movie, setMovie] = useState([]);
  const [sala, setSala] = useState([]);
  const [sillasOcupadas, setSillasOcupadas] = useState([]);
  const key = "teatroFecha";
  const keyFunction = "function";
  const keyBoletos = "boletos";
  const keyAsientos = "asientos";
  const { getInfo, saveInfo } = useSessionStorage();
  const { idMovie } = useParams();
  const teatroFecha = getInfo(key);
  const functions = getInfo(keyFunction);
  const boletos = getInfo(keyBoletos);
  const [seleccionAsientos, setSeleccionAsientos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    detailMovie();
    consultarSala();
    consultarAsientosOcupados();
  }, [seleccionAsientos]);

  const detailMovie = async () => {
    const detail = await getDetailsMovie(idMovie);
    setMovie(detail);
  };

  const consultarSala = async () => {
    const detailSala = await getSalas();
    const filter = detailSala.filter((item) => item.id == functions[0].idSala);
    setSala(filter);
  };

  const consultarAsientosOcupados = async () => {
    const response = await getTicket();
    const ocupadas = [...response?.map((item) => item.codigoSilla)].flat();
    setSillasOcupadas(ocupadas);
  };

  const generarAsientos = () => {
    const filas = "ABCDE";
    const numeroAsientosPorFila = 6;
    const asientosOcupados = sillasOcupadas;
    const asientos = [];
    for (let i = 0; i < filas.length; i++) {
      const fila = filas[i];
      for (let numero = 1; numero <= numeroAsientosPorFila; numero++) {
        const numeroAsiento = `${fila}${numero}`;
        const estado = asientosOcupados?.includes(numeroAsiento)
          ? "ocupado"
          : "disponible";
        asientos.push({ letra: fila, numero, estado });
      }
    }
    return asientos;
  };

  const asientosDisponibles = generarAsientos();

  const handleSeleccionarAsiento = (letra, numero) => {
    const asientoSeleccionado = `${letra}${numero}`;

    if (asientosSeleccionados.includes(asientoSeleccionado)) {
      setAsientosSeleccionados(
        asientosSeleccionados.filter(
          (asiento) => asiento !== asientoSeleccionado
        )
      );
      setSeleccionAsientos(
        asientosSeleccionados.filter(
          (asiento) => asiento !== asientoSeleccionado
        )
      );
    } else if (seleccionAsientos.length < boletos.cantBoletos) {
      setSeleccionAsientos([...asientosSeleccionados, asientoSeleccionado]);
      setAsientosSeleccionados([...asientosSeleccionados, asientoSeleccionado]);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `No puede seleccionar mas asientos, debido a que ya tiene la cantidad de boletos con los asientos`,
      });
    }
  };

  const pagoBoletos = () => {
    saveInfo(keyAsientos, seleccionAsientos);
    navigate(`/${idMovie}/pagos`);
  };

  return (
    <div className="chair">
      <div className="chair__left">
        <h1>Selecciona tus asientos</h1>
        <span>
          Para cambiar tu lugar asignado da click en el asiento deseado
        </span>
        <div className="tipos">
          <figure>
            <MdChair className="sele" /> <span>Seleccionado</span>
            <MdChair className="ocu" /> <span>Ocupado</span>
            <MdChair className="dis" /> <span>Disponible</span>
          </figure>
        </div>
        <div className="row-labels">
          <div className="row-label">1</div>
          <div className="row-label">2</div>
          <div className="row-label">3</div>
          <div className="row-label">4</div>
          <div className="row-label">5</div>
          <div className="row-label">6</div>
        </div>

        <div className="columChair">
          <div className="column-labels">
            <div className="column-label">A</div>
            <div className="column-label">B</div>
            <div className="column-label">C</div>
            <div className="column-label">D</div>
            <div className="column-label">E</div>
          </div>
          <div className="sillas">
            {asientosDisponibles.map((asiento) => (
              <Asiento
                key={`${asiento.letra}${asiento.numero}`}
                letra={asiento.letra}
                numero={asiento.numero}
                estado={
                  //si A1 existe en asientos seleccionados, entonces el as ha sido sele por el user
                  asientosSeleccionados.includes(
                    `${asiento.letra}${asiento.numero}`
                  )
                    ? "seleccionado"
                    : asiento.estado //estado ocupado o disponible
                }
                onSeleccionarAsiento={handleSeleccionarAsiento}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="chair__right card p-3 bg-body-secondary">
        <h1>Resumen de compra</h1>
        <div className="infpel">
          <figure>
            <img src={movie?.image} alt="pelicula" />
          </figure>
          <div className="deta">
            <span>Pelicula: {movie?.name} </span>
            <span>Cinema: {teatroFecha.teatro}</span>
            <span>Fecha: {teatroFecha.fecha}</span>
            <span>Funcion: {functions[0].horarioInicio}</span>
            <span>Boletos: {boletos.cantBoletos}</span>
            <span>Número de sala: {sala[0]?.name}</span>
            <span>Asientos:{asientosSeleccionados.join(", ")}</span>
          </div>
        </div>

        <span>
          Se realizara un cargo por servicio por cada boleto dentro de la orden
        </span>
        <h2>Total (IVA incluido): {boletos.total}</h2>
        <button onClick={pagoBoletos}>Continuar</button>
        {/* className={botonActivo ? "activeButton" : "inactiveButton"} */}
      </div>
    </div>
  );
};

export default SeleccionAsientos;

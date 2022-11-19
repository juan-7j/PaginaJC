let preguntas_correctas = JSON.parse(localStorage.getItem('correctas'));
let total_preguntas = JSON.parse(localStorage.getItem('total_preguntas'));
let puntaje = JSON.parse(localStorage.getItem("puntaje"));

console.log(preguntas_correctas);
console.log(total_preguntas);
console.log(puntaje);

const mostrar_puntaje = document.querySelector('#puntaje');
const mostrar_total_preguntas = document.querySelector('#preguntas_totales');
const mostrar_total_correctas = document.querySelector('#preguntas_correctas');
const mostrar_afirmacion = document.querySelector('#afirmacion_puntaje');

var afirmacion = ['El mejor puntaje!!', 'Excelente puntaje!!', 'Buen puntaje!!', 'Puedes mejorar!!', 'Lo intentaste!!', 'Al menos aprendiste!!'];
let n_afirmacion;
let P_erradas = total_preguntas - preguntas_correctas;

if (P_erradas == 0) {
    n_afirmacion = 0;
} else if (P_erradas <= 3) {

    n_afirmacion = 1;
} else if (P_erradas <= 7) {

    n_afirmacion = 2;
} else if (P_erradas <= 10) {

    n_afirmacion = 3;
} else if (P_erradas <= 13) {

    n_afirmacion = 4;
} else {

    n_afirmacion = 5;
}


mostrar_puntaje.innerHTML = puntaje;
mostrar_total_preguntas.innerHTML = total_preguntas;
mostrar_total_correctas.innerHTML = preguntas_correctas;
mostrar_afirmacion.innerHTML = afirmacion[n_afirmacion];
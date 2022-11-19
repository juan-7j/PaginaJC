window.addEventListener("load", startAll);
let init = JSON.parse(localStorage.getItem('cont'));


const Preguntas = [
    {
        Pregunta: '¿Donde se origina el rap?',
        'respuesta_1': 'En Estados Unidos, California-South Gate',
        'respuesta_2': 'En Estados Unidos, New York-Bronx',
        'correcta': 2
    },
    {
        Pregunta: '¿Que siginifican las siglas de la palabra RAP?',
        'respuesta_1': 'Rhythm and poetry - Ritmo y poesía',
        "respuesta_2": 'Romance and production - Romance y producción',
        'correcta': 1
    },
    {
        Pregunta: '¿Quienes fueron considerados el padre y la madre del rap?',
        'respuesta_1': 'DJ Kool Herc y Cindy Campbell',
        "respuesta_2": 'Jay Z y JLo(Jennifer Lopez)',
        'correcta': 1
    },
    {
        Pregunta: '¿Que papel tuvieron las prendas de ligas deportivas en el rap?',
        'respuesta_1': 'Exceso de uso de vestimenta',
        "respuesta_2": 'Reventa',
        'correcta': 1
    },
    {
        Pregunta: '¿Cual fue un grupo pionero en el desarrollo del Rap?',
        'respuesta_1': 'N.W.A',
        "respuesta_2": 'G Unit',
        'correcta': 1
    },
    {
        Pregunta: '¿Cuales fueron los años mas represntativos para la cultura rap?',
        'respuesta_1': '90s y 2000s',
        "respuesta_2": '80s y 90s',
        'correcta': 1
    },
    {
        Pregunta: '¿Que es el freestyle en el rap?',
        'respuesta_1': 'Graffitis y skateboard',
        'respuesta_2': 'Estilo de improvisacion libre con o sin instrumentales',
        'correcta': 2
    },
    {
        Pregunta: '¿Solo la comunidad afro estadounidense tuvo lugar los inicios del rap?',
        'respuesta_1': 'No, tambien hubo comunidad latina con exitos globales',
        "respuesta_2": 'Si se adueñaron del genero desde un principio',
        'correcta': 1
    },
    {
        Pregunta: '¿Quien lidero el mercado en los 2000s a pesar de no ser negro?',
        'respuesta_1': 'Vanilla Ice',
        "respuesta_2": 'Eminem',
        'correcta': 2
    },
    {
        Pregunta: 'Algunas de las marcas de ropa de artistas son: ',
        "respuesta_1":  'G Unit, MOBB DEEP',
        'respuesta_2': 'NFL, MLB',
        'correcta': 1
    }
]

let total_preguntas = [Preguntas.length];
localStorage.setItem("total_preguntas", total_preguntas);

const id_ = document.querySelector("#index_pregunta");
const pregunta = document.querySelector("#question");
const boton = document.querySelector("#boton_submit");
const respuesta1 = document.querySelector("#answer1");
const respuesta2 = document.querySelector("#answer2");
const cont_pregunta1 = document.querySelector("#cont1");
const cont_pregunta2 = document.querySelector("#cont2");
respuesta_seleccionada = 0;

function startAll(e) {
    e.preventDefault();
    cont_pregunta1.addEventListener('click', agregar_clase1);
    cont_pregunta2.addEventListener('click', agregar_clase2);
    boton.addEventListener('click', Evaluar_respuesta);
}

cambiar_pregunta(init);

// Funciones de eventos
function agregar_clase1(e) {
    e.preventDefault();
    cont_pregunta1.classList.add("seleccionado");
    cont_pregunta2.classList.remove("seleccionado");
    respuesta_seleccionada = 1;
}

function agregar_clase2(e) {
    e.preventDefault();
    cont_pregunta2.classList.add("seleccionado");
    cont_pregunta1.classList.remove("seleccionado");
    respuesta_seleccionada = 2;
}


function cambiar_pregunta(cont) {
    // iteración de preguntas
    if(cont == 10){
        id_.innerHTML = cont;
    }else{
        id_.innerHTML = cont + 1;
    }
    pregunta.innerHTML = Preguntas[cont].Pregunta;
    respuesta1.innerHTML = Preguntas[cont].respuesta_1;
    respuesta2.innerHTML = Preguntas[cont].respuesta_2;
    
    if (cont >= 9) {
        boton.addEventListener('click', () => {
            setTimeout(() => {
                location.href = "./points.html";
            }, 950);
        });
    }
}

esCorrecta = (n_ask, id_preg) => {
    let answer;
    if (n_ask == Preguntas[id_preg].correcta) {
        answer = true;
        let correctas = JSON.parse(localStorage.getItem('correctas'));
        correctas++;
        localStorage.setItem('correctas', correctas);
    } else {
        answer = false;
    }
    MarcarRespuesta(answer, n_ask)
    return answer;
}

function MarcarRespuesta(val, id) {

    if (val) {
        switch (id) {
            case 1:
                cont_pregunta1.classList.add("correcto");
                break;
            case 2:
                cont_pregunta2.classList.add("correcto");
                break;
        }
    } else {
        switch (id) {
            case 1:
                cont_pregunta1.classList.add("incorrecto");
                break;
            case 2:
                cont_pregunta2.classList.add("incorrecto");
                break;
        }
    }
}

function Evaluar_respuesta(e) {
    e.preventDefault();

    if (respuesta_seleccionada != 0) {

        let puntos = JSON.parse(localStorage.getItem('puntaje'));
        let num = JSON.parse(localStorage.getItem('cont'));

        if (esCorrecta(respuesta_seleccionada, num)) {
            puntos += 10;
        } else {
            puntos -= 5;
        }
        localStorage.setItem('puntaje', puntos);

        setTimeout(() => {
            num++;
            cambiar_pregunta(num);
            localStorage.setItem('cont', num);

            Limpiar_pantalla();
        }, 2000);
    } else {
        swal("Selecciona una respuesta", '', 'warning');
    }
}

function Limpiar_pantalla() {
    cont_pregunta1.classList.remove("seleccionado", "incorrecto", "correcto");
    cont_pregunta2.classList.remove("seleccionado", "incorrecto", "correcto");
    respuesta_seleccionada = 0;
}
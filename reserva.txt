### codigos de reserva

// coleccion - cantidad de dias en mes
// meses del 0 al 11
const meses = {
    '0': 31,
    '1': 28,
    '2': 31,
    '3': 30,
    '4': 31,
    '5': 30,
    '6': 31,
    '7': 31,
    '8': 30,
    '9': 31,
    '10': 30,
    '11': 31
};

# -----

const month = day * 30;
const year = (month * 12) + 5;

# -----

/*
    
    este while es para el proyecto grande: ( venir a buscar cuando arranquemos ese proyecto !!!)
    
    let mesFuturo = fechaFutura.getMonth();
    let mesActual = fechaActual.getMonth() + 1;
    let daysWithMonths = 0;
    let monthCounter = 0;

    while (mesActual != mesFuturo) {
        if ( mesActual === 11){
            mesActual = 0;
        }
        if (diasRestantes > daysWithMonths) {
            daysWithMonths += meses[mesActual];        
        }
        mesActual++;
        monthCounter++;
    };

    // estas constantes se usarian en caso de que hayan mas de 30 dias
    // ejemplo, los dias restantes son 65 -> en el casillero de mes iria un 2 y en el casillero de dias iria un 5
    const remainingMonths = Math.floor(monthCounter);
    const remainingDays = (Math.floor(diasRestantes) - daysWithMonths); // Math.floor(diasRestantes);

*/


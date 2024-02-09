// Crear una función que devuelve una promesa
function realizarOperacionAsincrona() {
  return new Promise((resolve, reject) => {
    // Simular una operación asincrónica (por ejemplo, una solicitud HTTP)
    setTimeout(() => {
      const exito = true; // Cambia a false para simular un error

      if (exito) {
        // Si la operación tiene éxito, resuelve la promesa
        resolve('Operación completada con éxito');
      } else {
        // Si hay un error, rechaza la promesa
        reject('Hubo un error en la operación');
      }
    }, 2000); // Simula una operación que tarda 2 segundos
  });
}

// const data = realizarOperacionAsincrona()

// console.log(data)

// PROMISES
// realizarOperacionAsincrona()
//   .then((res) => {
//     console.log(res);
//     console.log(res + ' pepito');
//   })
//   .catch((err) => {
//     console.error(err);
//   })
//   .finally(() => {
//     console.log('se ejecuta independientemente del then o catch');
//   });

// ASYNC AWAIT
const fnAsincrona = async () => {
  try {
    const resp = await realizarOperacionAsincrona();
    console.log(resp);
  } catch (error) {
    console.warn(error);
  } finally {
    console.log('se ejecuta independientemente del then o catch');
  }
};
fnAsincrona();

// async function fnAsincrona2() {
//   try {
//     const resp = await realizarOperacionAsincrona();
//     console.log(resp);
//   } catch (error) {
//     console.warn(error);
//   } finally {
//     console.log('se ejecuta independientemente del then o catch');
//   }
// }

// const resp = await realizarOperacionAsincrona();
// console.log(resp);
// fnAsincrona2();

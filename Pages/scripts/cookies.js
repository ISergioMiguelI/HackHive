 // Função para definir um cookie
 function setCookie(nome, valor, diasParaExpirar) {
    const data = new Date();
    data.setTime(data.getTime() + diasParaExpirar * 24 * 60 * 60 * 1000);
    const expira = "expires=" + data.toUTCString();
    document.cookie = nome + "=" + valor + ";" + expira + ";path=/";
  }

  // Função para obter o valor de um cookie
  function getCookie(nome) {
    const nomeCookie = nome + "=";
    const cookies = decodeURIComponent(document.cookie).split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(nomeCookie) === 0) {
        return cookie.substring(nomeCookie.length, cookie.length);
      }
    }
    return "";
  }

  // Exemplo de uso:
  // Definir um cookie "username" e valor "alf" que expira num 1 dia
  setCookie("username", "alf", 1);

  // Obter o valor do cookie "username"
  const username = getCookie("username");
  console.log(username); // Saída: alf

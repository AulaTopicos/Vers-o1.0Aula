function includeHTML() {
    /* Cria variáveis */
    var z, i, elmnt, file, xhttp;

    /* variável "z" = puxa todas as tags, ou seja, todos os elementos no HTML */ 
    z = document.getElementsByTagName("*"); // "*" = "todos"
    /* loop por todos os elementos HTML */
    for (i = 0; i < z.length; i++) { // z.length garante que o loop pegue todos os elementos, pois "varre" todo o comprimento da variável previamente definida 
    elmnt = z[i]; // variável "elmnt" recebe cada um desses elementos HTML varridos pelo "z", um a um
    
    /* procura por um elemento com um certo atributo */
    file = elmnt.getAttribute("MeuAtributoSeChamaInclude"); // variável "file" recebe o valor do "elmnt" chamando a função getAttribute, que define o valor do nosso atributo

    if (file) {
        /* Fazer um request HTTP usando o valor do atributo como nome do arquivo, podendo utilizar ele como uma tag comum (para melhor vizualização, olha lá no arquivo "index.html") */
        xhttp = new XMLHttpRequest(); // variável xhttp recebe valor de novo request HTTP

        /* cria função de verificação se está tudo certo com o algorítimo e execução do mesmo */
        xhttp.onreadystatechange = function() { 
            /* se o algorítimo chamou algo */
            if (this.readyState == 4) { // ready state 4 = operação concluída
                if (this.status == 200) { // status de 200 a 299 = resposta de sucesso, então chama o arquivo html que vc quer incluir
                    elmnt.innerHTML = this.responseText;
                } 
                if (this.status == 404) { // status de 400 a 499 = erro de cliente, então não encontrou a página qual vc tentou incluir (caminho errado, erro de digitação, etc)
                    elmnt.innerHTML = "Page not found.";
                } 
                /* se o algorítimo não foi executado, remove o atributo */
                elmnt.removeAttribute("include");
                /* e chama a função mais uma vez */
                includeHTML();
            }
        }
        /* O método XMLHttpRequest "open()" inicializa uma nova requisição ou reinicializa uma requisição já existente */
        xhttp.open("GET", file, true);
        /* O método XMLHttpRequest "send()" envia a solicitação ao servidor */
        xhttp.send();
        
        /* return para sair da função */
        return;
        }
      }
    }
    // chama a função includeHTML recém criada
    includeHTML();
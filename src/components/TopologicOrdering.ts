// essa funcao recebe um grafo (objeto) já pronto e retorna a ordenação topológica dele
function topologicOrdering(dependences){
    const sorted = []; //constante array que terá os elementos ordenados topologicamente
    const visited = {}; //objeto elementos já visitados

    function toposort(elem){
        if(visited[elem]){ //se esse elemento faz parte do visitado, a função não segue
            return;
        }
        visited[elem] = true; //setando o elemento como visitado
        for(const dependence of dependences[elem]){ //percorrendo todas as dependencias do elemento, ou seja, todos os elementos que ele se liga
            toposort(dependence);//chamada da função recursivamente
        }
        sorted.push(elem); //adicionando o elemento depois que percorremos todos os elementos que ele se liga
    }

    for(const elem of Object.keys(dependences)){ //percorrendo as chaves do objeto (No caso o grafo das disciplinas ainda não cursadas)
        toposort(elem);
    }
    sorted.reverse();//a lista está investida, por isso precisamos reverter.
    return sorted;
}
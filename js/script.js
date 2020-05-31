

const btnSearch = document.querySelector("#btnSearch");
const showUser = document.querySelector("#showUser");
const namePesquisa = document.querySelector("#namePesquisa");

const sexoMasculino = document.querySelector("#sexoMasculino");
const sexoFeminino = document.querySelector("#sexoFeminino");

const userFilt = document.querySelector("#userFilter");
const userEstatistica = document.querySelector("#userEstatistica");

const somaIdades = document.querySelector("#somaIdades");
const mediaIdades = document.querySelector("#mediaIdades");
const loading = document.querySelector("#loading");

// console.log(loading);

allDados = [];
newAllUsers = [];


let userFilter = document.querySelector("#userFilter");
window.addEventListener('load', () => {


    fetchCountries();

    namePesquisa.addEventListener('keyup', searchName);


});


async function fetchCountries() {
    const api = await fetch("https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo");
    const dados = await api.json();

    // console.log(dados);
    allDados = dados.results.map(results => {
        const { name, picture, dob, gender } = results;
        return {
            name: name.first + ' ' + name.last,
            urlImage: picture.thumbnail,
            age: dob.age,
            gender,
        }
    });

}

function render() {
    renderUsers();
}

function renderUsers() {
    let peopleHTML = '<div>';

    newAllUsers.forEach(results => {
        const { name, urlImage, age } = results;

        const divHTML = `
        <div id="users-list-grid">
            <div>
                <img src="${urlImage}" alt="${name}" class="add"/>
            </div>
            <div class="nameSize">
                <ul>
                    <li>${name}, ${age} anos</li>
                </ul>
            </div>
        </div>
        `;
        peopleHTML += divHTML;
    });

    peopleHTML += '</div>';
    showUser.innerHTML = peopleHTML;
}

function searchName() {
    var i = setInterval(function () {
        clearInterval(i);
        loading.style.src = 'img/loading-icon';
        console.log(loading);
    }, 3000);
    let namePesquisa = document.querySelector("#namePesquisa");
    let nameFilter = namePesquisa.value;
    if (nameFilter.length > 0) {
        filtraDados(nameFilter);
    } else {
        limpaDados();
    }

}

function filtraDados(name) {
    newAllUsers = allDados.filter((results) =>
        results.name.toLowerCase().includes(name.toLowerCase())
    );
    if (newAllUsers.length > 0) {
        render();
        estatistica();
    } else {
        limpaDados();
    }

}

function estatistica() {


    const qtdUser = newAllUsers.length;
    const somaIdade = newAllUsers.reduce((acc, curr) => {
        return acc + curr.age;
    }, 0);
    // console.log(qtdUser);
    const mediIDade = somaIdade / qtdUser;

    const masculino = newAllUsers.filter((results) => results.gender === 'male');
    const feminino = newAllUsers.filter((results) => results.gender === 'female');

    if (masculino.length > 0 || feminino.length > 0) {
        sexoMasculino.innerHTML = `Sexo Masculino: ${masculino.length}`;
        sexoFeminino.innerHTML = `Sexo Feminino: ${feminino.length}`;
        userFilt.textContent = `${qtdUser} Usuarios encontrados`;
        userEstatistica.textContent = 'Estatisticas';
        somaIdades.textContent = `Soma das Idades: ${somaIdade}`;
        mediaIdades.textContent = `Media das Idades: ${mediIDade.toFixed(2)}`;
    }
}
function limpaDados() {
    userFilt.textContent = `Nenhum usuarios encontrado`;
    sexoMasculino.innerHTML = '';
    sexoFeminino.innerHTML = '';

    userEstatistica.textContent = 'Nada a ser exibido';
    somaIdades.textContent = '';
    mediaIdades.textContent = '';
    showUser.innerHTML = '';
}
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-produto')
const sTipo = document.querySelector('#m-tipo')
const sPreco = document.querySelector('#m-preco')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

/**Abre o menu para  add itens ao clicar no botão incluir */
function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {//se o index for estritamente diferente de -1
            modal.classList.remove('active')//a liste para remoção é ativada
        }
    }
    //verifica os valores dos itens editados
    if (edit) {
        sNome.value = itens[index].produto
        sTipo.value = itens[index].tipo
        sPreco.value = itens[index].preco
        id = index
      } else {
        sNome.value = ''
        sTipo.value = ''
        sPreco.value = ''
      }
}

/**Edita os itens */
function editItem(index) {

    openModal(true, index)
}

/**Deleta os itens */
function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

/**Inseri os itens na tabela */
function insertItem(item, index) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.produto}</td>
      <td>${item.tipo}</td>
      <td>R$ ${item.preco}</td>
      <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `
    tbody.appendChild(tr)
  }

  /**Botão salvar */
  btnSalvar.onclick = e => {

    if (sNome.value == '' || sTipo.value == '' || sPreco.value == "") {//verifica se os valores estão vazios, se tiver retorna
        return
    }

    e.preventDefault();

    if (id !== undefined) {//verifica se o id é estritamente diferente de undefined
        itens[id].produto = sNome.value
        itens[id].tipo = sTipo.value
        itens[id].preco = sPreco.value
    } else {//solicita os valores dos itens
        itens.push({'produto':sNome.value, 'tipo': sTipo.value, 'preco': sPreco.value})
    }

    setItensBD()//passa os itens para BD

    modal.classList.remove('active')
    loadItens()//carrega os itens do BD
    id = undefined  
  }

  /**Carrega os itens */
  function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })
  }

 //Pega os itens do BD local, 'dbfunc' é o nome do BD
 const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
 //Seta os itens no BD local, 'dbfunc' é o nome do BD
 const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

 loadItens()//Carrega os itens 
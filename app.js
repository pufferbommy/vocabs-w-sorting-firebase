import { saveVocab, getVocabs, deleteVocab, updateVocab } from './firebase.js'

let selectedVocab = {
  word: null,
  id: null,
}

const addBtn = document.getElementById('addBtn')
const deleteBtn = document.getElementById('deleteBtn')
const updateBtn = document.getElementById('updateBtn')

window.addEventListener('DOMContentLoaded', async () => {
  loadingIn()
  const querySnapshot = await getVocabs()
  loadingOut()
  querySnapshot.forEach((doc) => {
    createLi(doc)
  })
})

addBtn.addEventListener('click', async () => {
  const inputEl = document.getElementById('input')
  if (!inputEl.value) return
  loadingIn()
  inputEl.disabled = true
  addBtn.textContent = 'Adding...'
  await saveVocab(inputEl.value.toLowerCase())
  await refreshData()
  inputEl.value = ''
  inputEl.disabled = false
  addBtn.textContent = 'Add'
})

deleteBtn.addEventListener('click', async () => {
  loadingIn()
  await deleteVocab(selectedVocab.id)
  await refreshData()
})

updateBtn.addEventListener('click', async () => {
  loadingIn()
  const editInput = document.getElementById('editInput')

  if (editInput.value === selectedVocab.word) return

  await updateVocab(selectedVocab.id, editInput.value)
  await refreshData()
})

async function refreshData() {
  const vocabListsEl = document.getElementById('vocab-lists')
  vocabListsEl.innerHTML = ''

  const querySnapshot = await getVocabs()
  loadingOut()

  querySnapshot.forEach((doc) => {
    createLi(doc)
  })
}

function createLi(doc) {
  const vocabListsEl = document.getElementById('vocab-lists')
  const vocab = doc.data()
  const li = document.createElement('li')
  li.textContent = vocab.word
  li.style.cursor = 'pointer'
  li.classList.add('list-group-item', 'list-group-item-action', 'fs-5')
  li.addEventListener('click', () => {
    selectedVocab.word = vocab.word
    showModal(vocab.word)
    selectedVocab.id = doc.id
  })
  vocabListsEl.appendChild(li)
}

function showModal(word) {
  const modalEl = new bootstrap.Modal(document.getElementById('modal'))
  const editInputEl = document.getElementById('editInput')
  editInputEl.value = word
  modalEl.show()
}

function loadingIn() {
  const loader = `
  <div class="d-flex justify-content-center mb-4">
    <div class="spinner-grow text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`
  document.getElementById('vocab-lists').innerHTML = loader
}

function loadingOut() {
  document.getElementById('vocab-lists').innerHTML = ''
}

import { getAllNotes, getSingleNote, editNote, createNote, deleteNote} from '../api/index'



export const state = () => ({
  loading: false,
  notes: null,
  note: null,
})

export const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_NOTES(state, data) {
    state.notes = data
  },
  SET_NOTE(state, data) {
    state.note = data
  },
}

export const actions = {
  async getNotes(context) {
    context.commit('SET_LOADING', true)
    try{
      const notes = await getAllNotes()
      context.commit('SET_NOTES', notes)
    }catch(err){
      console.log('store error getNote', err)
    }finally{
      context.commit('SET_LOADING', false)
    }
  },
  async getNote(context, id) {
    context.commit('SET_LOADING', true)
    try{
      const note = await getSingleNote(id)
      context.commit('SET_NOTE', note)
    }catch(err){
      console.log('store error getNote', err)
    }finally{
      context.commit('SET_LOADING', false)
    }
  },
  async createNote(context, text) {
    context.commit('SET_LOADING', true)
    try{
      await createNote(text)
      context.dispatch('getNotes')
    }catch(err){
      console.log('store error createNote', err)
    }finally{
      context.commit('SET_LOADING', false)
    }
  },
  async editNote(context, data) {
    context.commit('SET_LOADING', true)
    try{
      await editNote(data?.id, data?.text)
      context.dispatch('getNotes')
    }catch(err){
      console.log('store error editNote', err)
    }finally{
      context.commit('SET_LOADING', false)
    }
  },
  async delete_Note(context, id) {
    context.commit('SET_LOADING', true)
    try{
      await deleteNote(id)
      context.dispatch('getNotes')
    }catch(err){
      console.log('store error deleteNote', err)
    }finally{
      context.commit('SET_LOADING', false)
    }
  }
}

export const getters = {
  getLoading: (state) => state.loading,
  getAllNotes: (state) => state.notes,
  getNote: (state) => state.note,
}

export default {
  state,
  mutations,
  actions,
  getters,
}

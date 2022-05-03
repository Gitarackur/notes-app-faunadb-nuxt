<template>
  <div>
    <div class="">
      <div v-if="!loading && All_Notes" class="md:mx-auto px-6 md:px-0 md:w-9/12">
        <div class="py-2" 
          v-for="(note) in All_Notes"
          :key="note.ref.id"
        >
          <div 
            class="flex items-center justify-between px-2 py-4 border border-radius" 
          >
            <div>
              <h5 
                class="w-full break-word" 
              >
              {{note.data.text.title}}
              </h5>
            </div>
            <div class="flex justify-between">
              <button @click="delete_Note(note.ref.id)" class="inline-block px-2 py-4 cD60000 border-radius">Delete</button>
              <nuxt-link :to='"/note/" + note.ref.id' class="inline-block px-2 py-4 #0e9f64 border-radius">Edit</nuxt-link>
              <nuxt-link :to='"/note/" + note.ref.id + "/view"' class="inline-block px-2 py-4 #0e9f64 border-radius">View</nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <div class="" v-if="!loading && (!All_Notes || All_Notes.length===0)">
        <h1 class="flex items-center justify-center border border-dashed c0e9f64 h-screen">No Notes</h1>
      </div>

      <div class="" v-if="loading">
        <h1 class="flex items-center justify-center h-screen cD60000">loading....</h1>
      </div>
    </div>

    <floating-button/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import FloatingButton from '../components/FloatingButton.vue'
export default {
  components: { FloatingButton },
  data() {
    return {
      title:'',
      description:''
    }
  },
  computed: {
    ...mapState('notes', ['loading']),
    ...mapGetters({
      Loading: ['notes/getLoading'],
      All_Notes: ['notes/getAllNotes'],
      getSingleNote: ['notes/getNote'],
    }),
  },
  methods: {
    ...mapActions('notes', 
      ['getNotes', 'getNote', 'createNote', 'delete_Note', 'editNote']
    ),
    async createNoteinFdb(){
      const data= {
        title: this.title,
        description: this.description
      }
      try{
        await this.createNote(data)
        this.$toast.success('note created successfully')
      }catch(err){
        console.log(err)
        this.$toast.error('unable to create note')
      }
    },
    async deleteNoteInFdb(id){
      try{
        await this.delete_Note(id)
        this.$toast.success('note deleted successfully')
      }catch(err){
        this.$toast.error('unable to delete note')
      }
    }
  },
  async created() {
    if(process.browser){
      try{
        await this.getNotes()
      }catch(err){
        console.log(err)
      }
    }
  },
  async mounted() {},
}
</script>

<style>
.jumbotron{
  width: 100%;
  min-height: 50vh;
}
@media (max-width: 768px) {
  .jumbotron{
    width: 100%;
    min-height: 50vh;
  }
}
</style>

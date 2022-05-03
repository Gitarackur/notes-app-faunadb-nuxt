<template>
  <div>
    <div v-show="!loading" class="md:mx-auto px-6 md:px-0 mt-10 md:w-9/12">
      <form class="" @submit.prevent="createNoteinFdb">
        <div class="mt-8">
          <label class="edge-label mb-2"> Title </label>
          <input type="text" class="edge-input" placeholder="" required v-model="title"/>
        </div>
        <div class="mt-8">
          <label class="edge-label mb-2"> Add your note description </label>
          <textarea class="edge-input" data-provide="markdown" required v-model="description"></textarea>
        </div>
        <div class="flex justify-end mt-8">
           <button type="submit" class="px-4 py-4 bg0e9f64 c-white border-radius">
           {{load ? 'loading': 'Create Note'}}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
  export default {
  data() {
    return {
      title:'',
      description:'',
      load: false
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
      this.load= true
      const data= {
        title: this.title,
        description: this.description
      }
      try{
        await this.createNote(data)
        this.$toast.success('created note successfully')
        this.$router.push('/')
      }catch(err){
        this.$toast.error('unable to create note')
      }finally{
        this.load= false
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

<style scoped>

</style>
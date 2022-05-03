<template>
  <div>
    <div v-if="!loading" class="md:mx-auto px-6 md:px-0 mt-10 md:w-9/12">
      <div class="">
        <div class="mt-8">
          <label class="edge-label mb-2"> Title </label>
          <div class="edge-input break-word">
            {{title}}
          </div>
        </div>
        <div class="mt-8">
          <label class="edge-label mb-2"> Note description </label>
          <div class="edge-input break-word">
            {{description}}
          </div>
        </div>
      </div>
    </div>

    <div class="" v-else>
      <h1 class="flex items-center justify-center h-screen cD60000">loading....</h1>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
  export default {
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
    async getNoteinFdb(){
      try{
        await this.getNote(this.$route.params.id)
        this.title = this.getSingleNote?.data?.text?.title;
        this.description = this.getSingleNote?.data?.text?.description;
      }catch(err){
        this.$toast.error('unable to get notes')
      }
    }
  },
  async created() {
    if(process.browser){
      try{
        await this.getNoteinFdb()
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
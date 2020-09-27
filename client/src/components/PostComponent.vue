<template>
  <div>
    <h1>LASTEST TASK</h1>
    <div class="create-post">
      <label for="create-post" class="create-post">Put what you want to add</label>
      <input type = "text" id="create-post" v-model = "text">
      <button v-on:click="createPost">Add task</button>
    </div>
    <div class="task" v-for="(post, index) in posts" 
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)">
        <p class="text">{{post.task}}</p>
        {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}
    </div>
  </div>
  
</template>

<script>
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: ''
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.task{
  background-color: rgb(61, 201, 124);
  margin: 1% 30% 0% 30% ;
  padding: 50px;
  border-radius: 0 20px 0 20px;
  box-shadow: 5px 5px rgb(41, 134, 99);
}
.text{
  font-size: 50px;
  
}

</style>

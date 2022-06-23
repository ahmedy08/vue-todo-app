<template>
  <div class="container-wp container d-flex justify-content-center align-items-center" style="margin-top: 10px;">
    <div>
      <h1>todo list</h1>
    </div>
    <div class="top-section" style="">
      <input type="text" placeholder="Enter a task" v-model="task" v-on:keyup.enter="submitTask()" style="padding: 6px">
      <input type="submit" value="Add to List" class="btn btn-success" @click="submitTask()" style="margin-top: -7px">

    </div>
    <div>
      <table class="table mb-4">
        <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Todo item</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(task,index) in tasks" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ task.name }}</td>
          <td @click="changeStatus(index)"  style="width: 120px; cursor: pointer; user-select: none;">{{ task.status }}</td>
          <td>
            <button type="submit" class="btn btn-success" @click="finishTask(index)">Complete</button>
            <button type="submit" class="btn btn-warning" @click="editTask(index)">Edit</button>
            <button type="submit" class="btn btn-danger" @click="deleteTask(index)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
  </div>

</template>

<script>
export default {

  data() {
    return {
      task: '',
      allStatus: ["no action", "in progress", "complete"],
      tasks: [
        {
          name: "wake-up",
          status: "in progress"
        },
        {
          name: "drink coffe",
          status: "no action"
        }
      ]
    }
  },
  methods: {
    submitTask() {
      if(this.task === '' || this.task.length < 3) return this.$toast.error("You must enter 3 characters at least!");
      this.tasks.push({
        name: this.task,
        status: "no action"
      })
      this.$toast.success("Added Successfully!")
      this.task = ''
    },
    deleteTask(index){
      this.tasks.splice(index,1)
    },
    editTask(index){

    },
    finishTask(index){
      this.tasks[index].status = "complete"
    },
    changeStatus(index){
      let newIndex = this.allStatus.indexOf(this.tasks[index].status)
      if(++newIndex > 2) newIndex = 0;
      this.tasks[index].status = this.allStatus[newIndex];
    }
  }
}
</script>

<style scoped>
.container-wp {
  border: 1px solid black;
  flex-direction: column;
  padding: 10px;
}

.btn{
  width: 100px;
}

</style>

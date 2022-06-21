<template>
  <div class="container-wp container d-flex justify-content-center align-items-center" style="margin-top: 10px;">
    <div>
      <h1>todo list</h1>
    </div>
    <div class="top-section" style="">
      <input type="text" placeholder="Enter a task" v-model="task" v-on:keyup.enter="addToList()" style="padding: 5px">
      <input type="submit" value="Add to List" class="btn btn-success" @click="submitTask">
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
            <button type="submit" class="btn btn-danger" @click="deleteTask(index)">Delete</button>
            <button type="submit" class="btn btn-success ms-1" @click="finishTask(index)">Finished</button>
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
      msg: "errorr!",
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
      if(this.task === '') return;
      this.tasks.push({
        name: this.task,
        status: "no action"
      })
      this.task = ''
    },
    addToList(){
      if(this.task === '') return;
      this.tasks.push({
        name: this.task,
        status: "no action"
      })
      this.task = ''
    },
    deleteTask(index){
      this.tasks.splice(index,1)
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

</style>

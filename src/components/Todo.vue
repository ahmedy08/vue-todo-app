<template>
  <div class="container-wp container container-custom d-flex   gx-0" style="margin-top: 10px;">

    <div class="top-section d-flex align-items-center" style="flex-direction: column">
      <div>
        <h1>todo list</h1>
      </div>
      <div>
        <input type="text" placeholder="Enter a task" v-model="task" v-on:keyup.enter="submitTask()" style="padding: 6px">
        <input type="submit" value="Add to List" class="btn btn-success" @click="submitTask()" style="margin-top: -7px; width: 100px !important">
      </div>

    </div>
    <div class="d-flex row gx-0" style="flex-direction: row;">
      <div class="top-text col">No.</div>
      <div class="top-text col">Todo item</div>
      <div class="top-text col">Status</div>
      <div class="top-text col">Actions</div>
    </div>
    <draggable class="d-flex row justify-content-center gx-0" v-model="tasks" ghost-class="ghost" @start="drag=true" @end="drag=false">
      <transition-group type="transition" name="flip-list">
        <div class="sortable d-flex row gx-0" style="flex-direction: row; margin-top: 3px; cursor:move; background: lightgrey" v-for="(task,index) in tasks" :key="index">
          <div class="bottom-text col">{{ index + 1}}</div>
          <div class="bottom-text col"> {{ task.name }}</div>
          <div class="bottom-text col" @click="changeStatus(index)" style="cursor:pointer;"> {{ task.status }}</div>
          <div class="bottom-text col">
            <button type="submit" class="btn btn-success" @click="finishTask(index)">c</button>
            <button type="submit" class="btn btn-warning" @click="editTask(index)">e</button>
            <button type="submit" class="btn btn-danger" @click="deleteTask(index)">d</button>
          </div>
        </div>
      </transition-group>
    </draggable>

  </div>

</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
  },
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
      if (this.task === '' || this.task.length < 3) return this.$toast.error("You must enter 3 characters at least!");
      this.tasks.push({
        name: this.task,
        status: "no action"
      })
      this.$toast.success("Added Successfully!")
      this.task = ''
    },
    deleteTask(index) {
      this.tasks.splice(index, 1)
    },
    editTask(index) {

    },
    finishTask(index) {
      this.tasks[index].status = "complete"
    },
    changeStatus(index) {
      let newIndex = this.allStatus.indexOf(this.tasks[index].status)
      if (++newIndex > 2) newIndex = 0;
      this.tasks[index].status = this.allStatus[newIndex];
    },
  }
}

</script>

<style scoped>
.container-wp {
  border: 1px solid black;
  flex-direction: column;
  padding: 10px;
}

.top-text {
  border: 1px solid rgba(0, 0, 0, 0.11);
  border-radius: 7px;
  text-align: center;
  margin-top: 20px;
  padding: 0 !important;
  font-weight: bold;
}

.bottom-text{
  text-align: center;
  padding: 0 !important;
}

.btn {
  width: 50px;
}

.sortable-drag{
  opacity: 0;
}

.flip-list-move{
  transition: transform 1s;
}

.ghost{
  border-left: 10px solid rgb(0, 183, 255);
  box-shadow: 4px 7px 2px 1px rgba(0,0,0,0.44);
  opacity: .7;
}

</style>

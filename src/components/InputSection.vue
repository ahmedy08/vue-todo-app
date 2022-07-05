<template>
  <div class="container-wp container container-custom d-flex">

    <div class="top-section d-flex align-items-center" style="flex-direction: column">
      <div>
        <h1>Todo List</h1>
      </div>
      <div>
        <input type="text" placeholder="Enter a task" v-model="task" v-on:keyup.enter="submitTask()"
               style="padding: 6px">
        <input type="submit" value="Add to List" class="btn btn-success" @click="submitTask()"
               style="margin-top: -7px; width: 100px !important">
      </div>
    </div>
    <div class="d-flex row gx-0" style="flex-direction: row; margin-bottom: 20px">
      <div class="top-text col">No.</div>
      <div class="top-text col">Todo item</div>
      <div class="top-text col">Status</div>
      <div class="top-text col">Actions</div>
    </div>
    <draggable class="d-flex row justify-content-center gx-0" v-model="tasks" ghost-class="ghost" @start="drag=true"
               @end="drag=false">
      <transition-group type="transition" name="flip-list">
        <div class="sortable d-flex row gx-0"
             style="flex-direction: row; margin-top: 2px; cursor:move; background: #e0e0e0; padding: 5px"
             v-for="(task,index) in tasks" :key="index"
             :class="{'complete': task.status === 'complete', 'in-progress': task.status === 'in progress', 'no-action': task.status === 'no action'}">
          <div class="bottom-text col d-flex align-items-center justify-content-center">{{ index + 1 }}</div>
          <div class="bottom-text col d-flex align-items-center justify-content-center">{{ task.name }}</div>
          <div class="bottom-text col d-flex align-items-center justify-content-center" @click="changeStatus(index)"
               style="cursor:pointer;"> {{ task.status }}
          </div>
          <div class="bottom-text col d-flex align-items-center justify-content-center">
            <button type="submit" class="btn btn-warning" @click="editTask(index)" style="margin-right: 5px">e</button>
            <button type="submit" class="btn btn-danger"  @click="deleteTask(index)">d</button>
          </div>
        </div>
      </transition-group>
    </draggable>
  </div>

</template>

<script>
import draggable from 'vuedraggable';

export default {
  components:{
    draggable,
  },
  data() {
    return {
      task: '',
      editedTask: null,
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
      if (this.editedTask === null) {
        this.tasks.push({
          name: this.task,
          status: "no action"
        })
      } else {
        this.tasks[this.editedTask].name = this.task
        this.editedTask = null
      }
      this.$toast.success("Added Successfully!")
      this.task = ''
    },

    deleteTask(index) {
      this.tasks.splice(index, 1)
    },

    editTask(index) {
      this.task = this.tasks[index].name
      this.editedTask = index
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
  max-width: 600px;
  height: 95vh;
  margin-top: 25px;
}

.top-text {
  border: 1px solid rgba(0, 0, 0, 0.11);
  border-radius: 7px;
  text-align: center;
  margin-top: 20px;
  padding: 0 !important;
  font-weight: bold;
}

.bottom-text {
  text-align: center;
  padding: 0 !important;
}

.btn {
  width: 50px;
}

.sortable-drag {
  opacity: 0;
}

.ghost {
  border-left: 10px solid rgb(0, 183, 255);
  box-shadow: 4px 7px 2px 1px rgba(0, 0, 0, 0.44);
  opacity: .7;
}

.no-action{
  background: red !important;
  transition: .5s ease;
}

.in-progress{
  background: orange !important;
  transition: .5s ease;
}

.complete{
  background: green !important;
  transition: .5s ease;
}
</style>

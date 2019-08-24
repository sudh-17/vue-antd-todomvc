<template>
  <div>
    <ul class="todo-list" ref="container">
      <li v-for="item in list" :key="item.id">
        <div class="view" v-if="!(editingId === item.id)">
          <input
            class="toggle"
            type="checkbox"
            :checked="item.completed"
            @click="(e) => onCheck(e, item.id)"
          />
          <label @dblclick="onEditing(item.id)" >{{ item.title}}</label>
          <button class="destroy" @click="onDel(item.id)"></button>
        </div>
        <input
          type="text"
          :ref="item.id"
          v-if="editingId === item.id"
          class="edit"
          :value="item.title"
          @blur="(e) => onUpdate(e, item.id)"
          @keyup.enter="(e) => onUpdate(e, item.id)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: {
    list: Array
  },
  data() {
    return {
      editingId: null
    }
  },
  methods: {
    onDel(id) {
      this.$emit('onDel', id)
    },
    onCheck(e, id) {
      let value = e.target.checked
      this.$emit('onCheck', id, value)
    },
    onEditing(id) {
      this.editingId = id
      this.$nextTick(() => {
        let edit = this.$refs[id][0]
        edit.focus()
      })
    },
    onUpdate(e, id) {
      this.editingId = null
      let val = e.target.value
      if (!val || val.trim() === '') {
        return
      }
      this.$emit('onUpdate', id, val)
    }
  }
}
</script>

<style lang="less" scoped>
.view {
  text-align: left !important;
  input[type='checkbox']:checked + label {
    color: #d9d9d9;
    text-decoration: line-through !important;
  }
}
.edit {
  top: 6px;
  position: absolute !important;
  left: 48px;
  width: 494px;
}
</style>



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
          <label @dblclick="onEditing(item.id)">{{ item.title}}</label>
          <a href="javascript:;s" class="destroy" @click="onDel(item.id)"></a>
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
.todo-list {
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    border-bottom: 1px solid #ddd;
    position: relative;
    min-height: 58px;
    &:last-child {
      border: none;
    }
    .view {
      min-height: 58px;
      position: relative;
      .toggle {
        position: absolute;
        position: absolute;
        top: 8px;
        height: 32px;
        width: 32px;
        left: 5px;
        opacity: 0;
        &:hover {
          cursor: pointer;
        }
        &:checked + label {
          background-image: url(../assets/checked.png);
          color: #d9d9d9;
          text-decoration: line-through;
        }
      }
      label {
        display: block;
        height: 100%;
        padding: 17px 36px 17px 52px;
        box-sizing: border-box;
        font-size: 24px;
        line-height: 24px;
        color: #565656;
        background-repeat: no-repeat;
        background-position: 13px 16px;
        text-overflow: ellipsis;
        white-space: pre-wrap;
        word-break: break-all;
        background-image: url(../assets/unChecked.png);
      }
      .destroy {
        position: absolute;
        right: 5px;
        top: 14px;
        display: none;
        text-decoration: none;
        font-size: 27px;
        line-height: 27px;
        height: 30px;
        width: 30px;
        color: #b30505;
        &::after {
          content: '×';
        }
      }
      &:hover {
        .destroy {
          display: block;
        }
      }
    }
    .edit {
      position: absolute;
      top: 8px;
      left: 45px;
      height: 41px;
      width: 499px;
      padding: 2px 20px;
      box-sizing: border-box;
      font-size: 25px;
      box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
      border: 1px solid #999;
      box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    }
  }
  .editing {
    .view {
      display: none;
    }
  }
}
</style>



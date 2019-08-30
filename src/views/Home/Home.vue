<template>
  <section class="todoapp fade-up">
    <header class="header">
      <h1 class="title">todos</h1>
      <input
        @keyup.enter="addItem"
        class="new-todo"
        placeholder="What needs to be completed?"
        autofocus
      />
    </header>

    <section class="main">
      <template v-if="list.length > 0">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          @click="onCheckAll"
          :checked="isAllChecked"
        />
        <label for="toggle-all"></label>
      </template>
      <List :list="todos" @onDel="delItem" @onCheck="onCheck" @onUpdate="onUpdate" />
    </section>

    <footer v-if="list.length > 0" class="footer">
      <span class="todo-count">
        <strong>{{ unCompletedCount }}</strong>
        {{ unCompletedCount > 1 ? 'items left': 'item left' }}
      </span>
      <ul class="filters">
        <li>
          <a href="javascript:;" :class="{selected: filter === 'all'}" @click="onFilt('all')">All</a>
        </li>
        <li>
          <a
            href="javascript:;"
            :class="{selected: filter === 'active'}"
            @click="onFilt('active')"
          >Active</a>
        </li>
        <li>
          <a
            href="javascript:;"
            :class="{selected: filter === 'completed'}"
            @click="onFilt('completed')"
          >Completed</a>
        </li>
      </ul>
      <a
        href="javascript:;"
        v-if="completedCount > 0"
        class="clear-completed"
        @click="clearCompleted"
      >Clear completed</a>
    </footer>
  </section>
</template>

<script>
import List from '@components/List.vue'
import { mapState } from 'vuex'
import {
  getAll,
  addTodo,
  deleteTodo,
  updateTodo,
  completedAll,
  clearCompleted
} from '@api'

export default {
  name: 'home',
  data() {
    return {
      list: []
    }
  },
  components: {
    List
  },
  created() {
    getAll().then(res => {
      this.list = res.data
    })
  },
  methods: {
    addItem(e) {
      let val = e.target.value
      if (!val || val.trim() === '') {
        return
      }
      addTodo({ title: val }).then(res => {
        if (res.status == 200) {
          this.list.push(res.data)
          e.target.value = ''
        }
      })
    },
    delItem(id) {
      deleteTodo(id).then(res => {
        if (res.status == 200) {
          let removeId = res.data
          let index = this.list.findIndex(item => item.id === removeId)
          this.list.splice(index, 1)
        }
      })
    },
    onCheck(id, value) {
      updateTodo({
        id: id,
        completed: value
      }).then(res => {
        if (res.status === 200) {
          let index = this.list.findIndex(item => item.id === id)
          this.list[index].completed = value
          this.list = JSON.parse(JSON.stringify(this.list))
        }
      })
    },
    onUpdate(id, value) {
      updateTodo({
        id: id,
        title: value
      }).then(res => {
        if (res.status === 200) {
          let index = this.list.findIndex(item => item.id === id)
          this.list[index].title = value
          this.list = JSON.parse(JSON.stringify(this.list))
        }
      })
    },
    onCheckAll(e) {
      let value = e.target.checked
      completedAll(value).then(res => {
        if (res.status === 200) {
          this.list = res.data
        }
      })
    },
    clearCompleted() {
      clearCompleted().then(res => {
        if (res.status === 200) {
          this.list = res.data
        }
      })
    },
    onFilt(value) {
      if (value === 'completed') {
        this.$store.commit('SET_FILTER_TYPE', 'completed')
      } else if (value === 'active') {
        this.$store.commit('SET_FILTER_TYPE', 'active')
      } else {
        this.$store.commit('SET_FILTER_TYPE', 'all')
      }
    }
  },
  computed: {
    ...mapState({
      filter: state => state.app.filter
    }),
    todos() {
      if (this.filter === 'active') {
        return JSON.parse(
          JSON.stringify(this.list.filter(item => item.completed === false))
        )
      } else if (this.filter === 'completed') {
        return JSON.parse(
          JSON.stringify(this.list.filter(item => item.completed === true))
        )
      } else {
        return JSON.parse(JSON.stringify(this.list))
      }
    },
    unCompletedCount() {
      let count = 0
      this.list.forEach(item => {
        if (!item.completed) {
          count++
        }
      })
      return count
    },
    completedCount() {
      return this.list.filter(item => item.completed === true).length
    },
    isAllChecked() {
      return this.list.findIndex(item => item.completed === false) === -1
    }
  }
}
</script>

<style lang="less">
@import url('../../css/global.css');

@keyframes kf
{
  from {transform: translateY(80px); opacity: 0;}
  to {transform: translateY(0px); opacity: 1;}
}
.fade-up {
  animation: kf 1.5s;
}

.todoapp {
  background: #fff;
  margin: 130px 0 40px 0;
  width: 550px;
  left: 50%;
  margin-left: -275px;
  position: relative;
  box-shadow: 21px 52px 16px 0 rgba(0, 0, 0, 0.2),
    0 25px 50px 0 rgba(0, 0, 0, 0.1);
  .header {
    padding-bottom: 4px;
    box-shadow: 0px -4px 8px 0 #ddd inset;
    .title {
      position: absolute;
      top: -113px;
      width: 100%;
      text-align: center;
      font-size: 100px;
      margin: 0;
      font-weight: normal;
      color: #e6868657;
      font-family: Century Schoolbook;
    }
    .new-todo {
      width: 100%;
      padding: 17px 10px 17px 58px;
      font-size: 22px;
      box-sizing: border-box;
      border: none !important;
      outline: none;
      &::input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
      }
      &::-webkit-input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
      }
      &::-moz-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
      }
    }
  }
  .main {
    position: relative;
    .toggle-all {
      width: 0;
      height: 0;
      position: absolute;
      left: 1px;
      &:checked + label {
        color: #000000;
      }
      & + label {
        height: 42px;
        width: 54px;
        position: absolute;
        top: -55px;
        left: -1px;
        transform: rotate(90deg);
        color: #c1c1c1;
        &::before {
          content: '>';
          font-size: 29px;
          text-align: center;
          line-height: 39px;
          font-family: serif;
          font-weight: bold;
          padding-left: 26px;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .footer {
    height: 20px;
    padding: 14px 9px;
    position: relative;
    color: #777;
    border-top: 1px solid #ddd;
    .todo-count {
      font-size: 13px;
    }
    .filters {
      position: absolute;
      list-style: none;
      text-align: center;
      margin: 0;
      padding: 0;
      top: 13px;
      left: 0;
      right: 0;
      box-sizing: border-box;
      li {
        display: inline;
        a {
          color: inherit;
          font-size: 14px;
          margin: 0;
          padding: 3px 7px;
          text-decoration: none;
          border: 1px solid transparent;
          border-radius: 3px;
        }
        .selected {
          border-color: #2cc5ba;
        }
      }
    }
    .clear-completed {
      color: inherit;
      position: absolute;
      right: 12px;
      top: 14px;
      font-size: 14px;
      text-decoration: none;
      &:hover {
        color: #ff3c00;
        text-decoration: underline;
      }
    }
    &::before {
      content: ' ';
      height: 34px;
      position: absolute;
      right: 0;
      left: 0;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
        0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
        0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>


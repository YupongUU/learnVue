import  Vue from 'vue'
var app;
app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: []
    },
    created: function () {
        // onbeforeunload�ĵ���https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onbeforeunload
        window.onbeforeunload = ()=> {
            let dataString = JSON.stringify(this.todoList) // JSON �ĵ�: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON
            window.localStorage.setItem('myTodos', dataString) // ���ĵ�https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage
        }

        let oldDataString = window.localStorage.getItem('myTodos')
        let oldData = JSON.parse(oldDataString)
        this.todoList = oldData || []

    },
    methods: {
        addTodo: function () {
            if (this.newTodo&&  /\S+/g.test(this.newTodo)) {
                this.todoList.push({
                    title: this.newTodo,
                    createdAt: new Date().getDay() + "/" + new Date().getMonth() + " " + new Date().getHours() + ":" + new Date().getMinutes(),

                    done: false // ���һ�� done ����
                })
                this.newTodo = ''
            }


        },
        removeTodo: function (todo) {
            let index = this.todoList.indexOf(todo)
            this.todoList.splice(index, 1)
        }
    }
});
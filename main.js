const First = {
  template: `<div>
               <button @click="$emit('change', 'second')">Go to Second</button>
               <h1>First</h1>
               <button @click="reset">reset</button>
               <input @keyup.enter="addItem" type=text/>
               <ul>
                 <li v-for="item in lists" :key="item.id">{{ item.val }}</li>
               </ul>
            </div>`,
  data: function() {
    return {
      lists: []
    };
  },
  created() {
    this.lists =
      localStorage.getItem("lists") == null
        ? []
        : JSON.parse(localStorage.getItem("lists"));
  },
  methods: {
    addItem(e) {
      this.lists.push({
        val: e.target.value,
        id: new Date().getTime()
      });
      localStorage.setItem("lists", JSON.stringify(this.lists));
    },
    reset() {
      this.lists = [];
      localStorage.setItem("lists", JSON.stringify(this.lists));
    }
  }
};
const Second = {
  template: `<div>
               <button @click="$emit('change', 'first')">Go to First</button>
               <h1>Second</h1>
            </div>`
};

Vue.component("first", First);
Vue.component("second", Second);
const app = new Vue({
  data: {
    target: "first"
  },
  methods: {
    onChange(target) {
      this.target = target;
    }
  }
}).$mount("#app");

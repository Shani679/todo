var STORAGE_KEY = 'list';
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return todos;
  },
  save: function (list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
}

new Vue({
	el: '#app',
	data: {
		text: '',
		done: false,
		error: false,
		showAll: true,
		list: todoStorage.fetch()
	},
	methods: {
		addTodo: function(){
			if(!this.text){
				return this.error = true;
			}
			this.list.push({todo: this.text, done: false, edit: false, show: true});
			this.text='';
			todoStorage.save(this.list);
		},
		remove: function(index){
			for (var i = 0; i < this.list.length; i++) {
				if(i === index){
					this.list.splice(i, 1);
					todoStorage.save(this.list);
				}
			}
		},
		clearCompleted: function(){
			this.list = this.list.filter(current=> !current.done);
			todoStorage.save(this.list);
		},
		clearAll: function(){
			this.list=[];
			localStorage.clear();
		},
		toggleDisplayCompleted: function(){	
			for (var i = 0; i < this.list.length; i++) {
				if(this.list[i].done){
					this.list[i].show = !this.list[i].show;
					this.showAll = !this.showAll;
				}
			}
		}
	}
})
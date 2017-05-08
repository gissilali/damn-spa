
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
window.Event = new Vue();
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example', require('./components/Example.vue'));
Vue.component('admin-login-form', require('./components/auth/AdminLogin.vue'));
Vue.component('user-login-form', require('./components/auth/UserLogin.vue'));
Vue.component('add-request-btn', {
	data(){
		return {
			
		}
	},
	methods:{
		launchForm (){
			Event.$emit('add-request');
		}
	}
});
Vue.component('add-request-form', require('./components/app/AddRequestForm.vue'));
Vue.component('blood-group-input', require('./components/app/partials/BloodGroupInput'));
const app = new Vue({
    el: '#app'
});

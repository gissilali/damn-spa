<template>
	<div class="container">
	    <div class="row">
	        <div class="col-md-4 col-md-offset-4">
	        	<div class="logo">
	        		<img src="http://127.0.0.1:8000/logo.svg" alt="">
	        	</div>
	        	<h3 class="form-title">Sign in to Blood Bank Admin Panel</h3>
	        	<transition name="error">
	        		<div class="alert alert-danger alert-dismissible error" v-if="loginError">
	        			<p>wrong email or password</p>
	        		</div>
	        	</transition>
	        	<div class="alert alert-success" v-if="isLogingIn">
	        		<p>loging in...</p>
	        	</div>
	        	<div class="panel panel-default __card">
	        		<div class="panel-body">
	        			<form :action="urlRoot" method="post" @submit.prevent="submitForm">
		        			<input type="hidden" name="_token" :value="csrfToken">
		        			<div class="form-group">
		        				<label for="email">Email</label>
		        				<input type="email" name="email" id="email" class="form-control __input"  v-model="field.email" @keyup="checkForm" @blur="checkForm" required>
		        			</div>
		        			<div class="form-group">
		        				<label for="password">Password</label>
		        				<span class="password"><a href="">Forgot your password?</a></span>
		        				<input type="password" name="password" id="password"  v-model="field.password" @keyup="checkForm" @blur="checkForm" class="form-control __input">
		        			</div>
		        			<div class="form-group">
		        				<button class="btn __button __button-red __button-full-width" :disabled="formNotFilled">Sign in</button>
		        			</div>
	        			</form>
	        		</div>
	        	</div>
	        </div>
	    </div>
	</div>
</template>
<script>

	export default{
		data() {
			return {
				
				csrfToken: window.axios.defaults.headers.common['X-CSRF-TOKEN'],
				urlRoot: $('#url-root').attr('content')+'/login',
				adminLogin: '/admin/login',
				doctorLogin: '/login',
				field: {
					email: '',
					password: ''
				},
				formNotFilled: true,
				loginError: false,
				isLogingIn: false

			}
		},

		methods: {
			checkForm(){
				if(this.field.email == '' || this.field.password == ''){
					this.formNotFilled = true;
				}else{
					this.formNotFilled = false;
				}
			},

			submitForm(){
				var vm = this;
                this.isLogingIn = true;
                axios.post('/admin/login',{
                    password: this.field.password,
                    email: this.field.email
                }).then(function(response){
                    vm.isLogingIn = false;
                    console.log(response.data);
                    window.location.reload(false);
                }).catch(function(response){
                    vm.isLogingIn = false;
                    if(response.response.data.hasOwnProperty('email')){
                        vm.loginError = true                      
                    }
                });
			}
		}
	}
</script>
<style scoped>
	.error{
		transition: all 300ms;
		text-align: center;
	}
	.password{
		font-weight: 600;
		font-size: 11px;
		float: right;
	}
	.logo{
		height:50px;
		width:100%;
		display: flex;
		margin-bottom:20px;
	}
	.form-title{
		font-weight: 600;
		text-align: center;
		color:#EE5669;
	}
	.logo >img{
		height: 100%;
		margin:0 auto;
	}
</style>
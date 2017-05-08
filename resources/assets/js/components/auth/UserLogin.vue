<template>
	<div class="container">
	    <div class="row">
	        <div class="col-md-4 col-md-offset-4">
	        	<div class="logo">
	        		<img src="http://127.0.0.1:8000/logo.svg" alt="">
	        	</div>
	        	<h3 class="form-title">Sign in to Blood Bank User Panel</h3>
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
	        			<form method="post" @submit.prevent="submitForm">
		        			<input type="hidden" name="_token" :value="csrfToken">
		        			<div class="form-group">
		        				<label for="email">Email</label>
		        				<input type="email" name="email" id="email" class="form-control __input" v-model="fields.email" @keyup="formSubmitable" required>
		        			</div>
		        			<div class="form-group">
		        				<label for="password">Password</label>
		        				<span class="password"><a href="">Forgot your password?</a></span>
		        				<input type="password" name="password" id="password" class="form-control __input" v-model="fields.password" @keyup="formSubmitable">
		        			</div>
		        			<div class="form-group">
		        				<button class="btn __button __button-red __button-full-width" :disabled="formNotSubmitable">Sign in</button>
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
			fields: {
				email: '',
				password: ''
			},
			formNotSubmitable: true,
			errors: {
				email: '',
				password: ''
			},
			isLogingIn: false,
			loginError: false
		}
	},
	methods: {
		emailValid() {
			var re = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
			if(!re.test(this.fields.email)){
				return false;
			} else {
				return true;
			}
		},

		fieldsEmpty() {
			if(this.fields.email == '' || this.fields.password == '') {
				return true;
			}else {
				return false;
			}
		},

		formSubmitable() {
			if(this.emailValid() && this.fieldsEmpty()==false){
				this.formNotSubmitable = false;
			}
		},

		submitForm() {
			this.isLogingIn = true;
			var context = this;
			axios.post('/login',{
				email: context.fields.email,
				password: context.fields.password
			}).then(function(data){
				window.location.reload();
			}).catch(function(error){
				context.isLogingIn = false;
				context.loginError = true;
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
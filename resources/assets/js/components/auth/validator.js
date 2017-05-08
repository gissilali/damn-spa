class Validator{
	/**
	 * Check if Email is Valid Email
	 * @param  string email
	 * @return {Boolean}
	 */
	isEmail(email) {
		var re = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
		if(!re.test(email)){
			return true;
		} else {
			return false;
		}
	}
	/**
	 * Check if field is empty
	 * @param  {[string]}  value 
	 * @return {Boolean} 
	 */
	isEmpty(value) {
		if(value == ''){
			return true;
		} else {
			return false;
		}
	}
}
export default new Validator();
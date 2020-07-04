export default class User {
	id: string;
	avatar: string;
	age: number;
	email: string;
	name: string;
	role: 'admin' | 'user'
	surname: string;
	password: string;

    constructor(email:string) {
		this.email = email
    }
}

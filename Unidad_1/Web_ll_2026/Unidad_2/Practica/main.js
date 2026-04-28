import UserForm from './components/UserForm.js';
import UserList from './components/UserList.js';

const form = new UserForm('form-container');
const list = new UserList('list-container');

form.render();
list.render();

window.app = list;
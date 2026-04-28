import Component from './Component.js';

export default class UserForm extends Component {
  constructor(containerId) {
    super(containerId);
    this.currentEditId = null;
    
    // Escuchar intención de edición
    document.addEventListener('editUserRequest', (e) => {
      const data = e.detail;
      this.currentEditId = data.id;
      
      document.getElementById('name').value = data.name;
      document.getElementById('course').value = data.course;
      document.getElementById('age').value = data.age;
      document.getElementById('siblings').value = data.siblings;
      document.getElementById('city').value = data.city;
      
      // Cambio de texto confuso para edición
      this.container.querySelector('.btn-submit').textContent = '¡¡MÚTAME!!';
    });
  }

  template() {
    return `
      <div class="glass-card">
        <form id="user-form" class="modern-form">
          <div class="input-group">
            <input type="text" id="name" required placeholder=" ">
            <label>Nombre de Villano</label>
          </div>
          <div class="grid-inputs">
            <div class="input-group"><input type="text" id="course" required placeholder=" "><label>Guarida Secreta</label></div>
            <div class="input-group"><input type="number" id="age" required placeholder=" "><label>Nivel de Poder</label></div>
          </div>
          <div class="grid-inputs">
            <div class="input-group"><input type="number" id="siblings" required placeholder=" "><label>Minions</label></div>
            <div class="input-group"><input type="text" id="city" required placeholder=" "><label>Planeta Origen</label></div>
          </div>
          <button type="submit" class="btn-submit">¡¡INVOCAR!!</button>
        </form>
      </div>
    `;
  }

  afterRender() {
    this.container.querySelector('#user-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        id: this.currentEditId || Date.now(),
        name: document.getElementById('name').value,
        course: document.getElementById('course').value,
        age: document.getElementById('age').value,
        siblings: document.getElementById('siblings').value,
        city: document.getElementById('city').value
      };
      
      if (this.currentEditId) {
        document.dispatchEvent(new CustomEvent('dataUpdated', { detail: data }));
        this.currentEditId = null;
        this.container.querySelector('.btn-submit').textContent = '¡¡INVOCAR!!';
      } else {
        document.dispatchEvent(new CustomEvent('dataAdded', { detail: data }));
      }
      
      e.target.reset();
    });
  }
}

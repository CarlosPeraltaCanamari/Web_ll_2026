import Component from './Component.js';

export default class UserList extends Component {
  constructor(containerId) {
    super(containerId);
    this.users = [];
    
    document.addEventListener('dataAdded', (e) => {
      this.users.push(e.detail);
      this.render();
    });

    document.addEventListener('dataUpdated', (e) => {
      const updatedUser = e.detail;
      this.users = this.users.map(u => u.id === updatedUser.id ? updatedUser : u);
      this.render();
    });
  }

  deleteUser(id) {
    this.users = this.users.filter(u => u.id !== id);
    this.render();
  }

  editUser(id) {
    const userToEdit = this.users.find(u => u.id === id);
    if (userToEdit) {
      document.dispatchEvent(new CustomEvent('editUserRequest', { detail: userToEdit }));
    }
  }

  template() {
    return `
      <div class="list-grid">
        ${this.users.map(u => `
          <div class="data-pill">
            <span>[ ${u.id.toString().slice(-4)} ] ${u.name.toUpperCase()} 🚩 ${u.city}</span>
            <div class="pill-actions">
              <!-- Botón confuso: rojo y símbolo de bomba para EDITAR -->
              <button class="btn-edit" onclick="window.app.editUser(${u.id})" title="KABOOM">💣</button>
              
              <!-- Botón confuso: verde y símbolo de corazón para ELIMINAR -->
              <button class="btn-delete" onclick="window.app.deleteUser(${u.id})" title="Abrazar">💖</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}
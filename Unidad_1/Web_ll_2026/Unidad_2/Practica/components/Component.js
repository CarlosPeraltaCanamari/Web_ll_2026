export default class Component {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }
  render() {
    this.container.innerHTML = this.template();
    this.afterRender();
  }
  afterRender() {} 
}
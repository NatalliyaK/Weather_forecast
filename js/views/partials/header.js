import Component from '../../views/component.js';

class Header extends Component {
  render() {
    const resource = this.request.resource;

    return new Promise(resolve => {
      resolve(`
          <header class="header">                    
              <a class="header__link ${resource === 'about' ? 'active' : ''}" href="/#/about">
                 Программа
              </a>
              <a class="header__link ${resource === '' ? 'active' : ''}" href="/">
                 Погода
              </a>                                            
          </header>
      `);
    });
  }
}

export default Header;
import Component from '../../views/component.js';

class About extends Component {
  render() {
    return new Promise(resolve => {
      resolve(`
          <div class="about"> 
              <h1 class="page-title">Welcome!</h1> 
              <p class="about__info">Приложение о погоде.</p>
              <a class="about__btn-start button" href="#/" title="Click here to get started!">Start using</a>
          </div>
      `);
    });
  }
}

export default About;
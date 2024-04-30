import React from 'react';

import Rotas from './rotas';

import 'toastr/build/toastr.min.js';

import 'bootswatch/dist/flatly/bootstrap.css';
import '../components/custom.css';
import 'toastr/build/toastr.css';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class App extends React.Component {

  render() {
    return(
      <div className='container'> 
          <Rotas/>
      </div>
    )
  }
}

export default App;

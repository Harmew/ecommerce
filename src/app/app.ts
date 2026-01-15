import { Component } from '@angular/core';

// Router
import { RouterOutlet } from '@angular/router';

// Components
import { Header } from './layout/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
})
export class App {}

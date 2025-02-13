import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { merge } from 'rxjs';
import { getRandowStep, getRandowStepFromAPI } from '../cases/get-randow-step';
import { cloneObject } from '../util/clone-obj';
import { createMatrix } from '../util/create-matrix';
import './grid-cell';

@customElement('avatar-grid')
export class AvatarGrid extends LitElement {
  @state()
  data: string[][] = [];

  connectedCallback() {
    super.connectedCallback();
    const steps = 14
    this.data = createMatrix(steps, steps, '');

    // getRandowStepFromAPI('Alex', steps - 5).subscribe(console.log)
    // getRandowStepFromAPI('Bruna', steps).subscribe(console.log)
    // getRandowStepFromAPI('Carlinhos', steps).subscribe(console.log)

    merge(
      // getRandowStepFromAPI('Alex', steps),
      // getRandowStepFromAPI('Bruna', steps),
      // getRandowStepFromAPI('Carlinhos', steps),
      // getRandowStepFromAPI('Debora', steps),
      // getRandowStepFromAPI('Epfianio', steps),
      // getRandowStepFromAPI('Fragoso', steps),
      // getRandowStepFromAPI('Galber', steps),
      // getRandowStepFromAPI('Heloisa', steps),
      // getRandowStepFromAPI('Irineu', steps),
      // getRandowStepFromAPI('Jaqueline', steps),
      // getRandowStepFromAPI('Kailayne', steps),
      // getRandowStepFromAPI('Leonardo', steps),
      // getRandowStepFromAPI('Mariana', steps),
      getRandowStep('Gabi', steps),
      getRandowStep('Xero', steps),
      getRandowStep('Gabriela', steps),
      getRandowStep('Renato', steps),
      getRandowStep('Maria', steps),
      getRandowStep('Thiago', steps),
      getRandowStep('Pedro', steps),
      getRandowStep('Suzana', steps),
      getRandowStep('Josao', steps),
      getRandowStep('Gorginho', steps),
      getRandowStep('Alex', steps),
    ).subscribe(
      {
        next: val => {
          const zIndex = Math.max(val.y, 0)
          const drunkData = this.data
          if (zIndex < (drunkData.length)) {
            const rowSize = drunkData[0].length
            const previousY = Math.max(zIndex - 1, 0)
            let lastX = drunkData[previousY].findIndex(item => item.includes(val.trackId))
            let nextX = Math.floor(rowSize / 2)
            if (lastX > -1) {
              nextX = Math.min(Math.max(0, lastX + val.x), rowSize - 1)
            }
            const oldContent = drunkData[zIndex][nextX].split(',')
            drunkData[zIndex][nextX] = oldContent.concat(val.trackId).join(',')
          }
          this.data = cloneObject(drunkData)
        },
        error: err => console.error('Erro geral:', err),
      }
    )

  }

  render() {

    return html`
      <div class="grid-container">
        ${this.data.map((row, rowIndex) => html`
          <div class="grid-row">
            ${row.map((item, colIndex) => html`
              <grid-cell 
                .value=${item}
                .key="${rowIndex}-${colIndex}"
              ></grid-cell>
            `)}
          </div>
        `)}
      </div>
    `;
  }
  static styles = css`
    :host {
      display: block;
      perspective: calc(100vw + 400px);
    }
    
    .grid-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      transform: scale(.8) translate(0px, -20px) rotateX(44deg) rotateY(0deg);
      transform-style: preserve-3d;
      background-color:rgb(197, 197, 197);
      border-radius: 1rem;
    }

    .grid-row {
      display: flex;
      gap: 1rem;
    }

    avatar-item {
      flex: 1;
    }
  `;
} 
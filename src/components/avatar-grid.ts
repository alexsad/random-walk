import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { bufferCount, concatMap, from, merge, mergeMap, Observable, tap } from 'rxjs';
import { getRandowStep, getRandowStepFromAPI, IStep } from '../cases/get-randow-step';
import { cloneObject } from '../util/clone-obj';
import { createMatrix } from '../util/create-matrix';
import './grid-cell';

@customElement('avatar-grid')
export class AvatarGrid extends LitElement {
  @state()
  data: string[][] = [];

  connectedCallback() {
    super.connectedCallback();
    const steps = 20
    this.data = createMatrix(steps, steps, '');

    const processItem = (val: IStep) => {
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
    }

    const processBatch = (batch: string[]) => {
      return from(batch)
        .pipe(
          mergeMap(val => getRandowStep(val, steps))
        )
    }

    const agentList = [
      'Alex_fake',
      'Bruna_fake',
      'Carlinhos_fake',
      'Debora_fake',
      'Epfianio_fake',
      'Fragoso_fake',
      'Galber_fake',
      'Heloisa_fake',
      'Irineu_fake',
      'Jaqueline_fake',
      'Kailayne_fake',
      'Leonardo_fake',
      'Mariana_fake',
      'Nosferato_fake',
      'Opalla_fake',
      'Queijada_fake',
      'Renata_fake',
      'Suzana_fake',
      'Tereza_fake',
      'Uvalina_fake',
      'Vanilda_fake',
      'Xernobia_fake',
      'Zuleica_fake',
    ]

    from(agentList)
      .pipe(
        bufferCount(7),
        concatMap(processBatch),
      )
      .subscribe(
        {
          next: processItem,
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
      width: fit-content;
    }
    
    .grid-container {
      display: flex;
      flex-direction: column;
      gap: .3rem;
      padding:.5rem;
      transform: scale(.8) translate(0px, -20px) rotateX(44deg) rotateY(0deg);
      transform-style: preserve-3d;
      background-color:rgb(197, 197, 197);
      border-radius: 5px;
    }

    .grid-row {
      display: flex;
      gap: .5rem;
    }

    avatar-item {
      flex: 1;
    }
  `;
} 
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { bufferCount, concatMap, from, mergeMap } from 'rxjs';
import { getRandowStep, getRandowStepFromAPI, IStep } from '../cases/get-randow-step';
import { cloneObject } from '../util/clone-obj';
import { createMatrix } from '../util/create-matrix';
import './grid-cell';
import { checkConnection } from '../cases/check-connection';
import { when } from 'lit/directives/when.js';

@customElement('avatar-grid')
export class AvatarGrid extends LitElement {
  @state()
  data: string[][] = [];
  steps = 20
  @state()
  isProcessing = false

  connectedCallback(): void {
    super.connectedCallback()
    this.data = createMatrix(this.steps, this.steps, '');
  }

  async _startSimulation(){
    this.isProcessing = true
    const steps = this.steps
    this.data = cloneObject(createMatrix(steps, steps, ''));

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

    const isOnline = await checkConnection()
    const getRandowStepFn = isOnline ? getRandowStepFromAPI : getRandowStep

    const processBatch = (batch: string[]) => {
      return from(batch)
        .pipe(
          mergeMap(val => getRandowStepFn(val, steps))
        )
    }

    const agentList = [
      'Alex_sml',
      'Bruna_sml',
      'Carlinhos_sml',
      'Debora_sml',
      'Epfianio_sml',
      'Fragoso_sml',
      'Galber_sml',
      'Heloisa_sml',
      'Irineu_sml',
      'Jaqueline_sml',
      'Kailayne_sml',
      'Leonardo_sml',
      'Mariana_sml',
      'Nosferato_sml',
      'Opalla_sml',
      'Queijada_sml',
      'Renata_sml',
      'Suzana_sml',
      'Tereza_sml',
      'Uvalina_sml',
      'Vanilda_sml',
      'Xernobia_sml',
      'Zuleica_sml',
    ]

    from(agentList)
      .pipe(
        bufferCount(10),
        concatMap(processBatch),
      )
      .subscribe(
        {
          next: processItem,
          error: err => console.error('Erro geral:', err),
          complete:() => {
            this.isProcessing = false
          },
        }
      )
  }

  render() {

    return html`
      <div>
        <div class="head">
          ${when(this.isProcessing,() => html`<button disabled>processing...</button>`)}
          ${when(!this.isProcessing,() => html`<button @click=${this._startSimulation}>start</button>`)}
        </div>
        <div class="foot">
            <div class="grid-container">
            ${this.data.map((row, rowIndex) => html`
              <div 
                class="grid-row"
                .key="row_${rowIndex}"
              >
                ${row.map((item, colIndex) => html`
                  <grid-cell 
                    .value=${item}
                    .key="${rowIndex}-${colIndex}"
                  ></grid-cell>
                `)}
              </div>
            `)}
          </div>
        </div>

      </div>

    `;
  }
  static styles = css`
    :host {
      display: block;
      width: fit-content;
    }

    .foot{
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
      /* background-color:rgb(197, 197, 197); */
      background-color: #353535;
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
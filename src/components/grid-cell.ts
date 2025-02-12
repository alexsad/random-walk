import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './avatar-item';

@customElement('grid-cell')
export class AvatarItem extends LitElement {
  @property({ type: String })
  value: string = '';

  static styles = css`
      :host { 
        display: block;
        position: relative;
      }
      .grid-cell {
        width: 3rem; 
        height: 3rem; 
        border: 1px solid #575757;
        border-radius: 2px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        /* align-items: center; */
      }
  `;

  render() {
    const row = this.value.split(',').filter(item => !!item.trim())

    if (!row.length) {
      row.push('')
    }

    const size = `${(100 / row.length)}%`

    return html`
        <div class="grid-cell">
          ${row.map((item, colIndex) => html`
              <avatar-item
                .size=${size} 
                .value=${item}
                .key="${colIndex}_${item}"
              ></avatar-item>
          `)}
        </div>
    `;
  }
} 
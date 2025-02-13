import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getContrastColor, seedToHexColor } from '../util/get-color';

@customElement('avatar-item')
export class AvatarItem extends LitElement {
  @property({ type: String })
  value: string = '';

  @property({ type: String })
  size: string = '100%';

  static styles = css`
    :host { 
      --size: 3rem;
      --bg-color: #f0f0f0;
      --fill-color: #333333;
      display: block;
      max-width: var(--size);
      max-height: var(--size);
      min-width: var(--size);
      min-height: var(--size);
     }

    .avatar {
      min-width: 100%;
      min-height: 100%;
      background-color: var(--bg-color);
      color: var(--fill-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: clamp(.1rem, 5vw, .9rem);
      transition: transform 0.2s;
      overflow: hidden;
    }
    
    .avatar.has-value{
      filter: saturate(.62);
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .avatar:hover {
      transform: scale(1.1);
    }
  `;

  render() {
    // Gera a URL do Robohash usando o nome como seed
    // const avatarUrl = `https://robohash.org/${encodeURIComponent(this.value)}?set=set3`;
    // const avatarUrl = ''

    if (this.value === '') {
      return html`
        <div class="avatar" style="--size: ${this.size};"></div>
      `;
    }

    return html`
      <div class="avatar has-value">
        ${this.value.charAt(0).toUpperCase()}
      </div>
    `;
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('size')) {
      this.style.setProperty('--size', this.size);
    }
    if (changedProperties.has('value') && this.value) {
      const color = seedToHexColor(this.value)
      const contrastColor = getContrastColor(color)
      this.style.setProperty('--fill-color', getContrastColor(contrastColor, true));
      this.style.setProperty('--bg-color', contrastColor);
    }
  }
} 
import { uiStore } from 'Frontend/stores/app-store';
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { View } from 'Frontend/views/view';
import { LoginFormLoginEvent } from '@vaadin/login/vaadin-login-form.js';
import '@vaadin/login/vaadin-login-form.js';

@customElement('login-view')
export class LoginView extends View {
    @state()
    private error = false;

    connectedCallback(): void {
        super.connectedCallback();
        this.classList.add('flex', 'flex-col', 'items-center', 'justify-center');
        uiStore.setLoggedIn(false);
    }

    render() {
        return html`
            <h1>Hilla CRM</h1>
            <vaadin-login-form
                no-forgot-password
                @login=${this.login}
                .error=${this.error}
            ></vaadin-login-form>
        `;
    }

    async login(e: LoginFormLoginEvent) {
        try {
            await uiStore.login(e.detail.username, e.detail.password);
        } catch (err) {
            this.error = true;
        }
    }
}
